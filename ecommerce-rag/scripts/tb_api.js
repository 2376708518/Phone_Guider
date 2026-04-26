#!/usr/bin/env node

/**
 * 淘宝 API 接入模块
 * 使用淘宝联盟（淘宝客）API 获取商品价格和详情
 * 
 * 申请流程：
 * 1. 访问 https://pub.alimama.com/ 注册淘宝联盟
 * 2. 创建应用获取 app_key 和 app_secret
 * 3. 申请商品详情 API 权限
 * 
 * 文档：https://open.taobao.com/doc.htm
 */

const crypto = require('crypto');
const https = require('https');
const path = require('path');
const fs = require('fs');

// 配置文件路径
const CONFIG_PATH = path.join(__dirname, '../references/tb_config.json');

// 淘宝 API 配置
const TB_CONFIG = {
  app_key: '',        // 从淘宝联盟获取
  app_secret: '',     // 从淘宝联盟获取
  adzone_id: '',      // 推广位 ID
  api_url: 'https://gw.alicdn.com/router/rest',
  timeout: 5000
};

// 加载配置
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
      Object.assign(TB_CONFIG, config);
      return true;
    }
  } catch (err) {
    console.error('❌ 加载淘宝配置失败:', err.message);
  }
  return false;
}

// 保存配置
function saveConfig(config) {
  try {
    Object.assign(TB_CONFIG, config);
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(TB_CONFIG, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('❌ 保存淘宝配置失败:', err.message);
    return false;
  }
}

/**
 * 生成淘宝 API 签名
 */
function generateSign(params, appSecret) {
  // 按参数名排序
  const sortedKeys = Object.keys(params).sort();
  
  // 拼接参数字符串
  let signString = appSecret;
  for (const key of sortedKeys) {
    signString += key + params[key];
  }
  signString += appSecret;
  
  // MD5 签名并转大写
  const sign = crypto.createHash('md5').update(signString, 'utf8').digest('hex').toUpperCase();
  return sign;
}

/**
 * 调用淘宝 API
 */
function callTbApi(method, params) {
  return new Promise((resolve, reject) => {
    if (!TB_CONFIG.app_key || !TB_CONFIG.app_secret) {
      reject(new Error('淘宝 API 配置不完整，请先配置 app_key 和 app_secret'));
      return;
    }

    // 公共参数
    const commonParams = {
      method: method,
      app_key: TB_CONFIG.app_key,
      timestamp: new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14),
      format: 'json',
      v: '2.0',
      sign_method: 'md5'
    };

    // 合并参数
    const allParams = { ...commonParams, ...params };
    
    // 生成签名
    allParams.sign = generateSign(allParams, TB_CONFIG.app_secret);

    // 构建请求 URL
    const queryString = Object.entries(allParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    const url = `${TB_CONFIG.api_url}?${queryString}`;

    // 发送请求
    const req = https.get(url, { timeout: TB_CONFIG.timeout }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          // 检查错误
          if (result.error_response) {
            reject(new Error(`淘宝 API 错误：${result.error_response.msg || '未知错误'}`));
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(new Error(`解析响应失败：${err.message}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`网络请求失败：${err.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
  });
}

/**
 * 淘宝客商品搜索
 * API: taobao.tbk.dg.material.optional
 */
async function searchProducts(keyword, options = {}) {
  const params = {
    q: keyword,
    page_size: options.limit || 20,
    page_no: options.page || 1,
    adzone_id: TB_CONFIG.adzone_id || '999999999'
  };

  // 可选参数
  if (options.min_price) params.start_price = options.min_price;
  if (options.max_price) params.end_price = options.max_price;
  if (options.sort) params.sort = options.sort; // 1=综合，2=销量，3=价格升序，4=价格降序

  try {
    const result = await callTbApi('taobao.tbk.dg.material.optional', params);
    
    // 解析结果
    const products = [];
    const resultList = result.tbk_dg_material_optional_response.result_list || [];
    
    for (const item of resultList) {
      const product = {
        name: item.title,
        price: parseFloat(item.zk_final_price || item.reserve_price),
        original_price: parseFloat(item.reserve_price),
        sales: parseInt(item.month_sales || '0'),
        rating: parseFloat(item.user_type === 1 ? '4.8' : '4.5'), // 天猫/淘宝
        image_url: item.pict_url,
        product_url: item.click_url,
        affiliate_url: item.click_url, // 带佣金的推广链接
        commission: parseFloat(item.commission_rate || '0'), // 佣金比例
        shop_name: item.shop_title,
        platform: item.user_type === 1 ? '天猫' : '淘宝',
        category: '数码',
        brand: item.brand || '',
        tags: [],
        specs: JSON.stringify({
          '来源': '淘宝 API',
          '佣金': `${(item.commission_rate / 10).toFixed(1)}%`
        }),
        created_time: new Date().toISOString(),
        updated_time: new Date().toISOString(),
        status: '在售'
      };

      // 添加标签
      if (item.user_type === 1) product.tags.push('天猫');
      if (item.free_shipment) product.tags.push('包邮');
      if (item.gold_seller) product.tags.push('金牌卖家');
      
      products.push(product);
    }

    return products;
  } catch (err) {
    console.error('淘宝商品搜索失败:', err.message);
    return [];
  }
}

/**
 * 获取商品详情
 * API: taobao.tbk.item.info.get
 */
async function getProductDetail(numIids) {
  const params = {
    num_iids: numIids.join(','),
    adzone_id: TB_CONFIG.adzone_id || '999999999'
  };

  try {
    const result = await callTbApi('taobao.tbk.item.info.get', params);
    
    const details = [];
    const resultList = result.tbk_item_info_get_response.results || [];
    
    for (const item of resultList) {
      const detail = {
        num_iid: item.num_iid,
        title: item.title,
        price: parseFloat(item.zk_final_price || item.reserve_price),
        original_price: parseFloat(item.reserve_price),
        sales: parseInt(item.month_sales || '0'),
        images: item.pict_url,
        detail_images: item.small_images?.string || [],
        category: item.category_name,
        brand: item.brand,
        shop_info: {
          name: item.shop_title,
          type: item.user_type === 1 ? '天猫' : '淘宝',
          level: item.seller_nick
        }
      };
      
      details.push(detail);
    }

    return details;
  } catch (err) {
    console.error('获取商品详情失败:', err.message);
    return [];
  }
}

/**
 * 获取优惠券
 * API: taobao.tbk.coupon.get
 */
async function getCoupon(adMaterialId) {
  const params = {
    ad_material_id: adMaterialId,
    adzone_id: TB_CONFIG.adzone_id || '999999999'
  };

  try {
    const result = await callTbApi('taobao.tbk.coupon.get', params);
    
    const couponInfo = result.tbk_coupon_get_response || {};
    
    return {
      amount: parseFloat(couponInfo.coupon_amount || '0'),
      start_fee: parseFloat(couponInfo.coupon_start_fee || '0'),
      start_time: couponInfo.coupon_start_time,
      end_time: couponInfo.coupon_end_time,
      total_count: parseInt(couponInfo.coupon_total_count || '0'),
      remain_count: parseInt(couponInfo.coupon_remain_count || '0')
    };
  } catch (err) {
    console.error('获取优惠券失败:', err.message);
    return null;
  }
}

/**
 * 检查价格变化
 */
async function checkPriceChange(product) {
  if (!product.product_url) return null;

  // 从 URL 提取商品 ID
  const urlMatch = product.product_url.match(/id=(\d+)/);
  if (!urlMatch) return null;

  const numIid = urlMatch[1];

  try {
    const details = await getProductDetail([numIid]);
    
    if (details.length > 0) {
      const detail = details[0];
      const currentPrice = detail.price;
      const oldPrice = product.price;
      
      const change = currentPrice - oldPrice;
      const changePercent = ((change / oldPrice) * 100).toFixed(2);

      return {
        num_iid: numIid,
        oldPrice,
        currentPrice,
        change,
        changePercent: parseFloat(changePercent) + '%',
        hasCoupon: detail.coupon_info ? true : false
      };
    }
  } catch (err) {
    console.error(`检查价格变化失败：${product.name}`, err.message);
  }

  return null;
}

/**
 * 测试 API 连接
 */
async function testConnection() {
  try {
    // 简单搜索测试
    const results = await searchProducts('手机', { limit: 1 });
    
    if (results.length > 0) {
      console.log('✅ 淘宝 API 连接成功');
      console.log(`   测试商品：${results[0].name}`);
      console.log(`   价格：¥${results[0].price}`);
      return true;
    } else {
      console.log('⚠️  淘宝 API 返回空结果');
      return false;
    }
  } catch (err) {
    console.error('❌ 淘宝 API 连接失败:', err.message);
    return false;
  }
}

// CLI 命令
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║              淘宝 API 接入工具                            ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');

  // 加载配置
  const configLoaded = loadConfig();

  switch (command) {
    case 'config':
      // 配置向导
      console.log('📝 淘宝 API 配置向导');
      console.log('─'.repeat(60));
      console.log('');
      console.log('请访问 https://pub.alimama.com/ 申请淘宝联盟账号');
      console.log('创建应用后获取以下信息：');
      console.log('');
      console.log('1. app_key:');
      const appKey = 'YOUR_APP_KEY'; // 实际使用时从用户输入获取
      console.log('2. app_secret:');
      const appSecret = 'YOUR_APP_SECRET';
      console.log('3. adzone_id (推广位 ID):');
      const adzoneId = '999999999';
      
      const newConfig = {
        app_key: appKey,
        app_secret: appSecret,
        adzone_id: adzoneId
      };

      if (saveConfig(newConfig)) {
        console.log('');
        console.log('✅ 配置已保存');
        console.log(`   文件：${CONFIG_PATH}`);
      }
      break;

    case 'test':
      // 测试连接
      console.log('🔍 测试淘宝 API 连接...');
      console.log('');
      
      if (!configLoaded) {
        console.log('❌ 配置未加载，请先运行 config 命令');
        break;
      }

      const connected = await testConnection();
      
      if (connected) {
        console.log('');
        console.log('✅ API 可用，可以开始使用');
      } else {
        console.log('');
        console.log('❌ API 不可用，请检查配置');
      }
      break;

    case 'search':
      // 搜索商品
      const keyword = args[1] || '手机';
      console.log(`🔍 搜索淘宝商品：${keyword}`);
      console.log('');

      if (!configLoaded) {
        console.log('❌ 配置未加载，请先运行 config 命令');
        break;
      }

      const products = await searchProducts(keyword, { limit: 5 });
      
      if (products.length > 0) {
        console.log(`✅ 找到 ${products.length} 个商品`);
        console.log('');
        
        products.forEach((p, i) => {
          console.log(`${i + 1}. ${p.name}`);
          console.log(`   💰 ¥${p.price} (${p.platform})`);
          console.log(`   📊 月销${p.sales}+`);
          console.log(`   🔗 ${p.product_url}`);
          console.log('');
        });
      } else {
        console.log('❌ 未找到商品');
      }
      break;

    default:
      console.log('用法：node tb_api.js <command> [args]');
      console.log('');
      console.log('命令:');
      console.log('  config  - 配置淘宝 API 密钥');
      console.log('  test    - 测试 API 连接');
      console.log('  search  - 搜索商品 <关键词>');
      console.log('');
      console.log('示例:');
      console.log('  node tb_api.js config');
      console.log('  node tb_api.js test');
      console.log('  node tb_api.js search 小米手机');
  }
}

// 导出函数
module.exports = {
  loadConfig,
  saveConfig,
  searchProducts,
  getProductDetail,
  getCoupon,
  checkPriceChange,
  testConnection,
  TB_CONFIG
};

// CLI 入口
if (require.main === module) {
  main().catch(console.error);
}

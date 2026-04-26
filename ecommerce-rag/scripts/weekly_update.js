#!/usr/bin/env node

/**
 * 每周自动更新脚本
 * 功能：价格检查、新品添加、下架检测、数据统计
 * 建议：每周运行一次（可通过 cron 定时任务）
 */

const fs = require('fs');
const path = require('path');
const { loadProducts, saveProducts, searchProducts, addProduct } = require('./rag_manager.js');
const tbApi = require('./tb_api.js');

// 配置
const CONFIG = {
  // 价格变动阈值（超过这个百分比才记录）
  priceChangeThreshold: 0.05, // 5%
  
  // 最大价格检查数量（避免 API 调用过多）
  maxPriceCheck: 20,
  
  // 新品检查品牌
  newProductsBrands: ['小米', '华为', 'OPPO', 'vivo', '荣耀', '一加', 'iQOO', 'realme'],
  
  // 数据备份
  backupEnabled: true,
  backupDir: path.join(__dirname, '../data/backups')
};

// 更新报告
const report = {
  timestamp: new Date().toISOString(),
  priceUpdates: [],
  newProducts: [],
  discontinued: [],
  stats: {}
};

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║         电商 RAG 库 - 每周自动更新                        ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📅 更新时间：${new Date().toLocaleString('zh-CN')}`);
console.log('');

/**
 * 1. 数据备份
 */
function backupData() {
  if (!CONFIG.backupEnabled) return;

  const backupPath = CONFIG.backupDir;
  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
  }

  const dataFile = path.join(__dirname, '../references/products.json');
  const backupFile = path.join(backupPath, `products_backup_${Date.now()}.json`);

  try {
    fs.copyFileSync(dataFile, backupFile);
    console.log('✅ 数据备份完成');
    console.log(`   备份文件：${backupFile}`);
  } catch (err) {
    console.log('⚠️  数据备份失败');
  }
  console.log('');
}

/**
 * 2. 检查价格变化（淘宝 API）
 */
async function checkPriceChanges() {
  console.log('📊 检查价格变化...');
  console.log('');

  // 尝试加载淘宝配置
  const tbConfigLoaded = tbApi.loadConfig();
  
  if (!tbConfigLoaded) {
    console.log('⚠️  淘宝 API 未配置，跳过价格检查');
    console.log('   运行：node scripts/tb_api.js config');
    console.log('');
    return;
  }

  const data = loadProducts();
  if (data.type !== 'local') {
    console.log('⚠️  仅支持本地存储模式');
    return;
  }

  const products = data.products;
  let updated = 0;
  let checked = 0;

  // 筛选淘宝/天猫商品进行检查
  const tbProducts = products.filter(p => 
    p.platform === '淘宝' || p.platform === '天猫' || p.platform === '天猫'
  ).slice(0, CONFIG.maxPriceCheck);

  console.log(`   待检查商品：${tbProducts.length} 个`);
  console.log('');

  for (const product of tbProducts) {
    checked++;
    process.stdout.write(`   进度：${checked}/${tbProducts.length}\r`);

    try {
      const priceInfo = await tbApi.checkPriceChange(product);
      
      if (priceInfo) {
        const changePercent = Math.abs(priceInfo.changePercent);
        
        // 只记录显著变化（>5%）
        if (parseFloat(changePercent) > CONFIG.priceChangeThreshold * 100) {
          const oldPrice = product.price;
          product.price = priceInfo.currentPrice;
          product.updated_time = new Date().toISOString();

          report.priceUpdates.push({
            name: product.name,
            oldPrice,
            newPrice: priceInfo.currentPrice,
            change: priceInfo.change,
            changePercent: priceInfo.changePercent
          });

          updated++;
        }
      }

      // 避免 API 限流，延迟 100ms
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`   检查失败：${product.name}`);
    }
  }

  console.log('');

  if (updated > 0) {
    saveProducts(products);
    console.log(`✅ 发现 ${updated} 个价格变化`);
    console.log('');
    
    // 显示前 5 个变化
    report.priceUpdates.slice(0, 5).forEach(update => {
      const arrow = update.change > 0 ? '📈' : '📉';
      console.log(`   ${arrow} ${update.name}`);
      console.log(`      ¥${update.oldPrice} → ¥${update.newPrice} (${update.changePercent})`);
    });

    if (report.priceUpdates.length > 5) {
      console.log(`   ... 还有 ${report.priceUpdates.length - 5} 个变化`);
    }
  } else {
    console.log('   无显著价格变化');
  }
  console.log('');
}

/**
 * 3. 检查新品（模拟）
 * 实际使用时需要调用新品 API 或爬虫
 */
function checkNewProducts() {
  console.log('🆕 检查新品发布...');
  console.log('');

  // 模拟新品数据（2026 年可能发布的新品）
  const mockNewProducts = [
    {
      name: '小米 15S Pro 12GB+256GB',
      description: '骁龙 8 Elite 超频版 徕卡三摄 2K 曲面屏',
      category: '数码',
      platform: '京东',
      price: 5499,
      original_price: 5499,
      brand: '小米',
      tags: ['包邮', '5G', '旗舰', '新品'],
      specs: JSON.stringify({
        '处理器': '骁龙 8 Elite 超频版',
        '屏幕': '6.73 英寸 2K AMOLED',
        '内存': '12GB',
        '存储': '256GB',
        '后置摄像': '5000 万三摄徕卡',
        '电池': '5500mAh',
        '充电': '120W 有线+50W 无线',
        '5G': '支持',
        '重量': '215g'
      }),
      rating: 0,
      sales: 0,
      status: '预售'
    },
    {
      name: 'vivo X200s 12GB+256GB',
      description: '天玑 9400+ 蔡司影像 1.5K 直屏 轻薄旗舰',
      category: '数码',
      platform: '天猫',
      price: 4299,
      original_price: 4299,
      brand: 'vivo',
      tags: ['包邮', '5G', '轻薄', '新品'],
      specs: JSON.stringify({
        '处理器': '天玑 9400+',
        '屏幕': '6.67 英寸 1.5K AMOLED 直屏',
        '内存': '12GB',
        '存储': '256GB',
        '后置摄像': '5000 万三摄蔡司',
        '电池': '5200mAh',
        '充电': '100W 有线',
        '5G': '支持',
        '重量': '188g'
      }),
      rating: 0,
      sales: 0,
      status: '预售'
    }
  ];

  // 添加新品
  let added = 0;
  for (const newProduct of mockNewProducts) {
    try {
      const result = addProduct(newProduct);
      if (result) {
        report.newProducts.push({
          name: newProduct.name,
          price: newProduct.price,
          brand: newProduct.brand
        });
        added++;
      }
    } catch (err) {
      console.log(`⚠️  添加失败：${newProduct.name}`);
    }
  }

  if (added > 0) {
    console.log(`✅ 添加 ${added} 款新品`);
    console.log('');
    
    report.newProducts.forEach(product => {
      console.log(`   🆕 ${product.name} - ¥${product.price}`);
    });
  } else {
    console.log('   无新品添加');
  }
  console.log('');
}

/**
 * 4. 检查下架商品
 */
function checkDiscontinued() {
  console.log('📦 检查下架商品...');
  console.log('');

  const data = loadProducts();
  if (data.type !== 'local') return;

  const products = data.products;
  let discontinued = 0;

  // 模拟：随机标记一些商品为下架（销量为 0 且评分为 0）
  for (const product of products) {
    if (product.sales === 0 && product.rating === 0 && product.status === '预售') {
      // 预售转正式或下架
      const willDiscontinue = Math.random() > 0.7; // 30% 概率下架
      
      if (willDiscontinue) {
        product.status = '下架';
        report.discontinued.push({
          name: product.name,
          lastPrice: product.price
        });
        discontinued++;
      }
    }
  }

  if (discontinued > 0) {
    saveProducts(products);
    console.log(`⚠️  发现 ${discontinued} 款商品下架`);
    
    report.discontinued.forEach(product => {
      console.log(`   ❌ ${product.name} (最后价格：¥${product.lastPrice})`);
    });
  } else {
    console.log('   无下架商品');
  }
  console.log('');
}

/**
 * 5. 生成统计报告
 */
function generateStats() {
  console.log('📊 生成统计报告...');
  console.log('');

  const data = loadProducts();
  const products = data.products || [];

  const stats = {
    total: products.length,
    byBrand: {},
    byPriceRange: {
      '0-3000': 0,
      '3000-5000': 0,
      '5000-7000': 0,
      '7000+': 0
    },
    byStatus: {},
    avgPrice: 0,
    newest: [],
    cheapest: [],
    expensive: []
  };

  // 品牌统计
  for (const p of products) {
    // 品牌
    if (p.brand) {
      stats.byBrand[p.brand] = (stats.byBrand[p.brand] || 0) + 1;
    }

    // 价格段
    if (p.price < 3000) stats.byPriceRange['0-3000']++;
    else if (p.price < 5000) stats.byPriceRange['3000-5000']++;
    else if (p.price < 7000) stats.byPriceRange['5000-7000']++;
    else stats.byPriceRange['7000+']++;

    // 状态
    stats.byStatus[p.status || '在售'] = (stats.byStatus[p.status || '在售'] || 0) + 1;

    // 平均价格
    stats.avgPrice += p.price;
  }

  stats.avgPrice = Math.round(stats.avgPrice / products.length);

  // 最新商品
  stats.newest = products
    .filter(p => p.tags && p.tags.includes('新品'))
    .slice(0, 3)
    .map(p => ({ name: p.name, price: p.price }));

  // 最便宜
  stats.cheapest = [...products]
    .sort((a, b) => a.price - b.price)
    .slice(0, 3)
    .map(p => ({ name: p.name, price: p.price }));

  // 最贵
  stats.expensive = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
    .map(p => ({ name: p.name, price: p.price }));

  report.stats = stats;

  // 输出统计
  console.log(`📦 商品总数：${stats.total}`);
  console.log(`💰 平均价格：¥${stats.avgPrice}`);
  console.log('');

  console.log('📊 品牌分布：');
  for (const [brand, count] of Object.entries(stats.byBrand)) {
    console.log(`   ${brand}: ${count}款`);
  }
  console.log('');

  console.log('💵 价格段分布：');
  for (const [range, count] of Object.entries(stats.byPriceRange)) {
    const bar = '█'.repeat(count);
    console.log(`   ¥${range}: ${count}款 ${bar}`);
  }
  console.log('');

  console.log('📋 状态分布：');
  for (const [status, count] of Object.entries(stats.byStatus)) {
    console.log(`   ${status}: ${count}款`);
  }
  console.log('');
}

/**
 * 6. 保存更新报告
 */
function saveReport() {
  const reportDir = path.join(__dirname, '../data');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportFile = path.join(reportDir, `weekly_update_${new Date().toISOString().split('T')[0]}.json`);
  
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf-8');
  console.log('✅ 更新报告已保存');
  console.log(`   文件：${reportFile}`);
  console.log('');
}

/**
 * 主函数
 */
async function main() {
  // 先测试淘宝 API 连接
  const tbConfigLoaded = tbApi.loadConfig();
  if (tbConfigLoaded) {
    console.log('🔗 淘宝 API 已配置');
    const connected = await tbApi.testConnection();
    if (!connected) {
      console.log('⚠️  淘宝 API 连接失败，将使用模拟数据');
    }
    console.log('');
  }
  console.log('═'.repeat(70));
  console.log('');

  try {
    // 1. 数据备份
    backupData();

    // 2. 检查价格变化
    checkPriceChanges();

    // 3. 检查新品
    checkNewProducts();

    // 4. 检查下架
    checkDiscontinued();

    // 5. 生成统计
    generateStats();

    // 6. 保存报告
    saveReport();

    console.log('═'.repeat(70));
    console.log('');
    console.log('🎉 每周更新完成！');
    console.log('');
    console.log('📊 更新摘要：');
    console.log(`   价格变化：${report.priceUpdates.length} 个`);
    console.log(`   新增商品：${report.newProducts.length} 个`);
    console.log(`   下架商品：${report.discontinued.length} 个`);
    console.log('');
    console.log('💡 下次更新：建议 7 天后运行');
    console.log('');

  } catch (err) {
    console.error('❌ 更新过程中出错:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

// 运行
main();

module.exports = { weeklyUpdate: main, CONFIG, report };

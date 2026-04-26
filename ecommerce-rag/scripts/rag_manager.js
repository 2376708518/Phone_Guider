#!/usr/bin/env node

/**
 * 电商商品 RAG 库管理
 * 支持飞书多维表格和本地 JSON 两种存储方式
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG_PATH = path.join(__dirname, '../references/config.json');
const DATA_PATH = path.join(__dirname, '../references/products.json');

// 商品分类
const CATEGORIES = ['数码', '服饰', '家居', '食品', '美妆', '母婴', '图书', '运动', '其他'];

// 平台列表
const PLATFORMS = ['淘宝', '京东', '拼多多', '抖音', '快手', '小红书', '其他'];

/**
 * 加载配置
 */
function loadConfig() {
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return {
      rag: {
        type: 'local',
        data_file: DATA_PATH,
        max_items: 10000
      }
    };
  }
}

/**
 * 加载商品数据
 */
function loadProducts() {
  const config = loadConfig();
  
  if (config.rag.type === 'feishu_bitable') {
    // TODO: 调用飞书多维表格 API
    console.log('📊 使用飞书多维表格存储');
    return { type: 'bitable', app_token: config.rag.app_token };
  } else {
    // 本地 JSON 存储
    try {
      const content = fs.readFileSync(config.rag.data_file || DATA_PATH, 'utf-8');
      const products = JSON.parse(content);
      console.log(`📊 使用本地存储，当前商品数：${products.length}`);
      return { type: 'local', products };
    } catch (err) {
      console.log('📊 本地存储为空，创建新文件');
      return { type: 'local', products: [] };
    }
  }
}

/**
 * 保存商品数据
 */
function saveProducts(products) {
  const config = loadConfig();
  const dataFile = config.rag.data_file || DATA_PATH;
  
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`💾 已保存 ${products.length} 个商品`);
}

/**
 * 生成商品 ID
 */
function generateProductId(name, platform) {
  const timestamp = Date.now();
  const hash = Buffer.from(`${name}-${platform}-${timestamp}`).toString('base64').substring(0, 8);
  return `prod_${hash}`;
}

/**
 * 添加商品
 */
function addProduct(product) {
  const data = loadProducts();
  
  if (data.type !== 'local') {
    console.log('⚠️  当前仅支持本地存储模式');
    return null;
  }

  // 检查重复
  const exists = data.products.find(p => 
    p.name === product.name && p.platform === product.platform
  );

  if (exists) {
    console.log(`⚠️  商品已存在：${product.name} (${product.platform})`);
    return exists;
  }

  // 创建商品记录
  const newProduct = {
    product_id: generateProductId(product.name, product.platform),
    name: product.name || '',
    description: product.description || '',
    category: product.category || guessCategory(product.name),
    platform: product.platform || '其他',
    price: parseFloat(product.price) || 0,
    original_price: parseFloat(product.original_price) || 0,
    currency: product.currency || 'CNY',
    image_url: product.image_url || '',
    product_url: product.product_url || '',
    affiliate_url: product.affiliate_url || '',
    sales: parseInt(product.sales) || 0,
    rating: parseFloat(product.rating) || 0,
    tags: product.tags || [],
    brand: product.brand || '',
    specs: product.specs || '',
    created_time: new Date().toISOString(),
    updated_time: new Date().toISOString(),
    last_checked: new Date().toISOString(),
    status: product.status || '在售'
  };

  data.products.push(newProduct);
  saveProducts(data.products);

  console.log(`✅ 商品已添加：${newProduct.name}`);
  console.log(`   ID: ${newProduct.product_id}`);
  console.log(`   价格：¥${newProduct.price}`);
  console.log(`   分类：${newProduct.category}`);

  return newProduct;
}

/**
 * 批量添加商品
 */
function addProducts(products) {
  console.log(`📦 批量导入 ${products.length} 个商品...`);
  
  const results = {
    success: 0,
    duplicate: 0,
    failed: 0
  };

  for (const product of products) {
    try {
      const result = addProduct(product);
      if (result) {
        results.success++;
      } else {
        results.failed++;
      }
    } catch (err) {
      console.error(`❌ 导入失败：${product.name} - ${err.message}`);
      results.failed++;
    }
  }

  console.log(`\n📊 导入完成：成功 ${results.success}, 重复 ${results.duplicate}, 失败 ${results.failed}`);
  return results;
}

/**
 * 搜索商品
 */
function searchProducts(options = {}) {
  const data = loadProducts();
  
  if (data.type !== 'local') {
    console.log('⚠️  当前仅支持本地存储模式');
    return [];
  }

  let results = data.products;

  // 关键词搜索
  if (options.keyword) {
    const keyword = options.keyword.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.brand.toLowerCase().includes(keyword)
    );
  }

  // 分类筛选
  if (options.category) {
    results = results.filter(p => p.category === options.category);
  }

  // 平台筛选
  if (options.platform) {
    results = results.filter(p => p.platform === options.platform);
  }

  // 价格区间
  if (options.min_price) {
    results = results.filter(p => p.price >= options.min_price);
  }
  if (options.max_price) {
    results = results.filter(p => p.price <= options.max_price);
  }

  // 标签筛选
  if (options.tags && options.tags.length > 0) {
    results = results.filter(p => 
      options.tags.some(tag => p.tags.includes(tag))
    );
  }

  // 状态筛选
  if (options.status) {
    results = results.filter(p => p.status === options.status);
  }

  // 排序
  if (options.sort_by) {
    const field = options.sort_by;
    const desc = options.sort_order === 'desc';
    results.sort((a, b) => {
      if (a[field] < b[field]) return desc ? 1 : -1;
      if (a[field] > b[field]) return desc ? -1 : 1;
      return 0;
    });
  }

  // 限制数量
  if (options.limit) {
    results = results.slice(0, options.limit);
  }

  console.log(`🔍 找到 ${results.length} 个商品`);
  return results;
}

/**
 * 根据商品名称猜测分类
 */
function guessCategory(name) {
  const nameLower = name.toLowerCase();
  
  const keywords = {
    '数码': ['手机', '电脑', '耳机', '相机', '智能', '电子', '数码', '充电', '电池'],
    '服饰': ['衣服', '鞋', '包', '服装', '外套', '裤子', '裙子', '内衣'],
    '家居': ['家具', '家装', '收纳', '清洁', '厨具', '灯具', '家纺'],
    '食品': ['零食', '饮料', '茶叶', '咖啡', '坚果', '饼干', '糖果'],
    '美妆': ['护肤', '化妆', '面膜', '口红', '香水', '美容'],
    '母婴': ['婴儿', '儿童', '玩具', '奶粉', '尿不湿'],
    '图书': ['书', '教材', '小说', '漫画'],
    '运动': ['运动', '健身', '户外', '跑步', '瑜伽']
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => nameLower.includes(word))) {
      return category;
    }
  }

  return '其他';
}

/**
 * 获取统计信息
 */
function getStats() {
  const data = loadProducts();
  
  if (data.type !== 'local') {
    return { error: '仅支持本地存储模式' };
  }

  const products = data.products;
  
  const stats = {
    total: products.length,
    by_category: {},
    by_platform: {},
    by_status: {},
    price_range: { min: Infinity, max: 0, avg: 0 },
    tags: {}
  };

  let priceSum = 0;

  for (const p of products) {
    // 分类统计
    stats.by_category[p.category] = (stats.by_category[p.category] || 0) + 1;
    
    // 平台统计
    stats.by_platform[p.platform] = (stats.by_platform[p.platform] || 0) + 1;
    
    // 状态统计
    stats.by_status[p.status] = (stats.by_status[p.status] || 0) + 1;
    
    // 价格统计
    if (p.price > 0) {
      stats.price_range.min = Math.min(stats.price_range.min, p.price);
      stats.price_range.max = Math.max(stats.price_range.max, p.price);
      priceSum += p.price;
    }

    // 标签统计
    for (const tag of p.tags) {
      stats.tags[tag] = (stats.tags[tag] || 0) + 1;
    }
  }

  if (products.length > 0) {
    stats.price_range.avg = priceSum / products.length;
  }
  
  if (stats.price_range.min === Infinity) {
    stats.price_range.min = 0;
  }

  return stats;
}

/**
 * 更新商品价格
 */
function updatePrice(productId, newPrice) {
  const data = loadProducts();
  
  if (data.type !== 'local') {
    return null;
  }

  const product = data.products.find(p => p.product_id === productId);
  
  if (!product) {
    console.log(`❌ 商品不存在：${productId}`);
    return null;
  }

  const oldPrice = product.price;
  product.price = parseFloat(newPrice);
  product.updated_time = new Date().toISOString();
  product.last_checked = new Date().toISOString();

  // 记录价格历史
  recordPriceHistory(product, oldPrice);

  saveProducts(data.products);

  const change = newPrice - oldPrice;
  const changePercent = ((change / oldPrice) * 100).toFixed(2);
  const arrow = change > 0 ? '📈' : change < 0 ? '📉' : '➡️';

  console.log(`${arrow} 价格更新：${product.name}`);
  console.log(`   旧价格：¥${oldPrice}`);
  console.log(`   新价格：¥${newPrice}`);
  console.log(`   变化：${change > 0 ? '+' : ''}${change} (${changePercent}%)`);

  return product;
}

/**
 * 记录价格历史
 */
function recordPriceHistory(product, oldPrice) {
  const historyDir = path.join(__dirname, '../data/price_history');
  const historyFile = path.join(historyDir, `${product.product_id}.json`);

  // 确保目录存在
  if (!fs.existsSync(historyDir)) {
    fs.mkdirSync(historyDir, { recursive: true });
  }

  // 加载历史记录
  let history = [];
  try {
    const content = fs.readFileSync(historyFile, 'utf-8');
    history = JSON.parse(content);
  } catch (err) {
    // 文件不存在，创建新记录
  }

  // 添加新记录
  history.push({
    price: oldPrice,
    recorded_at: new Date().toISOString(),
    platform: product.platform
  });

  // 保存（只保留最近 100 条）
  if (history.length > 100) {
    history = history.slice(-100);
  }

  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2), 'utf-8');
}

/**
 * 导出商品数据
 */
function exportProducts(format = 'json', outputFile) {
  const data = loadProducts();
  
  if (data.type !== 'local') {
    console.log('⚠️  当前仅支持本地存储模式');
    return;
  }

  const output = outputFile || path.join(__dirname, `../data/export_${Date.now()}.${format}`);

  if (format === 'json') {
    fs.writeFileSync(output, JSON.stringify(data.products, null, 2), 'utf-8');
  } else if (format === 'csv') {
    const csv = convertToCSV(data.products);
    fs.writeFileSync(output, csv, 'utf-8');
  }

  console.log(`📤 已导出到：${output}`);
  return output;
}

/**
 * 转换为 CSV 格式
 */
function convertToCSV(products) {
  const headers = ['product_id', 'name', 'category', 'platform', 'price', 'brand', 'tags', 'status', 'product_url'];
  const lines = [headers.join(',')];

  for (const p of products) {
    const row = headers.map(h => {
      const value = p[h] || '';
      const str = Array.isArray(value) ? value.join('|') : String(value);
      return `"${str.replace(/"/g, '""')}"`;
    });
    lines.push(row.join(','));
  }

  return lines.join('\n');
}

// CLI 入口
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      // 示例：node rag_manager.js add '{"name":"测试商品","price":99,"category":"数码"}'
      const product = JSON.parse(args[1] || '{}');
      addProduct(product);
      break;

    case 'search':
      const options = {};
      args.slice(1).forEach(arg => {
        if (arg.startsWith('--keyword=')) options.keyword = arg.split('=')[1];
        if (arg.startsWith('--category=')) options.category = arg.split('=')[1];
        if (arg.startsWith('--platform=')) options.platform = arg.split('=')[1];
        if (arg.startsWith('--max_price=')) options.max_price = parseFloat(arg.split('=')[1]);
        if (arg.startsWith('--limit=')) options.limit = parseInt(arg.split('=')[1]);
      });
      const results = searchProducts(options);
      console.log(JSON.stringify(results, null, 2));
      break;

    case 'stats':
      const stats = getStats();
      console.log('📊 商品库统计');
      console.log('═'.repeat(40));
      console.log(`总商品数：${stats.total}`);
      console.log(`分类分布：${JSON.stringify(stats.by_category)}`);
      console.log(`平台分布：${JSON.stringify(stats.by_platform)}`);
      console.log(`价格范围：¥${stats.price_range.min} - ¥${stats.price_range.max} (平均 ¥${stats.price_range.avg.toFixed(2)})`);
      break;

    case 'export':
      const format = args.find(a => a.startsWith('--format='))?.split('=')[1] || 'json';
      const output = args.find(a => a.startsWith('--output='))?.split('=')[1];
      exportProducts(format, output);
      break;

    default:
      console.log('用法: node rag_manager.js <command> [options]');
      console.log('命令:');
      console.log('  add <json>     添加商品');
      console.log('  search [opts]  搜索商品');
      console.log('  stats          查看统计');
      console.log('  export         导出数据');
  }
}

module.exports = {
  addProduct,
  addProducts,
  searchProducts,
  updatePrice,
  getStats,
  exportProducts,
  loadProducts,
  saveProducts
};

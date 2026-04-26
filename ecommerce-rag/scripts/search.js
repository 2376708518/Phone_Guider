#!/usr/bin/env node

/**
 * 商品搜索脚本 - 集成 RAG 库
 * 优先从 RAG 库检索，未找到时再实时搜索
 */

const { searchProducts: searchRag, addProduct, loadProducts } = require('./rag_manager.js');
const { searchProduct: searchLive } = require('../../ecommerce-guide/scripts/search.js');

/**
 * 智能搜索
 * 1. 先查 RAG 库
 * 2. 如果结果少，补充实时搜索
 * 3. 新商品自动入库
 */
async function smartSearch(keyword, options = {}) {
  const {
    fromRag = true,
    fromLive = true,
    minRagResults = 3,
    limit = 10
  } = options;

  console.log(`🔍 智能搜索：${keyword}`);
  console.log('');

  const results = {
    keyword,
    timestamp: new Date().toISOString(),
    fromRag: [],
    fromLive: [],
    total: 0
  };

  // 1. 从 RAG 库搜索
  if (fromRag) {
    console.log('📚 检索 RAG 库...');
    const ragResults = searchRag({
      keyword,
      limit: limit
    });

    results.fromRag = ragResults.map(p => ({
      ...p,
      source: 'rag'
    }));

    console.log(`   找到 ${results.fromRag.length} 个商品`);
  }

  // 2. 如果 RAG 结果不足，补充实时搜索
  if (fromLive && results.fromRag.length < minRagResults) {
    const needMore = limit - results.fromRag.length;
    console.log(`📡 RAG 结果不足，补充实时搜索...`);

    const liveResults = await searchLive(keyword, 'all', needMore);
    
    for (const platformResult of liveResults) {
      for (const item of platformResult.items) {
        results.fromLive.push({
          ...item,
          source: 'live',
          platform: platformResult.platform
        });

        // 自动入库（可选）
        if (options.autoSave) {
          try {
            addProduct({
              name: item.title,
              price: parseFloat(item.price.replace('¥', '')),
              platform: platformResult.platform,
              product_url: item.url,
              category: guessCategory(item.title)
            });
          } catch (err) {
            // 忽略入库错误
          }
        }
      }
    }

    console.log(`   找到 ${results.fromLive.length} 个新商品`);
  }

  results.total = results.fromRag.length + results.fromLive.length;
  console.log(`\n✅ 共找到 ${results.total} 个商品`);

  return results;
}

/**
 * 根据商品名称猜测分类
 */
function guessCategory(name) {
  const nameLower = name.toLowerCase();
  
  const keywords = {
    '数码': ['手机', '电脑', '耳机', '相机', '智能', '电子', '数码'],
    '服饰': ['衣服', '鞋', '包', '服装', '外套', '裤子'],
    '家居': ['家具', '家装', '收纳', '清洁', '厨具'],
    '食品': ['零食', '饮料', '茶叶', '咖啡', '坚果'],
    '美妆': ['护肤', '化妆', '面膜', '口红', '香水']
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => nameLower.includes(word))) {
      return category;
    }
  }

  return '其他';
}

/**
 * 格式化输出搜索结果
 */
function formatResults(results) {
  let output = '';

  if (results.fromRag.length > 0) {
    output += '\n📚【RAG 库商品】\n';
    output += '─'.repeat(50) + '\n';

    results.fromRag.forEach((item, idx) => {
      output += `${idx + 1}. ${item.name}\n`;
      output += `   💰 ¥${item.price}  |  📦 ${item.platform}  |  📊 ${item.sales}+  sold\n`;
      output += `   ⭐ ${item.rating}  |  🏷️ ${item.tags.join(', ')}\n`;
      output += `   🔗 ${item.product_url}\n\n`;
    });
  }

  if (results.fromLive.length > 0) {
    output += '\n📡【实时搜索】\n';
    output += '─'.repeat(50) + '\n';

    results.fromLive.forEach((item, idx) => {
      output += `${idx + 1}. ${item.title}\n`;
      output += `   💰 ${item.price}  |  📦 ${item.platform}\n`;
      output += `   🔗 ${item.url}\n`;
      output += `   🆕 新发现\n\n`;
    });
  }

  return output;
}

// CLI 入口
if (require.main === module) {
  const args = process.argv.slice(2);
  const keyword = args.find(a => !a.startsWith('--')) || '商品';
  
  const options = {
    fromRag: !args.includes('--no-rag'),
    fromLive: !args.includes('--no-live'),
    autoSave: args.includes('--auto-save'),
    limit: parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1]) || 10
  };

  smartSearch(keyword, options)
    .then(results => {
      console.log(formatResults(results));
    })
    .catch(err => {
      console.error('搜索出错:', err.message);
      process.exit(1);
    });
}

module.exports = { smartSearch, formatResults };

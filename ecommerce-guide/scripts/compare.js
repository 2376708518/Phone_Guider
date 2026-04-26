#!/usr/bin/env node

/**
 * 价格比较脚本
 * 跨平台比较同一商品的价格
 */

const { searchProduct, formatResults } = require('./search.js');

/**
 * 比较商品价格
 * @param {string} keyword - 商品关键词
 */
async function comparePrices(keyword) {
  console.log(`💹 正在比价：${keyword}`);
  console.log('');

  // 在所有平台搜索
  const results = await searchProduct(keyword, 'all', 3);

  // 整理比价信息
  const comparison = {
    keyword,
    timestamp: new Date().toISOString(),
    platforms: {}
  };

  let lowestPrice = Infinity;
  let bestDeal = null;

  for (const result of results) {
    const platform = result.platform;
    const items = result.items;

    if (items.length > 0) {
      const cheapest = items.reduce((min, item) => {
        const price = parseFloat(item.price.replace('¥', ''));
        return price < min.price ? { ...item, priceNum: price } : min;
      }, { priceNum: Infinity });

      comparison.platforms[platform] = {
        cheapest: cheapest.title,
        price: cheapest.price,
        priceNum: cheapest.priceNum,
        url: cheapest.url
      };

      if (cheapest.priceNum < lowestPrice) {
        lowestPrice = cheapest.priceNum;
        bestDeal = {
          platform,
          ...cheapest
        };
      }
    }
  }

  // 输出比价结果
  console.log('📊 比价结果');
  console.log('═'.repeat(60));
  console.log(`商品：${keyword}`);
  console.log(`时间：${new Date().toLocaleString('zh-CN')}`);
  console.log('');

  for (const [platform, info] of Object.entries(comparison.platforms)) {
    const platformNames = { taobao: '淘宝', jd: '京东', pdd: '拼多多' };
    const name = platformNames[platform] || platform;
    const isBest = bestDeal?.platform === platform ? ' ⭐ 最低价' : '';
    console.log(`${name}: ${info.price}  ${isBest}`);
    console.log(`  → ${info.cheapest}`);
    console.log(`  → ${info.url}`);
    console.log('');
  }

  if (bestDeal) {
    const platformNames = { taobao: '淘宝', jd: '京东', pdd: '拼多多' };
    console.log('═'.repeat(60));
    console.log(`🏆 推荐购买：${platformNames[bestDeal.platform]} - ${bestDeal.price}`);
    console.log(`   ${bestDeal.title}`);
    console.log(`   ${bestDeal.url}`);
  }

  return comparison;
}

// CLI 入口
if (require.main === module) {
  const args = process.argv.slice(2);
  const keyword = args.find(a => !a.startsWith('--')) || '商品';

  comparePrices(keyword)
    .then(() => process.exit(0))
    .catch(err => {
      console.error('比价出错:', err.message);
      process.exit(1);
    });
}

module.exports = { comparePrices };

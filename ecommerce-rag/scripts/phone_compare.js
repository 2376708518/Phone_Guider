#!/usr/bin/env node

/**
 * 手机品牌价格对比
 * 按品牌统计价格区间和推荐机型
 */

const { searchProducts, getStats } = require('./rag_manager.js');

// 主流手机品牌
const BRANDS = ['Apple', '小米', '华为', 'OPPO', 'vivo', '荣耀', '三星', '一加', 'iQOO', 'realme'];

console.log('📱 手机品牌价格对比分析');
console.log('═'.repeat(70));
console.log('');

const brandStats = {};

for (const brand of BRANDS) {
  const phones = searchProducts({ 
    keyword: brand,
    limit: 100 
  });

  if (phones.length === 0) continue;

  const prices = phones.map(p => p.price).filter(p => p > 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  // 找最便宜的机型
  const cheapest = phones.reduce((min, p) => p.price < min.price ? p : min, phones[0]);
  // 找最贵的机型
  const expensive = phones.reduce((max, p) => p.price > max.price ? p : max, phones[0]);
  // 找评分最高的
  const bestRated = phones.reduce((best, p) => p.rating > best.rating ? p : best, phones[0]);

  brandStats[brand] = {
    count: phones.length,
    minPrice,
    maxPrice,
    avgPrice,
    cheapest,
    expensive,
    bestRated
  };
}

// 输出统计
for (const [brand, stats] of Object.entries(brandStats)) {
  console.log(`📱 ${brand}`);
  console.log('─'.repeat(70));
  console.log(`   机型数量：${stats.count} 款`);
  console.log(`   价格区间：¥${stats.minPrice} - ¥${stats.maxPrice}`);
  console.log(`   平均价格：¥${Math.round(stats.avgPrice)}`);
  console.log('');
  console.log(`   💰 最便宜：${stats.cheapest.name} (¥${stats.cheapest.price})`);
  console.log(`   💎 最旗舰：${stats.expensive.name} (¥${stats.expensive.price})`);
  console.log(`   ⭐ 评分最高：${stats.bestRated.name} (评分${stats.bestRated.rating})`);
  console.log('');
}

// 价格段分析
console.log('═'.repeat(70));
console.log('📊 价格段分布');
console.log('═'.repeat(70));

const allPhones = searchProducts({ limit: 1000 });
const priceRanges = {
  '¥2000 以下': 0,
  '¥2000-3000': 0,
  '¥3000-4000': 0,
  '¥4000-5000': 0,
  '¥5000-7000': 0,
  '¥7000-10000': 0,
  '¥10000 以上': 0
};

for (const phone of allPhones) {
  const price = phone.price;
  if (price < 2000) priceRanges['¥2000 以下']++;
  else if (price < 3000) priceRanges['¥2000-3000']++;
  else if (price < 4000) priceRanges['¥3000-4000']++;
  else if (price < 5000) priceRanges['¥4000-5000']++;
  else if (price < 7000) priceRanges['¥5000-7000']++;
  else if (price < 10000) priceRanges['¥7000-10000']++;
  else priceRanges['¥10000 以上']++;
}

for (const [range, count] of Object.entries(priceRanges)) {
  const bar = '█'.repeat(Math.round(count / 2));
  console.log(`${range.padEnd(12)} ${count.toString().padStart(3)} 款 ${bar}`);
}

console.log('');
console.log('═'.repeat(70));
console.log('💡 购买建议');
console.log('═'.repeat(70));
console.log('');

// 各价位推荐
const recommendations = {
  '性价比 (¥2000-3000)': allPhones
    .filter(p => p.price >= 2000 && p.price < 3000)
    .sort((a, b) => b.rating - a.rating)[0],
  '中高端 (¥3000-5000)': allPhones
    .filter(p => p.price >= 3000 && p.price < 5000)
    .sort((a, b) => b.rating - a.rating)[0],
  '旗舰 (¥5000-8000)': allPhones
    .filter(p => p.price >= 5000 && p.price < 8000)
    .sort((a, b) => b.rating - a.rating)[0],
  '顶级旗舰 (¥8000+)': allPhones
    .filter(p => p.price >= 8000)
    .sort((a, b) => b.rating - a.rating)[0]
};

for (const [category, phone] of Object.entries(recommendations)) {
  if (phone) {
    console.log(`${category}:`);
    console.log(`  → ${phone.name}`);
    console.log(`     ¥${phone.price} | 评分${phone.rating} | ${phone.brand}`);
    console.log(`     ${phone.description}`);
    console.log('');
  }
}

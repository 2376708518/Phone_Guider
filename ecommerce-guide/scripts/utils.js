#!/usr/bin/env node

/**
 * 工具函数
 */

const fs = require('fs');
const path = require('path');

/**
 * 加载配置文件
 */
function loadConfig() {
  const configPath = path.join(__dirname, '../references/config.json');
  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.warn('⚠️  配置文件不存在或格式错误，使用默认配置');
    return {
      taobao: { enabled: false },
      jd: { enabled: false },
      pdd: { enabled: false },
      settings: {
        default_platform: 'all',
        default_limit: 5
      }
    };
  }
}

/**
 * 检查 API 是否已配置
 */
function isApiConfigured(platform) {
  const config = loadConfig();
  const platformConfig = config[platform];
  
  if (!platformConfig || !platformConfig.enabled) {
    return false;
  }

  // 检查必要字段
  if (platform === 'taobao') {
    return !!(platformConfig.app_key && platformConfig.app_secret);
  } else if (platform === 'jd') {
    return !!(platformConfig.app_key && platformConfig.app_secret);
  } else if (platform === 'pdd') {
    return !!(platformConfig.client_id && platformConfig.client_secret);
  }

  return false;
}

/**
 * 格式化价格
 */
function formatPrice(price) {
  const num = parseFloat(price);
  if (isNaN(num)) return '¥0.00';
  return `¥${num.toFixed(2)}`;
}

/**
 * 格式化销量
 */
function formatSales(sales) {
  const num = parseInt(sales);
  if (isNaN(num)) return '未知';
  
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万+`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}千+`;
  }
  return `${num}+`;
}

/**
 * 延迟函数
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 生成推广链接 (需要配置 API 后实现)
 */
function generateAffiliateLink(platform, originalUrl, config) {
  // TODO: 根据各平台 API 生成推广链接
  // 目前返回原始链接
  return originalUrl;
}

module.exports = {
  loadConfig,
  isApiConfigured,
  formatPrice,
  formatSales,
  delay,
  generateAffiliateLink
};

#!/usr/bin/env node

/**
 * 参数形象化解释器
 * 把技术参数翻译成生活场景
 */

// 参数解释映射表
const paramExplainer = {
  
  // ============ 处理器 ============
  processor: {
    '骁龙 8 Elite': {
      level: '顶级',
      desc: '2026 年最强安卓芯片',
      daily: '原神最高画质稳定 60 帧，玩 3 小时只微热',
      compare: '比 iPhone 16 的 A18 略强，日常使用感觉不到差别'
    },
    '骁龙 8Gen3': {
      level: '旗舰',
      desc: '2024-2025 旗舰标配',
      daily: '原神高画质 60 帧，王者荣耀 120 帧满跑',
      compare: '性能过剩，用 3 年不卡'
    },
    '骁龙 8Gen2': {
      level: '次旗舰',
      desc: '2023 旗舰，性价比之选',
      daily: '原神中高画质流畅，日常使用完全够用',
      compare: '比 8Gen3 弱 15%，但价格便宜 1000+'
    },
    '天玑 9400': {
      level: '旗舰',
      desc: '联发科旗舰，省电强',
      daily: '性能和 8Gen3 相当，续航更好',
      compare: '打游戏略弱于骁龙，日常使用更省电'
    },
    '天玑 9300': {
      level: '次旗舰',
      desc: '2024 旗舰，性价比高',
      daily: '原神高画质流畅，拍照不错',
      compare: '比 8Gen3 弱 10%，价格更便宜'
    },
    'A18 Pro': {
      level: '顶级',
      desc: '苹果最强芯片',
      daily: 'iOS 优化好，用 5 年不卡',
      compare: '单核最强，但安卓游戏优化更好'
    },
    'A18': {
      level: '旗舰',
      desc: '苹果标准版芯片',
      daily: '日常使用流畅，游戏略弱于 Pro',
      compare: '比 A18 Pro 弱 20%，但够用'
    },
    'A16 仿生': {
      level: '旗舰',
      desc: 'iPhone 15/14 Pro 芯片',
      daily: '日常使用流畅，用 4 年没问题',
      compare: '相当于安卓 8Gen2 水平'
    },
    'A15 仿生': {
      level: '次旗舰',
      desc: 'iPhone 14 标准版芯片',
      daily: '日常够用，大型游戏略吃力',
      compare: '相当于安卓 8Gen1 水平'
    },
    '麒麟 9100': {
      level: '旗舰',
      desc: '华为自研旗舰芯片',
      daily: '鸿蒙优化好，日常流畅',
      compare: '性能约等于 8Gen2，但鸿蒙流畅'
    },
    '麒麟 9000S': {
      level: '次旗舰',
      desc: '华为自研，5G 回归',
      daily: '日常够用，大型游戏一般',
      compare: '约等于 8Gen1，鸿蒙加持流畅'
    }
  },

  // ============ 屏幕 ============
  screen: {
    '2K': {
      desc: '超高清',
      daily: '看文字非常清晰，像印刷品一样',
      compare: '比 1.5K 细腻 30%，但更费电'
    },
    '1.5K': {
      desc: '高清',
      daily: '日常使用很清晰，性价比最高',
      compare: '清晰度接近 2K，但更省电'
    },
    '1080P': {
      desc: '标准',
      daily: '够用，但细看有颗粒感',
      compare: '2K 的一半清晰度'
    },
    '6.9 英寸': {
      desc: '超大屏',
      daily: '比 iPhone 16 Pro Max 还大，看视频爽',
      compare: '单手操作困难，适合双手使用'
    },
    '6.7-6.8 英寸': {
      desc: '大屏',
      daily: '主流旗舰尺寸，看视频舒服',
      compare: '和 iPhone Pro Max 一样大'
    },
    '6.3-6.4 英寸': {
      desc: '小屏',
      daily: '单手能操作，放口袋不鼓',
      compare: '和 iPhone 标准版一样大'
    },
    'AMOLED': {
      desc: 'OLED 屏幕',
      daily: '黑色纯黑，色彩鲜艳，省电',
      compare: '比 LCD 好很多，现在旗舰都用这个'
    }
  },

  // ============ 电池 ============
  battery: {
    '6000mAh 以上': {
      desc: '超大电池',
      daily: '重度使用一天半，轻度两天',
      scenario: '刷抖音 15 小时/打游戏 8 小时/待机 3 天',
      charge: '两天一充没问题'
    },
    '5500-6000mAh': {
      desc: '大电池',
      daily: '重度使用一天，轻度一天半',
      scenario: '刷抖音 12 小时/打游戏 6 小时/待机 2 天',
      charge: '一天一充，晚上睡觉充'
    },
    '5000-5500mAh': {
      desc: '标准大电池',
      daily: '正常使用一天',
      scenario: '刷抖音 10 小时/打游戏 5 小时/待机 1.5 天',
      charge: '一天一充'
    },
    '4500-5000mAh': {
      desc: '标准电池',
      daily: '中度使用一天，重度需要中途充电',
      scenario: '刷抖音 8 小时/打游戏 4 小时/待机 1 天',
      charge: '一天一充，晚上充'
    },
    '4000-4500mAh': {
      desc: '小电池',
      daily: '轻度使用一天，重度不够用',
      scenario: '刷抖音 6 小时/打游戏 3 小时',
      charge: '可能需要一天两充'
    },
    '4000mAh 以下': {
      desc: '很小电池',
      daily: '轻度使用勉强一天',
      scenario: '刷抖音 4 小时/打游戏 2 小时',
      charge: '一天两充'
    }
  },

  // ============ 充电 ============
  charging: {
    '200W': {
      desc: '极速充电',
      daily: '10 分钟充满，洗脸刷牙的功夫',
      compare: '目前最快，但电池寿命可能受影响'
    },
    '120W': {
      desc: '超快充电',
      daily: '15-20 分钟充满，很快',
      compare: '比苹果快 5 倍，早上起床再充也来得及'
    },
    '90W': {
      desc: '快速充电',
      daily: '25-30 分钟充满',
      compare: '比 120W 慢一点，但已经很快了'
    },
    '67W': {
      desc: '较快充电',
      daily: '35-40 分钟充满',
      compare: '主流水平，够用'
    },
    '27W 及以下': {
      desc: '慢充电',
      daily: '1 小时以上充满',
      compare: '苹果和三星比较慢，建议晚上充'
    }
  },

  // ============ 摄像 ============
  camera: {
    '2 亿像素': {
      desc: '超高像素',
      daily: '照片放大看细节很清晰，可以裁剪二次构图',
      compare: '像素最高，但不代表拍照最好'
    },
    '5000 万像素': {
      desc: '主流旗舰',
      daily: '日常拍照很清晰，发朋友圈够用',
      compare: '和 2 亿像素日常看不出区别'
    },
    '徕卡': {
      desc: '徕卡色彩调校',
      daily: '拍照有德味，色彩浓郁，拍食物有食欲',
      compare: '小米专属，拍照有特色'
    },
    '蔡司': {
      desc: '蔡司光学 + 色彩',
      daily: '人像模式好，肤色自然，夜景清晰',
      compare: 'vivo 专属，拍照偏真实'
    },
    '哈苏': {
      desc: '哈苏色彩',
      daily: '色彩自然，拍风景好看',
      compare: 'OPPO/一加专属'
    },
    'XMAGE': {
      desc: '华为自研影像',
      daily: '拍照清晰，色彩鲜艳',
      compare: '华为专属，拍照第一梯队'
    },
    '潜望长焦': {
      desc: '远距离拍摄',
      daily: '拍远处物体清晰，看演唱会神器',
      compare: '有比没有好很多'
    },
    'OIS 光学防抖': {
      desc: '防抖',
      daily: '拍照不容易糊，拍视频更稳',
      compare: '有这个比没有好'
    }
  },

  // ============ 内存 ============
  ram: {
    '16GB': {
      desc: '超大内存',
      daily: '同时开 20 个 APP 不杀后台，用 4 年不卡',
      compare: '目前安卓旗舰标配'
    },
    '12GB': {
      desc: '大内存',
      daily: '同时开 15 个 APP 不杀后台，用 3 年没问题',
      compare: '主流旗舰水平，够用'
    },
    '8GB': {
      desc: '标准内存',
      daily: '同时开 10 个 APP，日常够用',
      compare: '苹果够用，安卓略紧张'
    },
    '6GB': {
      desc: '小内存',
      daily: '同时开 5-6 个 APP，可能会杀后台',
      compare: '2026 年有点紧张'
    }
  },

  // ============ 存储 ============
  storage: {
    '512GB': {
      desc: '大存储',
      daily: '能存 5 万张照片/100 部高清电影/50 个大型游戏',
      compare: '用 3 年不担心空间'
    },
    '256GB': {
      desc: '标准存储',
      daily: '能存 2 万张照片/50 部电影/30 个游戏',
      compare: '主流选择，够用'
    },
    '128GB': {
      desc: '小存储',
      daily: '能存 1 万张照片/20 部电影/15 个游戏',
      compare: '需要定期清理，建议 256GB 起步'
    }
  },

  // ============ 5G ============
  network: {
    '5G': {
      desc: '5G 网络',
      daily: '下载速度 100MB/s+，在线看 4K 不卡',
      compare: '现在标配，必须支持'
    },
    '4G': {
      desc: '4G 网络',
      daily: '下载速度 10-50MB/s，日常够用',
      compare: '2026 年有点落后，但便宜'
    }
  },

  // ============ 重量 ============
  weight: {
    '220g 以上': {
      desc: '很重',
      daily: '长时间拿手酸，放裤兜下沉',
      compare: '旗舰机普遍较重'
    },
    '200-220g': {
      desc: '标准重量',
      daily: '正常手感，不算重',
      compare: '主流旗舰重量'
    },
    '190-200g': {
      desc: '较轻',
      daily: '手感不错，长时间拿不累',
      compare: '比同尺寸手机轻'
    },
    '190g 以下': {
      desc: '很轻',
      daily: '手感很好，单手操作轻松',
      compare: '小屏手机优势'
    }
  }
};

/**
 * 解释参数
 */
function explainParam(type, value) {
  const explainer = paramExplainer[type];
  if (!explainer) return null;

  // 精确匹配
  if (explainer[value]) {
    return explainer[value];
  }

  // 模糊匹配
  for (const [key, info] of Object.entries(explainer)) {
    if (value.includes(key) || key.includes(value)) {
      return info;
    }
  }

  return null;
}

/**
 * 格式化手机推荐（带参数解释）
 */
function formatPhoneWithExplanation(phone) {
  let output = `\n📱 **${phone.name}**\n`;
  output += `💰 价格：¥${phone.price}`;
  if (phone.original_price > phone.price) {
    output += ` (省¥${phone.original_price - phone.price})`;
  }
  output += `\n`;
  output += `⭐ 评分：${phone.rating} | 📊 销量：${phone.sales}+\n\n`;

  // 解析 specs
  let specs = {};
  try {
    specs = JSON.parse(phone.specs || '{}');
  } catch (e) {}

  // 处理器
  if (specs['处理器']) {
    const exp = explainParam('processor', specs['处理器']);
    if (exp) {
      output += `🚀 处理器：${specs['处理器']}【${exp.level}】\n`;
      output += `   ${exp.daily}\n`;
    } else {
      output += `🚀 处理器：${specs['处理器']}\n`;
    }
  }

  // 屏幕
  if (specs['屏幕']) {
    const screenText = specs['屏幕'];
    let exp = null;
    if (screenText.includes('2K')) exp = explainParam('screen', '2K');
    else if (screenText.includes('1.5K')) exp = explainParam('screen', '1.5K');
    
    if (exp) {
      output += `📱 屏幕：${screenText}【${exp.desc}】\n`;
      output += `   ${exp.daily}\n`;
    } else {
      output += `📱 屏幕：${screenText}\n`;
    }
  }

  // 电池
  if (specs['电池']) {
    const battery = specs['电池'];
    const num = parseInt(battery);
    let exp = null;
    if (num >= 6000) exp = explainParam('battery', '6000mAh 以上');
    else if (num >= 5500) exp = explainParam('battery', '5500-6000mAh');
    else if (num >= 5000) exp = explainParam('battery', '5000-5500mAh');
    else if (num >= 4500) exp = explainParam('battery', '4500-5000mAh');
    else if (num >= 4000) exp = explainParam('battery', '4000-4500mAh');
    else exp = explainParam('battery', '4000mAh 以下');
    
    if (exp) {
      output += `🔋 电池：${battery}【${exp.desc}】\n`;
      output += `   ${exp.scenario}\n`;
    } else {
      output += `🔋 电池：${battery}\n`;
    }
  }

  // 充电
  if (specs['充电']) {
    const charge = specs['充电'];
    const num = parseInt(charge);
    let exp = null;
    if (num >= 200) exp = explainParam('charging', '200W');
    else if (num >= 120) exp = explainParam('charging', '120W');
    else if (num >= 90) exp = explainParam('charging', '90W');
    else if (num >= 67) exp = explainParam('charging', '67W');
    else exp = explainParam('charging', '27W 及以下');
    
    if (exp) {
      output += `⚡ 充电：${charge}【${exp.desc}】\n`;
      output += `   ${exp.daily}\n`;
    } else {
      output += `⚡ 充电：${charge}\n`;
    }
  }

  // 摄像
  if (specs['后置摄像']) {
    const camera = specs['后置摄像'];
    output += `📷 拍照：${camera}\n`;
    
    if (camera.includes('徕卡')) {
      const exp = explainParam('camera', '徕卡');
      output += `   ${exp.daily}\n`;
    } else if (camera.includes('蔡司')) {
      const exp = explainParam('camera', '蔡司');
      output += `   ${exp.daily}\n`;
    } else if (camera.includes('哈苏')) {
      const exp = explainParam('camera', '哈苏');
      output += `   ${exp.daily}\n`;
    } else if (camera.includes('潜望')) {
      const exp = explainParam('camera', '潜望长焦');
      output += `   ${exp.daily}\n`;
    }
  }

  // 内存
  if (specs['内存']) {
    const ram = specs['内存'];
    const num = parseInt(ram);
    let exp = null;
    if (num >= 16) exp = explainParam('ram', '16GB');
    else if (num >= 12) exp = explainParam('ram', '12GB');
    else if (num >= 8) exp = explainParam('ram', '8GB');
    else exp = explainParam('ram', '6GB');
    
    if (exp) {
      output += `💾 内存：${ram}【${exp.desc}】\n`;
      output += `   ${exp.daily}\n`;
    } else {
      output += `💾 内存：${ram}\n`;
    }
  }

  // 存储
  if (specs['存储']) {
    const storage = specs['存储'];
    const num = parseInt(storage);
    let exp = null;
    if (num >= 512) exp = explainParam('storage', '512GB');
    else if (num >= 256) exp = explainParam('storage', '256GB');
    else exp = explainParam('storage', '128GB');
    
    if (exp) {
      output += `💿 存储：${storage}【${exp.desc}】\n`;
      output += `   ${exp.daily}\n`;
    } else {
      output += `💿 存储：${storage}\n`;
    }
  }

  // 重量
  if (specs['重量']) {
    const weight = specs['重量'];
    const num = parseInt(weight);
    let exp = null;
    if (num >= 220) exp = explainParam('weight', '220g 以上');
    else if (num >= 200) exp = explainParam('weight', '200-220g');
    else if (num >= 190) exp = explainParam('weight', '190-200g');
    else exp = explainParam('weight', '190g 以下');
    
    if (exp) {
      output += `⚖️ 重量：${weight}【${exp.desc}】\n`;
      output += `   ${exp.daily}\n`;
    } else {
      output += `⚖️ 重量：${weight}\n`;
    }
  }

  // 标签
  if (phone.tags && phone.tags.length > 0) {
    output += `\n🏷️ 标签：${phone.tags.join(' / ')}\n`;
  }

  // 购买链接
  if (phone.product_url) {
    output += `\n🔗 购买：${phone.product_url}\n`;
  }

  return output;
}

module.exports = { explainParam, formatPhoneWithExplanation, paramExplainer };

// CLI 测试
if (require.main === module) {
  console.log('参数解释器测试');
  console.log('═'.repeat(50));
  
  const testCases = [
    ['processor', '骁龙 8Gen3'],
    ['battery', '6000mAh 以上'],
    ['charging', '120W'],
    ['camera', '徕卡']
  ];
  
  for (const [type, value] of testCases) {
    const result = explainParam(type, value);
    console.log(`\n${type}: ${value}`);
    if (result) {
      console.log(`  级别：${result.level || result.desc}`);
      console.log(`  日常：${result.daily}`);
    }
  }
}

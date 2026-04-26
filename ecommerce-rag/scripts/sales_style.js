#!/usr/bin/env node

/**
 * 真实导购风格模板
 * 温柔 + 理性 + 不硬推销
 */

// 导购风格配置
const salesStyle = {
  
  // 开场白（根据场景选择）
  greetings: [
    "您好呀～看手机是吗？",
    "欢迎光临～想看看什么价位的手机呢？",
    "您好！是给自己选手机吗？",
    "下午好～有看中的机型了吗？"
  ],

  // 询问需求
  askNeeds: [
    "预算大概多少呢？",
    "平时用手机主要做什么呢？拍照、打游戏还是日常使用？",
    "有什么特别在意的点吗？比如续航、拍照、手感？",
    "现在用的是什么手机呀？有什么不满意的地方吗？"
  ],

  // 推荐过渡语
  transitions: [
    "这个价位我特别推荐您看看...",
    "根据您的情况，我觉得这款挺合适的...",
    "要说性价比，这款真的不错...",
    "您说的这个需求，这款正好能满足..."
  ],

  // 参数形象化解释
  paramExplain: {
    processor: (chip, level) => {
      const explains = {
        '骁龙 8 Elite': "这么说吧，您平时刷抖音、聊微信、甚至玩原神都完全够用，而且用个三四年不会卡",
        '骁龙 8Gen3': "性能很强的，王者荣耀、吃鸡这些主流游戏都能满帧跑，日常使用更是没问题",
        '骁龙 8Gen2': "性能够用，日常刷抖音、聊微信很流畅，玩玩游戏也 OK，性价比很高",
        'A18 Pro': "苹果最强的芯片了，iOS 系统优化也好，用个五六年不卡",
        '麒麟 9100': "华为自研的，配合鸿蒙系统，日常使用很流畅，就是大型游戏稍微弱一点"
      };
      return explains[chip] || `性能${level}，日常使用没问题`;
    },
    battery: (capacity) => {
      const num = parseInt(capacity);
      if (num >= 6000) return "电池很大，重度使用一天半没问题，两天一充也可以";
      if (num >= 5500) return "电池挺大的，正常使用一天没问题，晚上回家充电就行";
      if (num >= 5000) return "电池够用，早上满电出门，晚上回家大概还有 20% 左右";
      if (num >= 4500) return "电池中等，正常使用一天，要是玩得多的话可能需要中途充一次";
      return "电池偏小，重度使用可能需要一天两充";
    },
    charging: (watt) => {
      const num = parseInt(watt);
      if (num >= 120) return "充电很快，15-20 分钟就充满了，早上起床再充也来得及";
      if (num >= 90) return "充电挺快的，25 分钟左右充满，洗漱吃早餐的功夫就够了";
      if (num >= 67) return "充电速度中等，半个多小时充满，晚上睡觉前充就行";
      return "充电稍微慢一点，需要一个多小时，建议晚上睡觉时充";
    },
    screen: (screen) => {
      if (screen.includes('6.9')) return "屏幕很大，看视频很爽，但单手操作有点困难，放口袋也会鼓";
      if (screen.includes('6.7') || screen.includes('6.8')) return "主流旗舰尺寸，看视频舒服，双手使用没问题";
      if (screen.includes('6.3') || screen.includes('6.4')) return "小屏，单手能操作，放口袋不鼓，现在小屏旗舰不多了";
      return "屏幕尺寸中等，手感不错";
    },
    camera: (camera) => {
      if (camera.includes('徕卡')) return "拍照有徕卡调校，色彩比较浓郁，拍食物特别有食欲，扫街也很有感觉";
      if (camera.includes('蔡司')) return "蔡司的镜头，人像模式特别好，肤色自然，夜景也清晰";
      if (camera.includes('哈苏')) return "哈苏色彩，拍风景很好看，色彩比较真实自然";
      if (camera.includes('XMAGE')) return "华为自己的影像系统，拍照清晰，色彩鲜艳，综合表现很好";
      return "拍照不错，日常发朋友圈完全够用";
    },
    weight: (weight) => {
      const num = parseInt(weight);
      if (num >= 220) return "稍微有点重，长时间拿手会酸，但旗舰机都这个重量，可以理解";
      if (num >= 200) return "重量适中，正常手感，不算重";
      if (num >= 190) return "比较轻，手感不错，长时间拿也不会太累";
      return "很轻，单手操作很轻松，小手用户友好";
    }
  },

  // 说明优缺点（理性）
  pros: [
    "这款的优点主要是...",
    "它最大的优势是...",
    "我为什么推荐这款呢，主要是..."
  ],

  cons: [
    "不过也有个小缺点...",
    "要说不足的话，就是...",
    "客观来说，这款也有几点需要注意..."
  ],

  // 总结建议
  summary: [
    "总的来说，这个价位它性价比很高",
    "综合来看，这款挺适合您的",
    "要是您在意%s，这款确实值得考虑"
  ],

  // 追问需求
  followUp: [
    "您平时拍照多吗？要是对拍照要求高，我再给您推荐两款拍照更好的",
    "打游戏多吗？要是重度玩家，可以看看游戏手机",
    "对品牌有偏好吗？比如喜欢华为、小米还是苹果？",
    "需要我给您对比一下这两款吗？"
  ],

  // 价格讨论
  priceTalk: [
    "这个价格已经是活动价了，比平时便宜了%s",
    "价格方面，这个配置算合理，不算贵",
    "要说性价比，这个价位它确实很有竞争力",
    "预算要是能再加一点，可以上配置更高的"
  ],

  // 成交引导（不硬推销）
  close: [
    "您可以先试试手感，觉得合适再考虑",
    "不急着决定，可以多对比几款",
    "今天有活动，买的话送%s",
    "需要我给您详细讲讲这款吗？"
  ]
};

/**
 * 生成导购风格回复
 */
function generateSalesResponse(scenario, phones) {
  let response = '';

  // 场景：首次推荐
  if (scenario === 'first_recommend') {
    response += `${salesStyle.greetings[0]}\n\n`;
    response += `${salesStyle.transitions[0]}\n\n`;
    
    for (let i = 0; i < Math.min(phones.length, 3); i++) {
      const phone = phones[i];
      response += formatPhoneInSalesStyle(phone, i + 1);
    }

    response += `\n${salesStyle.followUp[0]}\n`;
  }

  return response;
}

/**
 * 用导购风格格式化手机信息
 */
function formatPhoneInSalesStyle(phone, index) {
  let specs = {};
  try {
    specs = JSON.parse(phone.specs || '{}');
  } catch (e) {}

  let output = `**${index}. ${phone.name}** - ¥${phone.price}\n\n`;

  // 处理器
  if (specs['处理器']) {
    const chip = specs['处理器'];
    const level = chip.includes('Elite') || chip.includes('Pro') ? '顶级' : '旗舰';
    output += `🚀 处理器：${chip}\n`;
    output += `   ${salesStyle.paramExplain.processor(chip, level)}\n\n`;
  }

  // 电池
  if (specs['电池']) {
    output += `🔋 电池：${specs['电池']}\n`;
    output += `   ${salesStyle.paramExplain.battery(specs['电池'])}\n\n`;
  }

  // 充电
  if (specs['充电']) {
    output += `⚡ 充电：${specs['充电']}\n`;
    output += `   ${salesStyle.paramExplain.charging(specs['充电'])}\n\n`;
  }

  // 屏幕
  if (specs['屏幕']) {
    output += `📱 屏幕：${specs['屏幕']}\n`;
    output += `   ${salesStyle.paramExplain.screen(specs['屏幕'])}\n\n`;
  }

  // 拍照
  if (specs['后置摄像']) {
    output += `📷 拍照：${specs['后置摄像']}\n`;
    output += `   ${salesStyle.paramExplain.camera(specs['后置摄像'])}\n\n`;
  }

  // 重量
  if (specs['重量']) {
    output += `⚖️ 手感：${specs['重量']}\n`;
    output += `   ${salesStyle.paramExplain.weight(specs['重量'])}\n\n`;
  }

  return output;
}

module.exports = { salesStyle, generateSalesResponse, formatPhoneInSalesStyle };

// CLI 测试
if (require.main === module) {
  console.log('导购风格测试');
  console.log('═'.repeat(50));
  console.log('');
  
  const testPhone = {
    name: '小米 15 12GB+256GB',
    price: 4499,
    specs: JSON.stringify({
      '处理器': '骁龙 8 Elite',
      '电池': '5400mAh',
      '充电': '90W 有线+50W 无线',
      '屏幕': '6.36 英寸 1.5K AMOLED',
      '后置摄像': '5000 万三摄徕卡',
      '重量': '191g'
    })
  };

  console.log(formatPhoneInSalesStyle(testPhone, 1));
}

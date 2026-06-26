import * as lunar from 'chinese-lunar';
export const codeToLottery = (code) => {
	// 代码与地区名称映射表
	const regionMap = {
		'MO': '澳门六合彩',
		'XMO': '新澳门六合彩',
		'HK': '香港六合彩',
		'RU': '俄罗斯六合彩',
		'OU': '欧洲六合彩',
		'FI': '芬兰六合彩',
		'TW': '台湾大乐透',
		'QXC': '七星彩',
	};

	// 查找映射表，若不存在则返回原始代码
	return regionMap[code] || code;
};

// 七星彩生肖映射
const SEVEN_STAR_ZODIAC = {
  1: '鼠', 2: '牛', 3: '虎', 4: '兔', 5: '龙', 6: '蛇',
  7: '马', 8: '羊', 9: '猴', 10: '鸡', 11: '狗', 12: '猪'
};

// 获取七星彩号码的生肖
export const getSevenStarZodiac = (num) => {
  if (!num) return '';
  const n = parseInt(num);
  if (isNaN(n)) return '';
  const offset = (n - 1) % 12;
  return getZodiacsObj().numbersAll[n];
};

// 获取七星彩颜色
export const getSevenStarColor = (num) => {
  const n = parseInt(num);
  if (isNaN(n)) return 'bg-gray-500';
  
  // 格式化号码为两位数，前导零
  const numStr = String(n).padStart(2, '0');
  
  // 使用 ColorDict 匹配颜色
  if (ColorDict.red.includes(numStr)) {
    return 'bg-rose-600';
  } else if (ColorDict.blue.includes(numStr)) {
    return 'bg-blue-500';
  } else if (ColorDict.green.includes(numStr)) {
    return 'bg-green-500';
  }
  
  // 如果不在 ColorDict 中，返回默认灰色
  return 'bg-gray-500';
};

// 计算七星彩生肖量
export const getSevenStarSxLiang = (numbers) => {
  if (!numbers || numbers.length === 0) return 0;
  const zodiacs = numbers.map(n => getSevenStarZodiac(n));
  return (new Set(zodiacs)).size;
};

// 计算七星彩尾数量
export const getSevenStarWeiShuLiang = (numbers) => {
  if (!numbers || numbers.length === 0) return 0;
  const weishus = numbers.map(n => {
    const s = String(n);
    return s.slice(-1);
  });
  return (new Set(weishus)).size;
};

// 将Flask后端数据转换为前端格式
export const transformSevenStarData = (backendData) => {
  if (!backendData) return null;
  
  // 处理不同的响应格式 - 处理 axios 响应 { data: { success: true, data: {...} } }
  let data = null;
  if (backendData.data && backendData.data.success) {
    data = backendData.data.data || backendData.data;
  } else if (backendData.success) {
    data = backendData.data || backendData;
  } else if (backendData.numbers || backendData.all_20_numbers) {
    data = backendData;
  } else if (backendData.data) {
    data = backendData.data;
  } else {
    return null;
  }
  
  // ★★★ 格式化日期：始终使用API传过来的 created_at，默认null，不使用当前系统时间 ★★★
  let timestamp = null;
  let drawDate = null;
  if (data.created_at) {
    try {
      drawDate = new Date(data.created_at);
      if (!isNaN(drawDate.getTime())) {
        timestamp = Math.floor(drawDate.getTime() / 1000);
      }
    } catch (e) {
      // 保持 null
    }
  }

  // ★★★ 年份从开奖时间中提取，不使用当前系统时间 ★★★
  let yearStr = drawDate ? String(drawDate.getFullYear()) : String(new Date().getFullYear());

  // 只处理七星彩的7个号码
  let sevenStarNumbers = data.seven_star_numbers || [];
  
  // 构建balls数组 - 只包含7个号码，没有特码分离
  let numbers = sevenStarNumbers;
  let lastBall = null;
  
  // 如果有7个号码，全部作为普通号码显示（七星彩没有特码分离）
  if (sevenStarNumbers.length > 0) {
    numbers = sevenStarNumbers;
  }
  
  // 构建balls数组 - 只显示实际开奖的号码
  const balls = numbers.map((n) => ({
    num: String(n).padStart(2, '0'),
    sb: '',
    sx: getSevenStarZodiac(n)
  }));
  
  console.log('七星彩balls数组长度:', balls.length);
  
  // 构建完整的号码字符串（用逗号分隔）
  const allNumbersArray = [...numbers];
  const allNumbersStr = allNumbersArray.join(',');
  
  // 大小单双 - 七星彩不单独显示特码的大小单双
  let bigSmall = data.big_small || '';
  let singleDouble = data.single_double || '';
  
  // 计算总和
  let total = 0;
  numbers.forEach(n => total += parseInt(n));
  
  // 获取期号
  let periodStr = String(data.issue_number || data.period || '');
  
  // 从期号中提取年份，或者直接使用当前年份
  if (periodStr && periodStr.length >= 8) {
    // 只有期号很长的时候才尝试提取年份
    yearStr = periodStr.substring(0, 4);
  }
  
  // 计算生肖量和尾数量
    const sxLiang = getSevenStarSxLiang(allNumbersArray);
    const weiShuLiang = getSevenStarWeiShuLiang(allNumbersArray);
    
    return {
      issue_number: data.issue_number || periodStr,
      year: yearStr,
      period: periodStr,
      date: timestamp,
      numbers: allNumbersStr,
      ball: balls,
      lastBall: lastBall,
      lastNum: lastBall?.num || '',
      bigSmall: bigSmall,
      singleDouble: singleDouble,
      status: data.is_drawing ? 1 : 2, // 1:开奖中, 2:已开奖,
      total: total,
      lotteryType: 'QXC',
      drawing_text: data.drawing_text || '',
      all_20_numbers: data.all_20_numbers || [],
      seven_star_numbers: sevenStarNumbers,
      zodiacs: data.zodiacs || {},
      show_zodiac: data.show_zodiac !== false,
      draw_mode: data.draw_mode || 'normal',
      videoUrl: data.videoUrl || '',
      sxLiang: sxLiang,
      weiShuLiang: weiShuLiang,
      next_draw_time: data.next_draw_time
    };
};

export const codeToRegion = (code) => {
	// 代码与地区名称映射表
	const regionMap = {
		'MO': '澳门彩',
		'XMO': '新澳门彩',
		'HK': '香港彩',
		'RU': '俄罗斯彩',
		'OU': '欧洲彩',
		'FI': '芬兰彩',
		'TW': '台湾彩',
	};

	// 查找映射表，若不存在则返回原始代码
	return regionMap[code] || code;
};

// 时间戳转换工具函数
export const formatTimestamp = (timestamp) => {
	// ★★★ 处理无效/缺失时间戳：如果是null/undefined/非数字，显示空串而非1970年
	if (timestamp === null || timestamp === undefined || (typeof timestamp === 'number' && isNaN(timestamp))) {
		return '';
	}
	// 时间戳可能是秒或毫秒，这里统一处理为毫秒
	const msTimestamp = typeof timestamp === 'number' ? timestamp * 1000 : 0;

	// 创建Date对象
	const date = new Date(msTimestamp);

	// 验证时间戳有效性
	if (isNaN(date.getTime())) {
		return '无效时间';
	}

	// 获取时间组件
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	// 星期映射表（0是周日，1是周一...6是周六）
	const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const weekDay = weekDays[date.getDay()];

	// 拼接成目标格式
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${weekDay}`;
};

// 时间戳转换工具函数
export const formatTimestamp1 = (timestamp) => {
	// ★★★ 处理无效/缺失时间戳：如果是null/undefined/非数字，显示空串而非1970年
	if (timestamp === null || timestamp === undefined || (typeof timestamp === 'number' && isNaN(timestamp))) {
		return '';
	}
	// 时间戳可能是秒或毫秒，这里统一处理为毫秒
	const msTimestamp = typeof timestamp === 'number' ? timestamp * 1000 : 0;

	// 创建Date对象
	const date = new Date(msTimestamp);

	// 验证时间戳有效性
	if (isNaN(date.getTime())) {
		return '无效时间';
	}

	// 获取时间组件
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	// 星期映射表（0是周日，1是周一...6是周六）
	const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const weekDay = weekDays[date.getDay()];

	// 拼接成目标格式
	return `${year}-${month}-${day} ${weekDay}`;
};

// 时间转换工具函数
export const formatTimestamp2 = (val) => {
	// 创建Date对象
	const date = new Date(val);

	// 验证时间戳有效性
	if (isNaN(date.getTime())) {
		return '无效时间';
	}

	// 获取时间组件
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	// 星期映射表（0是周日，1是周一...6是周六）
	const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const weekDay = weekDays[date.getDay()];

	// 拼接成目标格式
	return `${year}-${month}-${day} ${weekDay}`;
};
export function weiSize(t) {
  return Number((t + "").slice(-1)) >= 5 ? "大" : "小"
}
export function weishuSum(t) {
  return +(t + "").slice(-1) + +(t + "").slice(-2, -1)

}
export function sum(arr=[]) { return arr.reduce((a, b) => +a + (+b), 0) }
export function isBig(n, thresh = 25) { return n >= thresh ? '大' : '小' }
//判断单双
export const oddEven = (val) => {
	const n = Number(val);
	return isNaN(n) ? '' : (n % 2 === 0 ? '双' : '单');
};
export function weishuliang(n) {
  let nw = n.map(x => x.toString().slice(-1))
  //console.log("weishuliang",nw)
  return (new Set(nw)).size
}

export function sxliang(n, Zodica) {
  //console.log("Zodica",Zodica,n)
  let nw = n.map(x => Zodica[+x])

  //console.log("sxliang",nw,n,Zodica)
  return (new Set(nw)).size

}

// 部分核心算法示例
export function getSpecial(t) {

  return t ? [49 == +t ? "和" : oddEven(t), 49 == +t ? "和" : isBig(t, 25), 49 == +t ? "和" :
    "合" + oddEven(weishuSum(t)), 49 == +t ? "和" : "合" + isBig(weishuSum(t), 7), 49 == +t ? "和" : "尾" + weiSize(t)] : ["", "", "", "", ""]
}
// 十二生肖顺序
export const ZODIAC_LIST = [
  '鼠', '牛', '虎', '兔', '龙', '蛇',
  '马', '羊', '猴', '鸡', '狗', '猪'
];
// 获取当前日期的农历年份
const getLunarYear = (timestamp) => {
  const date = new Date(timestamp); // timestamp → Date
//   console.log(date, timestamp);

  const lunarDate = lunar.solarToLunar(date);
  return lunarDate.year
};
export function getZodiacsObj(targetYear) {
  targetYear = targetYear ? targetYear : new Date().getTime()
  // 1. 生肖固定顺序
  const ZODIAC_ORDER = ZODIAC_LIST;

  targetYear = getLunarYear(targetYear)
//   console.log("targetYear", targetYear)
  // 2. 计算当前生肖索引（核心修正！）
  const currentIndex = (targetYear - 2025) % 12; // 2025蛇年=5
  const normalizedIndex = currentIndex < 0 ? currentIndex + 12 : currentIndex;

  // 3. 生成号码（分两组处理）
  const result = {};
  const resultAll = {};
  // 第一组：鼠(6)到蛇(1)
  for (let i = 0; i < 6; i++) {
    let zodiac = String(ZODIAC_ORDER[(normalizedIndex + i) % 12])
    const baseNum = 6 - i; // 鼠=6, 牛=5,..., 蛇=1
    result[zodiac] = [baseNum, baseNum + 12, baseNum + 24, baseNum + 36].filter(n => n <= 49);

    if (result[zodiac].includes(1)) result[zodiac].push(49); // 仅蛇年加49
    result[zodiac].forEach((n) => resultAll[String(n)] = zodiac);
  }

  // 第二组：马(12)到猪(7)
  for (let i = 6; i < 12; i++) {
    // .padStart(2, "0");
    let zodiac = String(ZODIAC_ORDER[(normalizedIndex + i) % 12])
    const baseNum = 12 - (i - 6); // 马=12, 羊=11,..., 猪=7
    result[zodiac] = [baseNum, baseNum + 12, baseNum + 24, baseNum + 36].filter(n => n <= 49);
    if (result[zodiac].includes(1)) result[zodiac].push(49); // 仅蛇年加49
    result[zodiac].forEach((n) => resultAll[n] = zodiac);
  }

  return {
    year: targetYear,
    numbersAll: resultAll,
    currentZodiac: ZODIAC_ORDER[normalizedIndex],
    numbers: result,
    ...resultAll
  };
}

export const ColorDict = {
  red: [
    "01", "02", "07", "08", "12", "13", "18", "19",
    "23", "24", "29", "30", "34", "35", "40", "45", "46"
  ],
  blue: [
    "03", "04", "09", "10", "14", "15", "20", "25",
    "26", "31", "36", "37", "41", "42", "47", "48"
  ],
  green: [
    "05", "06", "11", "16", "17", "21", "22", "27",
    "28", "32", "33", "38", "39", "43", "44", "49"
  ]

};

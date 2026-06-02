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
	};

	// 查找映射表，若不存在则返回原始代码
	return regionMap[code] || code;
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
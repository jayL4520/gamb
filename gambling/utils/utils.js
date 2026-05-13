

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

	// 星期映射表（0是周日，1是周一...6是周六）
	const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const weekDay = weekDays[date.getDay()];

	// 拼接成目标格式
	return `${year}年${month}月${day}日${hours}时${minutes}分 ${weekDay}`;
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

	// 拼接成目标格式
	return `${year}年${month}月${day}日`;
};

// 时间戳转换工具函数
export const formatTimestamp2 = (timestamp) => {
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

	// 拼接成目标格式
	return `${year}-${month}-${day}`;
};

// 时间戳转换工具函数
export const formatDate = (value) => {
	var date = new Date(value);

	// 获取时间组件
	// const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
	const day = String(date.getDate()).padStart(2, '0');
	var hour = String(date.getHours()).padStart(2, '0'); // 时
	var minutes = String(date.getMinutes()).padStart(2, '0'); // 分

	// 拼接成目标格式
	return `${month}-${day} ${hour}:${minutes}`;
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

// 总和
export const sum = (arr) => {
	return arr.reduce((a, b) => +a + (+b), 0)
};
//判断大小
export const isBig = (n, thresh = 25) => {
	return n >= thresh ? '大' : '小'
};
//判断单双
export const oddEven = (val) => {
	const n = Number(val);
	return isNaN(n) ? '' : (n % 2 === 0 ? '双' : '单');
};


/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
	const delay = t || 500
	let timer
	return function() {
		const args = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			timer = null
			fn.apply(this, args)
		}, delay)
	}
}

/**
 * 格式化时间
 */
export function useTimeAgo(dateStr) {
	const target = new Date(dateStr.replace(/-/g, '/')) // 兼容 iOS
	const now = Date.now()
	const diff = (now - target) / 1000 / 3600 // 小时差

	if (diff < 0 || diff > 24) {
		// 超过 24 小时或未来时间 → 返回日期
		return target.toLocaleString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		}).replace(/\//g, '-')
	} else {
		// 24 小时内 → 返回“x 小时前”
		return Math.floor(diff) + ' 小时前'
	}
}

/**
 * arr数组 item字符串 无则添加，有则删除
 */
export function arrayToggle(arr, item) {
  const idx = arr.indexOf(item)
  idx === -1 ? arr.push(item) : arr.splice(idx, 1)
  return arr   // 链式友好
}


/**
 * arr数组对象 item对象 无则添加，有则删除
 */
export function arrayObjToggle(arr, item) {
  const idx = arr.findIndex(i => i.id === item.id)
  idx === -1 ? arr.push(item) : arr.splice(idx, 1)
  return arr   // 链式友好
}

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

//判断单双
export const oddEven = (val) => {
	const n = Number(val);
	return isNaN(n) ? '' : (n % 2 === 0 ? '双' : '单');
};

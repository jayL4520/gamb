import store from '../store';

let HTTP_REQUEST_URL = "http://ok2345.net",
// let HTTP_REQUEST_URL = "",
	HEADER = {
		'content-type': 'application/json;charset=UTF-8'
	},
	TOKENNAME = 'authorization',
	HEADERPARAMS = {
		'content-type': 'application/x-www-form-urlencoded'
	}

/**
 * 发送请求
 */
function baseRequest(url, method, data, params) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER
	if (params != undefined) {
		header = HEADER;
	}
	if (store.state.app.token) header[TOKENNAME] = store.state.app.token;
	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (res.data.code == 200) {
					reslove(res.data);
				} else if ([410000, 410001, 410002, 401, 402].indexOf(res.data.code) !== -1) {
					store.commit("LOGOUT");
					uni.navigateTo({
						url:"/pages/users/login/index"
					})
					reject(res.data);
				} else if (res.data.code == 500) {
					reject(res.data.msg || "系统异常");
				} else if (res.data.code == 400) {
					reject(res.data.msg || "参数校验失败");
				} else if (res.data.code == 404) {
					reject(res.data.msg || "没有找到相关数据");
				} else if (res.data.code == 403) {
					reject(res.data.msg || "没有相关权限");
				} else {
					reject(res.data.msg || "系统错误");
				}
			},
			fail: (msg) => {
				reject("请求失败");
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt, params) => baseRequest(api, method, data, opt, params)
});



export default request;
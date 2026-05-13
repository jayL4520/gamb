

const state = {
	code: uni.getStorageSync("code") || "MO",
	token: uni.getStorageSync("token") || "",
	isLogin: uni.getStorageSync("isLogin") || false,
	userInfo: uni.getStorageSync("userInfo") ? JSON.parse(uni.getStorageSync("userInfo")) : null,
};

const mutations = {
	UPDATE_CODE(state, code) {
		state.code = code;
		uni.setStorageSync("code", code)
	},
	LOGIN(state, opt) {
		state.token = opt.token;
		state.isLogin = opt.isLogin;
		uni.setStorageSync("token", opt.token)
		uni.setStorageSync("isLogin", opt.isLogin)
	},
	UPDATE_LOGIN(state, token) {
		state.token = token;
		uni.setStorageSync("token", token)
	},
	LOGOUT(state) {
		state.token = "";
		state.isLogin = false;
		uni.removeStorageSync("token")
		uni.removeStorageSync("isLogin")
	},
	UPDATE_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
		uni.setStorageSync("userInfo", JSON.stringify(userInfo))
	},
};

const actions = {


}
export default {
	state,
	mutations,
	actions
};

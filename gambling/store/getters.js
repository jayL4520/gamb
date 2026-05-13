

export default {
	code: state => state.app.code,
	token: state => state.app.token,
	isLogin: state => !!state.app.isLogin,
	userInfo: state => state.app.userInfo || {},
};

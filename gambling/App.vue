<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44; //手机端头部手机时间位置高度
	var windowWidth = uni.getSystemInfoSync().windowWidth; //可用窗口宽度（px）
	export default {
		globalData:{
			statusBarHeight: statusBarHeight, //手机端头部手机时间位置高度
			windowWidth:windowWidth,// 可用窗口宽度（px）
		},
		onLaunch: function() {
			uni.hideTabBar()
			// #ifdef APP-PLUS
			plus.webview.currentWebview().setStyle({
			  bounce: 'vertical'   // 垂直回弹
			});
			plus.webview.currentWebview().setBounce({position:'none'}); // 完全禁止
			// #endif
			console.log('App Launch')
		},
		onShow: function() {
			uni.hideTabBar()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import 'static/iconfont/iconfont.css';
	@import 'static/css/root.css';
	@import 'static/css/base.css';




</style>
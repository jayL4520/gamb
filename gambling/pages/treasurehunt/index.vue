<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<navbar title="寻宝" class="navbar">
			<template v-slot:navleft>
				<text class="disclaimers">
					免责声明
				</text>
			</template>
			<template v-slot:navright>
				<text class="refresh" @click="refreshPage">
					刷新
				</text>
			</template>
		</navbar>
		<view class="webview">
			<!-- #ifdef H5 -->
			<!-- <webview ref="webView" :webUrl="webUrl"></webview> -->
			<web-view :src="webUrl" ref="webView" :update-title="false" @message="handleMessage" @error="handleError"
				@load="handleLoaded"></web-view>
			<!-- #endif -->
		</view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import tabbar from "@/components/tabbar.vue"
	// import webview from "@/components/webview/index.vue"
	export default {
		components: {
			navbar,
			tabbar
			// webview
		},
		data() {
			return {
				// 要加载的外部网页地址
				webUrl: 'https://fc04aa230e44c2db52ef0f1a43c11ea9.ckxbbgd.xyz/', // 替换为实际需要加载的网页地址
				isLoading: true,
				containerHeight: 0, // 整个页面容器高度（减去tabbar后）
				webviewIns: null, // 存储原生 WebView 实例
				// Tab切换事件处理器引用
				tabSwitchHandler: null
			}
		},
		onLoad(options) {
			// 可以通过页面参数动态传递网页地址
			if (options.url) {
				this.webUrl = decodeURIComponent(options.url)
			}
			// 获取系统信息计算高度
			// #ifdef H5 
			this.calculateHeight()
			// #endif
			// #ifdef APP
			// 监听Tab切换事件
			this.listenTabSwitch();
			// this.createFloatWebview()
			// #endif
		},
		onShow() {
			// 页面显示时重新计算（防止横竖屏切换等场景）
			// #ifdef H5
			this.calculateHeight()
			// #endif
			// #ifdef APP
			if (this.webviewIns) {
				this.webviewIns.show();
			} else {
				this.createFloatWebview()
			}
			// this.createFloatWebview()
			// #endif
		},
		onHide() {
			// 页面隐藏时，如果WebView存在则隐藏
			if (this.webviewIns) {
				uni.hideLoading()
				this.webviewIns.hide();
			}
		},
		methods: {
			// 监听Tab切换事件
			listenTabSwitch() {
				this.tabSwitchHandler = (e) => {
					const activeTabPath = e.pagePath;
					// 判断当前激活的Tab是否是当前页面
					if (activeTabPath !== this.currentTabPath) {
						// 其他Tab页面，隐藏WebView
						uni.hideLoading()
						this.webviewIns?.hide();
					} else {
						// 当前Tab页面，显示WebView
						this.webviewIns?.show();
					}
				};

				// 注册Tab切换监听
				uni.onTabItemTap(this.tabSwitchHandler);
			},
			createFloatWebview() {

				uni.showLoading()
				// 获取系统信息
				let sysInfo = uni.getSystemInfoSync()
				// 获取窗口高度
				let windowHeight = sysInfo.windowHeight
				let windowWidth = sysInfo.windowWidth
				// 提取状态栏高度（statusBarHeight 是系统信息自带字段）
				let statusBarHeight = sysInfo.statusBarHeight;
				let titleHeight = statusBarHeight + 44
				this.containerHeight = windowHeight - titleHeight

				// ① 创建原生 WebView 实例
				this.webviewIns = plus.webview.create(
					this.webUrl, // 加载的网页
					"float-webview", // 唯一标识
					{
						width: windowWidth,
						height: this.containerHeight,
						top: titleHeight,
						left: 0,
						zindex: 10
					}, // 样式配置（大小、位置、层级）
					{
						title: ""
					} // 额外参数
				);
				// 监听加载事件
				this.setupWebviewEvents();
				// ② 显示 WebView（创建后默认隐藏，需手动显示）
				this.webviewIns.show();


			},
			// 设置WebView事件监听
			setupWebviewEvents() {
				if (!this.webviewIns) return;

				// 监听开始加载事件
				this.webviewIns.addEventListener("loading", () => {
					uni.showLoading()
				});

				// 监听加载完成事件
				this.webviewIns.addEventListener("loaded", () => {
					uni.hideLoading()
					// 注入 JS 代码
					this.webviewIns.evalJS(`
					    var element = document.querySelector('.ant-spin-container .record-info-a');
					    if (element) {
					      element.style.display = 'none';
					    }
					    // alert('JS 注入成功');
					  `);
				});

				// 监听加载错误事件
				this.webviewIns.addEventListener("error", (e) => {
					uni.hideLoading()
					// uni.showToast({
					//   title: "加载失败: " + e.message,
					//   icon: "none",
					//   duration: 3000
					// });
				});
			},
			// 计算容器高度
			calculateHeight() {
				// 获取系统信息
				const sysInfo = uni.getSystemInfoSync()
				// 获取窗口高度
				const windowHeight = sysInfo.windowHeight

				// 计算容器总高度 = 窗口高度 - tabBar高度
				this.containerHeight = windowHeight

			},
			// 刷新网页
			refreshPage() {
				// #ifdef H5
				// 通过重新赋值src实现刷新
				this.webUrl = this.webUrl + (this.webUrl.includes('?') ? '&' : '?') + 't=' + Date.now()
				// #endif
				// #ifdef APP
				const timestamp = new Date().getTime();
				const newUrl = this.webUrl + (this.webUrl.includes('?') ? '&' : '?') + 't=' + timestamp;
				this.webviewIns.loadURL(newUrl);
				// #endif

			},

			// 网页加载完成
			handleLoaded() {
				console.log("webviewIns handleLoaded");
				this.isLoading = false
				// setTimeout(() => {
				// 	this.$refs.webView.evalJs(`
				//                var element = document.querySelector('.ant-spin-container .record-info-a');
				//                if (element) {
				//                  element.style.display = 'none';
				//                }
				//              `)
				// 		.then(result => {
				// 			console.log('JS注入执行成功', result)
				// 		})
				// 		.catch(error => {
				// 			console.error('JS注入执行失败', error)
				// 		});
				// }, 300);

			},
			// 接收网页发送的消息
			handleMessage(e) {
				console.log('收到网页消息：', e.detail.data)
				// 可以在这里处理网页传递过来的数据
			},
			// 处理网页加载错误
			handleError(e) {
				console.error('网页加载错误：', e.detail)
				// 可以在这里显示错误提示
			},
			// 销毁 WebView（避免内存泄漏）
			destroyWebview() {
				if (!this.webviewIns) return;
				// ① 隐藏 WebView（带动画）
				this.webviewIns.hide();
				uni.hideLoading()
				setTimeout(() => {
					this.webviewIns.close();
					this.webviewIns = null;
				}, 100);
			},

		},

		onUnload() {
			console.log("onUnload");
			this.destroyWebview();
			// 移除Tab切换监听
			if (this.tabSwitchHandler) {
				uni.offTabItemTap(this.tabSwitchHandler);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		// height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;

		// .navbar {
		// 	position: fixed;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;
		// }

		.disclaimers {
			font-size: 16px;
			cursor: pointer;
		}

		.refresh {
			font-size: 25px;
			cursor: pointer;
			margin-right: 15px;
		}

		.webview {
			position: relative;
			flex: 1 1 0%;
			width: 100%;
			overflow: hidden;
		}
	}
</style>
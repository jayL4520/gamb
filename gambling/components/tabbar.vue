<template>
	<view>
		<view class="tab-bar-h">
			
		</view>
		<view class="tab-bar">
			<view v-for="(item, idx) in list" :key="idx" class="tab-item"
				:class="{ active: item.pagePath.split('?')[0] == activeRouter, bulge: item.bulge }"
				@click="switchTab(idx, item)">
				<image class="icon"
					:src="item.pagePath.split('?')[0] == activeRouter ? item.selectedIconPath : item.iconPath" />
				<text class="txt">{{ item.text }}</text>
				<view v-if="item.badge" class="badge">{{ item.badge }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CustomTabBar',
		data() {
			return {
				activeRouter: "/pages/index/index", // 当前高亮索引
				list: [{
						"pagePath": "/pages/index/index",
						"iconPath": "/static/tabbar/tabbar1.png",
						"selectedIconPath": "/static/tabbar/tabbarsel1.png",
						"text": "六合彩"
					},
					{
						"pagePath": "/pages/treasurehunt/index",
						"iconPath": "/static/tabbar/tabbar2.png",
						"selectedIconPath": "/static/tabbar/tabbarsel2.png",
						"text": "寻宝"
					},
					{
						"pagePath": "/pages/market/index",
						"iconPath": "/static/tabbar/tabbarsel3.png",
						"selectedIconPath": "/static/tabbar/tabbarsel3.png",
						"text": "淘料",
						bulge: true, // 中间凸起
					},
					{
						"pagePath": "/pages/news/index",
						"iconPath": "/static/tabbar/tabbar4.png",
						"selectedIconPath": "/static/tabbar/tabbarsel4.png",
						"text": "消息",
						badge: 0 // 徽标
					},
					{
						"pagePath": "/pages/user/index",
						"iconPath": "/static/tabbar/tabbar5.png",
						"selectedIconPath": "/static/tabbar/tabbarsel5.png",
						"text": "我的"
					}
				]
			}
		},
		created() {
			let routes = getCurrentPages(); //获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			this.activeRouter = '/' + curRoute;
		},

		methods: {
			setSelected(idx) {
				this.selected = idx
			},
			switchTab(idx, item) {
				if (item.bulge) {
					// 中间按钮：弹出拍照/发帖等
					// uni.showActionSheet({
					//   itemList: ['拍照', '从相册选择'],
					//   success: res => console.log('选择了', res.tapIndex)
					// })
					// return
				}
				this.selected = idx
				uni.switchTab({
					url: item.pagePath
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tab-bar-h{
		height: 50px;
	}
	.tab-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		max-width: var(--max-width);
		height: 50px;
		background: #fff;
		display: flex;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 999;
		margin: 0 auto;
	}

	.tab-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: transform 0.2s;
	}

	.tab-item.active {
		color: #472822;
	}

	.tab-item.bulge {
		.icon {
			transform: scale(1.5) translateY(-5px);
		}
	}

	.icon {
		width: 24px;
		height: 24px;
		margin-bottom: 2px;
	}

	.txt {
		font-size: 10px;
	}

	.badge {
		position: absolute;
		top: 3px;
		right: calc(50% - 15px);
		background: #FF3B30;
		color: #fff;
		font-size: 9px;
		line-height: 1;
		padding: 1px 4px;
		border-radius: 10px;
	}
</style>
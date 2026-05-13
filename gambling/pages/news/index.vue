<template>
	<view class="container">
		<navbar title="消息" class="navbar">
			<template v-slot:navright>
				<view class="navrightbutton">
					<view class="button">
						<i class="iconfont icon-kefu_o"></i>
						<text>客服</text>
					</view>
					<view class="button">
						<i class="iconfont icon-jia"></i>
						<text>发起群聊</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="newstypelist">
			<view class="newstypeitem">
				<image class="img" src="@/static/img/icon_gfxx.png" mode=""></image>
				<text>官方消息</text>
			</view>
			<view class="newstypeitem">
				<image class="img" src="@/static/img/icon_xttz.png" mode=""></image>
				<text>系统通知</text>
			</view>
			<view class="newstypeitem">
				<image class="img" src="@/static/img/icon_hdxx.png" mode=""></image>
				<text>互动消息</text>
			</view>
		</view>

		<tabbar></tabbar>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import tabbar from "@/components/tabbar.vue"
	export default {

		components: {
			navbar,
			tabbar
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		onShow() {
			uni.hideTabBar()
		},

		methods: {

			navigatorTo(url) {
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},





		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		.navrightbutton {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #fff;
			font-size: 12px;

			.button {
				cursor: pointer;
				min-width: 25px;
				margin: 0 3px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.newstypelist {
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 2rpx solid #eeeeee;

		.newstypeitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 40rpx;
			padding: 10rpx;
			.img{
				width: 90rpx;
				height: 90rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	@media (min-width: 600px){
		.newstypelist {
			height: 136px;
			border-bottom: 1px solid #eeeeee;
		
			.newstypeitem {
				font-size: 26px;
				padding: 5px;
				.img{
					width: 50px;
					height: 50px;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
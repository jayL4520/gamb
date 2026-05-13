<template>
	<view class="container">
		<navbar title="我的发布" class="navbar">
			<template v-slot:navleft>
				<view class="navbutton">
					<view class="backbutton" @click="$backOrHome">
						<uni-icons class="back" color="#fff" type="left" size="20" />
						<text class="">返回</text>
					</view>
				</view>
			</template>
			
		</navbar>
		<view class="">
			<!-- <view class="topfixedh"></view> -->
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<bannerswiper></bannerswiper>
				<view class="tab-wrapper box-middle">
						<view class="tabitem box-center active">
							帖子
						</view>
						<view class="tabitem box-center">
							心水成绩
						</view>
				</view>
			</view>
			<view class="" >
				<emptypage title="您还没发过贴哦"></emptypage>
			</view>
		</view>
	


		<view class="footfixedh"></view>
		<view class="footfixed">
			<view class="footitem box-center"  @click="$backOrHome">
				<i class="iconfont icon-xiaoxi1"></i>
				<text>交流大厅</text>
			</view>
			<view class="footitem box-center active">
				<i class="iconfont icon-a-yonghu1"></i>
				<text>我的发布</text>
			</view>
			<view class="footitem box-center" @click="tofollow">
				<i class="iconfont icon-chakantieziguanzhu"></i>
				<text>我的关注</text>
			</view>

		</view>


	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import emptypage from "@/components/emptyPage/index.vue"
	import {
		codeToRegion,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
			bannerswiper,
			emptypage,
		},
		data() {
			return {
				code: "",
				titleHeight: 0,
				loaded:false,
				list: [],

			}
		},
		onLoad(options) {
			
			var that = this;
			let app = getApp();
			this.titleHeight= app.globalData.statusBarHeight
			if (options.code) {
				this.code = options.code
			}
		},

		methods: {
			
			ellipsis(str, max = 20) {
				if (typeof str !== 'string') return ''
				return str.length > max ? str.slice(0, max) + '…' : str
			},
			tofollow(){
				uni.redirectTo({
					url: "/pages/post/post_follow/index"
				})
			},
			navigatorTo(url) {
				console.log(url, "url");
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},
		},

	}
</script>

<style lang="scss" scoped>

	.navbar {
		.navbutton {
			color: #fff;
		}

		.backbutton {
			display: flex;
			align-items: center;
			font-size: 16px;
			cursor: pointer;

			.back {
				/* #ifdef H5 */
				margin-top: 3px;
				/* #endif */
			}
		}


	}

	.topfixed {
		position: sticky;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 998;
	}

	// .topfixedh {
	// 	height: 102px;
	// }

	.bannerswiper {
		height: 57px !important;

		.bannerimg {
			width: 100%;
			height: 57px !important;
		}
	}

	.tab-wrapper {
		width: 100%;
		height: 45px;
		justify-content: space-evenly;
			.tabitem {
				width: 30%;
				height: 100%;
				color: #333;
				font-size: 17px;

				&.active {
					position: relative;
					color: #f58e03;
					&::after{
						content: " ";
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						max-width: 100px;
						width: 100%;
						height: 2px;
						background: #f58e03;
						margin: auto;
					}
				}
			}

	
	}

	.footfixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		max-width: var(--max-width);
		height: 67px;
		padding-bottom: 17px;
		height: calc(67px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(67px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
		display: flex;
		justify-content: space-between;
		background-color: rgb(246, 246, 246);
		border-top: 1px solid rgb(240, 241, 237);
		background: #fff;
		margin: 0 auto;

		.footitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 50%;
			font-size: 14px;
			color: rgb(153, 153, 153);

			.iconfont {
				font-size: 24px;
			}

			&.active {
				color: rgb(71, 40, 34);
			}
		}
	}

	.footfixedh {
		height: 67px;
		height: calc(67px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(67px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
	}
</style>
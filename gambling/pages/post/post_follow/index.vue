<template>
	<view class="">
		<navbar title="我的关注" class="navbar">
			<template v-slot:navleft>
				<view class="navbutton">
					<view class="backbutton" @click="$backOrHome">
						<uni-icons class="back" color="#fff" type="left" size="20" />
						<text class="">返回</text>
					</view>
				</view>
			</template>
			<template v-slot:navright>
				<view class="navrightbutton">
					<view class="button">
						<text>关注的人</text>
					</view>
				</view>
			</template>
			
		</navbar>
		
		<view class="container" >
			<view class="empty-box">
				<image class="img" src="../static/img/ico_jldt_wdl.png" mode="widthFix"></image>
				<view class="txt">暂无发现相关的动态内容</view>
			</view>
			<recommended></recommended>
		</view>


		<view class="footfixedh"></view>
		<view class="footfixed">
			<view class="footitem box-center"  @click="$backOrHome">
				<i class="iconfont icon-xiaoxi1"></i>
				<text>交流大厅</text>
			</view>
			<view class="footitem box-center" @click="tocomments">
				<i class="iconfont icon-a-yonghu1"></i>
				<text>我的发布</text>
			</view>
			<view class="footitem box-center active">
				<i class="iconfont icon-chakantieziguanzhu"></i>
				<text>我的关注</text>
			</view>

		</view>


	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import recommended from "@/components/recommended/index.vue"
	import {
		codeToRegion,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
			recommended,
		},
		data() {
			return {
				code: "",
				loaded:false,
				list: [],

			}
		},
		onLoad(options) {
			var that = this;
			if (options.code) {
				this.code = options.code
			}
		},

		methods: {
			
			ellipsis(str, max = 20) {
				if (typeof str !== 'string') return ''
				return str.length > max ? str.slice(0, max) + '…' : str
			},
			tocomments(){
				uni.redirectTo({
					url: "/pages/post/post_comments/index"
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
		.navrightbutton {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #fff;
			font-size: 16px;
		
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
	.container{
		padding: 100rpx 0;
	}
	.empty-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 280rpx;
			height: 280rpx;
		}
		.txt{
			padding: 20rpx 0;
			text-align: center;
			font-size: 40rpx;
			color: #999;
		}
	}
	@media (min-width: 600px){
		.container{
			padding: 50px 0;
		}
		.empty-box{
			image{
				width: 140px;
				height: 140px;
			}
			.txt{
				padding: 10px 0;
				text-align: center;
				font-size: 28px;
				color: #999;
			}
		}
	}
	
</style>
<template>
	<view class="container">
		<navbar title="新帖子" class="navbar">
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
						<text>发表</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="longTab box-middle ">
			<scroll-view class="menu" scroll-x="true" style="white-space: nowrap; display: flex;"
				:show-scrollbar="false">
				<view class="longItem" :data-index="index" :class="item.code === code ? 'click' : ''"
					v-for="(item, index) in categoryList" :key="index" :id="'id' + index">
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>

		</view>
		<view class="vline"></view>
		<view class="box-middle inputbox">
			<view class="title">
				标题
			</view>
			<view class="line"></view>
			<view class="input">
				<uni-easyinput class="easyinput" v-model="title" placeholder="请输入帖子名称" :clearable="false"
					:placeholderStyle="`fontSize:${windowWidth>600?'17px':'25rpx'}`" :inputBorder="false"></uni-easyinput>
			</view>
		</view>
		<view class="box-middle inputbox" >
			<view class="title">
				心水
			</view>
			<view class="line"></view>
			<view class="input" @click="navigatorTo('/pages/post/cherish/index?code='+code)">
				<text class="xinshui">可以选择您的心水进行发布</text>
			</view>
			<uni-icons  @click="navigatorTo('/pages/post/cherish/index?code='+code)" type="right" :size="windowWidth>600?'20':'30rpx'" color="#cdcdd2"></uni-icons>
		</view>
		<view class="textareabox">
			<uni-easyinput class="textarea" type="textarea" v-model="content" :placeholder="placeholder"
				:clearable="false" :inputBorder="false" :placeholderStyle="`fontSize:${windowWidth>600?'17px':'25rpx'}`" ></uni-easyinput>
		</view>
		<view class="loadprev">
			加载上次内容
		</view>
		<view class="footfixed">
			<view class="">
				请勿发布联系方式和广告，一经发现直接封号!
			</view>
			<view class="useragreement">
				用户协议
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import {
		lotteryTypelistApi
	} from "@/api/api.js"
	import {
		codeToLottery
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				code: "",
				categoryList: [],
				title: "",
				content: "",
				placeholder: "",
				
			}
		},
		onLoad(options) {
			let app = getApp();
			this.windowWidth= app.globalData.windowWidth
			if (options.code) {
				this.code = options.code
				this.getlotteryTypelist()
				this.placeholder = "分享我的" + codeToLottery(options.code) + "心水..."
			}
		},

		methods: {
			getlotteryTypelist() {
				let that = this
				uni.showLoading()
				lotteryTypelistApi({
					show: true
				}).then(res => {
					uni.hideLoading()
					that.categoryList = res.data
				}).catch(err => {
					uni.hideLoading()
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
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
	}

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
				align-items: flex-end;
				text-align: right;
			}
		}

		::v-deep .uni-navbar__header-btns-left,
		::v-deep .uni-navbar__header-btns-right {
			width: 18% !important;
			min-width: 60px;
			position: relative;
			color: #fff;
		}
	}

	.longTab {
		display: flex;
		align-items: center;
		width: 100%;
		height: 60rpx;
		background-color: #fff;

		.menu {
			width: 100%;
			height: 100%;
			padding-right: 20rpx;
		}

		.longItem {
			background: #fff;
			height: 100%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 24rpx;
			margin-left: 20rpx;
			color: rgb(51, 51, 51);
			/*解决ios上滑动不流畅*/
			-webkit-overflow-scrolling: touch;

			&.click {
				color: rgb(245, 142, 3);
				border-bottom: 4rpx solid rgb(245, 142, 3);
			}
		}

	}

	.vline {
		width: 100%;
		height: 12rpx;
		background-color: rgb(238, 238, 238);
	}

	.inputbox {
		padding: 0 10rpx;
		height: 60rpx;

		.title {
			color: rgb(245, 142, 3);
			font-size: 30rpx;
		}

		.line {
			height: 40rpx;
			width: 2rpx;
			background-color: rgb(243, 243, 243);
			margin: 0 20rpx;
		}

		.input {
			min-width: 0;
			flex: 1 1 0%;
			height: 100%;
			display: flex;
			align-items: center;

			.easyinput {
				font-size: 25rpx;
			}
		}

		.xinshui {
			font-size: 25rpx;
			color: #cdcdd2;
		}

	}

	.textareabox {
		flex: 1 1 0%;
		min-height: 0;
		padding: 20rpx 20rpx 0;

		.textarea {
			width: 100%;
			height: 100%;
		}

		::v-deep .uni-easyinput__content.is-textarea {
			height: 100%;
		}

		::v-deep .uni-easyinput__content-textarea {
			height: 100%;
			margin: 0;
		}
	}

	.footfixed {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		height: 60rpx;
		font-size: 25rpx;
		color: rgb(245, 142, 3);

		.useragreement {
			cursor: pointer;
			font-size: 18rpx;
			color: #000;
		}
	}

	.loadprev {
		cursor: pointer;
		position: absolute;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 3.84px;
		bottom: 200rpx;
		left: 40rpx;
		border-color: rgb(245, 142, 3);
		border-radius: 6rpx;
		padding: 20rpx;
		background-color: rgb(255, 255, 255);
		color: rgb(245, 142, 3);
		font-size: 20rpx;
	}
	
	@media (min-width: 600px) {
		.longTab {
			height: 40px;
		
			.menu {
				padding-right: 10px;
			}
		
			.longItem {
				font-size: 17px;
				margin-left: 10px;
				&.click {
					border-bottom: 2px solid rgb(245, 142, 3);
				}
			}
		
		}
		.vline {
			height: 6px;
		}
		
		.inputbox {
			padding: 0 5px;
			height: 48px;
		
			.title {
				font-size: 28px;
			}
		
			.line {
				height: 20px;
				width: 1px;
				margin: 0 10px;
			}
		
			.input {
				.easyinput {
					font-size: 17px;
				}
			}
		
			.xinshui {
				font-size: 17px;
				color: #cdcdd2;
			}
		
		}
		
		
		.textareabox {
			flex: 1 1 0%;
			min-height: 0;
			padding: 10px 10px 0;
		
		}
		
		.footfixed {
			padding: 0 10px;
			height: 45px;
			font-size: 18px;
			color: rgb(245, 142, 3);
		
			.useragreement {
				font-size: 12px;
			}
		}
		
		.loadprev {
			bottom: 100px;
			left: 20px;
			border-color: rgb(245, 142, 3);
			border-radius: 3px;
			padding: 10px;
			font-size: 14px;
		}
		
	}
</style>
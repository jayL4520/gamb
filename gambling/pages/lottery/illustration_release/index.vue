<template>
	<view class="container">
		<navbar title="发布图解" class="navbar">
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
		<view class="box-middle inputbox">
			<view class="title">
				图解小组
			</view>
			<view class="input">
				第{{info.year}}{{info.issueNo}}期{{info.name}}图解
			</view>
		</view>
		
		<view class="textareabox">
			<uni-easyinput class="textarea" type="textarea" v-model="content" :placeholder="placeholder"
				:clearable="false" :inputBorder="false" :placeholderStyle="`fontSize:${windowWidth>600?'17px':'25rpx'}`" ></uni-easyinput>
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
		codeToLottery
	} from '@/utils/utils.js'
	import {
		getmaininfoApi,
	} from "@/api/colorimage.js"
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				id: "",
				info:{},
				title: "",
				content: "",
				placeholder: "",
				
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
				this.getdata()
			}
		},

		methods: {
			getdata() {
				let that = this
				uni.showLoading()
				getmaininfoApi({
					groupId: that.id,
					issueNo: that.issueNo,
					year: that.year,
				}).then(res => {
					uni.hideLoading()
					that.info = res.data
					that.placeholder = "分享我的" + codeToLottery(res.data.code) + "图解心水..."
				}).catch(err => {
					uni.hideLoading()
					setTimeout(() => {
						uni.showToast({
							title: err,
							duration: 2000,
							icon: "none",
							success() {
								setTimeout(() => {
									// uni.navigateBack()
								}, 2000)
							}
						})
					}, 200)
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
		padding: 0 20rpx;
		height: 60rpx;
		background: rgb(243, 243, 243);
		.title {
			color: rgb(245, 142, 3);
			font-size: 30rpx;
		}

		.input {
			min-width: 0;
			flex: 1 1 0%;
			height: 100%;
			display: flex;
			align-items: center;
			font-size: 25rpx;
			margin-left: 20rpx;
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
			padding: 0 10px;
			height: 48px;
		
			.title {
				font-size: 28px;
			}
		
			
		
			.input {
				font-size: 25px;
				margin-left: 10px;
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
		
	}
</style>
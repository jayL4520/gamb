<template>
	<view class="container">
		<navbar :title="navtitle" class="navbar">
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
					<view class="button" @click="selissuenum">
						<text>期数:{{issuenum}}</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="">
			<!-- <view class="topfixedh"></view> -->
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<bannerswiper></bannerswiper>
				<view class="toptypebox box-center">
					{{issuenum}}期内{{name=='特码热门'?'开出特码':name=='特码遗漏'?'未开出特码':name=='正码热门'?'开出正码':name=='正码遗漏'?'未开出正码':'未开出号码'}}的次数
				</view>
			</view>
			<view class="statisticslist">
				<view class="statisticsitem" v-for="(item,index) in statisticslist" :key="index">
					<view class="box-middle ballitems" v-for="(items,indexs) in item.convertlist" :key="indexs">
						<view class="ballitemsleft">
							<view class="">号码</view>
							<view class="">次数</view>
						</view>
						<view class="balllist">
							<view class="ballItem" v-for="(col,i) in items" :key="i">
								<view class="ballImg">
									<view class="ball">
										<image v-if="col.bose=='红'" class="img" src="@/static/img/ball_red.png" mode="">
										</image>
										<image v-if="col.bose=='蓝'" class="img" src="@/static/img/ball_blue.png"
											mode=""></image>
										<image v-if="col.bose=='绿'" class="img" src="@/static/img/ball_green.png"
											mode="">
										</image>
									</view>
									<view class="ball_num">
										{{col.hm}}
									</view>
								</view>
								<view class="ball_name">
									{{col.count}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<uni-popup ref="numberPopup" type="center" :mask-click="false">
			<view class="popup-container">
				<view class="popup-title">请输入期数</view>
				<view class="input-container">
					<input type="number" v-model="issuenuminput" class="number-input" />
				</view>

				<view class="button-group">
					<button class="btn cancel-btn" @click="onCancel">取消</button>
					<button class="btn confirm-btn" @click="onConfirm">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import {
		codeToRegion,
	} from '@/utils/utils.js'
	import {
		getFilteredDataApi,
	} from "@/api/api.js"
	export default {
		components: {
			navbar,
			bannerswiper,
		},
		data() {
			return {
				code: "",
				titleHeight: 0,
				swiperHeight: 0,
				list: [],
				issuenum: 100, //期数
				newyear: "",
				statisticslist: [],
				navtitle: "统计详情",
				name: "",
			}
		},
		onLoad(options) {
			let app = getApp();
			this.titleHeight = app.globalData.statusBarHeight
			if (options.code) {
				this.code = options.code
			}
			if (options.issuenum) {
				this.issuenum = options.issuenum
			}
			if (options.name) {
				this.navtitle = options.name
				this.name = options.name
			}
			let that = this;
			// let systemInfo = uni.getSystemInfoSync();
			// let statusBarHeight = systemInfo.statusBarHeight;
			// that.titleHeight = statusBarHeight + 44
			this.newyear = new Date().getFullYear();
			this.getFilteredData()
		},

		methods: {
			getFilteredData() {
				let that = this
				uni.showLoading()
				let statisticslist = []
				getFilteredDataApi({
					year: that.newyear,
					lotteryType: that.code,
					size: that.issuenum,
					type: "hm",
				}).then(res => {
					if (res.data) {
						res.data.list.forEach(x => {
							if (x.name == that.navtitle) {
								x.convertlist = that.convertTo2DArray(x.list, 7)
								statisticslist.push(x)
							}

						})
					}
					that.statisticslist = statisticslist
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			/**
			 * 将一维数组转换为每行固定数量元素的二维数组
			 * @param {Array} arr - 要转换的一维数组
			 * @param {number} itemsPerRow - 每行的元素数量，默认5个
			 * @returns {Array} 转换后的二维数组
			 */
			convertTo2DArray(arr, itemsPerRow = 5) {
				// 创建结果数组
				const result = [];

				// 遍历原数组，按指定数量分割
				for (let i = 0; i < arr.length; i += itemsPerRow) {
					// 从当前索引开始，截取指定数量的元素作为新数组的一行
					const row = arr.slice(i, i + itemsPerRow);
					result.push(row);
				}

				return result;
			},
			selissuenum() {
				this.issuenuminput = this.issuenum
				this.$refs.numberPopup.open()
			},
			// 取消按钮
			onCancel() {
				this.$refs.numberPopup.close()
			},

			// 确定按钮
			onConfirm() {
				if (!this.isPositiveInteger(this.issuenuminput)) {
					uni.showToast({
						title: '请输入正整数',
						icon: 'none'
					})
					return
				}
				this.issuenum = parseInt(this.issuenuminput)
				this.$refs.numberPopup.close()
				this.getFilteredData()

			},
			isPositiveInteger(value) {
				// 处理空值情况
				if (value === null || value === undefined || value === '') {
					return false;
				}

				// 转换为字符串处理（应对输入框的字符串输入）
				const strValue = String(value).trim();

				// 正则表达式：仅包含数字，且第一位不能为0（除非是单个0，但0不是正整数）
				const reg = /^[0-9]\d*$/;

				return reg.test(strValue);
			},
			navigatorTo(url) {
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
			font-size: 12px;

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

	.toptypebox {
		width: 100%;
		height: 45px;
		background: #fff;
		font-size: 28px;

	}


	.popup-container {
		width: 600rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;

		.popup-title {
			font-size: 36rpx;
			text-align: center;
			padding: 20rpx 0;
			border-bottom: 1px solid #eee;
			margin-bottom: 30rpx;
		}

		.input-container {
			padding: 10rpx 0;
		}

		.number-input {
			width: 100%;
			height: 80rpx;
			border: 1px solid #ddd;
			border-radius: 8rpx;
			padding: 0 20rpx;
			font-size: 32rpx;
			box-sizing: border-box;
			text-align: center;
		}

		.button-group {
			display: flex;
			margin-top: 40rpx;
		}

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			height: 90rpx;
			line-height: 90rpx;
			margin: 0 10rpx;
			padding: 0;
			font-size: 32rpx;
			border-radius: 8rpx;
		}

		.cancel-btn {
			background-color: #f5f5f5;
			color: #333;
		}

		.confirm-btn {
			background-color: #007aff;
			color: #fff;
		}
	}

	.statisticslist {
		.statisticsitem {

			.title {
				font-size: 30rpx;
				line-height: 60rpx;
				color: rgb(102, 102, 102);

				.name {
					font-size: 35rpx;
					color: rgb(51, 51, 51);
				}
			}
		}

		.list {
			display: flex;
			align-items: stretch;
			justify-content: space-between;

			.itemsleft {
				min-width: 0;
				flex: 1;
			}


			.righticonBox {
				width: 100rpx;
			}
		}

		.ballitems {
			background: #f6f6f6;
			border-bottom: 2rpx solid #e6e6e6;

			&:nth-child(2n) {
				background: #fff;
			}

			.ballitemsleft {
				font-size: 30rpx;
				color: rgb(102, 102, 102);
				line-height: 60rpx;
				padding-left: 15rpx;
			}

			.balllist {
				min-width: 0;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-around;

				&.bsballlist {
					justify-content: flex-start;

					.ballItem {
						margin-left: 30rpx;
					}
				}
			}
		}

		.ballItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: rgb(51, 51, 51);
			padding-top: 10rpx;
		}


		.ball_name {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: rgb(102, 102, 102);
			line-height: 60rpx;
		}

		.ballImg {
			position: relative;
			width: 60rpx;
			height: 60rpx;
			// margin-bottom: 16rpx;

			.ball {
				position: absolute;
				top: 0;
				left: 0;
				width: 60rpx;
				height: 60rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.ball_num {
				position: absolute;
				top: 13rpx;
				left: 18rpx;
				font-size: 22rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);

				&.red {
					left: 18rpx;
					color: rgb(167, 23, 26) !important;
				}

				&.blue {
					left: 18rpx;
					color: rgb(42, 87, 127);
				}

				&.green {
					left: 18rpx;
					color: rgb(57, 108, 21);
				}
			}

			.sxball_num {
				color: rgb(239, 126, 76);
				left: 20rpx;
			}

			.wsball_num {
				color: rgb(239, 126, 76);
				left: 15rpx;
			}

			.ball_num_tw {
				position: absolute;
				top: 15rpx;
				left: 15rpx;
				font-size: 25rpx;
				font-weight: bold;
				color: #fff;
			}
		}
	}

	@media (min-width: 600px) {
		.popup-container {
			width: 300px;
			border-radius: 8px;
			padding: 15px;

			.popup-title {
				font-size: 18px;
				padding: 10px 0;
				border-bottom: 1px solid #eee;
				margin-bottom: 15px;
			}

			.input-container {
				padding: 5px 0;
			}

			.number-input {
				height: 40px;
				border-radius: 4px;
				padding: 0 10px;
				font-size: 16px;
			}

			.button-group {
				margin-top: 20px;
			}

			.btn {
				height: 45px;
				line-height: 415px;
				margin: 0 5px !important;
				font-size: 16px;
				border-radius: 4px;
			}
		}

		.statisticslist {

			.ballitems {
				border-bottom: 1px solid #e6e6e6;

				.ballitemsleft {
					font-size: 26px;
					line-height: 36px;
					padding-left: 8px;
				}

				.balllist {
					&.bsballlist {

						.ballItem {
							margin-left: 15px;
						}
					}
				}
			}

			.ballItem {
				padding-top: 5px;
			}


			.ball_name {
				font-size: 26px;
				color: rgb(102, 102, 102);
				line-height: 38px;
			}

			.ballImg {
				width: 38px;
				height: 38px;

				.ball {

					width: 38px;
					height: 38px;
				}

				.ball_num {
					top: 6px;
					left: 9px;
					font-size: 17px;

				}


			}
		}

	}
</style>
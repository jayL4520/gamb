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
			<bannerswiper></bannerswiper>
			<view class="specialBox">
				<special ref="special" :info="info" :istb="true" :cols="7" :specialtb="specialtb" :name="specianame"
					@onclick="specialtbclick"></special>
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
	import special from "../components/special.vue"
	import {
		getMoreDataApi
	} from "@/api/api.js"

	export default {
		components: {
			navbar,
			special,
			bannerswiper,
		},
		data() {
			return {
				navtitle: "图表",
				issuenum: 100, //期数
				issuenuminput: 100,
				newyear: new Date().getFullYear(),
				info: {},
				specialtb: "0", //0=热门；1=遗漏
				type:"",
			}
		},
		onLoad(options) {
			// 获取系统信息
			let sysInfo = uni.getSystemInfoSync()
			// 获取窗口高度
			let windowHeight = sysInfo.windowHeight
			let statusBarHeight = sysInfo.statusBarHeight;
			let titleHeight = statusBarHeight + 44
			this.containerHeight = windowHeight - titleHeight
			if (options.type) {
				
				if (options.type == "lszs") {
					this.navtitle = "正码图表"
					this.specianame = "号码"
				} else if (options.type == "sxzm") {
					this.navtitle = "生肖正码冷热"
					this.specianame = "生肖"
				}
				this.code = options.code
				this.type = options.type
				this.issuenum=options.issuenum
				this.getData()
			}
		},

		methods: {
			specialtbclick(e) {
				this.info = {}
				this.specialtb = e
				this.getData()
			},
			getData() {
				let that = this
				uni.showLoading()
				getMoreDataApi({
					year: that.newyear,
					lotteryType: that.code,
					size: that.issuenum,
					type: that.type,
					tb: that.specialtb
				}).then(res => {
					if (res.data) {
						let data = res.data
						data.name = res.data.list[0].name
						data.remarks = res.data.list[0].remarks
						data.convertlist = that.convertTo2DArray(res.data.list[0].list, 7)
						that.$refs.special.getchartData(res.data.list[0].list)
						that.info = data
					}
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
				this.info = {}
				this.getData()
				this.$refs.numberPopup.close()

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

	.bannerswiper {
		height: 57px !important;
	
		.bannerimg {
			width: 100%;
			height: 57px !important;
		}
	}
	.specialBox{
		padding-bottom: 2rpx;
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
</style>
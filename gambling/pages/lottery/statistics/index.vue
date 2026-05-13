<template>
	<view class="container">
		<!-- 统计 -->
		<template v-if="tabbar=='statistics'">
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
					<view class="toptypebox box-middle">
						<view class="type box-center" :class="{active:statisticstype=='hm'}"
							@click="statisticstypeclick('hm')">
							号码
						</view>
						<view class="type box-center" :class="{active:statisticstype=='sx'}"
							@click="statisticstypeclick('sx')">
							生肖
						</view>
						<view class="type box-center" :class="{active:statisticstype=='bs'}"
							@click="statisticstypeclick('bs')">
							波色
						</view>
						<view class="type box-center" :class="{active:statisticstype=='ws'}"
							@click="statisticstypeclick('ws')">
							尾数
						</view>
					</view>
				</view>
				<statistics :list="statisticslist" :type="statisticstype" @onClick="statisticsnavigator"></statistics>

			</view>

		</template>
		<!-- 属性参照 -->
		<template v-if="tabbar=='attribute'">
			<navbar :title="attributenavtitle" class="navbar">
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
					<view class="toptypebox box-middle">
						<view class="type box-center" :class="{active:attributetype==1}" @click="attributetypeclick(1)">
							生肖/五行/波色
						</view>
						<view class="type box-center" :class="{active:attributetype==2}" @click="attributetypeclick(2)">
							家禽野兽/其他
						</view>
					</view>
				</view>
				<attribute :type="attributetype" :lists="attributelists"></attribute>
			</view>
		</template>
		<!-- 特码图表 -->
		<template v-if="tabbar=='special'">
			<navbar :title="specialnavtitle" class="navbar">
				<template v-slot:navleft>
					<view class="navbutton">
						<view class="backbutton" @click="$backOrHome">
							<uni-icons class="back" color="#fff" type="left" size="20" />
							<text class="">返回</text>
						</view>
					</view>
				</template>
				<template v-slot:navright>
					<view class="navrightbutton" v-if="istb">
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
					<view class="toptypebox box-middle ">
						<scroll-view class="tmtbtoptypebox" scroll-x="true" style="white-space: nowrap; display: flex;"
							:show-scrollbar="false">
							<view class="type box-center" :class="{active:specialtype=='tmls'}"
								@click="specialtypeclick('tmls')">
								特码历史
							</view>
							<view class="type box-center" :class="{active:specialtype=='txlr'}"
								@click="specialtypeclick('txlr')">
								特肖冷热
							</view>
							<view class="type box-center" :class="{active:specialtype=='tmbd'}"
								@click="specialtypeclick('tmbd')">
								特码波段
							</view>
							<view class="type box-center" :class="{active:specialtype=='twlr'}"
								@click="specialtypeclick('twlr')">
								特尾冷热
							</view>
							<view class="type box-center" :class="{active:specialtype=='bslr'}"
								@click="specialtypeclick('bslr')">
								特码波段
							</view>
							<!-- 	<view class="type box-center" :class="{active:specialtype=='tmlm'}"
										@click="specialtypeclick('tmlm')">
										特码两面
									</view> -->
						</scroll-view>

					</view>
				</view>
				<special ref="special" :info="speciainfo" :cols="cols" :istb="istb" :specialtb="specialtb" :name="specianame"
					@onclick="specialtbclick"></special>
			</view>

		</template>

		<!-- 更多图表 -->
		<template v-if="tabbar=='more'">
			<navbar :title="specialnavtitle" class="navbar">
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
				<!-- <view class="topfixedh-more"></view> -->
				<view class="topfixed" :style="{ top: titleHeight + 'px' }">
					<bannerswiper></bannerswiper>

				</view>
				<view class="moremenu">
					<view class="menuitem box-middle" @click="navigatorTo(`/pages/lottery/chartschart/index?code=${code}&issuenum=${issuenum}&type=lszs`)">
						<text>正码历史走势图</text>
						<uni-icons class="righticon" type="right" size="16"></uni-icons>
					</view>
					<view class="menuitem box-middle" @click="navigatorTo(`/pages/lottery/tablechart/index?code=${code}&issuenum=${issuenum}&type=wsdx`)">
						<text>尾数大小统计图</text>
						<uni-icons class="righticon" type="right" size="16"></uni-icons>
					</view>
					<view class="menuitem box-middle" @click="navigatorTo(`/pages/lottery/chartschart/index?code=${code}&issuenum=${issuenum}&type=sxzm`)">
						<text>生肖正码冷热图</text>
						<uni-icons class="righticon" type="right" size="16"></uni-icons>
					</view>
					<view class="menuitem box-middle" @click="navigatorTo(`/pages/lottery/tablechart/index?code=${code}&issuenum=${issuenum}&type=lmzs`)">
						<text>连码走势图</text>
						<uni-icons class="righticon" type="right" size="16"></uni-icons>
					</view>
					<view class="menuitem box-middle" @click="navigatorTo(`/pages/lottery/tablechart/index?code=${code}&issuenum=${issuenum}&type=lxzs`)">
						<text>连肖走势图</text>
						<uni-icons class="righticon" type="right" size="16"></uni-icons>
					</view>

				</view>

			</view>

		</template>


		<view class="footfixedh"></view>
		<view class="footfixed">
			<view class="footitem box-center" :class="{active:tabbar=='statistics'}"
				@click="foottabclick('statistics')">
				<view class="icon box-center">
					统
				</view>
				<text>{{navtitle}}</text>
			</view>
			<view class="footitem box-center" :class="{active:tabbar=='attribute'}" @click="foottabclick('attribute')">
				<view class="icon box-center">
					属
				</view>
				<text>属性参照</text>
			</view>
			<view class="footitem box-center" :class="{active:tabbar=='special'}" @click="foottabclick('special')">
				<view class="icon box-center">
					特
				</view>
				<text>特码图表</text>
			</view>
			<view class="footitem box-center" :class="{active:tabbar=='more'}" @click="foottabclick('more')">
				<view class="icon box-center">
					···
				</view>
				<text>更多图表</text>
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
	import statistics from "./statistics.vue"
	import attribute from "./attribute.vue"
	import special from "../components/special.vue"
	import {
		codeToRegion,
	} from '@/utils/utils.js'
	import {
		getFilteredDataApi,
		getTemaDataApi,
		getCankaoDataApi,
	} from "@/api/api.js"

	export default {
		components: {
			navbar,
			bannerswiper,
			statistics,
			attribute,
			special,
		},
		data() {
			return {
				navtitle: "统计",
				attributenavtitle: "属性参照",
				specialnavtitle: "特码图表",
				morenavtitle: "更多图表",
				code: "",
				titleHeight: 0,
				swiperHeight: 0,
				list: [],
				tabbar: "statistics", //statistics统计 attribute属性参照 special特码图表 more更多图表
				issuenum: 100, //期数
				issuenuminput:100,
				newyear: new Date().getFullYear(),
				statisticstype: "hm", //hm=号码统计；sx=生肖；bs=波色；ws=尾数
				statisticslist: [],
				attributetype: 1, //1=生肖五行波色号码；2=家禽野兽其他号码，默认为1
				attributelists: [],
				specialtype: "tmls", //tmls=特码历史；txlr=特肖冷热；tmbd=特码波段；twlr=特尾冷热；bslr=特码波段；tmlm=特码两面
				speciainfo: {},
				specialtb: "0", //0=热门；1=遗漏
				istb: false,
				specianame: "号码",
				cols:7,
			}
		},
		onLoad(options) {
			if (options.code) {
				this.navtitle = codeToRegion(options.code) + "统计"
				this.attributenavtitle = codeToRegion(options.code) + "属性参照"
				this.specialnavtitle = codeToRegion(options.code) + "特码图表"
				this.morenavtitle = "更多" + codeToRegion(options.code) + "图表"
				this.code = options.code
			}
			let that = this;
			let systemInfo = uni.getSystemInfoSync();
			let statusBarHeight = systemInfo.statusBarHeight;
			that.titleHeight = statusBarHeight + 44
			let windowHeight = systemInfo.windowHeight
			let height = that.titleHeight + 160
			that.$set(that, 'swiperHeight', windowHeight - height);
			this.getFilteredData()
		},

		methods: {
			specialtbclick(e) {
				this.speciainfo = {}
				this.specialtb = e
				this.getTemaData()
			},
			statisticsnavigator(e) {
				uni.navigateTo({
					url: `/pages/lottery/statisticsdetail/index?name=${e}&code=${this.code}&issuenum=${this.issuenum}`
				})
			},
			specialtypeclick(e) {
				if (this.specialtype == e) return
				if(e=='tmbd'){
					this.specialtb = "1"
				}else{
					this.specialtb = "0"
				}
				this.specialtype = e
				this.speciainfo = {}
				this.getTemaData()
			},
			getTemaData() {
				let that = this
				uni.showLoading()
				getTemaDataApi({
					year: that.newyear,
					lotteryType: that.code,
					size: that.issuenum,
					type: that.specialtype,
					tb: that.specialtb
				}).then(res => {
					if (res.data) {
						let data = res.data
						data.name = res.data.list[0].name
						data.remarks = res.data.list[0].remarks
						if (that.specialtype == "tmls") {
							data.convertlist = that.convertTo2DArray(res.data.list[0].list, 7)
							that.specianame = "号码"
							that.cols=7
							that.istb = true
							that.$refs.special.getchartData(res.data.list[0].list)
						} else if (that.specialtype == "txlr") {
							data.convertlist = that.convertTo2DArray(res.data.list[0].list, 6)
							that.specianame = "生肖"
							that.cols=6
							that.istb = true
							that.$refs.special.getchartData(res.data.list[0].list)
						} else if (that.specialtype == "tmbd") {
							data.convertlist = that.convertTo2DArray(res.data.list[0].list, 5)
							that.specianame = "号码段"
							that.cols=5
							that.istb = false
							that.$refs.special.getchartData(res.data.list[0].list)
						} else if (that.specialtype == "twlr") {
							data.convertlist = that.convertTo2DArray(res.data.list[0].list, 5)
							that.specianame = "尾数"
							that.cols=5
							that.istb = true
							that.$refs.special.getchartData(res.data.list[0].list)
						} else if (that.specialtype == "bslr") {
							data.convertlist = that.convertTo2DArray(res.data.list[0].list, 3)
							that.specianame = "波色"
							that.cols=3
							that.istb = true
							that.$refs.special.getchartData(res.data.list[0].list)
						} else {
							data.convertlist = that.convertTo2DArray(res.data.list[0].list, 4)
							that.specianame = "两面"
							that.cols=4
							that.istb = true
							that.$refs.special.getchartData(res.data.list[0].list)
						}


						that.speciainfo = data
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			attributetypeclick(e) {
				if (this.attributetype == e) return
				this.attributetype = e
				this.attributelists = {}
				this.getCankaoData()
			},
			getCankaoData() {
				let that = this
				uni.showLoading()
				getCankaoDataApi({
					dataType: that.attributetype,
				}).then(res => {
					if (res.data) {
						this.attributelists = res.data
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			statisticstypeclick(e) {
				if (this.statisticstype == e) return
				this.statisticstype = e
				this.statisticslist = []
				this.getFilteredData()
			},

			getFilteredData() {
				let that = this
				uni.showLoading()
				let statisticslist = []
				getFilteredDataApi({
					year: that.newyear,
					lotteryType: that.code,
					size: that.issuenum,
					type: that.statisticstype,
				}).then(res => {
					if (res.data) {
						res.data.list.forEach(x => {
							if (that.statisticstype == 'sx') {
								x.convertlist = that.convertTo2DArray(x.list, 6)
							} else if (that.statisticstype == 'sx') {
								x.convertlist = that.convertTo2DArray(x.list, 3)
							} else {
								x.convertlist = that.convertTo2DArray(x.list, 5)
							}
							statisticslist.push(x)
						})
					}
					that.statisticslist = statisticslist
					console.log(that.statisticslist, "that.statisticslist");
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
				if (this.tabbar == 'statistics') {
					this.statisticslist = []
					this.getFilteredData()
				} else if (this.tabbar == 'special') {
					this.speciainfo = {}
					this.getTemaData()
				}
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
			foottabclick(e) {
				if (this.tabbar == e) return
				if (e == "statistics") {
					this.statisticslist = []
					this.getFilteredData()
				} else if (e == "attribute") {
					this.attributelists = {}
					this.getCankaoData()
				} else if (e == "special") {
					this.speciainfo = {}
					this.specialtb = "0"
					this.getTemaData()
				}
				this.tabbar = e
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
	page {
		background: #F2F2F2;
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
		z-index: 10;
	}

	// .topfixedh-more {
	// 	height: 57px;
	// }

	// .topfixedh {
	// 	height: 113px;
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
		height: 56px;
		background: #fff;

		.type {
			flex: 1 1 0%;
			height: 100%;
			color: rgb(153, 153, 153);
			font-size: 20px;
			border-bottom: 2px solid transparent;

			&.active {
				color: rgb(245, 142, 3);
				border-bottom: 2px solid rgb(245, 142, 3);
			}
		}
	}

	.tmtbtoptypebox {
		width: 100%;
		height: 100%;
		// display: flex;
		// overflow-y: auto;
		border-bottom: 1rpx solid #e6e6e6;

		.type {
			display: inline-flex;
			min-width: 100px;
		}
	}

	.footfixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
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
		background-color: #fff;
		border-top: 2rpx solid rgb(240, 241, 237);
		margin: 0 auto;
		.footitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 25%;
			font-size: 13px;
			color: #999999;

			.icon {
				width: 25px;
				height: 25px;
				border-radius: 50%;
				font-size: 14px;
				border: 1px solid #999999;
				padding-bottom: 3px;
			}

			&.active {
				color: rgb(71, 40, 34);

				.icon {
					border: 1px solid rgb(71, 40, 34);
					color: #fff;
					background: rgb(71, 40, 34);
				}
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
			margin: 0 10rpx !important;
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

	.moremenu {
		background: #fff;

		.menuitem {
			justify-content: space-between;
			padding: 20rpx;
			font-size: 35rpx;
			border-bottom: 2rpx solid rgb(247, 247, 247);
		}
	}
	
	@media (min-width: 600px){
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
		
		.moremenu {
			.menuitem {
				padding: 10px;
				font-size: 28px;
				border-bottom: 1px solid rgb(247, 247, 247);
			}
		}
		
	}
	
</style>
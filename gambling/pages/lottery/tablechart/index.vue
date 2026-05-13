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
				<view class="navbutton">
					<picker mode="selector" :range="yearList" :value="selectedIndex" @change="onYearChange"
						class="year-picker">
						<view class="yearbutton">
							<i class="iconfont icon-nianfen"></i>
							<text class="">年份</text>
						</view>
					</picker>
				</view>
			</template>
		</navbar>
		<view class="">
			<!-- <view class="topfixedh"></view> -->
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<bannerswiper></bannerswiper>
				<view class="toptypebox box-middle">
					<view class="qhtype box-center">
						期号
					</view>
					<view class="type box-center">
						正一
					</view>
					<view class="type box-center">
						正二
					</view>
					<view class="type box-center">
						正三
					</view>
					<view class="type box-center">
						正四
					</view>
					<view class="type box-center">
						正五
					</view>
					<view class="type box-center">
						正六
					</view>
					<view class="type box-center">
						特码
					</view>

				</view>
			</view>
			<view class="" v-if="type == 'wsdx'">
				<view v-for="(item,index) in list" :key="index" class="tr">
					<view class="qhtd box-center">
						{{item.qh}}
					</view>
					<view class="td box-center" v-for="(items,indexs) in item.list" :key="items"
						:class="items=='大'?'da':'xiao'">
						{{items}}
					</view>
				</view>
			</view>
			<view class="" v-if="type == 'lmzs'">
				<view v-for="(item,index) in list" :key="index" class="tr">
					<view class="qhtd box-center">
						{{item.qh}}
					</view>
					<view class="td box-center" v-for="(items,indexs) in item.list" :key="items">
						<text :class="{serial:item.list2.includes(items)}">{{items}}</text>
					</view>
				</view>
			</view>
			<view class="" v-if="type == 'lxzs'">
				<view v-for="(item,index) in list" :key="index" class="tr">
					<view class="qhtd box-center">
						{{item.qh}}
					</view>
					<view class="td box-center" v-for="(items,indexs) in item.list" :key="items">
						<text :class="{serial:item.list2.includes(indexs)}">{{items}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import {
		getMoreDataApi
	} from "@/api/api.js"
	export default {
		components: {
			navbar,
			bannerswiper,
		},
		data() {
			return {
				navtitle: "图表",
				issuenum: 100, //期数
				newyear: "",
				list: [],
				specialtb: "0", //0=热门；1=遗漏
				specianame: "号码",
				type: "",
				code: "",
				yearList: [], // 年份数组
				selectedIndex: 0, // 当前选中索引
				titleHeight: "",
			}
		},
		onLoad(options) {
			let app = getApp();
			this.titleHeight= app.globalData.statusBarHeight
			// // 获取系统信息
			// let sysInfo = uni.getSystemInfoSync()
			// // 获取窗口高度
			// let windowHeight = sysInfo.windowHeight
			// let statusBarHeight = sysInfo.statusBarHeight;
			// this.titleHeight = statusBarHeight + 44
			let now = new Date();
			this.newyear = now.getFullYear();
			this.initYearList(1980, this.newyear);
			if (options.type) {
				if (options.type == "wsdx") {
					this.navtitle = "尾数大小统计图"
				} else if (options.type == "lmzs") {
					this.navtitle = "连码走势图"
				} else if (options.type == "lxzs") {
					this.navtitle = "连肖走势图"
				}
				this.code = options.code
				this.type = options.type
				this.issuenum=options.issuenum
				this.getdatalist()
			}
		},

		methods: {

			getdatalist() {
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
						console.log(res.data, "res.data.");
						that.list = res.data.list.list
						console.log(list, "list");
						// let data = res.data
						// data.name = res.data.list[0].name
						// data.remarks = res.data.list[0].remarks
						// data.convertlist = that.convertTo2DArray(res.data.list[0].list, 7)
						// that.$refs.special.getchartData(res.data.list[0].list)
						// that.info = data
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			// 初始化年份列表
			initYearList(startYear, endYear) {
				// 生成从起始年到结束年的数组
				for (let i = endYear; i >= startYear; i--) {
					this.yearList.push(i);
				}
				// 默认选中当前年
				this.selectedIndex = this.yearList.indexOf(this.newyear);
			},

			// 年份选择变化
			onYearChange(e) {
				const index = e.detail.value;
				this.selectedIndex = index;
				const selectedYear = this.yearList[index];
				// 触发自定义事件，将选中的年份传递给父组件
				this.$emit('yearChange', selectedYear);
				this.newyear = selectedYear
				this.list = []
				this.getdatalist()
				// console.log('选中的年份：', selectedYear);
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

		.yearbutton {
			cursor: pointer;
			width: 25px;
			margin: 0 3px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.year-picker {
			width: 100%;
			height: 100%;

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

	.topfixedh-more {
		height: 57px;
	}

	// .topfixedh {
	// 	height: 87px;
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
		height: 30px;
		font-size: 16px;
		background-color: rgb(245, 142, 3);
		color: #fff;

		.qhtype {
			width: 150rpx;
			height: 100%;
		}

		.type {
			flex: 1 1 0%;
			height: 100%;
			// border-right: 2rpx solid rgb(230, 230, 230);
		}
	}

	.tr {
		display: flex;
		align-items: stretch;
		background: #fff;
		height: 30px;
		font-size: 14px;
		color: rgb(86, 96, 96);

		&:nth-child(2n) {
			background: rgb(243, 243, 243);
		}

		.qhtd {
			width: 150rpx;
			height: 100%;
		}

		.td {
			flex: 1 1 0%;
			height: 100%;
		}

		.da {
			color: rgb(197, 50, 44);
		}

		.xiao {
			color: rgb(5, 92, 153);
		}

		.serial {
			display: inline-block;
			width: 24px;
			height: 24px;
			border-radius: 12px;
			background-color: rgb(197, 50, 44);
			color: #fff;
			text-align: center;
			line-height: 24px;
		}
	}
</style>
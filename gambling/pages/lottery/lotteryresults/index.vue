<template>
	<view class="container">
		<!-- 记录 -->
		<template v-if="foottab=='results'">
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
					<view class="yearbox">
						<view class="yeartitle">
							{{newyear}}年开奖
						</view>
						<view class="box-middle">
							<view class="filteritem" :class="{active:sort=='desc'}" @click="sortclick">
								{{sort=='desc'?'降序':'升序'}}
							</view>
							<view class="filteritem" :class="{active:fiveelem}" @click="fiveelem=!fiveelem">
								五行
							</view>
							<view class="filteritem" @click="sequenceclick">
								<text>{{sequence=='falling'?'落球顺序':sequence=='ase'?'平码升序':'平码降序'}}</text>
								<i class="iconfont icon-24gf-arrowDown3"></i>
							</view>
						</view>
						<view class="sequencetype" v-if="mask">
							<view class="sequencetypeitem box-center" :class="{active:sequence=='falling'}"
								@click.stop="sequenceitemclick('falling')">
								落球顺序
							</view>
							<view class="sequencetypeitem box-center" :class="{active:sequence=='ase'}"
								@click.stop="sequenceitemclick('ase')">
								平码升序
							</view>
							<view class="sequencetypeitem box-center" :class="{active:sequence=='desc'}"
								@click.stop="sequenceitemclick('desc')">
								平码降序
							</view>
						</view>
					</view>
				</view>
				<view class="scroll-box">
					<view class="scrolllist">
						<view class="resultsitem" v-for="(item,index) in resultslist" :key="index"
							@click="navigatorTo('/pages/lottery/lotteryinquiry/index?id='+item.id)">
							<view class="resultsitemdate">
								<view class="dateleft">
									<i class="iconfont icon-rili"></i>
									<text class="period">{{item.period}}期</text>
									<text>{{formatTimestamp1(item.date)}}</text>
								</view>
								<view class="dateright">
									<view class="button">
										{{item.lastNum>=25?'大':'小'}}
									</view>
									<view class="button">
										{{oddEven(item.lastNum)}}
									</view>
									<view class="button">
										合{{oddEven(item.total)}}
									</view>
									<view class="button">
										总和{{item.total>=175?'大':'小'}}{{item.total}}
									</view>
								</view>
							</view>
							<view class="ballList" v-if="code!='TW'">
								<view class="ballItem" v-for="(items,indexs) in item.ball" :key="indexs">
									<view class="ballImg">
										<view class="ball">
											<image v-if="items.sb=='red'" class="img" src="@/static/img/ball_red.png"
												mode=""></image>
											<image v-if="items.sb=='blue'" class="img" src="@/static/img/ball_blue.png"
												mode=""></image>
											<image v-if="items.sb=='green'" class="img"
												src="@/static/img/ball_green.png" mode="">
											</image>
										</view>
										<view class="ball_num">
											{{items.num}}
										</view>
									</view>
									<view class="ball_name">
										{{items.sx}}
										<view v-if="fiveelem">/
											<text v-if="items.wx=='金'" class="gold">{{items.wx}}</text>
											<text v-if="items.wx=='木'" class="wood">{{items.wx}}</text>
											<text v-if="items.wx=='水'" class="water">{{items.wx}}</text>
											<text v-if="items.wx=='火'" class="fire">{{items.wx}}</text>
											<text v-if="items.wx=='土'" class="soil">{{items.wx}}</text>
										</view>
									</view>
								</view>
								<view class="jiaball" v-if="item.lastBall">
									<view class="jia">
										+
									</view>
									<view class="ballItem">
										<view class="ballImg">
											<view class="ball">
												<image v-if="item.lastBall.sb=='red'" class="img"
													src="@/static/img/ball_red.png" mode=""></image>
												<image v-if="item.lastBall.sb=='blue'" class="img"
													src="@/static/img/ball_blue.png" mode=""></image>
												<image v-if="item.lastBall.sb=='green'" class="img"
													src="@/static/img/ball_green.png" mode="">
												</image>
											</view>
											<view class="ball_num">
												{{item.lastBall.num}}
											</view>
										</view>
										<view class="ball_name">
											{{item.lastBall.sx}}
											<view v-if="fiveelem">
												/<text v-if="item.lastBall.wx=='金'"
													class="gold">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='木'"
													class="wood">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='水'"
													class="water">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='火'"
													class="fire">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='土'"
													class="soil">{{item.lastBall.wx}}</text>
											</view>
										</view>
									</view>
								</view>
								<uni-icons class="righticon" type="right" size="16"></uni-icons>
							</view>
							<view class="ballList" v-if="code=='TW'">
								<view class="ballItem" v-for="(items,indexs) in item.ball" :key="indexs">
									<view class="ballImg">
										<view class="ball">
											<image v-if="items.sb=='red'" class="img"
												src="@/static/img/icon_dlt_red.png" mode=""></image>
											<image v-if="items.sb=='blue'" class="img"
												src="@/static/img/icon_dlt_bule.png" mode=""></image>
											<image v-if="items.sb=='green'" class="img"
												src="@/static/img/icon_dlt_green.png" mode="">
											</image>
										</view>
										<view class="ball_num_tw">
											{{items.num}}
										</view>
									</view>
									<view class="ball_name">
										{{items.sx}}
										<view v-if="fiveelem">/
											<text v-if="items.wx=='金'" class="gold">{{items.wx}}</text>
											<text v-if="items.wx=='木'" class="wood">{{items.wx}}</text>
											<text v-if="items.wx=='水'" class="water">{{items.wx}}</text>
											<text v-if="items.wx=='火'" class="fire">{{items.wx}}</text>
											<text v-if="items.wx=='土'" class="soil">{{items.wx}}</text>
										</view>
									</view>
								</view>
								<view class="jiaball" v-if="item.lastBall">
									<view class="jia">
										+
									</view>
									<view class="ballItem">
										<view class="ballImg">
											<view class="ball">
												<image v-if="item.lastBall.sb=='red'" class="img"
													src="@/static/img/icon_dlt_red.png" mode=""></image>
												<image v-if="item.lastBall.sb=='blue'" class="img"
													src="@/static/img/icon_dlt_bule.png" mode=""></image>
												<image v-if="item.lastBall.sb=='green'" class="img"
													src="@/static/img/icon_dlt_green.png" mode="">
												</image>
											</view>
											<view class="ball_num_tw">
												{{item.lastBall.num}}
											</view>
										</view>
										<view class="ball_name">
											{{item.lastBall.sx}}
											<view v-if="fiveelem">
												/<text v-if="item.lastBall.wx=='金'"
													class="gold">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='木'"
													class="wood">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='水'"
													class="water">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='火'"
													class="fire">{{item.lastBall.wx}}</text>
												<text v-if="item.lastBall.wx=='土'"
													class="soil">{{item.lastBall.wx}}</text>
											</view>
										</view>
									</view>
								</view>
								<uni-icons class="righticon" type="right" size="16"></uni-icons>
							</view>

						</view>
					</view>

				</view>

			</view>

		</template>
		<!-- 日历 -->
		<template v-else>
			<navbar :title="datenavtitle" class="navbar">
				<template v-slot:navleft>
					<view class="navbutton">
						<view class="backbutton" @click="$backOrHome">
							<uni-icons class="back" color="#fff" type="left" size="20" />
							<text class="">返回</text>
						</view>
					</view>
				</template>
			</navbar>
			<view class="calendarbox">
				<view class="introduction box-center">
					<image class="bg_tlsc" src="../static/img/bg_tlsc.png" mode=""></image>
					簡介：揽珠日期对照表，可查看历史揽珠开奖日期。
				</view>
				<view class="">
					<uni-calendar :lunar="false" :insert="true" :showMonth="false" :selected="selected"
						@monthSwitch="handleMonthSwitch" @change="handleChange"></uni-calendar>
				</view>
				<view class="selectinfo">
					{{selectinfo}}
				</view>
			</view>
		</template>
		<view class="footfixedh" v-if="code=='HK'">

		</view>
		<view class="footfixed" v-if="code=='HK'">
			<view class="footitem box-center" :class="{active:foottab=='results'}" @click="foottabclick('results')">
				<i class="iconfont icon-a-rili6"></i>
				<text>开奖记录</text>
			</view>
			<view class="footitem box-center" :class="{active:foottab=='date'}" @click="foottabclick('date')">
				<i class="iconfont icon-rili1"></i>
				<text>开奖日期</text>
			</view>
		</view>
		<view class="mask" v-if="mask" @click="mask=false">

		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import {
		codeToRegion,
		codeToLottery,
		formatTimestamp1,
		formatTimestamp2,
		oddEven,
	} from '@/utils/utils.js'
	import {
		datalistApi,
		getDrawWinApi
	} from "@/api/api.js"
	export default {
		components: {
			navbar,
			bannerswiper,
		},
		data() {
			return {
				titleHeight: 0,
				navtitle: "开奖记录",
				datenavtitle: "开奖日期",
				sort: "ase", //ase升序 desc降序
				fiveelem: false, //五行
				sequence: "falling", //falling落球顺序 ase升序 desc降序
				resultslist: [],
				code: "",
				foottab: "results", //results记录 date日期
				yearList: [], // 年份数组
				selectedIndex: 0, // 当前选中索引
				newyear: "", // 当前年份
				mask: false,
				originlist: [],
				startDate: '',
				endDate: '',
				currentYear: "",
				currentMonth: "",
				currentDate: "", //今日
				selected: [],
				selectinfo: "",
				pageNum: 1,
				pageSize: 49,
				total: 0,
			}
		},
		onLoad(options) {
			var that = this;
			let app = getApp();
			this.titleHeight = app.globalData.statusBarHeight
			// let systemInfo = uni.getSystemInfoSync();
			// let statusBarHeight = systemInfo.statusBarHeight;
			// that.titleHeight = statusBarHeight + 44
			if (options.code) {
				this.navtitle = codeToRegion(options.code) + "开奖记录"
				this.datenavtitle = codeToLottery(options.code) + "开奖日期"
				this.code = options.code
			}

			this.resultslist = []
			// 初始化日期
			const now = new Date();
			this.newyear = now.getFullYear();
			this.initYearList(1980, this.newyear);
			this.currentYear = now.getFullYear();
			this.currentMonth = now.getMonth() + 1; // 0-11表示1-12月

			// 设置当前日期为选中日期
			this.currentDate = this.formatDate(now);
			this.getdatalist()
		},

		methods: {
			formatTimestamp1,
			oddEven,
			getDrawWin() {
				uni.showLoading()
				let selected = []
				getDrawWinApi({
					year: this.currentYear,
					type: this.code,
					mon: this.currentMonth,
				}).then(res => {
					if (res.data) {
						res.data.forEach(x => {
							selected.push({
								date: formatTimestamp2(x.date),
								data: x
							})
						})
						this.selected = selected
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			foottabclick(e) {
				if (this.foottab == e) return;
				this.foottab = e
				if (e == 'date') {
					this.getDrawWin()
				}
			},
			// 格式化日期为yyyy-mm-dd格式
			formatDate(date) {
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
			},

			// 数字补零
			padZero(num) {
				return num < 10 ? `0${num}` : num;
			},

			// 处理月份切换事件
			handleMonthSwitch(e) {
				this.currentYear = e.year
				this.currentMonth = e.month
				this.getDrawWin()
				// 可以在这里限制月份切换范围
				// const {
				// 	year,
				// 	month
				// } = e;
				// const targetMonth = (year - this.newyear) * 12 + (month - 1);
				// const currentTotalMonth = this.newyear * 12 + this.currentMonth;

				// 如果切换到超出范围的月份，自动切回
				// if (targetMonth > currentTotalMonth + 1) {
				// 	// 切换到下个月
				// 	this.$refs.calendar.switchMonth(this.newyear, this.currentMonth + 2);
				// } else if (targetMonth < currentTotalMonth) {
				// 	// 切换到当前月
				// 	this.$refs.calendar.switchMonth(this.newyear, this.currentMonth + 1);
				// }
			},

			// 处理日期选择事件
			handleChange(e) {
				console.log(e, "eee");
				let {
					extraInfo,
					lunar
				} = e, str = " 非开奖日期"
				if (extraInfo.data) {
					str = " " + Number(extraInfo.data.period) + "期"
				}
				if (lunar.isToday) {
					this.selectinfo = "今天 农历" + lunar.gzYear + lunar.IMonthCn + lunar.IDayCn + str
				} else {
					this.selectinfo = "农历" + lunar.gzYear + lunar.IMonthCn + lunar.IDayCn + str
				}
			},
			//排序
			sortclick() {
				let sort = this.sort
				if (sort == "ase") {
					this.sort = "desc"
					this.resultslist = this.resultslist.sort((a, b) => {
						return a.period - b.period;
					});

				} else {
					this.sort = "ase"
					this.resultslist = this.resultslist.sort((a, b) => {
						return b.period - a.period;
					});
				}


			},
			// 顺序
			sequenceclick() {
				this.mask = !this.mask
			},
			sequenceitemclick(e) {
				if (this.sequence == e) return;
				if (e == "falling") {
					this.resultslist = [...this.originlist]
				} else if (e == "ase") {
					this.resultslist.forEach(x => {
						let copiedArr = [...x.ball];
						// 排序
						let sortedArr = copiedArr.sort(((a, b) => a.num - b.num));
						x.ball = sortedArr
					})

					this.resultslist = [...this.resultslist]
				} else {
					this.resultslist.forEach(x => {
						let copiedArr = [...x.ball];
						// 排序
						let sortedArr = copiedArr.sort(((a, b) => b.num - a.num));
						x.ball = sortedArr
					})

					this.resultslist = [...this.resultslist]
				}
				this.$set(this, "resultslist", this.resultslist)
				this.sequence = e
				this.mask = false
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
				this.resultslist = []
				this.originlist = []
				this.pageNum = 1
				this.getdatalist()
				// console.log('选中的年份：', selectedYear);
			},
			getdatalist() {
				let that = this;
				uni.showLoading()
				datalistApi({
					year: that.newyear,
					lotteryType: that.code,
					status: 1,
					pageNum: that.pageNum,
					pageSize: that.pageSize,
				}).then(res => {
					this.total = res.total
					if (res.rows) {
						res.rows.forEach(x => {
							let numberarr = x.numbers.split(",")
							let lastNum = [...numberarr].pop();
							let sbarr = x.sb.split(",")
							let sxarr = x.sx.split(",")
							let wxarr = x.wx.split(",")
							let ball = []
							let total = 0
							numberarr.forEach((x, i) => {
								total += Number(x)
								ball.push({
									num: x,
									sb: sbarr[i],
									sx: sxarr[i],
									wx: wxarr[i]
								})
							})
							x.lastBall = ball.pop()
							x.ball = ball
							x.lastNum = lastNum
							x.total = total
							that.resultslist.push(x)
							that.originlist.push(x)
						})
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			navigatorTo(url) {
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},
		},
		// onReachBottom() {
		// 	if (this.total <= this.resultslist.length) {
		// 		uni.showToast({
		// 			title: '到底了',
		// 			icon: 'none'
		// 		})
		// 		return
		// 	}
		// 	this.pageNum = this.pageNum + 1
		// 	this.getdatalist()
		// }
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
		z-index: 998;
	}

	// .topfixedh {
	// 	height: 110px;
	// }

	.bannerswiper {
		height: 57px !important;

		.bannerimg {
			width: 100%;
			height: 57px !important;
		}
	}

	.yearbox {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		background-color: rgb(243, 243, 243);
		border-bottom: 2rpx solid rgb(240, 241, 237);
		padding: 0 10px;

		.yeartitle {
			color: rgb(51, 51, 51);
			font-size: 20px;
		}

		.filteritem {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 55px;
			margin-left: 5px;
			height: 26px;
			border: 1px solid rgb(102, 102, 102);
			border-radius: 13px;
			font-size: 14px;
			color: rgb(102, 102, 102);
			padding: 0 4px;

			&.active {
				color: #fff;
				background-color: rgb(71, 40, 34);
			}
		}

		.sequencetype {
			position: absolute;
			top: 50px;
			left: 0;
			width: 100%;
			padding-top: 20rpx;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			.sequencetypeitem {
				width: 30%;
				height: 50rpx;
				min-width: 200rpx;
				margin-bottom: 20rpx;
				border: 2rpx solid rgb(243, 243, 243);
				color: rgb(51, 51, 51);
				font-size: 20rpx;
				border-radius: 8rpx;

				&.active {
					border: 2rpx solid rgb(245, 142, 3);
					color: rgb(245, 142, 3);
				}
			}
		}
	}

	.scrolllist {
		.resultsitem {
			background: #fff;
			border-bottom: 2rpx solid rgb(240, 241, 237);
			padding-top: 10rpx;

			&:nth-child(2n) {
				background-color: rgb(243, 243, 243);
			}
		}

		.resultsitemdate {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 15rpx;
		}

		.dateleft {
			display: flex;
			align-items: center;
			font-size: 25rpx;
			color: #333;

			.iconfont {
				font-size: 30rpx;
				margin-right: 6rpx;
			}

			.period {
				font-size: 30rpx;
			}
		}

		.dateright {
			display: flex;
			align-items: center;

			.button {
				margin-left: 4rpx;
				color: #000;
				font-size: 25rpx;
				padding: 0 4rpx;
				border: 1rpx solid rgb(102, 102, 102);
			}
		}

		.ballList {
			position: relative;
			display: flex;
			width: 100%;
			padding-right: 40rpx;
			justify-content: space-around;

			.righticon {
				position: absolute;
				top: 32rpx;
				right: 20rpx;
			}

			.ballItem {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: rgb(51, 51, 51);
				font-size: 40rpx;
			}

			.ballImg {
				position: relative;
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 16rpx;

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
					top: 10rpx;
					left: 15rpx;
					font-size: 25rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
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

			.ball_name {
				display: flex;
				align-items: center;
				font-size: 25rpx;
			}

			.jiaball {
				display: flex;

				.jia {
					font-size: 32rpx;
					margin-top: 10rpx;
					margin-right: 20rpx;
				}
			}
		}
	}

	.footfixed {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		height: calc(50px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(50px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
		display: flex;
		justify-content: space-between;
		background: #fff;

		.footitem {
			width: 50%;
			font-size: 25px;
			color: rgb(153, 153, 153);

			.iconfont {
				font-size: 25px;
				/* #ifdef H5 */
				margin-top: 3px;
				/* #endif */
			}

			&.active {
				color: rgb(71, 40, 34);
			}
		}
	}

	.footfixedh {
		height: 50px;
		height: calc(50px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(50px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
	}

	.gold {
		color: rgb(224, 174, 0);
	}

	.wood {
		color: rgb(115, 165, 67);
	}

	.water {
		color: rgb(19, 103, 160);
	}

	.fire {
		color: rgb(196, 50, 45);
	}

	.soil {
		color: rgb(71, 40, 34);
	}

	.calendarbox {
		padding: 20rpx;

		.introduction {
			position: relative;
			width: 100%;
			padding: 24rpx 20rpx;
			color: rgb(71, 40, 34);
			font-size: 22rpx;

			.bg_tlsc {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
		}
	}

	.selectinfo {
		margin: 40rpx 0;
		text-align: center;
		color: rgb(51, 51, 51);
		font-size: 22rpx;
	}

	@media (min-width: 600px) {

		.yearbox {
			.sequencetype {
				padding-top: 10px;

				.sequencetypeitem {
					width: 30%;
					height: 30px;
					min-width: 180px;
					margin-bottom: 10px;
					border: 1px solid rgb(243, 243, 243);
					font-size: 17px;
					border-radius: 4px;

					&.active {
						border: 1px solid rgb(245, 142, 3);
					}
				}
			}
		}

		.scrolllist {
			.resultsitem {
				border-bottom: 1px solid rgb(240, 241, 237);
				padding-top: 5px;
			}

			.resultsitemdate {
				padding: 0 8px;
			}

			.dateleft {
				font-size: 23px;

				.iconfont {
					font-size: 20px;
					margin-right: 3px;
				}

				.period {
					font-size: 25px;
				}
			}

			.dateright {

				.button {
					margin-left: 2px;
					font-size: 17px;
					padding: 0 2px;
					border: 1px solid rgb(102, 102, 102);
				}
			}

			.ballList {
				padding-right: 20px;

				.righticon {
					top: 16px;
					right: 10px;
				}

				.ballItem {

					font-size: 17px;
				}

				.ballImg {
					position: relative;
					width: 38px;
					height: 38px;
					margin-bottom: 8px;

					.ball {
						width: 38px;
						height: 38px;
					}

					.ball_num {
						top: 5px;
						left: 8px;
						font-size: 17px;
					}

					.ball_num_tw {
						top: 8px;
						left: 8px;
						font-size: 17px;
					}
				}

				.ball_name {
					font-size: 17px;
				}

				.jiaball {
					.jia {
						font-size: 20px;
						margin-top: 5px;
						margin-right: 10px;
					}
				}
			}
		}

		.calendarbox {
			padding: 10px;

			.introduction {
				padding: 12px 10px;
				font-size: 17px;


			}
		}

		.selectinfo {
			margin: 20px 0;
			font-size: 17px;
		}



	}

	@media (min-width: 500px) {
		::v-deep .uni-picker-container {
			.uni-picker-custom {
				left: 50% !important;

				&>div {
					left: auto !important;
					right: 15.5px !important;
				}
			}
		}
	}
</style>
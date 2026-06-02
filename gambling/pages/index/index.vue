<template>
	<view class="container">
		<navbar title="金沙开奖网" class="navbar">
			<template v-slot:navleft>
				<image class="amdh01" src="@/static/img/amdh01.gif" mode=""></image>
			</template>
			<template v-slot:navright>
				<view class="navrightbutton">
					<!-- #ifdef H5 -->
					<view class="button">
						<i class="iconfont icon-a-Frame1321314975"></i>
						<text class="">安装</text>
					</view>
					<!-- #endif -->
					<view class="button">
						<i class="iconfont icon-kefu_o"></i>
						<text>客服</text>
					</view>
					<view class="button">
						<i class="iconfont icon-fenxiang"></i>
						<text>分享</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="longTab" scroll-y enhanced :style="{ top: titleHeight + 'px' }">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation class="menu"
				:scroll-left="tabLeft" :show-scrollbar="false">
				<view class="longItem" :data-index="index" :class="index === tabClick ? 'click' : ''"
					v-for="(item, index) in categoryList" :key="index" :id="'id' + index"
					@click.stop="selectMenu(item, index, true)">
					<image class="img" :src="item.icon" mode=""></image>
					<text>{{ item.nickName }}</text>
				</view>
			</scroll-view>
			<view class="more" @click="navigatorTo('/pages/lottery/colorfulseeds/index')">
				<uni-icons type="bars" size="15"></uni-icons>
			</view>
		</view>
		<view class="contentBox">
			<view class="discover-box">
				<scroll-view scroll-y="true" @scroll="followScroll" class="main">
					<view class="tab-cont" id="main">
						<view>
							<swiper :indicator-dots="false" :current="swiperCurrent" @change="swiperChange"
								:style="'height:'+swiperHeight+'px'">
								<block v-for="(item,index) in categoryList" :key="index">
									<swiper-item :item-id="`${item.code}`">
										<scroll-view @scroll="scrollLeft" scroll-y="true" :show-scrollbar="false"
											class="scroll-view" :style="'height:'+swiperHeight+'px'">
											<view class="">
												<view class="">
													<swiper class="bannerswiper" circular :indicator-dots="true"
														:autoplay="true" :interval="2000" :duration="500">
														<swiper-item
															@click="openInBrowser('https://www.xg8sfd.com//m382544-2-1')">
															<image class="bannerimg" src="@/static/img/banner1.jpg"
																mode="aspectFill"></image>
														</swiper-item>
														<swiper-item
															@click="openInBrowser('https://www.xg8sfd.com//m382544-2-1')">
															<image class="bannerimg" src="@/static/img/banner2.jpg"
																mode="aspectFill"></image>
														</swiper-item>
														<swiper-item
															@click="openInBrowser('https://www.xg8sfd.com//m382544-2-1')">
															<image class="bannerimg" src="@/static/img/banner3.jpg"
																mode="aspectFill"></image>
														</swiper-item>
														<swiper-item
															@click="openInBrowser('https://www.xg8sfd.com//m382544-2-1')">
															<image class="bannerimg" src="@/static/img/banner4.jpg"
																mode="aspectFill"></image>
														</swiper-item>
													</swiper>
												</view>
												<view class="winresults">
													<view class="top">
														<view class="titel">
															<text class="name">
																{{codeToLottery(winresultsinfo.lotteryType)}}
															</text>
															第
															<text class="num">
																{{winresultsinfo.period}}
															</text>
															期最新开奖结果
														</view>
														<view class="scene">
															<image class="img" src="@/static/img/scene.gif"
																@click="navigatorTo('/pages/lottery/winscene/index?code='+winresultsinfo.lotteryType)"
																mode="widthFix"></image>
														</view>
													</view>
													<view class="ballList" v-if="categoryId!='TW'"
														@click="navigatorTo('/pages/lottery/lotteryresults/index?code='+winresultsinfo.lotteryType)">
														<view class="ballItem"
															v-for="(item,index) in winresultsinfo.ball" :key="index">
															<view class="ballImg">
																<view class="ball">
																	<image v-if="item.sb=='red'" class="img"
																		src="@/static/img/ball_red.png" mode="">
																	</image>
																	<image v-if="item.sb=='blue'" class="img"
																		src="@/static/img/ball_blue.png" mode="">
																	</image>
																	<image v-if="item.sb=='green'" class="img"
																		src="@/static/img/ball_green.png" mode="">
																	</image>
																</view>
																<view class="ball_num">
																	{{item.num}}
																</view>
															</view>
															<view class="ball_name">
																{{item.sx}}
															</view>
														</view>
														<view class="jiaball" v-if="winresultsinfo.lastBall">
															<view class="jia">
																+
															</view>
															<view class="ballItem">
																<view class="ballImg">
																	<view class="ball">
																		<image v-if="winresultsinfo.lastBall.sb=='red'"
																			class="img" src="@/static/img/ball_red.png"
																			mode=""></image>
																		<image v-if="winresultsinfo.lastBall.sb=='blue'"
																			class="img" src="@/static/img/ball_blue.png"
																			mode=""></image>
																		<image
																			v-if="winresultsinfo.lastBall.sb=='green'"
																			class="img"
																			src="@/static/img/ball_green.png" mode="">
																		</image>
																	</view>
																	<view class="ball_num">
																		{{winresultsinfo.lastBall.num}}
																	</view>
																</view>
																<view class="ball_name">
																	{{winresultsinfo.lastBall.sx}}
																</view>
															</view>
														</view>
														<uni-icons class="righticon" type="right" size="14"></uni-icons>
													</view>
													<!-- 台湾大乐透 -->
													<view class="ballList" v-if="categoryId=='TW'"
														@click="navigatorTo('/pages/lottery/lotteryresults/index?code='+winresultsinfo.lotteryType)">
														<template v-for="(item,index) in winresultsinfo.ball"
															:key="index">
															<view class="ballItem"
																v-if="index < (winresultsinfo.ball.length - 1)">
																<view class="ballImg">
																	<view class="ball">
																		<image v-if="item.sb=='red'" class="img"
																			src="@/static/img/icon_dlt_red.png" mode="">
																		</image>
																		<image v-if="item.sb=='blue'" class="img"
																			src="@/static/img/icon_dlt_bule.png"
																			mode="">
																		</image>
																		<image v-if="item.sb=='green'" class="img"
																			src="@/static/img/icon_dlt_green.png"
																			mode="">
																		</image>
																	</view>
																	<view class="ball_num_tw">
																		{{item.num}}
																	</view>
																</view>
																<view class="ball_name">
																	{{item.sx}}
																</view>
															</view>
														</template>
														<view class="jiaball" v-if="winresultsinfo.lastBall">
															<view class="jia">
																+
															</view>
															<view class="ballItem">
																<view class="ballImg">
																	<view class="ball">
																		<image v-if="winresultsinfo.lastBall.sb=='red'"
																			class="img"
																			src="@/static/img/icon_dlt_red.png" mode="">
																		</image>
																		<image v-if="winresultsinfo.lastBall.sb=='blue'"
																			class="img"
																			src="@/static/img/icon_dlt_bule.png"
																			mode=""></image>
																		<image
																			v-if="winresultsinfo.lastBall.sb=='green'"
																			class="img"
																			src="@/static/img/icon_dlt_green.png"
																			mode="">
																		</image>
																	</view>
																	<view class="ball_num_tw">
																		{{winresultsinfo.lastBall.sb.num}}
																	</view>
																</view>
																<view class="ball_name">
																	{{winresultsinfo.lastBall.sb.sx}}
																</view>
															</view>
														</view>
														<uni-icons class="righticon" type="right" size="14"></uni-icons>
													</view>

													<view class="tips">
														下期開獎時間:
														<!-- <uni-countdown :show-day="false" :showHour="false"
															:minute="minute" :second="second" /> -->
														<text>{{nextwinresultstime}}</text>
													</view>
												</view>
												<semp-notice-bar scrollable showType="slider"
													@click="navigatorTo('/pages/lottery/noticedetail/index')"
													:strText="announcement"></semp-notice-bar>
												<view class="advertisementBox">
													<view class="advertisementlist">
														<view class="advertisementitem"
															v-for="(item,index) in advertisementlist" :key="index">
															{{item.name}}
														</view>
													</view>
													<view class="home_add">
														<image class="img" src="@/static/img/home_add.png" mode="">
														</image>
													</view>
												</view>
												<template
													v-if="categoryId=='MO'||categoryId=='XMO'||categoryId=='RU'||categoryId=='TW'">
													<view class="linklist">
														<view class="linkitem" v-for="(item,index) in linklist"
															:key="index" @click="linkto(item.url)">
															<image class="img" :src="item.img" mode=""></image>
															<view class="linkitemname">
																<text>{{item.name}}</text>
																<view v-if="item.isadvertisement" class="ggicon">
																	广告
																</view>
																<image v-if="item.isai" class="aiicon"
																	src="@/static/img/aiicon.png" mode=""></image>
															</view>
															<view class="linkitemright">
																<text>{{item.isadvertisement?'点击进入':item.subname}}</text>
																<uni-icons class="righticon" type="right"
																	size="14"></uni-icons>
															</view>
														</view>
													</view>
												</template>
												<template v-if="categoryId=='HK'||categoryId=='FI'">
													<view class="linklist1">
														<view class="linkitem" v-for="(item,index) in linklist"
															:key="index" @click="linkto(item.url)">
															<image class="img" :src="item.img" mode=""></image>

															<view class="linkitemname">
																<text>{{item.name}}</text>

																<image v-if="item.isai" class="aiicon"
																	src="@/static/img/aiicon.png" mode=""></image>
															</view>
															<image v-if="item.isadvertisement" class="hoticon"
																src="@/static/img/home_add.png" mode=""></image>
															<image v-if="item.ishot" class="hoticon"
																src="@/static/img/ico_hot.png" mode=""></image>
														</view>
													</view>
												</template>


												<!-- <view class="footerBottoms"></view> -->
											</view>

										</scroll-view>
									</swiper-item>
								</block>
							</swiper>
						</view>


					</view>
					<!-- <view v-if="bottomNavigationIsCustom" class="footerBottom"></view> -->
				</scroll-view>
			</view>

		</view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import tabbar from "@/components/tabbar.vue"
	import {
		getNewDataApi,
		announcementlistApi,
		lotteryTypelistApi
	} from "@/api/api.js"
	import {
		formatTimestamp,
		codeToLottery
	} from '@/utils/utils.js'
	export default {

		components: {
			navbar,
			tabbar
		},
		data() {
			return {
				tabLeft: 0,
				titleHeight: 0,
				categoryList: [],
				categoryId: 'MO', //分类id
				tabClick: 0, //设置导航点击了哪一个
				swiperCurrent: 0, //分类索引
				isScroll: false, //是否是滑动
				isWidth: 0, //每个导航栏占位
				windowHeight: 0,
				swiperHeight: 0,
				interval: 3000,
				_freshing: false,
				triggeredDiscover: false,
				refresherHeight: 0,
				advertisementlist: [{
						name: "银河赌场",
					},
					{
						name: "夺彩网",
					},
					{
						name: "玛雅吧",
					},
					{
						name: "六合投注",
					},
					{
						name: "澳门赌场",
					},

				],
				linklist: [
					// {
					// 	name: "視頻開獎",
					// 	subname: "直播澳门彩攪珠",
					// 	img: "/static/img/icon_home_spkj.png",
					// 	isai: false,
					// 	isadvertisement: false,
					// 	ishot: false,
					// 	url: "",
					// },
					{
						name: "澳门彩图库",
						subname: "最全六合图纸",
						img: "/static/img/icon_home_lhtk.png",
						isai: true,
						isadvertisement: false,
						ishot: true,
						url: "/pages/lottery/colorimagelibrary/index",
					},
					{
						name: "交流大厅", //最后弄
						subname: "交流购彩心得",
						img: "/static/img/icon_home_jldt.png",
						isai: false,
						isadvertisement: false,
						ishot: true,
						url: "/pages/post/post_hall/index",
					},
					{
						name: "历史开奖",
						subname: "开奖记录查询",
						img: "/static/img/icon_home_lskj.png",
						isai: false,
						isadvertisement: false,
						ishot: false,
						url: "/pages/lottery/lotteryresults/index",
					},
					{
						name: "信息统计",
						subname: "按玩法统计开奖数据",
						img: "/static/img/icon_home_zxtj.png",
						isai: false,
						isadvertisement: false,
						ishot: false,
						url: "/pages/lottery/statistics/index",
					},
					// {
					// 	name: "視頻開獎",
					// 	subname: "直播澳门彩攪珠",
					// 	img: "/static/img/icon_home_spkj.png",
					// 	isai: false,
					// 	isadvertisement: true,
					// 	ishot: false,
					// 	url: "",
					// },
					// {
					// 	name: "視頻開獎",
					// 	subname: "直播澳门彩攪珠",
					// 	img: "/static/img/icon_home_spkj.png",
					// 	isai: false,
					// 	isadvertisement: true,
					// 	ishot: false,
					// 	url: "",
					// },
					// {
					// 	name: "視頻開獎",
					// 	subname: "直播澳门彩攪珠",
					// 	img: "/static/img/icon_home_spkj.png",
					// 	isai: false,
					// 	isadvertisement: true,
					// 	ishot: false,
					// 	url: "",
					// },
				],
				newyear: "",
				winresultsinfo: {}, //开奖结果
				nextwinresultstime: "", //下一期开奖时间 status==0
				announcement: "",
				mocountdowninfo: { //澳门倒计时
					open: false,
					period: "",
					ball: [],
					lastBall: {},
					showNum: 0,
					minute: 10,
					second: 0,
				},
				xmocountdowninfo: { //新澳门倒计时
					open: false,
					period: "",
					ball: [],
					lastBall: {},
					showNum: -1,
					minute: 10,
					second: 0,
				},
				hkcountdowninfo: { //香港倒计时
					open: false,
					period: "",
					ball: [],
					lastBall: {},
					showNum: -1,
					minute: 10,
					second: 0,
				},
				rucountdowninfo: { //俄罗斯倒计时
					open: false,
					period: "",
					ball: [],
					lastBall: {},
					showNum: -1,
					minute: 10,
					second: 0,
				},
				oucountdowninfo: { //欧洲倒计时
					open: false,
					period: "",
					ball: [],
					lastBall: {},
					showNum: -1,
					minute: 10,
					second: 0,
				},
				ficountdowninfo: { //芬兰倒计时
					open: false,
					period: "",
					ball: [],
					lastBall: {},
					showNum: -1,
					minute: 10,
					second: 0,
				},
				twcountdowninfo: { //台湾倒计时
					open: false,
					period: "",
					ball: [],
					lastBall: {},
					showNum: -1,
					minute: 10,
					second: 0,
				},
			}
		},
		onLoad() {
			var that = this;
			let systemInfo = uni.getSystemInfoSync();
			let statusBarHeight = systemInfo.statusBarHeight;
			that.titleHeight = statusBarHeight + 44
			that.isWidth = systemInfo.windowWidth / 2;
			that.windowHeight = systemInfo.windowHeight
			that.refresherHeight = that.titleHeight + 66
			that.swiperHeight = that.windowHeight - that.refresherHeight
			that.$set(that, 'swiperHeight', that.windowHeight - that.refresherHeight);
			that.newyear = new Date().getFullYear()
			that.getannouncementlist()
			that.getlotteryTypelist()

			// this.systemLocale = systemInfo.language;
			// this.applicationLocale = uni.getLocale();
			// this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			// uni.onLocaleChange((e) => {
			//   this.applicationLocale = e.locale;
			// })
		},
		onShow() {
			uni.hideTabBar()
			let code = this.$store.getters.code;
			if (code != this.categoryId) {
				let index = this.categoryList.findIndex(item => item.code == code);
				if (index != -1) {
					this.selectMenu(this.categoryList[index], index, true)
				}
			}

		},
		methods: {
			codeToLottery,
			getlotteryTypelist() {
				let that = this
				uni.showLoading()
				lotteryTypelistApi({
					show: true
				}).then(res => {
					that.categoryList = res.data
					that.categoryId = res.data[0].code
					that.getNewData()
					that.$store.commit('UPDATE_CODE', that.categoryId);
				}).catch(err => {
					uni.hideLoading()
				})
			},
			getannouncementlist() {
				let that = this;
				uni.showLoading()
				announcementlistApi().then(res => {
					if (res.rows) {
						that.announcement = res.rows[0].content
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			getNewData() {
				let that = this;
				uni.showLoading()
				this.$store.commit('UPDATE_CODE', that.categoryId);
				getNewDataApi({
					year: that.newyear,
					lotteryType: that.categoryId
				}).then(res => {
					uni.hideLoading()
					if (res.data) {
						res.data.forEach(x => {
							// if(x.lotteryType=="MO"){
							// 	//已开启
							// 	if(that.mocountdowninfo.open&&that.mocountdowninfo.showNum<7){

							// 	}
							// }
							if (x.status == 0) {
								that.nextwinresultstime = formatTimestamp(x.date)
							} else if (+x.status >=1) {
								let numberarr = x.numbers.split(",")
								let sbarr = x.sb.split(",")
								let sxarr = x.sx.split(",")
								let ball = []
								numberarr.forEach((x, i) => {
									ball.push({
										num: x,
										sb: sbarr[i],
										sx: sxarr[i],
									})
								})
								x.lastBall = ball.pop()
								x.ball = ball
								that.winresultsinfo = x
								// console.log(that.winresultsinfo,"that.winresultsinfo");
							}
						})
					}
				}).catch(err => {
					uni.hideLoading()
				})
			},

			// 点击列表头部
			selectMenu(item, index, isScroll) {
				this.triggeredDiscover = false;
				this.swiperCurrent = index;
				this.categoryId = item.code
				this.isScroll = isScroll;
				this.tabClick = index; //设置导航点击了哪一个
				this.isLeft = index * this.isWidth; //设置下划线位置
				let tabLeft = (index - 2) * this.isWidth; //设置下划线位置
				this.getNewData()
				this.$nextTick(function() {
					this.$set(this, 'tabLeft', tabLeft);
				});
			},
			followScroll() {
				uni.$emit('scroll');
			},

			scrollLeft: function(e) {
				uni.$emit('scroll');
				if (e.detail.scrollTop > e.detail.scrollHeight - 1500) {
					// this.getDiscoverList();
				}
				this.swiperHeight = this.windowHeight - this.refresherHeight
			},
			swiperChange(e) {
				let {
					current,
					source,
					currentItemId
				} = e.detail;
				if (source === 'autoplay' || source === 'touch') {
					this.categoryId = currentItemId;
					this.swiperCur = current
					this.selectMenu(this.categoryList[this.swiperCur], this.swiperCur, true)
					if (this.categoryList.length > 3) {
						var tempIndex = this.swiperCur - 2;
						tempIndex = tempIndex <= 0 ? 0 : tempIndex;
						let tabLeft = (this.swiperCur - 2) * this.isWidth; //设置下划线位置
						this.$nextTick(function() {
							this.$set(this, 'tabLeft', tabLeft);
						});
					}
				}
			},
			// 自定义下拉刷新被中止
			onAbort() {
				console.log("onAbort");
			},
			onPulling(e) {
				if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
				this.triggeredDiscover = true;
			},
			// 下拉刷新触发
			refresherpullingFun() {
				this.isRefresher = true
			},
			onRefreshDiscover() {
				// console.log("onRefreshDiscover");
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this._freshing = false;
					this.discoverList = {}
					// this.getDiscoverList();
					this.triggeredDiscover = false;
					uni.stopPullDownRefresh();
					this._freshing = false;
				}, 1000)
			},
			onRestore() {
				this._freshing = false;
				this.triggeredDiscover = false;
				uni.stopPullDownRefresh();
				this._freshing = false;
			},
			navigatorTo(url) {
				console.log(url, "url");
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},
			linkto(url) {
				console.log(url, "url");
				if (url == '') return;
				uni.navigateTo({
					url: url + "?code=" + this.winresultsinfo.lotteryType
				})
			},

			/**
			 * 跳转到外部浏览器打开链接
			 * @param {String} url 要打开的链接
			 */
			openInBrowser(url) {
				if (url == '') return;
				// 校验URL格式
				// if (!this.isValidUrl(url)) {
				//   this.tipMessage = '链接格式不正确';
				//   return;
				// }

				// H5平台
				// #ifdef H5
				window.open(url, '_blank');
				// #endif


				// App平台
				// #ifdef APP
				plus.runtime.openURL(url, (res) => {
					console.log('打开结果', res);
				}, (err) => {
					console.error('打开失败', err);
				});
				// #endif
			},
			/**
			 * 计算剩余时间（分钟+秒）
			 * @param {Number} targetTs - 目标时间戳（毫秒级，可选，默认用data中的targetTimestamp）
			 */
			calculateRemainingTime(targetTs, lotteryType) {
				const target = targetTs
				if (!target) return; // 未设置目标时间戳时，不执行

				// 1. 计算时间差（目标时间戳 - 当前时间戳）
				const now = Date.now(); // 当前时间戳（毫秒）
				const timeDiff = target - now; // 剩余毫秒数（可能为负）

				// 2. 处理时间已过期的情况
				if (timeDiff <= 0) {
					return {
						minute: 0,
						second: 0
					};
				}

				// 3. 转换为分钟和秒（毫秒 → 分钟：/60000，秒：%60000/1000）
				const minute = Math.floor(timeDiff / 60000); // 剩余分钟（取整）
				const second = Math.floor((timeDiff % 60000) / 1000); // 剩余秒（取整）
				return {
					minute: minute,
					second: second
				};
			},


			// onLocaleChange(e) {
			//   if (this.isAndroid) {
			//     uni.showModal({
			//       content: this.$t('index.language-change-confirm'),
			//       success: (res) => {
			//         if (res.confirm) {
			//           uni.setLocale(e.code);
			//         }
			//       }
			//     })
			//   } else {
			//     uni.setLocale(e.code);
			//     this.$i18n.locale = e.code;
			//   }
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		.amdh01 {
			width: 70px;
			height: 28px;
		}

		.navrightbutton {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #fff;
			font-size: 12px;

			.button {
				cursor: pointer;
				width: 25px;
				margin: 0 3px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	// .longTabh {
	// 	height: 60px;
	// }

	.longTab {
		position: sticky;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 60px;
		background-color: rgb(238, 238, 238);
		z-index: 990;

		// z-index: 10;
		// position: fixed;
		// z-index: 99999;
		.menu {
			width: calc(100% - 35px);
		}

		.more {
			width: 35px;
			height: 100%;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.longItem {
			background: #fff;
			height: 56px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			// line-height: 50upx;
			text-align: center;
			font-size: 28px;
			padding: 0 4px;
			border-radius: 3px;
			background-color: rgb(255, 255, 255);
			margin-left: 5px;
			color: rgb(51, 51, 51);
			/*解决ios上滑动不流畅*/
			-webkit-overflow-scrolling: touch;
			position: relative;

			.img {
				width: 23px;
				height: 23px;
				margin-left: 6px;
			}

			text {
				padding: 0px 6px 0px 2px;
			}



			&.click {
				background-color: rgb(230, 139, 4);
				color: #fff;
			}
		}

		.underlineBox {
			height: 3px;
			width: 20%;
			display: flex;
			align-content: center;
			justify-content: center;

			.underline {
				opacity: 0;
				width: 60rpx;
				height: 4rpx;
				background-color: #e93323;
			}
		}
	}


	.bannerswiper {
		height: 200px !important;

		.bannerimg {
			width: 100%;
		}
	}

	.winresults {
		width: calc(100% - 40rpx);
		margin: 20rpx auto;
		box-shadow: rgb(221, 221, 221) 0px 0px 0px;
		border-radius: 10rpx;
		border: 2rpx dashed rgb(245, 142, 3);
		padding-top: 30rpx;
		background-color: rgb(255, 255, 255);

		.top {
			position: relative;
			width: 100%;
			padding: 0 15rpx;
			color: rgb(153, 153, 153);
			font-size: 28rpx;
			margin-bottom: 10rpx;
			min-height: 25px;

			.name {
				font-size: 38rpx;
				color: rgb(51, 51, 51);
			}

			.num {
				font-size: 30rpx;
				color: rgb(245, 142, 3);
			}

			.scene {
				position: absolute;
				top: 0;
				right: 20rpx;
				width: 75px;

				.img {
					width: 100%;
				}
			}
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

		.jiaball {
			display: flex;

			.jia {
				font-size: 32rpx;
				margin-top: 20rpx;
				margin-right: 20rpx;
			}
		}
	}

	.tips {
		width: 100%;
		padding: 14rpx;
		background-color: rgb(253, 246, 240);
		color: rgb(51, 51, 51);
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.advertisementBox {
		position: relative;
		width: calc(100% - 40rpx);
		margin: 16rpx auto 10rpx;
		background: #fff;
		box-shadow: rgb(221, 221, 221) 0px 0px 3px;
		border-radius: 10rpx;
		padding-bottom: 20rpx;

		.home_add {
			position: absolute;
			top: 0;
			left: 0;
			width: 44rpx;
			height: 44rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.advertisementlist {
			display: flex;
			flex-wrap: wrap;
			align-items: stretch;
			flex-shrink: 0;

			.advertisementitem {
				width: 25%;
				text-align: center;
				padding-top: 10px;
				cursor: pointer;
				font-size: 20rpx;
			}
		}
	}

	.linklist {
		width: calc(100% - 40rpx);
		margin: 10rpx auto;
		background-color: #fff;
		box-shadow: rgb(221, 221, 221) 0px 0px 3px;
		border-radius: 10rpx;

		.linkitem {
			display: flex;
			align-items: center;
			padding: 30rpx 20rpx;
			align-items: center;
			border-bottom: 2rpx solid #f0f1ed;

			.img {
				width: 60rpx;
				height: 60rpx;
			}

			.linkitemname {
				flex: 1 1 0%;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 20rpx;
				font-size: 40rpx;
				color: rgb(51, 51, 51);

				.aiicon {
					width: 24rpx;
					height: 24rpx;
					margin-top: -44rpx;
					margin-left: 16rpx;
				}

				.ggicon {
					padding: 4rpx;
					font-size: 30rpx;
					color: rgb(255, 255, 255);
					background-color: rgb(245, 142, 3);
				}

			}

			.linkitemright {
				display: flex;
				align-items: center;
				padding-right: 20rpx;
				padding-left: 20rpx;
				border-radius: 26rpx;
				height: 52rpx;
				justify-content: center;
				align-items: center;
				background-color: rgb(243, 243, 243);
				font-size: 30rpx;
				color: rgb(153, 153, 153);
			}

		}
	}

	.linklist1 {
		width: calc(100% - 40rpx);
		margin: 10rpx auto;
		background-color: #fff;
		box-shadow: rgb(221, 221, 221) 0px 0px 3px;
		border-radius: 10rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;

		.linkitem {
			box-sizing: border-box;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 30rpx;
			width: 25%;
			font-size: 30rpx;
			color: rgb(51, 51, 51);
			overflow: hidden;
			border-bottom: 2rpx solid #f0f1ed;
			border-right: 2rpx solid #f0f1ed;

			.img {
				width: 110rpx;
				height: 110rpx;
				margin-bottom: 20rpx;
			}

			.linkitemname {
				.aiicon {
					position: relative;
					width: 24rpx;
					height: 24rpx;
					top: -20rpx;
				}
			}

			.hoticon {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 56rpx;
				height: 56rpx;
			}
		}
	}


	@media (min-width: 600px) {
		.winresults {
			width: calc(100% - 20px);
			margin: 10px auto;
			border: 1px dashed rgb(245, 142, 3);
			padding-top: 15px;

			.top {
				font-size: 20px;
				margin-bottom: 5px;
				min-height: 25px;

				.name {
					font-size: 28px;
				}

				.num {
					font-size: 23px;
				}

				.scene {
					right: 10px;
				}
			}
		}

		.ballList {
			padding-right: 20px;

			.righticon {
				position: absolute;
				top: 16px;
				right: 10px;
			}

			.ballItem {
				font-size: 23px;
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
					position: absolute;
					top: 5px;
					left: 8px;
					font-size: 17px;
				}

				.ball_num_tw {
					position: absolute;
					top: 8px;
					left: 8px;
					font-size: 17px;
				}
			}

			.jiaball {
				.jia {
					font-size: 20px;
					margin-top: 10px;
					margin-right: 10px;
				}
			}
		}

		.tips {
			padding: 7px;
			font-size: 23px;
			margin-top: 5px;
		}

		.advertisementBox {
			width: calc(100% - 20px);
			margin: 8px auto 5px;
			border-radius: 5px;
			padding-bottom: 10px;

			.home_add {
				width: 22px;
				height: 22px;
			}

			.advertisementlist {

				.advertisementitem {
					width: 25%;
					text-align: center;
					padding-top: 10px;
					cursor: pointer;
					font-size: 13px;
				}
			}
		}

		.linklist {
			width: calc(100% - 20px);
			margin: 5px auto;
			border-radius: 5px;

			.linkitem {
				padding: 15px 10px;
				border-bottom: 1px solid #f0f1ed;

				.img {
					width: 30px;
					height: 30px;
				}

				.linkitemname {
					margin-left: 10px;
					font-size: 28px;

					.aiicon {
						width: 13px;
						height: 13px;
						margin-top: -22px;
						margin-left: 8px;
					}

					.ggicon {
						padding: 2px;
						font-size: 18px;
					}

				}

				.linkitemright {
					padding-right: 10px;
					padding-left: 10px;
					border-radius: 13px;
					height: 30px;
					font-size: 21px;
				}

			}
		}

		.linklist1 {
			width: calc(100% - 20px);
			margin: 5px auto;
			border-radius: 5px;

			.linkitem {
				padding: 15px;
				width: 25%;
				font-size: 17px;
				color: rgb(51, 51, 51);
				border-bottom: 1px solid #f0f1ed;
				border-right: 1px solid #f0f1ed;

				.img {
					width: 55px;
					height: 55px;
					margin-bottom: 10px;
				}

				.linkitemname {
					.aiicon {
						position: relative;
						width: 13px;
						height: 13px;
						top: -10px;
					}
				}

				.hoticon {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 28px;
					height: 28px;
				}
			}
		}


	}

	@media (max-width: 599px) {
		.linklist1 {
			.linkitem {
				width: 33.33%;
			}
		}
	}
</style>
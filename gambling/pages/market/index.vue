<template>
	<view class="container">
		<navbar title="淘料市场" class="navbar">
			<template v-slot:navright>
				<view class="navrightbutton">
					<view class="button">
						<i class="iconfont icon-jine1"></i>
						<text>充值</text>
					</view>
					 <!-- v-if="isLogin" -->
					<view class="button" @click="navigatorTo('/pages/lottery/colorimage_publish/index?code='+categoryId)">
						<i class="iconfont icon-jia"></i>
						<text>彩图</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="longTab" scroll-y enhanced :style="{ top: titleHeight + 'px' }">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation class="menu"
				:scroll-left="tabLeft" :show-scrollbar="false">
				<template v-for="(item, index) in categoryList" :key="index" >
					<view class="longItem" :data-index="index" :class="index === tabClick ? 'click' : ''"
						v-if="item.code!='OU'" :id="'id' + index"
						@click.stop="selectMenu(item, index, true)">
						<image class="img" :src="item.icon" mode=""></image>
						<text>{{ item.nickName }}</text>
					</view>
				</template>
				
			</scroll-view>
			<view class="more" @click="navigatorTo('/pages/lottery/colorfulseeds/index?type=market')">
				<uni-icons type="bars" size="15"></uni-icons>
			</view>
		</view>
		<view class="contentBox">
			<view class="longTabh">

			</view>
			<view class="discover-box">
				<scroll-view scroll-y="true" @scroll="followScroll" class="main">
					<view class="tab-cont" id="main">
						<view>
							<swiper :interval="interval" indicator-color="rgba(255,255,255,0.6)"
								:current="swiperCurrent" @change="swiperChange" :style="'height:'+swiperHeight+'px'">
								<block v-for="(item,index) in categoryList" :key="index">
									<swiper-item :item-id="`${item.code}`">
										<scroll-view @scroll="scrollLeft" scroll-y="true" :show-scrollbar="false"
											class="scroll-view" :style="'height:'+swiperHeight+'px'">
											<view>
												<view class="bgbox">
													<semp-notice-bar scrollable showType="slider"
														@click="navigatorTo('/pages/lottery/noticedetail/index')"
														:strText="announcement"></semp-notice-bar>
													<view class="tips">
														淘料市場為第三方入駐平台，只提供資料參考信息，不提供任何下注服務！資料內容與澳门寶典官方無關，如需幫助請聯繫淘料市場在線客服!
													</view>
													<view class="">
														<view class="ranking">
															<view class="rankingitem">
																<image class="img" src="@/static/img/bg_tlsc_lhw.png"
																	mode=""></image>
																<view class="rankingcontent">
																	<view class="rankingtitle">
																		{{formatcode(categoryId)}}
																	</view>
																	<view class="txt">
																		准料高手排行榜
																	</view>
																	<view class="txt">
																		當前心水數量:18511
																	</view>
																</view>
															</view>
															<view class="rankingitem">
																<image class="img" src="@/static/img/bg_tlsc_lsb.png"
																	mode=""></image>
																<view class="rankingcontent">
																	<view class="rankingtitle">
																		<uni-badge class="uni-badge-left-margin"
																			:text="999" absolute="rightTop"
																			size="small">
																			<view>連勝榜</view>
																		</uni-badge>
																	</view>
																	<view class="txt">
																		連勝心水期期中
																	</view>
																	<view class="txt">
																		當前最高連勝:16
																	</view>
																</view>
															</view>
															<view class="rankingitem">
																<image class="img" src="@/static/img/bg_tlsc_lsgj.png"
																	mode=""></image>
																<view class="rankingcontent">
																	<view class="rankingtitle">
																		歷史冠軍
																	</view>
																	<view class="txt">
																		每期心水冠軍
																	</view>
																	<view class="txt">
																		當前心水數量:98
																	</view>
																</view>
															</view>
															<view class="rankingitem">
																<image class="img" src="@/static/img/bg_tlsc_sqzj.png"
																	mode=""></image>
																<view class="rankingcontent">
																	<view class="rankingtitle">
																		圖文心水
																	</view>
																	<view class="txt">
																		人氣專家權威推薦
																	</view>
																	<view class="txt">
																		當前心水數量:0
																	</view>
																</view>
															</view>
														</view>
														<view class="expertbox">
															<view class="button box-center">申请专家</view>
															<view class="button campaign box-center">竞选专家</view>
														</view>
													</view>
												</view>
												<view class="menuslist">
													<view class="menusitem">
														<view class="box-middle">
															<image class="img"
																src="@/static/img/icon_personal_attention.png" mode="">
															</image>
															<text>我的關注</text>
														</view>
														<uni-icons class="righticon" type="right" size="16"></uni-icons>
													</view>
													<view class="menusitem">
														<view class="box-middle">
															<image class="img"
																src="@/static/img/icon_follower.png" mode="">
															</image>
															<text>我的粉絲</text>
														</view>
														<uni-icons class="righticon" type="right" size="16"></uni-icons>
													</view>
													<view class="menusitem">
														<view class="box-middle">
															<image class="img"
																src="@/static/img/icon_personal_data.png" mode="">
															</image>
															<text>購買記錄</text>
														</view>
														<uni-icons class="righticon" type="right" size="16"></uni-icons>
													</view>
													<view class="menusitem">
														<view class="box-middle">
															<image class="img"
																src="@/static/img/icon_tlsc_report.png" mode="">
															</image>
															<text>我的舉報</text>
														</view>
														<uni-icons class="righticon" type="right" size="16"></uni-icons>
													</view>
													<view class="menusitem">
														<view class="box-middle">
															<image class="img"
																src="@/static/img/icon_tlsc_help.png" mode="">
															</image>
															<text>幫助說明</text>
														</view>
														<uni-icons class="righticon" type="right" size="16"></uni-icons>
													</view>
												</view>
											</view>

										</scroll-view>
									</swiper-item>
								</block>
							</swiper>
						</view>


					</view>
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
		announcementlistApi,
		lotteryTypelistApi
	} from "@/api/api.js"
	import {
		formatTimestamp,
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
				categoryId: 'MO', //分类
				tabClick: 0, //设置导航点击了哪一个
				swiperCurrent: 0, //分类索引
				isScroll: false, //是否是滑动
				isWidth: 0, //每个导航栏占位
				windowHeight: 0,
				swiperHeight: 0,
				interval: 3000,
				newyear: "",
				winresultsinfo: {}, //开奖结果
				nextwinresultstime: "", //下一期开奖时间 status==0
				announcement: "",
				codeid:0,
				isLogin: false,
			}
		},
		onLoad() {
			var that = this;
			that.isLogin = this.$store.getters.isLogin;
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
			if (code != this.categoryId && code!="OU") {
				let index = this.categoryList.findIndex(item => item.code == code);
				console.log(index, 'index');
				if (index != -1) {
					this.selectMenu(this.categoryList[index], index, true)
				}
			}

		},
		methods: {
			 formatcode(code){
			  // 代码与地区名称映射表
			  const regionMap = {
			    'MO': '澳门王',
			    'XMO': '新澳门王',
			    'HK': '六合王',
			    'RU': '俄罗斯六合王',
			    'FI': '芬蘭王',
			    'TW': '樂透王',
			  };
			
			  // 查找映射表，若不存在则返回原始代码
			  return regionMap[code] || code;
			},
			getlotteryTypelist() {
				let that = this
				uni.showLoading()
				lotteryTypelistApi({show:true}).then(res => {
					that.categoryList = res.data
					let code = this.$store.getters.code;
					if(code!="OU"){
						let index = res.data.findIndex(item => item.code == code);
						if (index != -1) {
							that.selectMenu(that.categoryList[index], index, true)
						}
						that.categoryId = code
						that.$store.commit('UPDATE_CODE', that.categoryId);
					}else{
						that.selectMenu(that.categoryList[0], 0, true)
						that.categoryId = that.categoryList[0].code
						that.$store.commit('UPDATE_CODE', that.categoryId);
					}
					
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


			// 点击列表头部
			selectMenu(item, index, isScroll) {
				this.triggeredDiscover = false;
				this.swiperCurrent = index;
				this.categoryId = item.code
				this.codeid=item.id
				this.isScroll = isScroll;
				this.tabClick = index; //设置导航点击了哪一个
				this.isLeft = index * this.isWidth; //设置下划线位置
				let tabLeft = (index - 2) * this.isWidth; //设置下划线位置
				// this.getNewData()
				this.$store.commit('UPDATE_CODE', this.categoryId);
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

			navigatorTo(url) {
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},





		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f3f3f3;
	}

	.navbar {

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

	// .longTabh {
	// 	height: 60px;
	// }

	.bgbox {
		width: 100%;
		background-color: #fff;
		margin-bottom: 10rpx;
	}

	.tips {
		width: calc(100% - 40rpx);
		padding: 20rpx;
		color: rgb(51, 51, 51);
		font-size: 30rpx;
		margin: 20rpx auto 10rpx;
		border: 2rpx dashed #472822;
		border-radius: 12rpx;
		color: #472822;
	}

	.ranking {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 20rpx;

		.rankingitem {
			position: relative;
			width: calc(50% - 30rpx);
			margin: 0 10rpx 40rpx 20rpx;
			color: #fff;
			border-radius: 8rpx;
			box-shadow: rgb(204, 204, 204) 4rpx 10rpx 10rpx;

			.img {
				position: absolute;
				width: 100%;
				height: 100%;
				bottom: 0;
				right: 0;
			}

			.rankingcontent {
				position: relative;

				.rankingtitle {
					margin-left: 20rpx;
					margin-top: 30rpx;
					font-size: 54rpx;
					font-weight: bold;
				}

				.txt {
					margin-left: 20rpx;
					margin-top: 10rpx;
					font-size: 30rpx;
				}
			}
		}
	}

	.expertbox {
		display: flex;
		justify-content: space-between;

		.button {
			cursor: pointer;
			width: calc(50% - 30rpx);
			margin: 0 10rpx 20rpx 20rpx;
			height: 60rpx;
			border-radius: 10rpx;
			color: #c21807;
			border: 2rpx solid #c21807;
			font-weight: bold;
			font-size: 25rpx;
		}

		.campaign {
			background: #c21807;
			color: #fff;
		}
	}

	.menuslist {
		width: 100%;
		background: #fff;
		color: rgb(51, 51, 51);
		font-size: 45rpx;
		.menusitem{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			border-bottom: 2rpx solid #f3f3f3;
			padding: 0 20rpx;
			.img{
				width: 46rpx;
				height: 46rpx;
				margin-right: 20rpx;
			}
		}
	}


@media (min-width: 600px){
	.tips {
		width: calc(100% - 20px);
		padding: 10px;
		font-size: 21px;
		margin: 10px auto 5px;
		border: 1px dashed #472822;
		border-radius: 6px;
	}
	.ranking {
		padding-top: 10px;
	
		.rankingitem {
			width: calc(50% - 15px);
			margin: 0 5px 20px 10px;
			border-radius: 4px;
			box-shadow: rgb(204, 204, 204) 2px 5px 5px;
	
			.rankingcontent {
				.rankingtitle {
					margin-left: 10px;
					margin-top: 15px;
					font-size: 33px;
				}
	
				.txt {
					margin-left: 10px;
					margin-top: 5px;
					font-size: 25px;
				}
			}
		}
	}
	
	.expertbox {
		.button {
			width: calc(50% - 15px);
			margin: 0 5px 10px 10px;
			height: 40px;
			border-radius: 5px;
			font-size: 16px;
		}
	
	
	}
	.menuslist {
		font-size: 29px;
		.menusitem{
			height: 50px;
			border-bottom: 1px solid #f3f3f3;
			padding: 0 10px;
			.img{
				width: 23px;
				height: 23px;
				margin-right: 10px;
			}
		}
	}
	
	
	
}



</style>
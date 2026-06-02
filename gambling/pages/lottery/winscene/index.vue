<template>
	<view class="container">
		<navbar title="开奖现场" class="navbar">
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
						<uni-icons color="#fff" type="help" size="16" />
						<text class="">帮助</text>
					</view>
					<view class="button">
						<i class="iconfont icon-fenxiang"></i>
						<text>分享</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="flex flexcolumn scrollBox" :style="{ height: containerHeight + 'px' }">
			<view class="">
				<view class="topbox">
					<image class="bgimg" src="../static/img/am_bg_icon.png" mode="aspectFill"></image>
					<view class="topcentent">
						<image class="bgmaskimg" src="../static/img/drawBG_mask_icon.png" mode="aspectFill"></image>
						<view class="txt">
							<view class="title">
								{{title}}
							</view>
							<view class="">
								第<text class="period">{{newwininfo.period}}</text>期开奖直播时间：{{nextwinresultstime[0]}}
							</view>
							<view class="time">
								{{nextwinresultstime[1]}}
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="circuit">
					<view class="circuititem active">
						线路一
					</view>
					<view class="circuititem">
						线路二
					</view>
					<view class="circuititem">
						线路三
					</view>
					<view class="circuititem">
						线路四
					</view>
				</view> -->
				<view class="winresults">
					<view class="top">
						<view class="titel">
							<text class="name">
								{{title}}
							</text>
							第
							<text class="num">
								{{winresultsinfo.period}}
							</text>
							期最新开奖结果
						</view>
					</view>
					<view class="ballList">
							<view class="ballItem"  v-for="(item,index) in winresultsinfo.ball" :key="index">
								<view class="ballImg">
									<view class="ball">
										<image v-if="item.sb=='red'" class="img" src="@/static/img/ball_red.png"
											mode=""></image>
										<image v-if="item.sb=='blue'" class="img" src="@/static/img/ball_blue.png"
											mode=""></image>
										<image v-if="item.sb=='green'" class="img" src="@/static/img/ball_green.png"
											mode="">
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
											class="img" src="@/static/img/ball_red.png" mode=""></image>
										<image v-if="winresultsinfo.lastBall.sb=='blue'"
											class="img" src="@/static/img/ball_blue.png" mode=""></image>
										<image v-if="winresultsinfo.lastBall.sb=='green'"
											class="img" src="@/static/img/ball_green.png" mode="">
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
					</view>

				</view>

			</view>
			<view class="scroll">
				<scroll-view class="scrollview" scroll-y="true">
					<view class="title">
						开奖回放
					</view>
					<view class="replaylist">
						<view class="replayitem" v-for="(item,index) in videolist" :key="index" @click="navigatorTo('/pages/lottery/review/index?id='+item.id)">
							<view class="replayimg">
								<image class="img" :src="item.openImg" mode="widthFix"></image>
							</view>
							<view class="txt">
								{{item.period}}期开奖视频
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"

	import {
		getNewDataApi,
		getVideolistApi
	} from "@/api/api.js"
	import {
		codeToLottery,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				title: "",
				code: "",
				winresultsinfo: {}, //开奖结果
				newwininfo: {}, //下一期开奖日期
				newyear: new Date().getFullYear(),
				containerHeight: 0,
				nextwinresultstime:[],
				videolist:[],
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
			if (options.code) {
				this.title = codeToLottery(options.code)
				this.code = options.code
				this.getVideolist()
				this.getNewData()
			}
		},

		methods: {
			getNewData() {
				let that = this;
				uni.showLoading()
				getNewDataApi({
					year: that.newyear,
					lotteryType: that.code
				}).then(res => {
					uni.hideLoading()
					if (res.data) {
						res.data.forEach(x => {
							if(x.status == 0){
								that.nextwinresultstime = that.formatTimestamp(x.date)
								that.newwininfo=x
							}else if (+x.status >=1) {
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
							}
						})
					}
				}).catch(err => {
					uni.hideLoading()
				})
			},
			getVideolist(){
				let that = this;
				getVideolistApi({
					year: that.newyear,
					type: that.code
				}).then(res => {
					if (res.data) {
						that.videolist=res.data
					}
				}).catch(err => {
				})
			},
			formatTimestamp(timestamp) {
			  // 时间戳可能是秒或毫秒，这里统一处理为毫秒
			  const msTimestamp = typeof timestamp === 'number' ? timestamp * 1000 : 0;
			  
			  // 创建Date对象
			  const date = new Date(msTimestamp);
			  
			  // 验证时间戳有效性
			  if (isNaN(date.getTime())) {
			    return '无效时间';
			  }
			  
			  // 获取时间组件
			  const year = date.getFullYear();
			  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
			  const day = String(date.getDate()).padStart(2, '0');
			  const hours = String(date.getHours()).padStart(2, '0');
			  const minutes = String(date.getMinutes()).padStart(2, '0');
			  
			  // 星期映射表（0是周日，1是周一...6是周六）
			  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			  const weekDay = weekDays[date.getDay()];
			  
			  // 拼接成目标格式
			  return [`${year}-${month}-${day}`,`${hours}:${minutes} ${weekDay}`];
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
				width: 25px;
				margin: 0 3px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.topbox {
		position: relative;
		width: 100%;
		height: 600rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;

		.bgimg {
			position: absolute;
			width: 100%;
			height: 600rpx;
		}

		.topcentent {
			position: relative;
			width: 100%;
			padding: 32rpx 0;
			color: #fff;
			font-size: 28rpx;
			overflow: hidden;

			.bgmaskimg {
				position: absolute;
				width: 100%;
				height: 100%;
			}

			.txt {
				position: relative;
				z-index: 2;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}

			.title {
				font-size: 36rpx;
				font-weight: bold;
				padding: 16rpx 0;
			}

			.period {
				color: rgb(245, 142, 3);
			}

			.time {
				padding-top: 8rpx;
				font-size: 36rpx;
			}
		}
	}

	.circuit {
		display: flex;
		justify-content: space-around;
		height: 60rpx;

		.circuititem {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1 1 0%;
			height: 100%;
			color: #333;
			font-size: 28rpx;

			&.active {
				color: rgb(255, 0, 0);
			}
		}
	}

	.winresults {
		width: 100%;
		padding-top: 10rpx;
		background-color: rgb(255, 255, 255);

		.top {
			width: 100%;
			padding: 0 15rpx;
			color: rgb(51, 51, 51);
			font-size: 30rpx;
			margin-bottom: 10rpx;
			min-height: 25px;

			.name {
				font-size: 38rpx;
			}

			.num {
				font-size: 30rpx;
				color: rgb(245, 142, 3);
			}
		}

		.ballList {
			display: flex;
			width: 100%;
			justify-content: space-around;

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
	}

	.scroll {
		flex: 1;
		min-height: 0;

		.scrollview {
			height: 100%;

			.title {
				width: 100%;
				padding: 32rpx 20rpx 20rpx;
				background-color: rgb(255, 255, 255);
				font-size: 28rpx;
			}
			.replaylist{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.replayitem{
					width: calc(50% - 20rpx);
					padding-bottom: 20rpx;
					margin: 16rpx 10rpx 0;
				}
				.replayimg{
					width: 100%;
					.img{
						width: 100%;
					}
				}
				.txt{
					margin-top: 16rpx;
					font-size: 28rpx;
				}
			}
			
		}
	}

	@media (min-width: 600px){
		.topbox {
			height: 337px;
		
			.bgimg {
				height: 337px;
			}
		
			.topcentent {
				padding: 16px 0;
				font-size: 14px;
		
				.title {
					font-size: 18px;
					padding: 8px 0;
				}
		
				.time {
					padding-top: 4px;
					font-size: 18px;
				}
			}
		}
		
		.circuit {
			height: 30px;
			.circuititem {
				font-size: 14px;
			
			}
		}
		
		.winresults {
			padding-top: 5px;
		
			.top {
				padding: 0 8px;
				font-size: 25px;
				margin-bottom: 5px;
				min-height: 25px;
		
				.name {
					font-size: 28px;
				}
		
				.num {
					font-size: 25px;
				}
			}
		
			.ballList {
				.ballItem {
					font-size: 23px;
				}
		
				.ballImg {
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
				}
		
				.jiaball {
					.jia {
						font-size: 16px;
						margin-top: 10px;
						margin-right: 10px;
					}
				}
			}
		}
		
		.scroll {
		
			.scrollview {
		
				.title {
					padding: 16px 10px 10px;
					font-size: 14px;
				}
				.replaylist{
					.replayitem{
						width: calc(50% - 10px);
						padding-bottom: 10px;
						margin: 8px 5px 0;
					}
					
					.txt{
						margin-top: 8px;
						font-size: 14px;
					}
				}
				
			}
		}
		
		
	}


</style>
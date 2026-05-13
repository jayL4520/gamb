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
					<view class="button">
						<i class="iconfont icon-fenxiang"></i>
						<text>分享</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="">
			<view class="videobox">
				<video ref="videoPlayer" class="video" :src="videoUrl" :controls="true" :autoplay="true" :loop="false"
					:show-mute-btn="true" :enable-play-gesture="true"></video>
			</view>
			<view class="ballbox">
				<view class="time">
					{{formatTimestamp1(info.date)}} {{info.period}} 期
				</view>
				<view class="ballList">
					<view class="ballItem" v-for="(item,index) in info.ball" :key="index">
						<view class="ballImg">
							<view class="ball">
								<image v-if="item.sb=='red'" class="img" src="@/static/img/ball_red.png" mode="">
								</image>
								<image v-if="item.sb=='blue'" class="img" src="@/static/img/ball_blue.png" mode="">
								</image>
								<image v-if="item.sb=='green'" class="img" src="@/static/img/ball_green.png" mode="">
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
					<view class="jiaball" v-if="info.lastBall">
						<view class="jia">
							+
						</view>
						<view class="ballItem">
							<view class="ballImg">
								<view class="ball">
									<image v-if="info.lastBall.sb=='red'" class="img" src="@/static/img/ball_red.png"
										mode=""></image>
									<image v-if="info.lastBall.sb=='blue'" class="img" src="@/static/img/ball_blue.png"
										mode=""></image>
									<image v-if="info.lastBall.sb=='green'" class="img"
										src="@/static/img/ball_green.png" mode="">
									</image>
								</view>
								<view class="ball_num">
									{{info.lastBall.num}}
								</view>
							</view>
							<view class="ball_name">
								{{info.lastBall.sx}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="advertisementBox">
				<view class="advertisementlist">
					<view class="advertisementitem" v-for="(item,index) in advertisementlist" :key="index">
						{{item.name}}
					</view>
				</view>
				<view class="home_add">
					<image class="img" src="@/static/img/home_add.png" mode="">
					</image>
				</view>
			</view>
			<view class="tbwimg">
				<image class="img" src="../static/img/tbw.jpg" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"

	import {
		getVideodataApi,
	} from "@/api/api.js"
	import {
		formatTimestamp1,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				navtitle: "开奖回顾",
				id: 0,
				// 视频源地址
				videoUrl: '',
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
				info: {},
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
				this.getdata()
			}
		},

		methods: {
			formatTimestamp1,
			getdata() {
				let that = this
				uni.showLoading()
				getVideodataApi(that.id).then(res => {
					if (res.data) {
						that.videoUrl = res.data.videoUrl
						let x = res.data
						let numberarr = x.numbers.split(",")
						let sbarr = x.sb.split(",")
						let sxarr = x.sx.split(",")
						let wxarr = x.wx.split(",")
						let ball = []
						numberarr.forEach((x, i) => {
							ball.push({
								num: x,
								sb: sbarr[i],
								sx: sxarr[i],
								wx: wxarr[i]
							})
						})
						x.lastBall = ball.pop()
						x.ball = ball
						that.info = x
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






	.ballList {
		display: flex;
		width: 100%;
		justify-content: space-around;
		padding: 16rpx 0;

		.ballItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: rgb(51, 51, 51);
			font-size: 28rpx;
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

	.videobox {
		width: 100%;

		.video {
			width: 100%;
		}
	}

	.ballbox {
		padding: 20rpx;

		.time {
			font-size: 28rpx;
		}
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

	.tbwimg {
		margin-top: 42rpx;
		width: 100%;

		.img {
			width: 100%;
		}
	}

	@media (min-width: 600px) {
		.ballList {
			padding: 8px 0;

			.ballItem {
				font-size: 14px;
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
					left: 9px;
					font-size: 16px;
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

		.ballbox {
			padding: 10px;

			.time {
				font-size: 14px;
			}
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
				font-size: 13px;
			}
		}
	}

	.tbwimg {
		margin-top: 21px;
	}



	}
</style>
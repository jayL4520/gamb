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
		</navbar>
		<view class="">
			<view class="ballbox">
				<view class="date">
					<i class="iconfont icon-rili"></i>
					<text>{{formatTimestamp1(info.date)}}</text>
					<text class="period">{{info.period}}期</text>
				</view>
				<view class="ballList" v-if="info.ball">
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
					<template v-if="info.lastBall">
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
					</template>
				</view>
				<view class="line">

				</view>
				<view class="fiveelem">
					<view class="fiveelemitem" v-for="(item,index) in info.ball" :key="index">
						<text v-if="item.wx=='金'" class="gold">{{item.wx}}</text>
						<text v-if="item.wx=='木'" class="wood">{{item.wx}}</text>
						<text v-if="item.wx=='水'" class="water">{{item.wx}}</text>
						<text v-if="item.wx=='火'" class="fire">{{item.wx}}</text>
						<text v-if="item.wx=='土'" class="soil">{{item.wx}}</text>
					</view>
					<view class="jia">
					</view>
					<view class="fiveelemitem" v-if="info.lastBall">
						<text v-if="info.lastBall.wx=='金'" class="gold">{{info.lastBall.wx}}</text>
						<text v-if="info.lastBall.wx=='木'" class="wood">{{info.lastBall.wx}}</text>
						<text v-if="info.lastBall.wx=='水'" class="water">{{info.lastBall.wx}}</text>
						<text v-if="info.lastBall.wx=='火'" class="fire">{{info.lastBall.wx}}</text>
						<text v-if="info.lastBall.wx=='土'" class="soil">{{info.lastBall.wx}}</text>
					</view>
				</view>
			</view>

			<view class="results">
				<view class="resultsitem">
					特码单双：{{oddEven(info.lastNum)}}
				</view>
				<view class="resultsitem">
					特码大小：{{info.lastNum>=25?'大':'小'}}
				</view>
				<view class="resultsitem">
					总和大小：{{info.total>=175?'大':'小'}} ({{info.total}})
				</view>
				<view class="resultsitem">
					总和单双：{{oddEven(info.total)}}
				</view>
			</view>
			<view class="recommend">
				<view class="recommendtitle">
					第{{info.period}}期推荐
				</view>
				<view class="results">
					<view class="resultsitem">
						<text>正三:双</text>
						<image class="img" src="../static/img/label_spkj_zhong.png" mode=""></image>
					</view>
					<view class="resultsitem">
						<text>正三:合双</text>
						<image class="img" src="../static/img/label_spkj_zhong.png" mode=""></image>
					</view>
					<view class="resultsitem">
						<text>总和:小</text>
						<image class="img" src="../static/img/label_spkj_zhong.png" mode=""></image>
					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import {
		formatTimestamp1,
		oddEven,
	} from '@/utils/utils.js'
	import {
		getVideodataApi
	} from "@/api/api.js"

	export default {
		components: {
			navbar,
		},
		data() {
			return {
				navtitle: "本期开奖查询",
				id: 0,
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
			oddEven,
			getdata() {
				let that = this
				uni.showLoading()
				getVideodataApi(that.id).then(res => {
					if (res.data) {
						let x = res.data
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
	page {
		background: rgb(242, 242, 242);
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

		.ballItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: rgb(51, 51, 51);
			font-size: 35rpx;
			width: 60rpx;
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

		.jia {
			width: 30rpx;
			font-size: 32rpx;
			margin-top: 20rpx;
		}
	}


	.ballbox {
		background: #fff;
		padding-top: 20rpx;

		.date {
			padding-bottom: 20rpx;
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 15rpx;
			font-size: 35rpx;
			color: #333;

			.iconfont {
				font-size: 30rpx;
				margin-right: 6rpx;
			}
		}

		.time {
			font-size: 25rpx;
		}

		.line {
			width: calc(100% - 40rpx);
			background-color: rgb(243, 243, 243);
			height: 2rpx;
			margin: 10rpx 20rpx;
		}

		.fiveelem {
			display: flex;
			width: 100%;
			justify-content: space-around;

			.fiveelemitem {
				color: rgb(51, 51, 51);
				font-size: 35rpx;
				width: 60rpx;
				text-align: center;
			}

			.jia {
				width: 30rpx;
				font-size: 32rpx;
				margin-top: 20rpx;
			}
		}
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

	.results {
		display: flex;
		flex-wrap: wrap;
		color: rgb(51, 51, 51);
		font-size: 35rpx;
		margin-top: 10rpx;
		background: #fff;

		.resultsitem {
			display: flex;
			align-items: center;
			width: 50%;
			height: 60rpx;
			padding-left: 20rpx;
			line-height: 60rpx;

			.img {
				width: 36rpx;
				height: 26rpx;
			}
		}
	}

	.recommend {
		margin-top: 10rpx;
		background: #fff;

		.recommendtitle {
			margin: 0 20rpx;
			padding: 24rpx 0;
			border-bottom: 2rpx solid rgb(240, 241, 237);
			font-size: 40rpx;
		}
	}

	@media (min-width: 600px) {
		.ballList {
			.ballItem {
				font-size: 25px;
				width: 38px;
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
					position: absolute;
					top: 5px;
					left: 8px;
					font-size: 17px;
				}
			}

			.jia {
				width: 13px;
				font-size: 16px;
				margin-top: 10px;
			}
		}

		.ballbox {
			padding-top: 10px;

			.date {
				padding-bottom: 10px;
				padding: 0 8px;
				font-size: 25px;

				.iconfont {
					font-size: 20px;
					margin-right: 3px;
				}
			}

			.line {
				width: calc(100% - 20px);
				height: 1px;
				margin: 5px 10px;
			}

			.fiveelem {
				.fiveelemitem {
					font-size: 25px;
					width: 38px;
				}

				.jia {
					width: 13px;
					font-size: 16px;
					margin-top: 10px;
				}
			}
		}

		.results {
			font-size: 25px;
			margin-top: 5px;

			.resultsitem {
				height: 40px;
				padding-left: 10px;
				line-height: 40px;

				.img {
					width: 18px;
					height: 13px;
				}
			}
		}

		.recommend {
			margin-top: 5px;
			.recommendtitle {
				margin: 0 10px;
				padding: 12px 0;
				border-bottom: 1px solid rgb(240, 241, 237);
				font-size: 28px;
			}

		}
	}
</style>
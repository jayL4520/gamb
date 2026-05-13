<template>
	<view class="statisticslist">
		<view class="statisticsitem" v-for="(item,index) in list" :key="index">
			<view class="title box-middle">
				<text class="name">{{item.name}}</text>
				<text class="remarks">（{{item.remarks}}）</text>
			</view>
			<!-- 号码 -->
			<view class="list" v-if="type=='hm'" @click="navigatorTo(item.name)">
				<view class="itemsleft">
					<template v-for="(items,indexs) in item.convertlist" :key="indexs">
						<view class="box-middle ballitems" v-if="indexs<2">
							<view class="ballitemsleft">
								<view class="">号码</view>
								<view class="">次数</view>
							</view>
							<view class="balllist">
								<view class="ballItem" v-for="(col,i) in items" :key="i">
									<view class="ballImg">
										<view class="ball">
											<image v-if="col.bose=='红'" class="img" src="@/static/img/ball_red.png"
												mode=""></image>
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
					</template>

				</view>
				<view class="righticonBox box-center">
					<uni-icons class="righticon" type="right" size="20"></uni-icons>
				</view>
			</view>
			<!-- 生肖 -->
			<view class="list" v-if="type=='sx'">
				<view class="itemsleft">
					<template v-for="(items,indexs) in item.convertlist" :key="indexs">
						<view class="box-middle ballitems" v-if="indexs<2">
							<view class="ballitemsleft">
								<view class="">生肖</view>
								<view class="">次数</view>
							</view>
							<view class="balllist">
								<view class="ballItem" v-for="(col,i) in items" :key="i">
									<view class="ballImg">
										<view class="ball">
											<image class="img" src="@/static/img/tlsc_ball.png" mode="">
											</image>
										</view>
										<view class="ball_num sxball_num">
											{{col.hm}}
										</view>
									</view>
									<view class="ball_name">
										{{col.count}}
									</view>
								</view>
							</view>
						</view>
					</template>

				</view>
			</view>
			<!-- 波色 -->
			<view class="list" v-if="type=='bs'">
				<view class="itemsleft">
					<view class="box-middle ballitems">
						<view class="ballitemsleft">
							<view class="">波色</view>
							<view class="">次数</view>
						</view>
						<view class="balllist bsballlist">
							<view class="ballItem" v-for="(items,indexs) in item.list" :key="indexs">
								<view class="ballImg">
									<view class="ball">
										<image v-if="items.bose=='红'" class="img" src="@/static/img/ball_red.png"
											mode=""></image>
										<image v-if="items.bose=='蓝'" class="img" src="@/static/img/ball_blue.png"
											mode=""></image>
										<image v-if="items.bose=='绿'" class="img" src="@/static/img/ball_green.png"
											mode="">
										</image>
									</view>
									<view class="ball_num"
										:class="items.bose=='红'?'red':items.bose=='蓝'?'blue':'green'">
										{{items.hm}}
									</view>
								</view>
								<view class="ball_name">
									{{items.count}}
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
			<!-- 尾数 -->
			<view class="list" v-if="type=='ws'">
				<view class="itemsleft">
					<template v-for="(items,indexs) in item.convertlist" :key="indexs">
						<view class="box-middle ballitems" v-if="indexs<2">
							<view class="ballitemsleft">
								<view class="">尾数</view>
								<view class="">次数</view>
							</view>
							<view class="balllist">
								<view class="ballItem" v-for="(col,i) in items" :key="i">
									<view class="ballImg">
										<view class="ball">
											<image class="img" src="@/static/img/tlsc_ball.png" mode="">
											</image>
										</view>
										<view class="ball_num wsball_num">
											{{col.hm}}
										</view>
									</view>
									<view class="ball_name">
										{{col.count}}
									</view>
								</view>
							</view>
						</view>
					</template>

				</view>
			</view>

		</view>
	</view>

</template>

<script>
	
	export default {
		emits:["onClick"],
		props:{
			type:{
				type:String,
				default:""
			},
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
		},
		data() {
			return {
			
			}
		},
		onLoad(options) {
			
		},

		methods: {
			navigatorTo(e) {
				this.$emit("onClick",e)
			},

		},

	}
</script>

<style lang="scss" scoped>

	.statisticslist {
		.statisticsitem {
			background: #f6f6f6;
			padding-left: 20rpx;

			&:nth-child(2n) {
				background: #fff;
			}

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
			.ballitemsleft {
				font-size: 30rpx;
				color: rgb(102, 102, 102);
				line-height: 60rpx;
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
					top: 10rpx;
					left: 20rpx;
					color: rgb(167, 23, 26) !important;
				}

				&.blue {
					top: 10rpx;
					left: 20rpx;
					color: rgb(42, 87, 127);
				}

				&.green {
					top: 10rpx;
					left: 20rpx;
					color: rgb(57, 108, 21);
				}
			}

			.sxball_num {
				color: rgb(239, 126, 76);
				top: 10rpx;
				left: 20rpx;
			}
			
			.wsball_num {
				color: rgb(239, 126, 76);
				top: 10rpx;
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

@media (min-width: 600px){
	.statisticslist {
		.statisticsitem {
			padding-left: 10px;
	
			.title {
				font-size: 25px;
				line-height: 50px;
	
				.name {
					font-size: 28px;
				}
			}
		}
	
		.ballitems {
			.ballitemsleft {
				font-size: 28px;
				line-height: 50px;
			}
	
			.balllist {
				&.bsballlist {
					.ballItem {
						margin-left: 15px;
					}
				}
			}
		}
	
		.ball_name {
			font-size: 26px;
			line-height: 50px;
		}
	
		.ballImg {
			width: 50px;
			height: 50px;
	
			.ball {
			
				width: 50px;
				height: 50px;
	
			}
	
			.ball_num {
				top: 12px;
				left: 14px;
				font-size: 17px;
	
				&.red {
					top: 12px;
					left: 18px;
				}
	
				&.blue {
					top: 12px;
					left: 18px;
				}
	
				&.green {
					top: 12px;
					left: 18px;
				}
			}
	
			.sxball_num {
				top: 12px;
				left: 18px;
			}
			
			.wsball_num {
				top: 10px;
				left: 12px;
			}
	
			.ball_num_tw {
				top: 8px;
				left: 8px;
				font-size: 13px;
			}
		}
	}
	
}

</style>
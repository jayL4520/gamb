<template>
	<view class="ballItem">
		<view class="ballImg">
			<view class="ball">
				<image v-if="item.sb=='red'" class="img" src="@/static/img/ball_red.png" mode=""></image>
				<image v-if="item.sb=='blue'" class="img" src="@/static/img/ball_blue.png" mode=""></image>
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


</template>

<script>
	export default {
		name: "navbar",
		props: {
			item: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.ballItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: rgb(51, 51, 51);
		font-size: 40rpx;
	}

	.ball_name {
		display: flex;
		align-items: center;
		font-size: 25rpx;
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
	@media (min-width: 600px){
		.ballItem {
			font-size: 23px;
		}
		
		.ball_name {
			font-size: 17px;
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
		
			.ball_num_tw {
				top: 8px;
				left: 8px;
				font-size: 17px;
			}
		}
	}
</style>
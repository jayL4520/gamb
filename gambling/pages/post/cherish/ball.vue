<template>
	<view class="ballbox">
		<view v-for="(item,index) in ballobj.list" :key="index"
			class="box-center ballitem"
			@click="onClick(item.hm,ballobj.max)">
			<view class="ballImg">
				<view class="ball">
					<image v-if="item.bose=='红'" class="img"
						src="@/static/img/ball_red.png" mode=""></image>
					<image v-if="item.bose=='蓝'" class="img"
						src="@/static/img/ball_blue.png" mode=""></image>
					<image v-if="item.bose=='绿'" class="img"
						src="@/static/img/ball_green.png" mode="">
					</image>
				</view>
				<view class="ball_num">
					{{item.hm}}
				</view>
			</view>
			<uni-icons v-if="listsel.includes(item.hm)" class="icon"
				type="checkbox-filled" :size="windowWidth>600?'20':'30rpx'"
				color="#C4322D"></uni-icons>
		</view>
	</view>
</template>

<script>
	import {
		useTimeAgo
	} from '@/utils/utils.js'
	export default {
		emits:["onClick"],
		props: {
			ballobj:{
				type:Object,
				default:{}
			},
			listsel: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				windowWidth:0,
			};
		},
		onLoad() {

		},
		mounted() {
			let app = getApp();
			this.windowWidth= app.globalData.windowWidth
		},
		methods: {
			onClick(e,max){
				this.$emit("onClick",e,max)
			}
		},
	}
</script>




<style lang="scss" scoped>
	.ballbox {
		display: grid;
		row-gap: 20rpx;
		grid-template-columns: repeat(6, 1fr);
		padding: 20rpx 0;
	
	
		.ballitem {
			position: relative;
	
			.icon {
				position: absolute;
				top: -10rpx;
				right: 2rpx;
			}
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
			}
	
		}
	
	}
	@media (min-width: 600px){
		.ballbox {
			row-gap: 10px;
			padding: 10px 0;
		
			.ballitem {
				.icon {
					top: -5px;
					right: 10px;
				}
			}
		
			.ballImg {
				position: relative;
				width: 60px;
				height: 60px;
				// margin-bottom: 16rpx;
		
				.ball {
					width: 60px;
					height: 60px;
				}
		
				.ball_num {
					position: absolute;
					top: 9px;
					left: 14px;
					font-size: 25px;
					font-weight: bold;
					color: rgb(51, 51, 51);
		
				}
		
			}
		
		}
	}
</style>
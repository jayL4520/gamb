<template>
	<view class="">
		<view v-for="(item,index) in list" :key="index" class="replyitem" @click="navigatorTo('/pages/post/reply/index')">
			<view class="box-middle nickname">
				<uni-icons class="icon" type="contact" :size="windowWidth>600?'15':'30rpx'" color="#f58e03"></uni-icons>
				{{item.nickname}}
			</view>
			<view class="content">
				{{item.content}}
			</view>
			<view class="box-middle time">
				<text>{{useTimeAgo(item.time)}}</text>
				<view class="replynum">
					{{item.replynum}}回复
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useTimeAgo
	} from '@/utils/utils.js'
	export default {
		props: {
			list: {
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
			useTimeAgo,
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
	.replyitem {
		width: 100%;
		padding: 20rpx;
		border-bottom: 2rpx solid rgb(243, 243, 243);
	
		.nickname {
			font-size: 20rpx;
			color: #f58e03;
	
			.icon {
				margin-right: 10rpx;
				margin-top: 5rpx;
			}
		}
	
		.content {
			margin: 20rpx 0;
			line-height: 40rpx;
			font-size: 35rpx;
			color: rgb(51, 51, 51);
		}
	
		.time {
			color: rgb(153, 153, 153);
			font-size: 25rpx;
		}
	
		.replynum {
			padding: 8rpx 20rpx;
			color: rgb(153, 153, 153);
			font-size: 25rpx;
			background: rgb(243, 243, 243);
			border-radius: 8rpx;
			margin-left: 20rpx;
		}
	}
	
	@media (min-width: 600px){
		.replyitem {
			width: 100%;
			padding: 10px;
			border-bottom: 1px solid rgb(243, 243, 243);
		
			.nickname {
				font-size: 15px;
		
				.icon {
					margin-right: 5px;
					margin-top: 3px;
				}
			}
		
			.content {
				margin: 10px 0;
				line-height: 20px;
				font-size: 15px;
			}
		
			.time {
				font-size: 14px;
			}
		
			.replynum {
				padding: 4px 10px;
				font-size: 14px;
				border-radius: 4px;
				margin-left:10px;
			}
		}
	}
</style>
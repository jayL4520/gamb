<template>
	<view class="recommended">
		<view class="vline"></view>
		<view class="">
			<view class="box-middle justifybetween titlebox">
				<view class="title">
					为您推荐
				</view>
				<view class="">
					<text>更多</text>
					<uni-icons type="right" :size="windowWidth>600?'20':'40rpx'" color="#999"></uni-icons>
				</view>
			</view>
			<view class="list">
				<scroll-view class="scrollbox" scroll-x="true" style="white-space: nowrap; display: flex;"
					:show-scrollbar="false">
					<view class="userlist">
						<view v-for="(item,index) in list" :key="index" class="useritem">
							<image class="avatar" :src="item.avatar" mode=""></image>
							<view class="nickname line1">
								{{item.nickname}}
							</view>
							<view class="fans line1">
								粉丝:{{item.fans}}
							</view>
							<button class="btn" v-if="!item.isfollow">关注</button>
							<button class="btn follow" v-if="item.isfollow">已关注</button>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		name: "recommended",
		props: {

		},
		data() {
			return {
				windowWidth:0,
				list: [{
						avatar: "/static/img/avatar.png",
						nickname: "昵称",
						fans: 11888885,
						isfollow: true,
					},
					{
						avatar: "/static/img/avatar.png",
						nickname: "昵称昵称昵称",
						fans: 1185,
						isfollow: false,
					},
					{
						avatar: "/static/img/avatar.png",
						nickname: "昵称",
						fans: 1185,
						isfollow: false,
					},
					{
						avatar: "/static/img/avatar.png",
						nickname: "昵称",
						fans: 1185,
						isfollow: false,
					},
					{
						avatar: "/static/img/avatar.png",
						nickname: "昵称",
						fans: 1185,
						isfollow: false,
					},
					{
						avatar: "/static/img/avatar.png",
						nickname: "昵称",
						fans: 1185,
						isfollow: false,
					},
					{
						avatar: "/static/img/avatar.png",
						nickname: "昵称",
						fans: 1185,
						isfollow: false,
					},
				],
			};
		},
		onLoad() {

		},
		mounted() {
			let app = getApp();
			this.windowWidth= app.globalData.windowWidth
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.vline {
		width: 100%;
		height: 20rpx;
		background: rgb(246, 246, 246);
	}

	.titlebox {
		width: 100%;
		padding: 20rpx;
		color: #666;
		font-size: 40rpx;

		.title {
			color: rgb(245, 142, 3);
			font-size: 42rpx;
		}
	}

	.list {
		width: 100%;

		.scrollbox {
			width: 100%;
		}

		.userlist {
			display: flex;
			align-items: stretch;
			padding-right: 20rpx;
		}

		.useritem {
			flex-shrink: 0;
			width: 200rpx;
			margin-left: 20rpx;
			border: 1rpx solid rgb(207, 207, 207);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: rgb(255, 255, 255);
			padding: 10rpx 20rpx;
			text-align: center;

			.avatar {
				width: 100rpx;
				height: 100rpx;
			}

			.nickname {
				width: 100%;
				font-size: 30rpx;
				margin-top: 20rpx;
			}

			.fans {
				width: 100%;
				color: rgb(102, 102, 102);
				font-weight: 300;
				margin-top: 6rpx;
				font-size: 25rpx;
			}
			.btn {
				margin-top: 10rpx !important;
				background-color: rgb(245, 142, 3);
				border-radius: 10rpx;
				padding: 8rpx 20rpx;
				color: rgb(255, 255, 255);
				font-size: 28rpx;
			}
			.follow{
				background: rgb(128, 128, 128);
			}
		}
	}

	@media (min-width: 600px){
		.vline {
			height: 10px;
		}
		
		.titlebox {
			padding: 10px;
			font-size: 20px;
		
			.title {
				font-size: 21px;
			}
		}
		
		.list {
		
			.userlist {
				padding-right: 10px;
			}
		
			.useritem {
				width: 150px;
				margin-left: 10px;
				border: 1px solid rgb(207, 207, 207);
				border-radius: 4px;
				padding: 5px 10px;
		
				.avatar {
					width: 50px;
					height: 50px;
				}
		
				.nickname {
					font-size: 21px;
					margin-top: 10px;
				}
		
				.fans {
					margin-top: 3px;
					font-size: 18px;
				}
				.btn {
					margin-top: 5px !important;
					border-radius: 5px;
					padding: 4px 10px;
					font-size: 14px;
				}
				
			}
		}
		
		
		
	}

</style>
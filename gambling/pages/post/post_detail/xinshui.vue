<template>
	<view class="xinshuibox">
		<view class="titlebox">
			<view class="title">
				我的淘料心水
			</view>
			<view class="">
				<text>更多</text>
				<uni-icons class="icon" type="right" :size="windowWidth>600?'17':'25rpx'" color="#666666"></uni-icons>
			</view>
		</view>
		<view class="list box-middle ">
			<scroll-view class="listscroll" scroll-x="true" style="white-space: nowrap; display: flex;"
				:show-scrollbar="false">
				<view class="flex">
					<view class="item" v-for="(item,index) in list" :key="index">
						<view class="box-middle">
							<view class="lable box-center">
								<image class="lableimg" src="@/static/img/ico_shatx.png" mode=""></image>
								<text>{{item.lable}}</text>
							</view>
							<view class="itemright">
								<view class="name line1">
									{{item.name}}
								</view>
								<view class="">
									<text>已连胜: {{item.winstreak}}</text>
									<text>查看数: {{item.view}}</text>
								</view>
							</view>
						</view>
						<view class="box-middle justifybetween itembottom">
							<view class="nickname box-middle">
								<image class="avatar" :src="item.avatar" mode=""></image>
								{{item.nickname}}
							</view>
							<button class="btn btn-primary">查看</button>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
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
				windowWidth: 0,
			}
		},
		mounted() {
			let app = getApp();
			this.windowWidth = app.globalData.windowWidth
		},
		methods: {

			navigatorTo(url) {
				console.log(url, "url");
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.xinshuibox {
		width: 100%;
		padding: 20rpx;
		border-bottom: 10rpx solid rgb(243, 243, 243);

		.titlebox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			font-size: 25rpx;
			color: #666666;

			.title {
				color: rgb(245, 142, 3);
			}
		}
	}

	.list {
		width: 100%;
		margin-top: 20rpx;

		.listscroll {
			width: 100%;
		}

		.item {
			background-color: rgb(255, 255, 255);
			margin-left: 20rpx;
			padding: 20rpx;
			border-radius: 8rpx;
			border: 2rpx solid rgb(207, 207, 207);

			&:first-child {
				margin-left: 0;
			}

			.lable {
				position: relative;
				width: 52rpx;
				height: 90rpx;
				color: #fff;
				z-index: 1;
				text-align: center;
				padding: 10rpx 5rpx 0;
				font-size: 22rpx;
				white-space: pre-wrap;
				overflow-wrap: break-word;

				.lableimg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: -1;
				}
			}

			.itemright {
				flex: 1;
				min-width: 0;
				padding-left: 20rpx;
				color: rgb(102, 102, 102);
				font-size: 22rpx;

				.name {
					width: 100%;
					max-width: 400rpx;
					color: rgb(51, 51, 51);
					font-size: 25rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
			}

			.itembottom {
				margin-top: 20rpx;

				.nickname {
					color: rgb(102, 102, 102);
					font-size: 22rpx;
					margin-right: 30rpx;

					.avatar {
						width: 40rpx;
						height: 40rpx;
						margin-right: 16rpx;
					}
				}

				.btn {
					background-color: rgb(245, 142, 3);
					border-radius: 8rpx;
					border: 2rpx solid rgb(245, 142, 3);
					padding: 4rpx 8rpx;
					font-size: 22rpx;
				}

			}
		}

	}

	@media (min-width: 600px) {
		.xinshuibox {
			padding: 10px;
			border-bottom: 5px solid rgb(243, 243, 243);

			.titlebox {
				font-size: 17px;
				color: #666666;

			}
		}
		
		.list {
			margin-top: 10px;
		
			.item {
				margin-left: 10px;
				padding: 10px;
				border-radius: 4px;
				border: 1px solid rgb(207, 207, 207);
		
				.lable {
					width: 26px;
					height: 45px;
					padding: 5px 3px 0;
					font-size: 12px;
				
				}
		
				.itemright {
					padding-left: 10px;
					font-size: 14px;
		
					.name {
						max-width: 200px;
						font-size: 14px;
						margin-bottom: 5px;
					}
				}
		
				.itembottom {
					margin-top: 10px;
		
					.nickname {
						font-size: 14px;
						margin-right: 15px;
		
						.avatar {
							width: 24px;
							height: 24px;
							margin-right: 8px;
						}
					}
		
					.btn {
						border-radius: 4px;
						border: 1px solid rgb(245, 142, 3);
						padding: 2px 4px;
						font-size: 14px;
					}
		
				}
			}
		
		}
		

	}
</style>
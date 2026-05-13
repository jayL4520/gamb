<template>
	<view class="container">
		<navbar title="个人信息" class="navbar">
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
			<view class="card">
				<view class="userinfo">
					<image class="avatarimg" src="@/static/img/avatar.png" mode=""></image>
					<view class="nickname">
						歡迎您，用户
					</view>
					<view class="box-center usernum-wrapper">
						<view class="num-item" @click.stop="navigatorTo('/pages/users/social/index?type=friend')">
							朋友:<text class="num">0</text>
						</view>
						<view class="line"></view>
						<view class="num-item" @click.stop="navigatorTo('/pages/users/social/index?type=follow')">
							关注:<text class="num">0</text>
						</view>
						<view class="line"></view>
						<view class="num-item" @click.stop="navigatorTo('/pages/users/social/index?type=fans')">
							粉丝:<text class="num">0</text>
						</view>
						<view class="line"></view>
						<view class="num-item" @click.stop="navigatorTo('/pages/users/social/index?type=block')">
							拉黑:<text class="num">0</text>
						</view>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="num-wrapper">
					<view class="num-item">
						<view class="num">0</view>
						<view class="">我的积分</view>
					</view>
					<view class="line"></view>
					<view class="num-item">
						<view class="num">0</view>
						<view class="">我的元宝</view>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="userinfo_menus">
					<view class="">
						用户名：
					</view>
					<view class="flex1">
						用户
					</view>
				</view>
				<view class="userinfo_menus">
					<view class="">
						真实姓名：
					</view>
					<view class="flex1 tips">
						姓名一经绑定，无法修改
					</view>
					<uni-icons type="right" :size="windowWidth>600?'20':'35rpx'" color="#999999"></uni-icons>
				</view>
				<view class="userinfo_menus">
					<view class="">
						手机号码：
					</view>
					<view class="flex1">
						132****1234
					</view>
					<view class="edit">
						修改
					</view>
				</view>
				<view class="userinfo_menus">
					<view class="">
						修改登录密码：
					</view>
					<view class="flex1">
					</view>
					<uni-icons type="right" :size="windowWidth>600?'20':'35rpx'" color="#999999"></uni-icons>
				</view>
				<view class="userinfo_menus">
					<view class="">
						设置支付密码：
					</view>
					<view class="flex1">
					</view>
					<uni-icons type="right" :size="windowWidth>600?'20':'35rpx'" color="#999999"></uni-icons>
				</view>
			</view>
			<view class="btn box-center">退出当前账号</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"

	export default {
		components: {
			navbar,
		},
		data() {
			return {
				windowWidth: 0,
			}
		},
		onLoad(options) {
			let app = getApp();
			this.windowWidth = app.globalData.windowWidth
		},

		methods: {
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
		background: #f3f3f3;
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

	}

	.card {
		background: #fff;
		margin-bottom: 10rpx;
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
		color: rgb(102, 102, 102);
		font-size: 30rpx;

		.avatarimg {
			width: 140rpx;
			height: 140rpx;
			margin-bottom: 40rpx;
		}

		.nickname {
			color: rgb(51, 51, 51);
			margin-bottom: 20rpx;
		}

		.usernum-wrapper {
			margin-bottom: 20rpx;

			.num-item {
				margin: 0 20rpx 0 12rpx;

				.num {
					color: rgb(245, 142, 3);
				}
			}

			.line {
				width: 2rpx;
				height: 30rpx;
				background-color: rgb(153, 153, 153);
			}
		}

	}

	.num-wrapper {
		display: flex;
		align-items: center;

		.num-item {
			flex: 1 1 0%;
			min-width: 0;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: rgb(102, 102, 102);

			.num {
				color: rgb(51, 51, 51);
				font-weight: bold;
				margin-bottom: 10rpx;
			}
		}

		.line {
			height: 80rpx;
			width: 2rpx;
			background-color: rgb(240, 241, 237);
		}
	}

	.userinfo_menus {
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 0 10rpx 0 20rpx;
		font-size: 35rpx;

		.flex1 {
			min-width: 0;
		}

		.tips {
			color: #999999;
		}

		.edit {
			color: rgb(245, 142, 3);
			text-decoration: underline;
		}
	}

	.btn {
		width: calc(100% - 40rpx);
		margin: 80rpx auto 40rpx;
		height: 80rpx;
		border-radius: 8rpx;
		background-color: rgb(194, 52, 50);
		color: #fff;
		font-size: 30rpx;
	}


@media (min-width: 600px){
	.card {
		margin-bottom: 5px;
	}
	
	.userinfo {
		padding-top: 10px;
		font-size: 25px;
	
		.avatarimg {
			width: 76px;
			height: 76px;
			margin-bottom: 20px;
		}
	
		.nickname {
			margin-bottom: 10px;
		}
	
		.usernum-wrapper {
			margin-bottom: 10px;
			.num-item {
				margin: 0 10px 0 6px;
			}
	
			.line {
				width: 1px;
				height: 15px;
			}
		}
	
	}
	
	
	.num-wrapper {
		.num-item {
			height: 80px;
			font-size: 26px;
	
			.num {
				margin-bottom: 5px;
			}
		}
	
		.line {
			height: 40px;
			width: 1px;
		}
	}
	
	.userinfo_menus {
		height: 45px;
		padding: 0 5px 0 10px;
		font-size: 26px;
	}
	
	.btn {
		width: calc(100% - 20px);
		margin: 40px auto 20px;
		height: 45px;
		border-radius: 4px;
		font-size: 17px;
	}
	
	
}

</style>
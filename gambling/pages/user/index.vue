<template>
	<view class="container">
		<navbar title="我的" class="navbar">
			<template v-slot:navright>
				<view class="navrightbutton">
					<view class="button">
						<i class="iconfont icon-saoyisao"></i>
						<text>扫一扫</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="mineTop">
			<view class="mineTopBg">
				<image class="img" src="@/static/img/mineTopBg.png" mode=""></image>
			</view>
			<view class="head" v-if="!isLogin" @click="navigatorTo('/pages/users/login/index')">
				<view class="avatar box-center">
					<view class="avatarimg">
						<image class="img"  :src="userInfo.avatar?userInfo.avatar:'@/static/img/icon_personal_enroll.png'" mode=""></image>
					</view>
					<view class="login">
						登录
					</view>
				</view>
				<view class="headright">
					<view class="login">
						登录/注册
					</view>
					<view class="">
						点击登录，享受更多精彩玩法
					</view>
				</view>
			</view>
			<view class="headLogin" v-if="isLogin">
				<view class="avatar box-center">
					<image class="avatarimg" src="@/static/img/avatar.png" mode=""></image>
					<image class="camera" src="@/static/img/camera.png" mode=""></image>
				</view>
				<view class="userinfo" @click="navigatorTo('/pages/users/userinfo/index')">
					<view class="username">
						{{userInfo.userName}}
					</view>
					<view class="box-middle acea-row">
						<view class="" @click.stop="navigatorTo('/pages/users/social/index?type=follow')">
							关注:0
						</view>
						<view class="verticalline"></view>
						<view class="" @click.stop="navigatorTo('/pages/users/social/index?type=fans')">
							粉丝:0
						</view>
						<view class="verticalline"></view>
						<view class="" @click.stop="navigatorTo('/pages/users/social/index?type=block')">
							拉黑:0
						</view>
					</view>

					<view class="mt20">
						邀请码:19811553
					</view>
					<view class="mt20 box-middle">
						<view class="online">
							在线
							<div class="point"></div>
						</view>
						<view class="">
							<uni-icons type="location" size="35rpx" color="#8f7462"></uni-icons>未知
						</view>
					</view>
				</view>
				<uni-icons type="right" size="40rpx" color="#cccccc"></uni-icons>

			</view>
			<view class="line"></view>
			<view class="num-wrapper">
				<view class="box-middle numtop">
					<view class="">
						我的积分 <text class="num">--</text>
					</view>
					<view class="verticalline"></view>
					<view class="">
						我的元宝 <text class="num">--</text>
					</view>
				</view>
				<view class="box-middle">
					<view class="box-middle numitem">
						<view class="numimg box-center">
							<i class="iconfont icon-chongzhi"></i>
						</view>
						<text>充值</text>
					</view>
					<view class="box-middle numitem">
						<view class="numimg box-center">
							<i class="iconfont icon-chongzhijiaofei"></i>
						</view>
						<text>提款</text>
					</view>
					<view class="box-middle numitem">
						<view class="numimg box-center">
							<i class="iconfont icon-huhuan"></i>
						</view>
						<text>元宝兑换</text>
					</view>
				</view>
			</view>
		</view>

		<view class="sharebox">
			<view class="yq_bg_image">
				<image class="img" src="@/static/img/yq_bg_image.png" mode="widthFix"></image>
			</view>
			<view class="share box-middle">
				<view class="">
					<view class="title">邀请好友赢好礼</view>
					<view class="">每月最高工资<text>3万</text>元现金</view>
				</view>
				<button class="button">邀请</button>
			</view>
		</view>
		<!-- 我的频道 -->
		<view class="card">
			<view class="title">
				我的频道
			</view>
			<view class="user-menus">
				<view class="menusitem">
					<image class="img" src="@/static/img/points.png" mode=""></image>
					<text>领积分</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/account.png" mode=""></image>
					<text>账户清单</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/collection.png" mode=""></image>
					<text>收款账号</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/release.png" mode=""></image>
					<text>我的发布</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/recommend.png" mode=""></image>
					<text>我的推广</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/feedback.png" mode=""></image>
					<text>我的反馈</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/vip.png" mode=""></image>
					<text>VIP</text>
				</view>
			</view>
		</view>
		<!-- 排行榜 -->
		<view class="card">
			<view class="title">
				排行榜
			</view>
			<view class="user-menus">
				<view class="menusitem">
					<image class="img" src="@/static/img/face.png" mode=""></image>
					<text>粉丝排行</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/tippers.png" mode=""></image>
					<text>打赏排行</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/win.png" mode=""></image>
					<text>专家连胜</text>
				</view>
			</view>
		</view>
		<!-- 其他帮助 -->
		<view class="card">
			<view class="title">
				其他帮助
			</view>
			<view class="user-menus">
				<view class="menusitem">
					<image class="img" src="@/static/img/customer.png" mode=""></image>
					<text>联系客服</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/help.png" mode=""></image>
					<text>帮助中心</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/settings.png" mode=""></image>
					<text>设置</text>
				</view>
				<view class="menusitem">
					<image class="img" src="@/static/img/face.png" mode=""></image>
					<text>面对面下载</text>
				</view>
			</view>
		</view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import tabbar from "@/components/tabbar.vue"
	import {
		mapGetters
	} from "vuex";
	import {
		getuserinfoApi,
	} from "@/api/user.js"
	export default {
		computed: mapGetters(['isLogin']),
		components: {
			navbar,
			tabbar
		},
		data() {
			return {
				userInfo: {},
			}
		},
		onLoad() {

		},
		onShow() {
			uni.hideTabBar()
			console.log(this.isLogin,"this.isLogin");
			if (this.isLogin) {
				this.getUserInfo();
			}
		},

		methods: {
			getUserInfo() {
				let that = this;
				uni.showLoading()
				getuserinfoApi().then(res => {
					uni.hideLoading()
					let data = res.data;
					that.userInfo = data;
					that.$store.commit('UPDATE_USERINFO', {
						userid: data.userId,
						avatar: data.avatar,
						nickname: data.userName,
						phone: data.phonenumber,
						yCode: data.yCode,
						roleGroup: data.roles[0].roleName,
					});
				}).catch(err => {
					uni.hideLoading()
				});
			},
			navigatorTo(url) {
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},





		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f2f2f2;
	}

	.container {
		padding-bottom: 60rpx;
	}

	.navbar {
		.navrightbutton {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #fff;
			font-size: 12px;

			.button {
				cursor: pointer;
				min-width: 25px;
				margin: 0 3px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.mineTop {
		position: relative;
		width: 100%;
		padding-bottom: 40rpx;
		z-index: 2;

		.mineTopBg {
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.head {
			display: flex;
			align-items: center;
			padding: 40rpx 20rpx;

			.avatar {
				position: relative;
				width: 200rpx;
				height: 200rpx;

				.avatarimg {
					position: absolute;
					z-index: -1;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.login {
					color: rgb(255, 255, 255);
					font-size: 40rpx;
				}
			}

			.headright {
				flex: 1 1 0%;
				padding-left: 20rpx;
				color: rgb(172, 151, 136);
				font-size: 20rpx;

				.login {
					font-size: 45rpx;
					color: rgb(51, 51, 51);
					margin-bottom: 16rpx;
				}
			}

		}

		.headLogin {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 16rpx;

			.avatar {
				width: 50%;
				position: relative;

				&::before {
					content: '';
					padding-top: 100%;
					box-sizing: border-box;
					display: block;
					width: 0;
				}

				.avatarimg {
					position: absolute;
					margin: auto;
					width: 80%;
					height: 80%;

				}

				.camera {
					position: absolute;
					right: 50rpx;
					bottom: 35rpx;
					width: 65rpx;
					height: 53rpx;
				}
			}

			.userinfo {
				flex: 1 1 0%;
				min-width: 0;
				color: #8f7462;
				font-size: 35rpx;
				padding-left: 20rpx;

				.username {
					color: rgb(51, 51, 51);
					font-size: 40rpx;
					margin: 10rpx 0 20rpx;
				}

				.verticalline {
					width: 2rpx;
					height: 30rpx;
					background-color: rgb(153, 153, 153);
					margin: 0 16rpx;
				}

				.online {
					position: relative;
					padding-right: 20rpx;

					.point {
						position: absolute;
						width: 12rpx;
						height: 12rpx;
						background-color: rgb(29, 224, 69);
						border-radius: 16rpx;
						right: 8rpx;
						top: 0px;
					}
				}
			}
		}

		.line {
			width: calc(100% - 40rpx);
			margin: 16rpx auto;
			height: 2rpx;
			background: rgb(254, 236, 204);
			border-bottom: 1rpx solid #fff;
		}
	}

	.num-wrapper {
		padding: 0 40rpx;

		.numtop {
			padding: 16rpx 0;
			font-size: 35rpx;
			color: rgb(143, 116, 98);

			.num {
				color: #333333;
			}
		}

		.verticalline {
			width: 2rpx;
			height: 40rpx;
			background-color: rgb(241, 229, 218);
			margin: 0 30rpx;
		}

		.numitem {
			flex: 1 1 0%;
			color: rgb(51, 51, 51);
			font-size: 35rpx;

			.numimg {
				width: 60rpx;
				height: 60rpx;
				background: linear-gradient(to right, #F1B27C, #F8D3A9);
				border-radius: 50%;
				color: #fff;
				margin-right: 10rpx;

				.iconfont {
					font-size: 35rpx;
					margin-top: 3rpx;
				}
			}
		}
	}

	.sharebox {
		position: relative;
		width: calc(100% - 40rpx);
		margin: 23rpx 20rpx 0;
		overflow: hidden;
		border-radius: 16rpx;
		z-index: 2;

		.yq_bg_image {
			position: absolute;
			width: 100%;
			z-index: -1;

			.img {
				width: 100%;
			}
		}

		.share {
			width: 100%;
			justify-content: space-between;
			padding: 36rpx;
			color: #fff;
			font-size: 25rpx;

			.title {
				font-size: 40rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			.button {
				padding: 12rpx 40rpx;
				background-color: rgb(245, 142, 3);
				border-radius: 60rpx;
				font-size: 25rpx;
				color: #fff;
			}
		}
	}

	.card {
		width: calc(100% - 40rpx);
		margin: 16rpx auto 0;
		padding: 32rpx 16rpx;
		background: #fff;
		border-radius: 20rpx;

		.title {
			margin-left: 20rpx;
			font-size: 40rpx;
			color: #000;
			font-weight: bold;
		}

		.user-menus {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
		}

		.menusitem {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-top: 30rpx;
			color: rgb(10, 10, 10);
			font-size: 30rpx;

			.img {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 10rpx;
			}
		}
	}

	@media (min-width: 600px) {
		.container {
			padding-bottom: 30px;
		}

		.mineTop {
			padding-bottom: 20px;

			.head {
				padding: 20px 10px;

				.avatar {
					width: 105px;
					height: 105px;

					.login {
						font-size: 26rpx;
					}
				}

				.headright {
					padding-left: 10px;
					font-size: 14px;

					.login {
						font-size: 29px;
						margin-bottom: 8px;
					}
				}

			}

			.headLogin {
				padding: 10px 8px;

				.avatar {
					.avatarimg {
						width: 80%;
						height: 80%;

					}

					.camera {
						right: 33px;
						bottom: 26px;
						bottom: 5px;
						width: 65px;
						height: 53px;
					}
				}

				.userinfo {
					font-size: 25px;
					padding-left: 10px;

					.username {
						font-size: 28px;
						margin: 5px 0 10px;
					}

					.verticalline {
						width: 1px;
						height: 15px;
						margin: 0 8px;
					}

					.online {
						padding-right: 10px;

						.point {
							width: 6px;
							height: 6px;
							border-radius: 8px;
							right: 4px;
							top: 0px;
						}
					}
				}
			}

			.line {
				width: calc(100% - 20px);
				margin: 8px auto;
				height: 1px;
				border-bottom: 0.5px solid #fff;
			}
		}

		.num-wrapper {
			padding: 0 20px;

			.numtop {
				padding: 8px 0;
				font-size: 25px;
			}

			.verticalline {
				width: 1px;
				height: 20px;
				margin: 0 15px;
			}

			.numitem {
				font-size: 25px;

				.numimg {
					width: 35px;
					height: 35px;
					margin-right: 5px;

					.iconfont {
						font-size: 20px;
						margin-top: 1px;
					}
				}
			}
		}

		.sharebox {
			width: calc(100% - 20px);
			margin: 12px 10px 0;
			border-radius: 8px;

			.share {
				padding: 18px;
				font-size: 18px;

				.title {
					font-size: 25px;
					margin-bottom: 5px;
				}

				.button {
					padding: 6px 20px;
					border-radius: 30px;
					font-size: 14px;
					color: #fff;
				}
			}
		}

		.card {
			width: calc(100% - 20px);
			margin: 8px auto 0;
			padding: 16px 8px;
			border-radius: 10px;

			.title {
				margin-left: 10px;
				font-size: 28px;
			}

			.menusitem {
				padding-top: 15px;
				font-size: 25px;

				.img {
					width: 35px;
					height: 35px;
					margin-bottom: 5px;
				}
			}
		}


	}
</style>
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
					<view class="button" @click="navigatorTo('/pages/post/post_search/index?code='+code)">
						<uni-icons type="search" size="20" color="#fff"></uni-icons>
						<text>搜索</text>
					</view>
					<view class="button" @click="navigatorTo('/pages/post/post_release/index?code='+code)">
						<uni-icons type="compose" size="20" color="#fff"></uni-icons>
						<text>发帖</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="">
			<!-- <view class="topfixedh"></view> -->
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<bannerswiper></bannerswiper>
				<view class="toptab-wrapper">
					<view class="toptabbox box-middle">
						<view class="toptabitem box-center active">
							全部主题
						</view>
						<view class="toptabitem box-center">
							交流贴
						</view>
						<view class="toptabitem box-center">
							图解小组
						</view>
						<view class="toptabitem box-center">
							战绩贴
						</view>

					</view>
					<view class="topsubtabbox box-middle">
						<view class="topsubtabitem box-center active">
							综合
						</view>
						<view class="topsubtabitem box-center">
							最新
						</view>
						<view class="topsubtabitem box-center">
							排行
						</view>
						<view class="topsubtabitem box-center">
							精华
						</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view v-for="(item,index) in list" :key="index" class="item"
					@click="navigatorTo('/pages/post/post_detail/index')">
					<view class="itemtop">
						<image class="avatar" :src="item.avatar" mode=""></image>
						<view class="box-middle">
							<text>{{item.nickname}}</text>
							<view class="userlable">
								{{item.lable}}
							</view>
							<view class="userlable" v-if="item.isgroup">
								群主
							</view>
						</view>
					</view>
					<view class="pad20">
						<view class="box-middle titlebox">
							<view class="box-middle">
								<view class="lable zd" v-if="item.istop">置顶</view>
								<view class="lable jh" v-if="isessence">精华</view>
								<!-- <view class="lable jh" v-if="item.isessence">精</view> -->
								<view class="lable qh" v-if="item.qh">{{item.qh}}期</view>
							</view>
							<view class="title line1">
								{{item.title}}
							</view>
						</view>
						<view class="contentbox">
							<text class="content line1">{{ellipsis(item.content)}}</text>
							<text class="fulltxt" v-if="item.content.length>20">全文</text>
						</view>
						<view class="imgbox" v-if="item.img">
							<image class="img" :src="item.img" mode="widthFix"></image>
						</view>
						<view class="itembottom box-middle justifybetween">
							<view class="time">
								{{item.time}}
							</view>
							<view class="num box-middle">
								<view class="numitem">
									<uni-icons class="icon" type="hand-up" size="25rpx" color="#999999"></uni-icons>
									<text>{{item.link}}</text>
								</view>
								<view class="numitem">
									<uni-icons class="icon" type="eye" size="25rpx" color="#999999"></uni-icons>
									<text>{{item.view}}</text>
								</view>
								<view class="numitem">
									<uni-icons class="icon" type="chat" size="25rpx" color="#999999"></uni-icons>
									<text>{{item.comment}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="list.length<1&&loaded">
				<emptypage title="暂无符合条件记录"></emptypage>
			</view>
		</view>



		<view class="footfixedh"></view>
		<view class="footfixed">
			<view class="footitem box-center active">
				<i class="iconfont icon-xiaoxi1"></i>
				<text>交流大厅</text>
			</view>
			<view class="footitem box-center" @click="navigatorTo('/pages/post/post_comments/index')">
				<i class="iconfont icon-a-yonghu1"></i>
				<text>我的发布</text>
			</view>
			<view class="footitem box-center" @click="navigatorTo('/pages/post/post_follow/index')">
				<i class="iconfont icon-chakantieziguanzhu"></i>
				<text>我的关注</text>
			</view>

		</view>


	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import emptypage from "@/components/emptyPage/index.vue"
	import {
		codeToRegion,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
			bannerswiper,
			emptypage,
		},
		data() {
			return {
				navtitle: "交流大厅",
				code: "",
				titleHeight: 0,
				loaded: false,
				list: [{
						nickname: "管理员",
						avatar: "/static/img/avatar.png",
						lable: "一肖高手",
						isgroup: true,
						qh: "",
						istop: true,
						isessence: true,
						title: "08月04日-08月07日澳门六合彩专家竞选结果",
						content: "亲爱的彩友们：　　活动中心的百万月薪专家亲爱的彩友们活动中心的百万月薪专家",
						time: "2024-10-29 18:53",
						link: 5,
						view: 25576,
						comment: 37,
						img: "/static/img/colorimage.jpg",
						win: "",
					},
					{
						nickname: "管理员",
						avatar: "/static/img/avatar.png",
						lable: "一肖高手",
						isgroup: true,
						qh: "261",
						istop: false,
						isessence: false,
						title: "08月04日-08月07日澳门六合彩专家竞选结果",
						content: `亲爱的彩友们：　　
						活动中心的百万月薪专家亲爱的彩友们活动中心的百万月薪专家`,
						time: "2024-10-29 18:53",
						link: 5,
						view: 25576,
						comment: 37,
						img: "",
						win: "三连胜",
					},
				],

			}
		},
		onLoad(options) {
			var that = this;
			let app = getApp();
			this.titleHeight = app.globalData.statusBarHeight
			// let systemInfo = uni.getSystemInfoSync();
			// let statusBarHeight = systemInfo.statusBarHeight;
			// that.titleHeight = statusBarHeight + 44
			if (options.code) {
				this.navtitle = codeToRegion(options.code) + "交流大厅"
				this.code = options.code
			}
		},

		methods: {
			foottabclick(e) {
				if (this.tabbar == e) return
				this.tabbar = e
			},
			ellipsis(str, max = 20) {
				if (typeof str !== 'string') return ''
				return str.length > max ? str.slice(0, max) + '…' : str
			},
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
	page {
		background: #f2f2f2;
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

		::v-deep .uni-navbar__header-btns-left,
		::v-deep .uni-navbar__header-btns-right {
			width: 18% !important;
			min-width: 60px;
			position: relative;
			color: #fff;
		}

	}

	.topfixed {
		position: sticky;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 998;
	}

	// .topfixedh {
	// 	height: 172px;
	// }

	.bannerswiper {
		height: 57px !important;

		.bannerimg {
			width: 100%;
			height: 57px !important;
		}
	}

	.toptab-wrapper {
		width: 100%;
		height: 115px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.toptabbox {
			border: 1px solid rgb(245, 142, 3);
			margin-right: 16px;
			margin-left: 16px;
			margin-top: 10px;
			border-radius: 4px;

			.toptabitem {
				min-width: 0;
				flex: 1 1 0%;
				height: 50px;
				border-right: 1px solid #f58e03;
				color: #f58e03;
				font-size: 30rpx;

				&:last-child {
					border-right: none;
				}

				&.active {
					background-color: #f58e03;
					color: #fff;
				}
			}

		}

		.topsubtabbox {
			height: 45px;

			.topsubtabitem {
				position: relative;
				min-width: 0;
				flex: 1 1 0%;
				height: 100%;
				color: rgb(51, 51, 51);
				font-size: 30rpx;

				&.active {
					color: #f58e03;

					&::after {
						content: " ";
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						width: 40rpx;
						height: 2rpx;
						background: #f58e03;
						margin: auto;
					}
				}
			}
		}
	}

	.list {
		padding-bottom: 10rpx;

		.item {
			margin-top: 10rpx;
			background: #fff;
		}

		.itemtop {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			padding: 6rpx 20rpx;
			border-bottom: 2rpx solid rgb(243, 243, 243);
			font-size: 30rpx;
			color: rgb(102, 102, 102);

			.avatar {
				width: 45rpx;
				height: 45rpx;
				margin-right: 10rpx;
			}

			.userlable {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
				background-color: rgb(245, 142, 3);
				padding: 0 8rpx;
				height: 25rpx;
				border-radius: 25rpx;
				font-size: 20rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}
		}

		.titlebox {
			.lable {
				color: rgb(255, 255, 255);
				font-size: 30rpx;
				padding: 4rpx 10rpx;
				border-radius: 4rpx;
				background: rgb(245, 142, 3);
				margin-right: 10rpx;
			}

			.zd {
				background: rgb(245, 87, 26);
			}

			.jh {
				background: rgb(81, 170, 236);
			}

			.title {
				min-width: 0;
				flex: 1 1 0%;
				font-size: 40rpx;
				color: #000;
			}
		}

		.contentbox {
			line-height: 50rpx;
			font-size: 30rpx;
			color: rgb(72, 72, 72);

			.content {
				line-height: 50rpx;
				overflow: hidden;
			}

			.fulltxt {
				line-height: 50rpx;
				color: rgb(245, 142, 3);
			}
		}

		.imgbox {
			width: 100%;
			margin-top: 20rpx;

			.img {
				width: 50%;
			}
		}

		.itembottom {
			height: 60rpx;

			.time {
				color: rgb(153, 153, 153);
				font-size: 25rpx;
			}

			.num {
				font-size: 20rpx;
				color: #999999;

				.numitem {
					margin-right: 30rpx;

					.icon {
						margin-right: 5rpx;
					}
				}
			}
		}


	}

	.footfixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		max-width: var(--max-width);
		height: 67px;
		padding-bottom: 17px;
		height: calc(67px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(67px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
		display: flex;
		justify-content: space-between;
		background-color: rgb(246, 246, 246);
		border-top: 1px solid rgb(240, 241, 237);
		background: #fff;
		margin: 0 auto;

		.footitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 50%;
			font-size: 14px;
			color: rgb(153, 153, 153);

			.iconfont {
				font-size: 24px;
			}

			&.active {
				color: rgb(71, 40, 34);
			}
		}
	}

	.footfixedh {
		height: 67px;
		height: calc(67px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(67px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
	}

	@media (min-width: 600px) {
		.toptab-wrapper {
			.toptabbox {
				.toptabitem {
					font-size: 25px;
				}

			}

			.topsubtabbox {
				.topsubtabitem {
					font-size: 25px;

					&.active {
						&::after {
							width: 20px;
							height: 1px;
						}
					}
				}
			}
		}

		.list {
			padding-bottom: 5px;

			.item {
				margin-top: 5px;
			}

			.itemtop {
				margin-bottom: 10px;
				padding: 3px 10px;
				border-bottom: 1px solid rgb(243, 243, 243);
				font-size: 25px;

				.avatar {
					width: 30px;
					height: 30px;
					margin-right: 5px;
				}

				.userlable {
					margin-left: 5px;
					padding: 0 4px;
					height: 18px;
					border-radius: 18px;
					font-size: 12px;
				}
			}

			.titlebox {
				.lable {
					font-size: 21px;
					padding: 2px 5px;
					border-radius: 2px;
					margin-right: 5px;
				}
				.title {
				
					font-size: 26px;
				}
			}

			.contentbox {
				line-height: 33px;
				font-size: 23px;
				.content {
					line-height: 33px;
				}

				.fulltxt {
					line-height: 33px;
				}
			}

			.imgbox {
				margin-top: 10px;
			}

		}
	}
</style>
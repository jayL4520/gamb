<template>
	<view class="container">
		<navbar title="" class="navbar">
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
					<view class="button">
						<checkbox-group>
							<label>
								<checkbox :checked="isposter" />只看楼主
							</label>
						</checkbox-group>
					</view>
				</view>
			</template>
		</navbar>
		<view class="">
			<view class="topfixedh"></view>
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<bannerswiper></bannerswiper>
			</view>
			<view class="">
					<!-- 用户信息 -->
					<view class="userinfo">
						<view class="avatar">
							<img class="img" src="@/static/img/avatar.png" alt="" />
						</view>
						<view class="namebox">
							<view class="nickname">玩肖王1</view>
							<view class="userlableBox">
								<view class="userlable">
									一肖高手
								</view>
								<view class="userlable">
									人气王
								</view>
								<view class="userlable">
									群主
								</view>
							</view>
						</view>
						<button class="btn btn-primary">+关注</button>
					</view>
					<!-- 详情 -->
					<view class="contentBox">
						<view class="title">🔥老澳282期平特一肖平特一尾二中二 入群查看心水推荐🔥</view>
						<view class="date box-center">
							<text>2025-09-16 18:44</text>
							<view class="view">
								<uni-icons class="icon" type="eye" size="25rpx" color="#999999"></uni-icons>
								<text>215</text>
							</view>
						</view>
						<view class="">
							<rich-text :nodes="description"></rich-text>
						</view>
						<view class="rewardbox box-middle">
							<image class="img" src="@/static/img/reward.png" mode=""></image>
							<view class="">
								觉得内容有用，请打赏支持作者~
							</view>
							<button class="btn">打赏</button>
						</view>
						<view class="box-center">
							<view class="join btn-primary">
								+加入群聊
							</view>
						</view>
					</view>
					<!-- 淘料心水 -->
					<view class="">
						<xinshui :list="xinshuilist"></xinshui>
					</view>
					<view class="">
						<view class="replylistlength">
							<view class="">评论回复({{replylist.length}})</view>
							<view class="replyright">{{sort=='desc'?'时间降序':'时间升序'}}</view>
						</view>
						<view ref="commentRef" class="commentRef">
							<commentlist :list="replylist"></commentlist>
							<!-- <emptypage mTop="100rpx" title="暂无评论"></emptypage> -->
						</view>
					</view>
				</view>
			
		</view>
		<view class="bottomfixedh"></view>
		<view class="bottomfixed">
			<view class="input" @click="emojiinputmodel=true">
				我也说一句...
			</view>
			<view class="iconsitem">
				<uni-icons type="hand-up" :size="windowWidth>600?'16':'32rpx'" color="#666666"></uni-icons>
				<text>0</text>
			</view>
			<view class="iconsitem" @click="scrollToComment">
				<uni-icons type="chat" :size="windowWidth>600?'16':'32rpx'" color="#666666"></uni-icons>
				<text>0</text>
			</view>
		</view>
		<emojiinput v-model="emojiinputmodel" @submit="submit"></emojiinput>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import xinshui from "./xinshui.vue"
	import commentlist from "@/components/commentlist/index.vue"
	import emptypage from "@/components/emptyPage/index.vue"
	import emojiinput from "@/components/uu-emoji-input/uu-emoji-input.vue"
	import {
		codeToRegion,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
			bannerswiper,
			xinshui,
			commentlist,
			emptypage,
			emojiinput
		},
		data() {
			return {
				code: "",
				titleHeight: 0,
				windowWidth:0,
				isposter: false,
				description: '',
				sort: "desc", //asc
				emojiinputmodel:false,
				xinshuilist: [{
						lable: "特肖",
						name: "(杀三特肖)强势的杀特肖",
						view: 4,
						winstreak: 4,
						nickname: "踩姑娘的小蘑菇",
						avatar: "/static/img/avatar.png",
					},
					{
						lable: "特肖",
						name: "(杀三特肖)强势的杀特肖",
						view: 4,
						winstreak: 4,
						nickname: "踩姑娘的小蘑菇",
						avatar: "/static/img/avatar.png",
					},
					{
						lable: "特肖",
						name: "(杀三特肖)强势的杀特肖",
						view: 4,
						winstreak: 4,
						nickname: "踩姑娘的小蘑菇",
						avatar: "/static/img/avatar.png",
					},
					{
						lable: "特肖",
						name: "(杀三特肖)强势的杀特肖",
						view: 4,
						winstreak: 4,
						nickname: "踩姑娘的小蘑菇",
						avatar: "/static/img/avatar.png",
					},
				],
				replylist: [{
						nickname: "本小主VIP",
						content: "66666别停更，我们一直围观。",
						time: "2025-09-16 11:40:00",
						replynum: "0",
					},
					{
						nickname: "本小主VIP",
						content: "66666别停更，我们一直围观。",
						time: "2025-09-16 11:40:00",
						replynum: "0",
					},
					{
						nickname: "本小主VIP",
						content: "66666别停更，我们一直围观。",
						time: "2025-09-16 11:40:00",
						replynum: "0",
					},
				],
			}
		},
		onLoad(options) {
			var that = this;
			let app = getApp();
			this.titleHeight = app.globalData.statusBarHeight
			this.windowWidth= app.globalData.windowWidth
			if (options.code) {
				this.code = options.code
			}
		},

		methods: {
			submit(e){
				console.log(e,'eee');
			},
			// 滚动到评论区（ref 方式，App 和 H5 通用）
			    scrollToComment() {
			     uni.pageScrollTo({
			       selector: ".commentRef",
			       duration: 30, // 滚动动画时长
			     });
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
			font-size: 16px;

			.button {
				cursor: pointer;
				min-width: 25px;
				margin: 0 3px;
				display: flex;
				align-items: flex-end;
				text-align: right;

				::v-deep .uni-checkbox-input {
					background: transparent;
				}
			}
		}

		::v-deep .uni-navbar__header-btns-left,
		::v-deep .uni-navbar__header-btns-right {
			width: 40% !important;
			min-width: 60px;
			position: relative;
			color: #fff;
		}
	}


	// .topfixedh {
	// 	height: 57px;
	// }

	.topfixed {
		position: sticky;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 998;
	}

	.userinfo {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		border-bottom: 10rpx solid rgb(243, 243, 243);

		.avatar {
			width: 90rpx;
			height: 90rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.namebox {
			min-width: 0;
			flex: 1;
			padding: 0 20rpx;

			.nickname {
				font-size: 25rpx;
				color: rgb(0, 0, 0);
				padding: 0 10rpx;
			}

			.userlableBox {
				display: flex;
				flex-wrap: wrap;
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
				margin-top: 10rpx;
			}
		}

		.btn {
			font-size: 30rpx;
			padding: 0 15rpx;
			background-color: rgb(245, 142, 3);
			border-radius: 30rpx;
			height: 50rpx;
		}
	}

	.contentBox {
		border-bottom: 10rpx solid rgb(243, 243, 243);
		padding-bottom: 20rpx;

		.title {
			font-size: 40rpx;
			margin: 30rpx 20rpx 0;
			text-align: center;
			color: rgb(51, 51, 51);
		}

		.date {
			color: rgb(160, 160, 160);
			font-size: 25rpx;
			margin: 10rpx 0;
		}

		.view {
			margin-left: 20rpx;
		}
	}

	.rewardbox {
		width: 96%;
		margin: 40rpx auto;
		background-color: rgb(248, 250, 251);
		padding: 20rpx;
		border-radius: 12rpx;
		font-size: 30rpx;
		color: rgb(51, 51, 51);
		justify-content: space-between;

		.img {
			width: 50rpx;
			height: 50rpx;
		}

		.btn {
			background-color: rgb(205, 44, 42);
			padding: 8rpx 28rpx;
			border-radius: 8rpx;
			font-size: 35rpx;
			color: rgb(255, 255, 255);
		}
	}

	.join {
		height: 50rpx;
		padding: 0 15rpx;
		border-radius: 5rpx;
		font-size: 20rpx;
	}

	.replylistlength {
		margin-top: 20rpx;
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		background-color: rgb(253, 251, 229);
		justify-content: space-between;
		padding: 0 20rpx;
		font-size: 35rpx;

		.replyright {
			color: rgb(197, 50, 44); 
		}

	}

	.bottomfixedh {
		height: 100rpx;
	}

	.bottomfixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index:10;
		background: #fff;
		display: flex;
		width: 100%;
		max-width: var(--max-width);
		height: 100rpx;
		padding: 10rpx 30rpx;
		border-top: 2rpx solid rgb(240, 241, 237);
		align-items: flex-end;
		color: #666666;
		margin: 0 auto;
		.input {
			display: flex;
			border-radius: 8rpx;
			height: 80rpx;
			align-items: center;
			border: 2rpx solid rgb(240, 241, 237);
			flex: 1;
			min-width: 0;
			padding-left: 15rpx;
		}
		.iconsitem{
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			margin-left: 40rpx;
			padding: 4rpx 0;
		}
	}

		
	@media (min-width: 600px){
		.userinfo {
			padding: 10px 15px;
			border-bottom: 5px solid rgb(243, 243, 243);
		
			.avatar {
				width: 48px;
				height: 48px;
			}
		
			.namebox {
				padding: 0 10px;
		
				.nickname {
					font-size: 17px;
					padding: 0 5px;
				}
		
				.userlable {
					margin-left: 5px;
					padding: 0 4px;
					height: 15px;
					border-radius: 15px;
					font-size: 12px;
					margin-top: 5px;
				}
			}
		
			.btn {
				font-size: 21px;
				padding: 0 10px;
				background-color: rgb(245, 142, 3);
				border-radius: 30px;
				height: 38px;
			}
		}
		
		.contentBox {
			border-bottom: 5px solid rgb(243, 243, 243);
			padding-bottom: 10px;
		
			.title {
				font-size: 28px;
				margin: 15px 10px 0;
			}
		
			.date {
				font-size: 17px;
				margin: 5px 0;
			}
		
			.view {
				margin-left: 10px;
			}
		}
		
		.rewardbox {
			width: 96%;
			margin: 20px auto;
			padding: 10px;
			border-radius: 6px;
			font-size: 23px;
		
			.img {
				width: 25px;
				height: 25px;
			}
		
			.btn {
				padding: 4px 14px;
				border-radius: 4px;
				font-size: 25px;
			}
		}
		
		.join {
			height: 34px;
			padding: 0 8px;
			border-radius: 3px;
			font-size: 14px;
		}
		
		.replylistlength {
			margin-top: 10px;
			height: 40px;
			padding: 0 10px;
			font-size: 23px;
		
		
		}
		
		.bottomfixedh {
			height: 54px;
		}
		
		.bottomfixed {
			height: 54px;
			padding: 5px 15px;
			border-top: 1px solid rgb(240, 241, 237);
			.input {
				border-radius: 4px;
				height: 40px;
				border: 1px solid rgb(240, 241, 237);
				padding-left: 8px;
			}
			.iconsitem{
				margin-left: 20px;
				padding: 2px 0;
			}
		}
		
		
		
	}

</style>
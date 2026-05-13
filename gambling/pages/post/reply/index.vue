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
		</navbar>
		<view class="">
			<view class="topfixedh"></view>
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<bannerswiper></bannerswiper>
			</view>
			<view class="">
				<view class="replyitem">
					<view class="box-middle nickname">
						<uni-icons class="icon" type="contact" :size="windowWidth>600?'15':'30rpx'" color="#f58e03"></uni-icons>
						本小主VIP
					</view>
					<view class="content">
						66666别停更，我们一直围观。
					</view>
					<view class="box-middle time">
						<text>2025-09-16 11:40:00</text>
						<view class="replynum" @click="copy('66666别停更，我们一直围观')">
							复制
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<view class="replylistlength">
					<view class="">全部回复</view>
				</view>
				<view>
					<view class="">
						<view v-for="(item,index) in replylist" :key="index" class="replyitem">
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
									回复
								</view>
								<view class="replynum" @click="copy(item.content)">
									复制
								</view>
							</view>
						</view>
					</view>
					<view class="" v-if="replylist.length<1&&loaded">
						<emptypage title="该楼暂无彩友回复"></emptypage>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="bottomfixedh"></view>
		<view class="bottomfixed">
			<view class="input" @click="emojiinputmodel=true">
				我也说一句...
			</view>
		</view>
		<emojiinput v-model="emojiinputmodel" @submit="submit"></emojiinput>

	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import emptypage from "@/components/emptyPage/index.vue"
	import commentlist from "@/components/commentlist/index.vue"
	import emojiinput from "@/components/uu-emoji-input/uu-emoji-input.vue"
	import {
		useTimeAgo
	} from '@/utils/utils.js'
	import {
		codeToRegion,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
			bannerswiper,
			emptypage,
			commentlist,
			emojiinput
		},
		data() {
			return {
				navtitle: "0条回复",
				code: "",
				titleHeight: 0,
				loaded: false,
				type: "name",
				emojiinputmodel:false,
				windowWidth:0,
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
			useTimeAgo,
			submit(e){
				console.log(e,'eee');
			},
			copy(txt){
				 uni.setClipboardData({
				    data: txt,
				    success: () => {
				      uni.showToast({ title: '已复制', icon: 'none' })
				    }
				  })
			},
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

	.replylistlength {
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		background-color: rgb(253, 251, 229);
		justify-content: space-between;
		padding: 0 20rpx;
		font-size: 35rpx;

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
		margin: 0 auto;
		padding: 10rpx 30rpx;
		border-top: 2rpx solid rgb(240, 241, 237);
		align-items: flex-end;
		color: #666666;
	
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
	}
	
		
	@media (min-width: 600px){
		.replyitem {
			padding: 10px;
			border-bottom: 1px solid rgb(243, 243, 243);
		
			.nickname {
				font-size: 14px;
		
				.icon {
					margin-right: 5px;
					margin-top: 3px;
				}
			}
		
			.content {
				margin: 10px 0;
				line-height: 37px;
				font-size: 28px;
			}
		
			.time {
				font-size: 20px;
			}
		
			.replynum {
				padding: 4px 10px;
				font-size: 20px;
				border-radius: 4px;
				margin-left: 10px;
			}
		}
		
		
		.replylistlength {
			height: 34px;
			padding: 0 10px;
			font-size: 23px;
		
		}
		
		.bottomfixedh {
			height: 60px;
		}
		
		.bottomfixed {
			height: 60px;
			padding: 5px 15px;
			border-top: 1px solid rgb(240, 241, 237);
			.input {
				border-radius: 4px;
				height: 40px;
				border: 1px solid rgb(240, 241, 237);
				padding-left: 8px;
			}
		}
		
			
		
	}
</style>
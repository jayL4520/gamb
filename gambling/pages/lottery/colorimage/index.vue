<template>
	<view class="container">
		<template v-if="tabbar=='drawing'">
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
						<view class="button" @click="go">
							<text>发布图解</text>
						</view>
					</view>
				</template>
			</navbar>
			<view class="">
				<!-- <view class="topfixedh"></view> -->
				<view class="topfixed" :style="{ top: titleHeight + 'px' }">
					<bannerswiper></bannerswiper>
				</view>
				<view class="">
					<view class="titletop flex justifybetween">
						<view class="titletopleft">
							<view class="title line1">
								{{info.name}}
							</view>
							<view class="time box-middle">
								<text class="">
									{{formatDate(info.createTime)}}
								</text>
								<uni-icons class="icon" type="eye-filled" color="#999999" size="15"></uni-icons>
								<text class="">
									{{info.viewCount}}
								</text>
							</view>
						</view>
						<view class="selectbutton box-middle" @click="periodclick">
							<text>{{year+issueNo}}期</text>
							<i class="iconfont icon-24gf-arrowDown3"></i>
						</view>
					</view>
					<!-- <view class="results">
						<view class="title">
							{{year}}年第{{issueNo}}期开奖结果
						</view>
						<view class="ballinfo">
							<ball :info="ballinfo"></ball>
						</view>
					</view> -->
					<view class="type" v-if="imageUrlArr.length>1">
						<view class="typeitem box-center " :class="{active:currentImage==index}"
							v-for="(item,index) in imageUrlArr">
							<text>{{num2UpperLetter(index)}}面</text>
							<view class="checkbox box-center">
								<i class="iconfont icon-24gf-successCircle"></i>
							</view>
						</view>
					</view>
					<view class="imagebox" v-for="(item,index) in imageUrlArr">
						<image @click="onPreview(index)" v-if="currentImage==index" class="img" :src="item"
							mode="widthFix"></image>
					</view>
					<view class="rewardbox box-middle">
						<image class="img" src="@/static/img/reward.png" mode=""></image>
						<view class="">
							觉得内容有用，请打赏支持作者~
						</view>
						<button class="btn">打赏</button>
					</view>
					<view class="urllink">
						<view class="linkitem box-center">
							<view class="link box-center">
								<text>玛雅吧</text>
								<uni-icons type="right" :size="windowWidth>600?'15':'30rpx'"
									color="#e37c00"></uni-icons>
							</view>
						</view>
						<view class="linkitem box-center">
							<view class="link box-center">
								<text>六合投注</text>
								<uni-icons type="right" :size="windowWidth>600?'15':'30rpx'"
									color="#e37c00"></uni-icons>
							</view>
						</view>
						<view class="linkitem box-center">
							<view class="link box-center">
								<text>夺彩网</text>
								<uni-icons type="right" :size="windowWidth>600?'15':'30rpx'"
									color="#e37c00"></uni-icons>
							</view>
						</view>
						<view class="linkitem box-center">
							<view class="link box-center">
								<text>开云彩票</text>
								<uni-icons type="right" :size="windowWidth>600?'15':'30rpx'"
									color="#e37c00"></uni-icons>
							</view>
						</view>
						<view class="linkitem box-center">
							<view class="link box-center">
								<text>Mpay</text>
								<uni-icons type="right" :size="windowWidth>600?'15':'30rpx'"
									color="#e37c00"></uni-icons>
							</view>
						</view>
					</view>
					<view class="illustrationbox">
						<view class="illustrationtitle">
							图解小组
						</view>
						<view class="illustrationlist">
							<view class="illustrationitem" v-for="(item,index) in illustrationlist" :key="index">
								<view class="name line1">
									{{item.name}}
								</view>
								<view class="content line1">
									{{item.content}}
								</view>
								<view class="date box-middle">
									<i class="iconfont icon-ic_user_platform"></i>
									<text class="txt">{{item.nickname}}</text>
									|
									<text class="txt">{{useTimeAgo(item.time)}}</text>
								</view>
							</view>
						</view>
						<emptyPage v-if="illustrationlist.length==0" title="暂无图解"></emptyPage>
					</view>
				</view>
			</view>

		</template>
		<template v-if="tabbar=='comments'">
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
						<view class="button"  @click="emojiinputmodel=true">
							<text>发布评论</text>
						</view>
					</view>
				</template>
			</navbar>
			<view class="comments">
				<!-- <view class="topfixedh"></view> -->
				<view class="topfixed" :style="{ top: titleHeight + 'px' }">
					<bannerswiper></bannerswiper>
					<view class="replylistlength">
						<view class="">澳门特码救世报</view>
						<view class="replyright">评论回复({{replylist.length}})</view>
					</view>
				</view>
				<commentlist :list="replylist"></commentlist>
			</view>
		</template>

		<view class="footfixedh"></view>
		<view class="footfixed">
			<view class="footitem box-center" :class="{active:tabbar=='drawing'}" @click="foottabclick('drawing')">
				<uni-icons class="icon" type="image" size="30"
					:color="tabbar=='drawing'?'#472822':'#999999'"></uni-icons>
				<text>图纸</text>
			</view>
			<view class="footitem box-center" :class="{active:tabbar=='comments'}" @click="foottabclick('comments')">
				<uni-icons class="icon" type="chat" size="30"
					:color="tabbar=='comments'?'#472822':'#999999'"></uni-icons>
				<text>查看评论</text>
			</view>
			<view class="footitem box-center">
				<uni-icons class="icon" type="star" size="30"
					:color="tabbar=='collect'?'#f58e03':'#999999'"></uni-icons>
				<text>收藏</text>
			</view>

		</view>
		<uni-popup ref="popupMode" class="popupMode" type="bottom">
			<view class="popup-container">
				<uni-icons @click="hidepopup" class="closeempty" type="closeempty" size="30rpx"
					color="#999"></uni-icons>
				<view class="popup-title">选择期数</view>
				<view class="yearbox box-middle">
					<scroll-view class="yearscroll" scroll-x="true" style="white-space: nowrap; display: flex;"
						:show-scrollbar="false">
						<view class="yearitem box-center" :class="{active:selyear=='latest'}"
							@click="yearclick('latest')">
							最新
						</view>
						<view class="yearitem box-center" v-for="item in yearArr" :key="item"
							:class="{active:selyear==item}" @click="yearclick(item)">
							{{item}}
						</view>
					</scroll-view>
				</view>
				<view class="">
					<scroll-view class="yeararrscroll" scroll-y="true" :show-scrollbar="false">
						<view class="yeararr" v-if="periodarr.length>0">
							<view v-for="(item,index) in periodarr" :key="index" 
							class="yearbutton box-center " :class="{active:(selyear=='latest'?newyear:selyear)==year&&item==issueNo}" 
							@click="periodItemClick(item)">
								第{{item}}期
							</view>
						</view>
						<view class="loadingicon acea-row row-center-wrapper" v-if="loading">
							<uni-icons class="loading" type="spinner-cycle" size="32"></uni-icons>
						</view>
						<view class="">
							<emptyPage v-if="periodarr.length==0&&loaded" title="暂无图解" mTop="50px"></emptyPage>
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-popup>
		<emojiinput v-model="emojiinputmodel" @submit="submit"></emojiinput>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import ball from "@/components/ball/index.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import commentlist from "@/components/commentlist/index.vue"
	import emptyPage from "@/components/emptyPage/index.vue"
	import emojiinput from "@/components/uu-emoji-input/uu-emoji-input.vue"
	import {
		getmaininfoApi,
		getIssueNoApi,
	} from "@/api/colorimage.js"
	import {
		useTimeAgo,
		formatDate
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
			ball,
			bannerswiper,
			commentlist,
			emptyPage,
			emojiinput,
		},
		data() {
			return {
				info: {},
				titleHeight: 0,
				windowWidth: 0,
				id: "",
				tabbar: "drawing",
				year: "",
				newyear: "",
				selyear: "latest",
				emojiinputmodel:false,
				ballinfo: {
					"id": "6307",
					"createdAt": "2025-09-04T05:35:45.215+00:00",
					"lotteryType": "MO",
					"date": 1757079120,
					"date2": 1757079240,
					"period": "248",
					"numbers": "07,18,24,25,27,12,15",
					"sb": "red,red,red,blue,green,red,blue",
					"sx": "豬,鼠,馬,蛇,兔,馬,兔",
					"wx": "木,火,木,金,土,金,木",
					"year": 2025,
					"videoUrl": "https://video.lhjyw.vip/ambd/drawvideo_amlhc/2025/09/05/232400001.mp4",
					"status": 1
				},
				illustrationlist: [
					// {
					// 	name: "12码中特连中5期",
					// 	content: "特肖第257期【-蛇-马-羊-】 🀄️第257期【-虎-蛇-马-羊-猴-狗-】 🀄️第257期【-羊-蛇-马-猴-狗-虎-鸡-鼠-龙-】🀄️特码 第257期【-01-08-10-1",
					// 	nickname: "本小主VIP",
					// 	time: "2025-09-16 11:40:00",
					// },
					// {
					// 	name: "12码中特连中5期",
					// 	content: "特肖第257期【-蛇-马-羊-】 🀄️第257期【-虎-蛇-马-羊-猴-狗-】 🀄️第257期【-羊-蛇-马-猴-狗-虎-鸡-鼠-龙-】🀄️特码 第257期【-01-08-10-1",
					// 	nickname: "本小主VIP",
					// 	time: "2025-09-16 11:40:00",
					// },
					// {
					// 	name: "12码中特连中5期",
					// 	content: "特肖第257期【-蛇-马-羊-】 🀄️第257期【-虎-蛇-马-羊-猴-狗-】 🀄️第257期【-羊-蛇-马-猴-狗-虎-鸡-鼠-龙-】🀄️特码 第257期【-01-08-10-1",
					// 	nickname: "本小主VIP",
					// 	time: "2025-09-16 11:40:00",
					// },
				],
				yearArr: [],
				periodarr: [{
						period: "258",
					},
					{
						period: "257",
					},
					{
						period: "256",
					},
					{
						period: "255",
					},
					{
						period: "254",
					},
					{
						period: "253",
					},
					{
						period: "252",
					},
					{
						period: "251",
					},
					{
						period: "250",
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
				issueNo: "",
				imageUrlArr: [],
				currentImage: 0,
				loading: false,
				loaded: false,
			}
		},
		onLoad(options) {
			let app = getApp();
			this.titleHeight = app.globalData.statusBarHeight
			this.windowWidth = app.globalData.windowWidth
			var that = this;
			that.newyear = new Date().getFullYear()
			that.year = new Date().getFullYear()
			that.getyear()
			if (options.id) {
				that.id = options.id
				that.getdata()
			}
		},

		methods: {
			useTimeAgo,
			formatDate,
			getdata() {
				let that = this
				uni.showLoading()
				getmaininfoApi({
					groupId: that.id,
					// groupId: 2224,
					issueNo: that.issueNo,
					year: that.year,
				}).then(res => {
					uni.hideLoading()
					this.info = res.data
					this.year = res.data.year
					this.issueNo = res.data.issueNo
					this.imageUrlArr = res.data.imageUrl.split(",")
					// that.list = res.data
				}).catch(err => {
					uni.hideLoading()
					setTimeout(() => {
						uni.showToast({
							title: err,
							duration: 2000,
							icon: "none",
							success() {
								setTimeout(() => {
									// uni.navigateBack()
								}, 2000)
							}
						})
					}, 200)
				})
			},
			periodclick() {
				this.$refs.popupMode.open()
				this.loading = true
				this.loaded = false
				this.periodarr=[]
				this.getgetIssueNo()
			},
			hidepopup() {
				this.$refs.popupMode.close()
			},
			yearclick(e) {
				this.selyear = e
				this.loading = true
				this.loaded = false
				this.periodarr=[]
				this.getgetIssueNo()
			},
			getgetIssueNo() {
				let that = this
				getIssueNoApi({
					groupId: that.id,
					year: that.year,
				}).then(res => {
					this.loading = false
					this.loaded = true
					this.periodarr=res.data
				}).catch(err => {
					this.loading = false
					this.loaded = true
				})
			},
			periodItemClick(e){
				if (this.selyear == "latest") {
					this.year = this.newyear
				} else {
					this.year = this.selyear
				}
				this.issueNo=e
				this.$refs.popupMode.close()
				this.getdata()
			},
			foottabclick(e) {
				if (this.tabbar == e) return;
				this.tabbar = e

			},
			num2UpperLetter(num) {
				if (num < 0 || num > 25) return '';
				return String.fromCharCode(65 + num);
			},
			onPreview(index) {
				uni.previewImage({
					urls: this.imageUrlArr, // 全部可滑动的地址
					current: index, // 点哪张就从哪张开始
				});
			},
			getyear() {
				let year = new Date().getFullYear()
				for (let i = 0; i < 3; i++) {
					this.yearArr.push(year - i)
				}
			},
			go(){
				uni.navigateTo({
					url: '/pages/lottery/illustration_release/index?id=' + this.id
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
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}

	}

	.topfixed {
		position: sticky;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 998;
	}

	.topfixedh {
		height: 57px;
	}

	.bannerswiper {
		height: 57px !important;

		.bannerimg {
			width: 100%;
			height: 57px !important;
		}
	}

	.titletop {
		padding: 30rpx 30rpx 20rpx 20rpx;

		.titletopleft {
			flex: 1;

			.title {
				width: 100%;
				font-size: 50rpx;
				color: rgb(51, 51, 51);
			}

			.time {
				color: #999999;
				font-size: 30rpx;
				margin-top: 5rpx;
			}

			.icon {
				margin: 0 5rpx 0 20rpx;
			}
		}

		.selectbutton {
			padding: 0 10rpx;
			height: 60rpx;
			border: 2rpx solid rgb(228, 229, 230);
			border-radius: 4rpx;
			color: rgb(95, 95, 95);
			font-size: 25rpx;

			.iconfont {
				margin-left: 5rpx;
				color: #e37c00;
			}
		}
	}

	.results {
		margin: 10rpx 20rpx 0;
		border: 2rpx dashed rgb(102, 102, 102);
		border-radius: 6rpx;

		.title {
			margin-left: 20rpx;
			margin-top: 20rpx;
			font-size: 40rpx;
			color: rgb(51, 51, 51);
		}

		.ballinfo {
			padding: 0 5rpx;
		}
	}

	.type {
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;

		.typeitem {
			position: relative;
			min-width: 140rpx;
			margin-top: 10rpx;
			margin-right: 20rpx;
			padding: 16rpx 12rpx;
			border: 2rpx solid rgb(228, 229, 230);
			border-radius: 6rpx;
			color: rgb(125, 125, 125);
			font-size: 25rpx;

			.checkbox {
				position: absolute;
				display: none;
				align-items: center;
				justify-content: center;
				top: -16rpx;
				right: -16rpx;
				background: #fff;
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				color: #e37c00;

				.iconfont {
					font-size: 32rpx;
				}
			}

			&.active {
				background: #e37c00;
				color: #fff;

				.checkbox {
					display: flex;
				}
			}
		}
	}

	.imagebox {
		width: calc(100% - 40rpx);
		margin: 20rpx 20rpx 30rpx;
		border: 10rpx solid rgba(228, 229, 230, 0.3);
		border-radius: 6rpx;

		.img {
			width: 100%;
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

	.urllink {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 40rpx;

		.linkitem {
			width: 33.33%;
			height: 80rpx;

			.link {
				width: 80%;
				height: 60rpx;
				font-size: 30rpx;
				background: rgb(253, 249, 235);
				color: #e37c00;
			}
		}
	}

	.illustrationbox {
		padding-bottom: 30rpx;

		.illustrationtitle {
			padding: 20rpx 0 20rpx 30rpx;
			background-color: rgb(246, 246, 246);
			font-size: 45rpx;
			border-top: 2rpx solid rgb(228, 229, 230);
		}

		.illustrationlist {
			.illustrationitem {
				width: calc(100% - 40rpx);
				margin: 16rpx auto 0;
				border: 2rpx solid rgb(235, 235, 235);
				border-radius: 5rpx;
				padding: 0 20rpx;

				.name {
					width: 100%;
					margin-top: 20rpx;
					font-size: 35rpx;
					color: rgb(65, 65, 65);
				}

				.content {
					font-size: 30rpx;
					color: rgb(130, 130, 130);
					margin-top: 10rpx;
					margin-right: 10px;
					line-height: 30rpx;
				}

				.date {
					font-size: 30rpx;
					color: #c4c4c4;
					margin: 14rpx 0 20rpx;

					.iconfont {
						font-size: 30rpx;
						margin-top: 5rpx;
					}

					.txt {
						margin: 0 10rpx;
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
		background: #fff;
		border-top: 2rpx solid rgb(240, 241, 237);
		margin: 0 auto;

		.footitem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 33.33%;
			font-size: 13px;
			color: #999999;

			.icon {
				/* #ifdef H5 */
				margin-top: 3px;
				/* #endif */
			}

			&.active {
				color: #472822;
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

	.popupMode {
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
		overflow: hidden;
	}

	.popup-container {
		position: relative;
		width: 100%;
		max-width: var(--max-width);
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		margin: 0 auto;

		.closeempty {
			position: absolute;
			top: 40rpx;
			right: 40rpx;
		}

		.popup-title {
			width: 100%;
			padding: 30rpx;
			font-size: 45rpx;
			color: #000;
			text-align: center;
		}

		.yearbox {
			width: 100%;
			height: 80rpx;
			border-top: 2rpx solid #e4e5e6;
			border-bottom: 2rpx solid #e4e5e6;
			font-size: 30rpx;
		}

		.yearitem {
			display: inline-flex;
			width: 80rpx;
			height: 50rpx;
			margin: 0 20rpx;

			&.active {
				color: #fff;
				background: rgb(227, 124, 0);
			}
		}

		.yeararrscroll {
			width: 100%;
			height: 50vh;
		}

		.yeararr {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 20rpx;
		}

		.yearbutton {
			width: calc(25% - 21rpx);
			margin: 20rpx 10rpx 0;
			border: 2rpx solid rgb(228, 229, 230);
			font-size: 20rpx;
			color: rgb(71, 40, 34);
			padding: 10rpx 0;

			&.active {
				color: #fff;
				background: rgb(227, 124, 0);
			}
		}
	}

	.comments {
		.replylistlength {
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			background-color: rgb(253, 251, 229);
			justify-content: space-between;
			padding: 0 10px;
			font-size: 17px;

			.replyright {
				font-size: 15px;
			}

		}

		.topfixedh {
			height: 97px;
		}
	}

	@media (min-width: 600px) {
		.titletop {
			padding: 15px 15px 10px 10px;

			.titletopleft {
				.title {
					font-size: 33px;
				}

				.time {
					font-size: 21px;
					margin-top: 3px;
				}

				.icon {
					margin: 0 3px 0 10px;
				}
			}

			.selectbutton {
				padding: 0 5px;
				height: 30px;
				border: 1px solid rgb(228, 229, 230);
				border-radius: 2px;
				font-size: 14px;

				.iconfont {
					margin-left: 3px;
					color: #e37c00;
				}
			}
		}


		.results {
			margin: 5px 10px 0;
			border: 1px dashed rgb(102, 102, 102);
			border-radius: 3px;

			.title {
				margin-left: 10px;
				margin-top: 10px;
				font-size: 20px;
			}

			.ballinfo {
				padding: 0 3px;
			}
		}

		.type {
			padding: 10px;

			.typeitem {
				position: relative;
				min-width: 70px;
				margin-top: 5px;
				margin-right: 10px;
				padding: 8px 6px;
				border: 1px solid rgb(228, 229, 230);
				border-radius: 3px;
				font-size: 14px;

				.checkbox {
					top: -8px;
					right: -8px;
					width: 15px;
					height: 15px;
					border-radius: 50%;

					.iconfont {
						font-size: 15px;
					}
				}

			}
		}

		.imagebox {
			width: calc(100% - 20px);
			margin: 10px 10px 15px;
			border: 5px solid rgba(228, 229, 230, 0.3);
			border-radius: 3px;
		}

		.rewardbox {
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

		.urllink {
			margin-bottom: 20px;

			.linkitem {
				width: 33.33%;
				height: 45px;

				.link {
					width: 80%;
					height: 35px;
					font-size: 14px;
				}
			}
		}

		.illustrationbox {
			padding-bottom: 15px;

			.illustrationtitle {
				padding: 10px 0 10px 15px;
				font-size: 29px;
				border-top: 1px solid rgb(228, 229, 230);
			}

			.illustrationlist {
				.illustrationitem {
					width: calc(100% - 20px);
					margin: 8px auto 0;
					border: 1px solid rgb(235, 235, 235);
					border-radius: 3px;
					padding: 0 10px;

					.name {
						width: 100%;
						margin-top: 10px;
						font-size: 28px;
					}

					.content {
						font-size: 25px;
						margin-top: 5px;
						margin-right: 10px;
						line-height: 25px;
					}

					.date {
						font-size: 21px;
						margin: 7px 0 10px;

						.iconfont {
							font-size: 19px;
							margin-top: 3px;
						}

						.txt {
							margin: 0 5px;
						}
					}
				}
			}
		}

		.popup-container {
			position: relative;
			width: 100%;
			border-radius: 10px 10px 0 0;
			background: #fff;

			.closeempty {
				position: absolute;
				top: 20px;
				right: 20px;
			}

			.popup-title {
				width: 100%;
				padding: 15px;
				font-size: 29px;
			}

			.yearbox {
				width: 100%;
				height: 50px;
				border-top: 1px solid #e4e5e6;
				border-bottom: 1px solid #e4e5e6;
				font-size: 21px;
			}

			.yearitem {
				display: inline-flex;
				width: 50px;
				height: 30px;
				margin: 0 10px;
			}

			.yeararr {
				padding-bottom: 10px;
			}

			.yearbutton {
				width: calc(25% - 11px);
				margin: 10px 5px 0;
				border: 1px solid rgb(228, 229, 230);
				font-size: 14px;
				padding: 5px 0;
			}
		}



	}
</style>
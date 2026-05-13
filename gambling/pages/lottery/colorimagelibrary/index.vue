<template>
	<view class="container">
		<template v-if="tabbar=='imagelibrary'">
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
						<view class="button" @click="navigatorTo('/pages/lottery/colorimage_search/index?code='+code)">
							<uni-icons color="#fff" type="search" size="16" />
							<text>搜索</text>
						</view>
						<view class="button">
							<i class="iconfont icon-kefu_o"></i>
							<text>客服</text>
						</view>

					</view>
				</template>
			</navbar>
			<view class="">
				<!-- <view class="topfixedh"></view> -->
				<view class="topfixed" :style="{ top: titleHeight + 'px' }">
					<bannerswiper></bannerswiper>
					<view class="filterbox box-middle">
						<checkbox-group>
							<label>
								<checkbox :checked="islatest" />仅显示最新期数的图纸
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="indexedlist " :style="'height:'+swiperHeight+'px'">
					<uni-indexed-list :options="list" :show-select="false" @click="bindClick" />
				</view>
			</view>

		</template>
		<template v-if="tabbar=='collect'">
			<navbar title="图纸收藏" class="navbar">
				<template v-slot:navleft>
					<view class="navbutton">
						<view class="backbutton" @click="$backOrHome">
							<uni-icons class="back" color="#fff" type="left" size="20" />
							<text class="">返回</text>
						</view>
					</view>
				</template>
				<template v-slot:navright>
					<view class="navrightbutton collectrightbutton" v-if="isLogin">
						<view class="button" @click="management">
							<text>{{iscancel?'完成':'管理'}}</text>
						</view>
					</view>
				</template>
			</navbar>
			<view class="collectbox" :style="'minHeight:'+swiperHeight+'px'">
				<view class="" v-if="isLogin">
					<view class="">
						<!-- <view class="topfixedh"></view> -->
						<view class="topfixed" :style="{ top: titleHeight + 'px' }">
							<bannerswiper></bannerswiper>
						</view>
						<view class="">
							<view class="collectlist">
								<view v-for="(item,index) in collectlist" :key="index" class="collectitem"
									@click="collectclick(item.id)">
									<view class="collectitemleft box-middle">
										<template v-if="iscancel">
											<uni-icons class="circleicon" type="circle" size="40rpx"
												v-if="!collectselarr.includes(item.id)"></uni-icons>
											<uni-icons class="circleicon" type="checkbox-filled" size="40rpx"
												v-if="collectselarr.includes(item.id)" color="#c5322c"></uni-icons>
										</template>
										<image class="collectimg" :src="item.img" mode="widthFix"></image>
										<view class="collect">
											<view class="name">{{item.name}}</view>
											<view class="">最新期数:{{item.year}}年{{item.period}}期</view>
										</view>
									</view>
									<uni-icons class="righticon" type="right" size="40rpx" color="#999999"></uni-icons>
								</view>
							</view>
							<view class="collectcz" v-if="iscancel">
								<view class="box-middle allsel" @click="allclick">
									<uni-icons class="circleicon" type="circle" size="40rpx" v-if="!isall"></uni-icons>
									<uni-icons class="circleicon" type="checkbox-filled" size="40rpx" color="#c5322c"
										v-if="isall"></uni-icons>
									<text class="txt">全选</text>
								</view>
								<button class="box-center btn">取消收藏</button>
							</view>
						</view>
						<view class="" v-if="collectlist.length<1">
							<emptypage remarks="可快速进入查看和管理收藏的图纸，并获知图纸的最新期数。"></emptypage>
						</view>
					</view>


				</view>
				<view class="noimg" v-if="!isLogin" :style="'height:'+swiperHeight+'px'">
					<image class="img" src="../static/img/common_login.png" mode=""></image>
					<view class="">
						可快速进入查看和管理收藏的图纸，并获知图纸的最新期数。请登录使用
					</view>
					<view class="loginbutt" @click="navigatorTo('/pages/users/login/index')">
						登录
					</view>
				</view>
			</view>
		</template>
		<view class="footfixedh"></view>
		<view class="footfixed">
			<view class="footitem box-center" :class="{active:tabbar=='imagelibrary'}"
				@click="foottabclick('imagelibrary')">
				<i class="iconfont icon-tuku"></i>
				<text>图库</text>
			</view>
			<view class="footitem box-center" :class="{active:tabbar=='collect'}" @click="foottabclick('collect')">
				<i class="iconfont icon-shoucang"></i>
				<text>图纸收藏</text>
			</view>
		</view>

	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import emptypage from "@/components/emptyPage/index.vue"
	import bannerswiper from "@/components/bannerswiper/index.vue"
	import {
		codeToLottery,
	} from '@/utils/utils.js'
	import {getmainlistApi} from "@/api/colorimage.js"
	export default {
		components: {
			navbar,
			emptypage,
			bannerswiper,
		},
		data() {
			return {
				titleHeight: 0,
				code: "",
				navtitle: "图库",
				tabbar: "imagelibrary", //imagelibrary图库  collect 收藏
				islatest: false,
				swiperHeight: 0,
				isLogin: true,
				list: [],
				collectlist: [{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "澳门牛报图澳门牛报图澳门牛报图澳门牛报图澳门牛报图",
						year: "2025",
						period: "258",
					},
					{
						id: 2,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "澳门牛报图",
						year: "2025",
						period: "258",
					},
					{
						id: 3,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "澳门牛报图",
						year: "2025",
						period: "258",
					},
				],
				iscancel: false, //是否取消收藏
				collectselarr: [],
				isall: false,
			}
		},
		onLoad(options) {
			var that = this;
			let systemInfo = uni.getSystemInfoSync();
			let statusBarHeight = systemInfo.statusBarHeight;
			that.titleHeight = statusBarHeight + 44
			let windowHeight = systemInfo.windowHeight
			let height = that.titleHeight + 160
			that.$set(that, 'swiperHeight', windowHeight - height);
			if (options.code) {
				that.code = options.code
				that.navtitle = codeToLottery(options.code) + "图库"
				that.getdata()
			}
		},
		watch: {
			
		},
		onShow() {
			// this.isLogin = this.$store.getters.isLogin;
		},


		methods: {
			getdata(){
				let that = this
				uni.showLoading()
				getmainlistApi({
					show: true
				}).then(res => {
					uni.hideLoading()
					that.list = res.data
					// that.categoryId = res.data[0].code
					// that.getNewData()
					// that.$store.commit('UPDATE_CODE', that.categoryId);
				}).catch(err => {
					uni.hideLoading()
				})
			},
			collectclick(id) {
				let idx = this.collectselarr.indexOf(id)
				if (idx > -1) {
					this.collectselarr.splice(idx, 1)
					this.isall = false
				} else {
					this.collectselarr.push(id)
					if (this.collectselarr.length == this.collectlist.length && this.collectlist.length != 0) {
						this.isall = true
					} else {
						this.isall = false
					}
				}
			},
			allclick() {
				if (this.isall) {
					this.collectselarr = []
				} else {
					this.collectlist.forEach(x => {
						this.collectselarr.push(x.id)
					})
				}
				this.isall = !this.isall
			},
			management() {
				this.iscancel = !this.iscancel
				if (!this.iscancel) {
					this.collectselarr = []
					this.isall = false
				}
			},
			bindClick(e) {
				uni.navigateTo({
					url: "/pages/lottery/colorimage/index?id=" + e.item.id
				})
			},
			foottabclick(e) {
				if (this.tabbar == e) return
				this.tabbar = e
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
			width: auto !important;
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

		.collectrightbutton {
			.button {
				width: auto;
				font-size: 16px;
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
	// 	height: 92px;
	// }

	.bannerswiper {
		height: 57px !important;

		.bannerimg {
			width: 100%;
			height: 57px !important;
		}
	}

	.filterbox {
		padding-left: 15px;
		height: 35px;
		border-bottom: 1px solid rgb(230, 230, 230);
		width: 100%;
		background-color: rgb(255, 255, 255);
		color: rgb(102, 102, 102);
		font-size: 25px;
	}

	.indexedlist {
		position: relative;
	}

	.footfixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 67px;
		max-width: var(--max-width);
		padding-bottom: 17px;
		height: calc(67px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(67px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
		display: flex;
		justify-content: space-between;
		background-color: rgb(246, 246, 246);
		border-top: 1px solid rgb(240, 241, 237);
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

	.noimg {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 80rpx;
		color: rgb(106, 85, 81);
		font-size: 32rpx;
		text-align: center;

		.img {
			width: 300rpx;
			height: 300rpx;
			margin-bottom: 20rpx;
		}

		.loginbutt {
			padding: 16rpx 60rpx;
			background-color: rgb(251, 132, 4);
			margin-top: 30rpx;
			border-radius: 10rpx;
			color: #fff;
			font-size: 25rpx;
		}
	}

	.collectbox {
		.topfixedh {
			height: 57px;
		}
	}

	.collectlist {
		.collectitem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid rgb(227, 227, 227);

			.collectitemleft {
				min-width: 0;
				flex: 1 1 0%;

				.collectimg {
					width: 80rpx;
					height: 110rpx;
					margin-left: 30rpx;
				}

				.circleicon {
					margin-left: 30rpx;
				}
			}

			.collect {
				min-width: 0;
				flex: 1 1 0%;
				padding: 0 20rpx;
				font-size: 35rpx;
				color: rgb(153, 153, 153);

				.name {
					width: 100%;
					font-size: 50rpx;
					color: rgb(51, 51, 51);
					margin-bottom: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap
				}
			}

			.righticon {
				margin-right: 10rpx;
			}
		}
	}

	.collectcz {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 67px;
		z-index: 100;
		padding: 0 30rpx 17px;
		height: calc(67px + constant(safe-area-inset-bottom));
		/* /兼容 IOS<11.2/ */
		height: calc(67px + env(safe-area-inset-bottom));
		/* /兼容 IOS>11.2/ */
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgb(246, 246, 246);
		border-top: 2rpx solid rgb(240, 241, 237);

		.allsel {
			font-size: 28px;
			color: rgb(51, 51, 51);

			.txt {
				margin-left: 5px;
			}
		}

		.btn {
			width: 100px;
			height: 40px;
			background-color: #c5322c;
			border-width: 1px solid #c5322c;
			border-radius: 5px;
			color: #fff;
			font-size: 14px;
		}
	}

	@media (min-width: 600px) {
		.noimg {
			padding: 0 40px;
			font-size: 16px;

			.img {
				width: 150px;
				height: 150px;
				margin-bottom: 10px;
			}

			.loginbutt {
				padding: 8px 30px;
				margin-top: 15px;
				border-radius: 5px;
				font-size: 14px;
			}
		}

		.collectlist {
			.collectitem {
				border-bottom: 1px solid rgb(227, 227, 227);

				.collectitemleft {
					.collectimg {
						width: 40px;
						height: 55px;
						margin-left: 15px;
					}

					.circleicon {
						margin-left: 15px;
					}
				}

				.collect {
					padding: 0 10px;
					font-size: 23px;

					.name {
						font-size: 29px;
						margin-bottom: 10px;
					}
				}

				.righticon {
					margin-right: 5px;
				}
			}
		}

		.collectcz {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			max-width: var(--max-width);
			height: 67px;
			padding: 0 15px 17px;
			border-top: 1px solid rgb(240, 241, 237);
			margin: 0 auto;
		}


	}
</style>
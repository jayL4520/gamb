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
					<view class="button" @click="submit">
						<text>发表</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="box-middle inputbox">
			<view class="title">
				彩图
			</view>
			<view class="input">
				<uni-data-select v-model="title" :localdata="namelist" @change="change" mode="none"
					:clear="false"></uni-data-select>
			</view>
		</view>
		<template v-if="imgname!=''">
			<view class="box-middle inputbox">
				<view class="title">
					年份
				</view>
				<view class="input">
					<view class="txt">
						{{imgyears}}
					</view>
				</view>
			</view>
			<view class="box-middle inputbox">
				<view class="title">
					期号
				</view>
				<view class="input">
					<view class="txt">
						{{imgqihao}}
					</view>
				</view>
			</view>
			<view class="box-middle inputbox">
				<view class="title">
					图片
				</view>
				<view class="upload">
					<view class='pictrue' v-for="(item,index) in imglist" :key="index" :data-index="index"
						@click="getPhotoClickIdx($event)">
						<image :src='item.url'></image>
						<uni-icons class="delpic" type="clear" :size="windowWidth>600?'16':'33rpx'" @click.stop='DelPic(index)'></uni-icons>
					</view>
					<view class='pictrue acea-row row-center-wrapper row-column' @click='uploadpic'
						v-if="imglist.length < maxnum">
						<uni-icons type="plusempty" size="30"></uni-icons>
						<view>上传图片</view>
					</view>
				</view>
			</view>
		</template>
	

	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import {
		// lotteryTypelistApi,
		mylistApi,addinfoApi,
	} from "@/api/colorimage.js"
	import {
		codeToRegion,
		Debounce,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				navtitle: "发布彩图",
				code: "",
				// categoryList: [],
				namelist: [],
				title: "",
				imglist: [],
				groupId:0,
				imgname:"",
				imgqihao:"",//期号
				imgyears:"",//年份
				maxnum:0,//图片上传数量
				windowWidth:0,
			}
		},
		onLoad(options) {
			let app = getApp();
			this.windowWidth= app.globalData.windowWidth
			if (options.code) {
				this.code = options.code
				this.navtitle = "发布" + codeToRegion(options.code) + "图"
				this.getmylist()
			}
		},

		methods: {
			submit: Debounce(function() {
				let {
					groupId,
					imglist,
					maxnum,
					code,imgname
				} = this, that = this
				if (groupId<=0)
					return uni.showToast({
						title: "请选择彩图名称",
						icon: 'none',
					})
				if (imglist.length<=0||imglist.length!=maxnum)
					return uni.showToast({
						title: `请上传${maxnum}张图片`,
						icon: 'none',
					})
				uni.showLoading()
				let imageUrl = imglist.map(item => item.fileName);
				addinfoApi({
					code,
					name:imgname,
					groupId,
					imageUrl:imageUrl.toString()
				}).then(res => {
					uni.hideLoading()
					setTimeout(() => {
						uni.showToast({
							title: "发表成功",
							icon: 'none',
							duration: 2000,
							success() {
								setTimeout(function() {
									that.$backOrHome()
								}, 2000);
							}
						})
					}, 300);
				}).catch(err => {
					console.log(err,"err");
					uni.hideLoading()
					setTimeout(() => {
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 1000,
						})
					}, 300);
				})
			}),
			getPhotoClickIdx(e) {
				let _this = this;
				let idx = e.currentTarget.dataset.index;
				_this.imgPreview(_this.imglist, idx);
			},
			uploadpic() {
				let that = this;
				that.$uploadImage.uploadImageOne({
					url: 'upload/image',
					name: 'multipart',
					count:(that.maxnum - that.imglist.length)
				}, function(res) {
					that.imglist=that.imglist.concat(res);
					that.$set(that, 'imglist', that.imglist);
				});
			},
			/**
			 * 删除图片
			 *
			 */
			DelPic(index) {
				let that = this;
				that.imglist.splice(index, 1);
				that.$set(that, 'imglist', that.imglist);
			},
			// 图片预览
			imgPreview(list, idx) {
				// list：图片 url 数组
				if (list && list.length > 0) {
					let urls = list.map(item => item.url);
					uni.previewImage({
						current: urls[idx],
						urls: urls
					});
				}
			},
			change(e) {
				let data=this.namelist.find(item=>item.id==e)
				this.groupId=e
				this.imgname=data.name
				this.imgqihao=data.issueNo
				this.imgyears=data.year
				this.maxnum=data.num
			},
			getmylist() {
				let that = this
				uni.showLoading()
				mylistApi({
					code: that.code
				}).then(res => {
					uni.hideLoading()
					let list = []
					if (res.data.length > 0) {
						res.data.forEach(x => {
							x.value = x.id
							x.text = x.name
							list.push(x)
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '您还没有申请成功的彩图分组，请先申请',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						})
					}
					that.namelist = list

				}).catch(err => {
					uni.hideLoading()
				})
			},
			// getlotteryTypelist() {
			// 	let that = this
			// 	uni.showLoading()
			// 	lotteryTypelistApi({
			// 		show: true
			// 	}).then(res => {
			// 		uni.hideLoading()
			// 		that.categoryList = res.data
			// 	}).catch(err => {
			// 		uni.hideLoading()
			// 	})
			// },
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

	// .longTab {
	// 	display: flex;
	// 	align-items: center;
	// 	width: 100%;
	// 	height: 60rpx;
	// 	background-color: #fff;

	// 	.menu {
	// 		width: 100%;
	// 		height: 100%;
	// 		padding-right: 20rpx;
	// 	}

	// 	.longItem {
	// 		background: #fff;
	// 		height: 100%;
	// 		display: inline-flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		text-align: center;
	// 		font-size: 24rpx;
	// 		margin-left: 20rpx;
	// 		color: rgb(51, 51, 51);
	// 		-webkit-overflow-scrolling: touch;

	// 		&.click {
	// 			color: rgb(245, 142, 3);
	// 			border-bottom: 4rpx solid rgb(245, 142, 3);
	// 		}
	// 	}

	// }

	// .vline {
	// 	width: 100%;
	// 	height: 12rpx;
	// 	background-color: rgb(238, 238, 238);
	// }

	.inputbox {
		padding: 0 10rpx;
		min-height: 60rpx;
		border-bottom: 2rpx solid rgb(243, 243, 243);

		&:last-child {
			border-bottom: none;
		}

		.title {
			color: rgb(245, 142, 3);
		}

		.input {
			min-width: 0;
			flex: 1 1 0%;
			height: 100%;
			display: flex;
			align-items: center;

			.txt {
				padding: 0 10px;
			}
		}

		.upload {
			min-width: 0;
			flex: 1 1 0%;
			display: flex;
			flex-wrap: wrap;
		}

		.xinshui {
			font-size: 25rpx;
			color: #cdcdd2;
		}

	}

	.pictrue {
		width: 130rpx;
		height: 130rpx;
		margin: 24rpx 0 0 22rpx;
		position: relative;
		font-size: 11px;
		color: #bbb;

		&:nth-last-child(1) {
			border: 0.5px solid #ddd;
			box-sizing: border-box;
		}

		uni-image,
		image {
			width: 100%;
			height: 100%;
			border-radius: 1px;

			img {
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-moz-user-select: none;
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
				width: 100%;
				height: 100%;
			}
		}

		.delpic {
			font-size: 33rpx;
			position: absolute;
			top: -10px;
			right: -10px;
		}
	}
	@media (min-width: 600px){
		.inputbox {
			padding: 0 5px;
			min-height: 40px;
			border-bottom: 1px solid rgb(243, 243, 243);
			.xinshui {
				font-size: 14px;
			}
		
		}
		.pictrue {
			width: 65px;
			height: 65px;
			margin: 12px 0 0 11px;
		
			.delpic {
				font-size: 16px;
			}
		}
	}
</style>
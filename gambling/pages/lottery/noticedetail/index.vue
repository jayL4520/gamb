<template>
	<view class="container">
		<navbar title="公告消息" class="navbar">
			<template v-slot:navleft>
				<view class="navbutton">
					<view class="backbutton" @click="$backOrHome">
						<uni-icons class="back" color="#fff" type="left" size="20" />
						<text class="">返回</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				{{item.content}}
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"

	import {
		announcementlistApi
	} from "@/api/api.js"
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				list: [],
			}
		},
		onLoad(options) {
			this.getannouncementlist()
		},

		methods: {
			getannouncementlist() {
				let that = this;
				uni.showLoading()
				announcementlistApi().then(res => {
					if (res.rows) {
						that.list = res.rows
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
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
	body {
		background: rgb(243, 243, 243);
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

	.list {
		padding: 20rpx;

		.item {
			width: 100%;
			background: #fff;
			padding: 30rpx;
			border-radius: 8rpx;
			border: 2rpx solid rgb(214, 214, 214);
			color: rgb(102, 102, 102);
			font-size: 30rpx;
			line-height: 34rpx;
		}
	}
</style>
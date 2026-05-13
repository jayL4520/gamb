<template>
	<view class="container">
		<navbar title="在线状态" class="navbar">
			<template v-slot:navleft>
				<view class="navbutton">
					<view class="backbutton" @click="$backOrHome">
						<uni-icons class="back" color="#fff" type="left" size="20" />
						<text class="">返回</text>
					</view>
				</view>
			</template>

		</navbar>
		<view class="tips">
			设为隐身状态，对方将看不到你在线标识
		</view>
		<view class="bgf">
			<view class="type box-middle justifybetween">
				<text>在线</text>
				<uni-icons v-if="type=='online'" type="checkbox-filled" :size="windowWidth>600?'20':'40rpx'"  color="#C80000"></uni-icons>
				<uni-icons v-else type="circle" :size="windowWidth>600?'20':'40rpx'"  color="#999"></uni-icons>
			</view>
			<view class="type box-middle justifybetween">
				<text>隐身</text>
				<uni-icons v-if="type=='stealth'" type="checkbox-filled" :size="windowWidth>600?'20':'40rpx'"  color="#C80000"></uni-icons>
				<uni-icons v-else type="circle" :size="windowWidth>600?'20':'40rpx'"  color="#999"></uni-icons>
			</view>
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
				windowWidth:0,
				type: "online", //online在线 stealth隐身
			}
		},
		onLoad(options) {
let app = getApp();
			this.windowWidth= app.globalData.windowWidth
		},

		methods: {
			
		},

	}
</script>

<style lang="scss" scoped>
	page {
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

	.tips {
		padding: 40rpx 20rpx 30rpx;
		color: rgb(106, 106, 106);
		font-size: 35rpx;
	}

	.type {
		padding: 0 100rpx 0 35rpx;
		border-bottom: 2rpx solid rgb(240, 240, 240);
		font-size: 35rpx;
		height: 100rpx;
	}
	
	@media (min-width: 600px){
		.tips {
			padding: 20px 10px 15px;
			font-size: 23px;
		}
		
		.type {
			padding: 0 50px 0 19px;
			border-bottom: 1px solid rgb(240, 240, 240);
			font-size: 26px;
			height: 60px;
		}
		
	}
	
</style>
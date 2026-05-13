<template>
	<view class="container">
		<navbar title="更多彩种" class="navbar">
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
			<template v-if="type=='market'">
				<template v-for="(item,index) in list" :key="index">
					<view class="item" v-if="item.code!='OU'">
						<view class="itembutton box-center" @click="codesel(item.code)">
							{{item.name}}
						</view>
					</view>
				</template>
			</template>
			<template v-else>
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="itembutton box-center" @click="codesel(item.code)">
						{{item.name}}
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"

	import {
		lotteryTypelistApi,
	} from "@/api/api.js"

	export default {
		components: {
			navbar,
		},
		data() {
			return {
				list: [],
				type:"",
			}
		},
		onLoad(options) {
			if(options.type){
				this.type=options.type
			}
			this.getdata()
		},

		methods: {
			codesel(code){
				this.$store.commit('UPDATE_CODE', code);
				uni.navigateBack()
			},
			getdata() {
				uni.showLoading()
				lotteryTypelistApi({show:true}).then(res => {
					uni.hideLoading()
					this.list = res.data
				}).catch(err => {
					uni.hideLoading()
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

	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 30rpx;

		.item {
			width: 50%;
			padding: 0 16rpx 0 32rpx;
			margin-bottom: 30rpx;
			color: rgb(51, 51, 51);
			font-size: 30rpx;
		}
		.itembutton{
			width: 100%;
			border: 1rpx solid rgb(204, 204, 204);
			border-radius: 10rpx;
			height: 80rpx;
			background-color: rgb(249, 249, 249);
		}
	}


@media (min-width: 600px){
	.list {
		padding-top: 15px;
	
		.item {
			width: 50%;
			padding: 0 8px 0 16px;
			margin-bottom: 15px;
			font-size: 15px;
		}
		.itembutton{
			border: 1px solid rgb(204, 204, 204);
			border-radius: 5px;
			height: 40px;
		}
	}
	
}

</style>
<template>
	<view class="empty-box" :style="{'padding-top':mTop}">
		<image src="@/static/img/empty.png" mode="widthFix"></image>
		<view class="txt">{{title}}</view>
		<view class="remarks">{{remarks}}</view>
	</view>
</template>

<script>

	export default{
		props: {
			title: {
				type: String,
				default: '暂无数据',
			},
			remarks: {
				type: String,
				default: '',
			},
			mTop: {
				type: String,
				default: '50%',
			}
		},
		data(){
			return{
			}
		}
	}

</script>

<style lang="scss" scoped>
	.empty-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 40rpx 60rpx;
		image{
			width: 300rpx;
			height: 300rpx;
		}
		.txt{
			text-align: center;
			font-size: 30rpx;
			color: rgb(128, 128, 128);
		}
		.remarks{
			margin-top: 30rpx;
			text-align: center;
			font-size: 30rpx;
			color: rgb(128, 128, 128);
		}
	}
	@media (min-width: 600px){
		.empty-box{
			padding: 0 20px 30px;
			image{
				width: 150px;
				height: 150px;
			}
			.txt{
				font-size: 20px;
			}
			.remarks{
				margin-top: 15px;
				font-size: 20px;
			}
		}
	}
</style>

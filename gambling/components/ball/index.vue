<template>
	<view class="ballList">
		<template v-for="(item,indexs) in list" :key="indexs">
			<ballitem :item="item"></ballitem>
		</template>
			
		<view class="jiaball" v-if="lastBall">
			<view class="jia">
				+
			</view>
			<ballitem :item="lastBall"></ballitem>
		</view>
		<uni-icons v-if="islink" class="righticon" type="right" size="16"></uni-icons>
	</view>
</template>

<script>
	import ballitem from "@/components/ballitem/index.vue"
	export default {
		name: "ball",
		components:{
			ballitem
		},
		props: {
			info: {
				type: Object,
				default: {}
			},
			islink: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				list:[],
				lastBall:{},
			};
		},
		created(){
			// console.log(this.data,'this.data');
			this.getlist()
		},
		methods:{
			getlist(){
				let x={...this.info}
				let numberarr = x.numbers.split(",")
				let lastNum = [...numberarr].pop();
				let sbarr = x.sb.split(",")
				let sxarr = x.sx.split(",")
				let wxarr = x.wx.split(",")
				let ball = []
				let total = 0
				numberarr.forEach((x, i) => {
					total += Number(x)
					ball.push({
						num: x,
						sb: sbarr[i],
						sx: sxarr[i],
						wx: wxarr[i]
					})
				})
			
				this.lastBall = ball.pop()
				this.list=ball
			},
		},
	}
</script>

<style lang="scss" scoped>
	.ballList {
		position: relative;
		display: flex;
		width: 100%;
		padding-right: 40rpx;
		justify-content: space-around;
	
		.righticon {
			position: absolute;
			top: 32rpx;
			right: 20rpx;
		}
	
	
		.jiaball {
			display: flex;
	
			.jia {
				font-size: 32rpx;
				margin-top: 20rpx;
				margin-right: 20rpx;
			}
		}
	}
	@media (min-width: 600px) {
		.ballList {
			padding-right: 20px;
		
			.righticon {
				top: 16px;
				right: 10px;
			}
		
		
			.jiaball {
		
				.jia {
					font-size: 16px;
					margin-top: 10px;
					margin-right: 10px;
				}
			}
		}
	}
</style>

<template>
	<view class="specialbox">
		<view class="titlebox">
			<view class="name">
				{{info.name}}
			</view>
			<view class="remarks">
				({{info.remarks}})
			</view>
		</view>
		<view class="tongji">
			<view class="tongjileft">
				<view class="">
					當前期數:{{info.period}}期
				</view>
				<template v-if="istb">
					<view class="line">
						|
					</view>
					<view class="">
						統計期數:{{info.size}}
					</view>
				</template>

			</view>
			<view class="box-middle" v-if="istb">
				<button class="button box-center mr10" :class="{active:specialtb=='0'}"
					@click="specialtbclick('0')">热门</button>
				<button class="button box-center" :class="{active:specialtb=='1'}"
					@click="specialtbclick('1')">遗漏</button>
			</view>
		</view>
		<view class="uchartsbox">
			<view class="ucharts">
				<qiun-data-charts type="column" :opts="opts" :chartData="chartData" :ontouch="true"
					:tooltipShow="false" />
			</view>
		</view>
		<view class="list">
			<view class="box-middle ballitems" v-for="(items,indexs) in info.convertlist" :key="indexs">
				<view class="ballitemsleft">
					<view class="">{{name}}</view>
					<view class="ball_name">次数</view>
				</view>
				<view class="balllist" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }" >
					<view class="ballItem" v-for="(col,i) in items" :key="i">
						<view class="ball_num">
							{{col.hm}}
						</view>
						<view class="ball_name">
							{{col.count}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		emits: ["onclick"],
		props: {
			info: {
				type: Object,
				default: {}
			},
			istb: {
				type: Boolean,
				default: false
			},
			specialtb: {
				type: String,
				default: "0"
			},
			name: {
				type: String,
				default: ""
			},
			cols: {
				type: [String, Number],
				default: 0,
			}
		},
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#3E80CC"],
					enableScroll: true,
					background: "transparent",
					legend: {
						show: false
					},
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 10,
						calibration: true,
					},
					yAxis: {
						disabled: true,
						disableGrid: true,
						axisLine: false,
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},
			}
		},
		onLoad(options) {

		},

		methods: {
			specialtbclick(e) {
				this.$emit("onclick", e)
			},
			getchartData(list) {
				let that = this,
					categories = [],
					series = []
				list.forEach(x => {
					categories.push(x.hm)
					series.push(x.count)
				})
				that.chartData = {
					categories,
					series: [{
						name: "次数",
						data: series
					}]
				}
				console.log(that.chartData, "that.chartData");
			},

		},

	}
</script>

<style lang="scss" scoped>
	.specialbox {
		width: 100%;
		min-height: calc(100vh - 225px);
		background: #fff;
	}

	.titlebox {
		padding: 40rpx 20rpx 20rpx;
		font-size: 30rpx;
		color: rgb(102, 102, 102);

		.name {
			font-size: 40rpx;
			color: rgb(51, 51, 51);
			margin-bottom: 20rpx;
		}
	}

	.tongji {
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.tongjileft {
			flex: 1 1 0%;
			font-size: 30rpx;
			color: rgb(102, 102, 102);
			display: flex;
			align-items: center;

			.line {
				color: rgb(230, 230, 230);
				padding: 0 10rpx;
			}
		}

		.button {
			padding: 14rpx 20rpx;
			border-radius: 10rpx;
			border: 1rpx solid rgb(197, 50, 44);
			font-size: 35rpx;
			color: rgb(197, 50, 44);
			background-color: transparent;

			&.active {
				color: #fff;
				background: rgb(197, 50, 44);
			}
		}
	}

	.uchartsbox {
		width: 100%;
		height: 350rpx;
		background-color: #f5fcff;
		padding-top: 20rpx;

		.ucharts {
			width: 100%;
			height: 100%;
		}
	}

	.list {
		width: calc(100% - 60rpx);
		margin: 30rpx auto 20rpx;
		box-shadow: rgba(153, 153, 153, 0.38) 0px 1px 7px;

		.ballitems {
			display: flex;
			width: 100%;
			font-size: 35rpx;
			color: rgb(51, 51, 51);
			line-height: 50rpx;
			text-align: center;
			background: #fff;
			border-bottom: 2rpx solid rgb(240, 241, 237);
			padding: 20rpx;
		}

		.balllist {
			flex: 1 1 0%;
			display: grid;
			// justify-content: space-around;

		}

		.ball_name {
			margin-top: 10rpx;
			color: rgb(63, 128, 204);
		}
	}
	
	@media (min-width: 600px){
	.titlebox {
		padding: 20px 10px 10px;
		font-size: 21px;
	
		.name {
			font-size: 29px;
			margin-bottom: 10px;
		}
	}
	
	.tongji {
		padding: 10px;
	
		.tongjileft {
			font-size: 21px;
	
			.line {
				padding: 0 5px;
			}
		}
	
		.button {
			padding: 7px 10px;
			border-radius: 5px;
			border: 1px solid rgb(197, 50, 44);
			font-size: 23px;
		
		}
	}
	
	
	.uchartsbox {
		height: 265px;
		padding-top: 10px;
	
	}
	
	.list {
		width: calc(100% - 30px);
		margin: 15px auto 10px;
	
		.ballitems {
			font-size: 23px;
			line-height: 34px;
			border-bottom: 1px solid rgb(240, 241, 237);
			padding: 10px;
		}
	
	
		.ball_name {
			margin-top: 5px;
		}
	}
	
	
		
	}
</style>
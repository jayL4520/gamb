<template>
	<view class="container">
		<navbar title="城市" class="navbar">
			<template v-slot:navleft>
				<view class="navbutton">
					<view class="backbutton" @click="$backOrHome">
						<uni-icons class="back" color="#fff" type="left" size="20" />
						<text class="">返回</text>
					</view>
				</view>
			</template>

		</navbar>
		<view class="bgf">
			<picker class="picker" mode="multiSelector" :value="cityIndex" :range="cityData" @change="bindCityChange"
				@columnchange="selMonitor">
				<view class="type box-middle justifybetween">
					<text>城市：未知</text>
					<text>修改</text>
				</view>
			</picker>


		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import city from "../static/js/city.js";
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				cityData: city,
				cityIndex: 0,
				addressNode: {
					province: "",
					city: ""
				},
				provinceList: [],
				cityAllList: [],
			}
		},
		onLoad(options) {
			this.getAddressData();
		},

		methods: {
			bindCityChange(e) {
				let val = e.target.value
				this.addressNode = {
					province: this.cityData[0][val[0]],
					city: this.cityData[1][val[1]]
				}
			},
			/**
			 * 监听省市区滚动
			 *
			 */
			selMonitor(e) {
				const that = this
				let column = e.detail.column
				if (column == 0) {
					let index = e.detail.value
					let length = that.cityData[1].length
					// 改变市
					that.cityData[1].splice(0, length, ...that.cityAllList[index])
				}
			},
			/**
			 * 将省市区的数据转换为picker可用的多维数组
			 *
			 */
			getAddressData() {
				// 所有城市列表,二维数组
				let cityAllList = [];
				// 省列表
				let provinceList = [];
				// cityData为省市区的json数据
				for (let key in this.cityData) {
					let newDataList = [];
					if (this.cityData[key].child) {
						for (let key2 in this.cityData[key].child) {
							newDataList.push(this.cityData[key].child[key2].city);
						}
					}
					provinceList.push(this.cityData[key].province);
					cityAllList.push(newDataList);
				}
				this.provinceList = provinceList;
				this.cityAllList = cityAllList;
				this.cityData = [provinceList, cityAllList[0]];
			},
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


	.type {
		padding: 0 35rpx;
		border-bottom: 2rpx solid rgb(240, 240, 240);
		font-size: 35rpx;
		height: 100rpx;
	}
	
	@media (min-width: 600px){
		.type{
			padding: 0 14px;
			border-bottom: 1px solid rgb(240, 240, 240);
			font-size: 18px;
			height: 60px;
		}
	}
	
</style>
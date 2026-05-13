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
		</navbar>
		<view class="">
			<view class="searchbox box-center">
				<uni-easyinput class="easyinput" :inputBorder="false" :border="true" v-model="search" :clearable="false"
					placeholder="请输入图纸名称"></uni-easyinput>
				<button class="box-center btn">搜索</button>
			</view>
			<view class="" v-if="!searchend">
				<view class="hot">
					<view class="title">
						热门搜索
					</view>
					<view class="hotlist">
						<view class="hotitem box-center" v-for="(item,index) in hotlist" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="hot">
					<view class="title">
						浏览记录
					</view>
					<view class="hotlist">
						<view class="hotitem box-center" v-for="(item,index) in hotlist" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="searchend">
				<view class="" v-if="searchlist.length!=0">
					<view class="resultbox box-middle">
						搜索<text class="txt">"{{search}}"</text>的结果,共找到<text class="txt">{{searchlist.length}}</text>张图纸:
					</view>
					<view class="">
						<view class="searchresult" v-for="(item,index) in searchlist" :key="index">
							<img class="img" :src="item.img" alt="" />
							<view class="name line1">
								{{item.name}}
							</view>
							<uni-icons class="righticon" type="right" size="40rpx" color="#999999"></uni-icons>
						</view>
					</view>
				</view>
				<view class="empty-box" v-if="searchlist.length==0">
					<image src="../static/img/ico_search_none.png" mode="widthFix"></image>
					<view class="txt">没有找到搜索结果,试试热门关键字吧</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"


	import {
		codeToRegion,
	} from '@/utils/utils.js'
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				navtitle: "图库",
				code: "",
				search: "",
				hotlist: [{
						name: "澳门跑狗图",
					},
					{
						name: "正版跑狗图",
					},
					{
						name: "澳门挂牌",
					},
					{
						name: "平特一肖",
					},
					{
						name: "新特报",
					},
					{
						name: "澳门曾道人致富财经报",
					},
					{
						name: "澳门兔报图",
					},
					{
						name: "澳门签牌",
					},
				],
				searchend: false,
				searchlist: [{
					id: 1,
					img: "/pages/lottery/static/img/collectimg.jpg",
					name: "宝宝平特1",
					year: "2025",
					period: "258",
				}, ],
				caibaolist: [{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "澳门牛报图",
						year: "2025",
						period: "258",
					},
					{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "澳门挂牌1",
						year: "2025",
						period: "258",
					},
					{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "宝宝平特1",
						year: "2025",
						period: "258",
					},
					{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "金鸡系列1",
						year: "2025",
						period: "258",
					},
					{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "马经系列10",
						year: "2025",
						period: "258",
					},
					{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "青蛙系列81",
						year: "2025",
						period: "258",
					},
					{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "青蛙系列71",
						year: "2025",
						period: "258",
					},
					{
						id: 1,
						img: "/pages/lottery/static/img/collectimg.jpg",
						name: "青蛙系列11",
						year: "2025",
						period: "258",
					},
				],
			}
		},
		onLoad(options) {
			if (options.code) {
				this.code = options.code
				this.navtitle = codeToRegion(options.code) + "图库"
			}
		},

		methods: {

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
	}

	.searchbox {
		width: 100%;
		padding: 20rpx 30rpx;
		background: rgb(246, 246, 246);

		.easyinput {
			min-width: 0;
			flex: 1;
			height: 60rpx;
			border: 1px solid rgb(204, 204, 204);
			border-radius: 5px 0 0 5px;
			overflow: hidden;
			background: #fff;
		}

		.btn {
			height: 60rpx;
			padding: 0 15px;
			border: 1px solid #f58e03;
			color: #fff;
			background-color: rgba(0, 0, 0, 0);
			border-radius: 0 5px 5px 0;
			font-size: 14px;
			background: #f58e03;
		}

	}

	.hot {
		padding-left: 20rpx;

		.title {
			padding: 30rpx 0 20rpx;
			font-size: 25rpx;
			color: rgb(51, 51, 51);
		}

		.hotlist {
			display: flex;
			flex-wrap: wrap;

			.hotitem {
				height: 40rpx;
				background-color: rgb(238, 238, 238);
				margin-right: 20rpx;
				margin-top: 20rpx;
				border: 2rpx solid #ffffff;
				border-radius: 20rpx;
				font-size: 25rpx;
				color: rgb(51, 51, 51);
				padding: 0 20rpx;
			}

		}
	}

	.resultbox {
		width: 100%;
		height: 60rpx;
		background-color: rgb(255, 250, 228);
		padding-left: 20rpx;
		color: #472822;
		font-size: 40rpx;

		.txt {
			color: rgb(227, 124, 0);
		}
	}

	.searchresult {
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;

		.img {
			width: 80rpx;
			height: 100rpx;
		}

		.name {
			min-width: 0;
			flex: 1;
			font-size: 25rpx;
			color: rgb(71, 40, 34);
			padding: 0 30rpx;
		}
	}

	.empty-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50% 40rpx 60rpx;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.txt {
			text-align: center;
			font-size: 25rpx;
			color: rgb(106, 85, 81);
			margin-top: 20rpx;
		}
	}

@media (min-width: 600px){
	.searchbox {
		padding: 10px 15px;
	
		.easyinput {
			height: 40px;
			border: 1px solid rgb(204, 204, 204);
			border-radius: 5px 0 0 5px;
		}
	
		.btn {
			height: 40px;
			padding: 0 15px;
		}
	
	}
	
	.hot {
		padding-left: 10px;
	
		.title {
			padding: 15px 0 10px;
			font-size: 14px;
		}
	
		.hotlist {
			.hotitem {
				height: 20px;
				margin-right: 10px;
				margin-top: 10px;
				border: 1px solid #ffffff;
				border-radius: 10px;
				font-size: 14px;
				padding: 0 10px;
			}
	
		}
	}
	
	.resultbox {
		height: 40px;
		padding-left: 10px;
		font-size: 26px;
		
	}
	
	
	.searchresult {
		padding: 15px 10px;
	
		.img {
			width: 40px;
			height: 50px;
		}
	
		.name {
			font-size: 17px;
			padding: 0 15px;
		}
	}
	
	.empty-box {
		padding: 50% 20px 60px;
	
		.txt {
			font-size: 14px;
			margin-top: 10px;
		}
	}
	
	
	
}

</style>
<template>
	<view class="container">
		<navbar title="社交" class="navbar">
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
			<view class="topfixedh"></view>
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<view class="typelist box-middle">
					<view class="typeitem box-center" :class="{active:type=='friend'}">朋友</view>
					<view class="typeitem box-center" :class="{active:type=='fans'}">粉丝</view>
					<view class="typeitem box-center" :class="{active:type=='follow'}">关注</view>
					<view class="typeitem box-center" :class="{active:type=='block'}">拉黑</view>
				</view>
				<view class="searchbox box-center">
					<uni-easyinput class="easyinput" :inputBorder="false" :border="true" v-model="search"
						placeholder="请输入搜索内容"></uni-easyinput>
					<button class="box-center btn">搜索</button>
				</view>
			</view>
			<view class="">
				<emptypage></emptypage>
			</view>
		</view>
		
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import emptypage from "@/components/emptyPage/index.vue"
	
	export default {
		components: {
			navbar,
			emptypage,
		},
		data() {
			return {
				titleHeight: 0,
				type: "friend", //friend朋友 fans粉丝 follow关注 block拉黑
			}
		},
		onLoad(options) {
			let app = getApp();
			this.titleHeight= app.globalData.statusBarHeight
			console.log(this.titleHeight,'titleHeight');
			if(options.type){
				this.type=options.type
			}
		},

		methods: {
			
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
	// .topfixedh{
	// 	width: 100%;
	// 	height: 100px;
	// }

	.topfixed {
		position: sticky;
		left: 0;
		width: 100%;

		.typelist {
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #e4e4e4;

			.typeitem {
				width: 25%;
				height: 100%;
				color: rgb(153, 153, 153);
				font-size: 14px;

				&.active {
					color: rgb(245, 142, 3);
					border-bottom: 2px solid rgb(245, 142, 3);
				}
			}
		}

		.searchbox {
			width: 100%;
			height: 60px;
			padding: 0 15px;
			border-bottom: 1px solid #e4e4e4;

			.easyinput {
				min-width: 0;
				flex: 1;
				border: 1px solid rgb(204, 204, 204);
				border-radius: 5px;
				overflow: hidden;
			}

			.btn {
				height: 34px;
				padding: 0 15px;
				margin-left: 15px !important;
				border: 1px solid rgb(245, 142, 3);
				color: rgb(245, 142, 3);
				background-color: rgba(0, 0, 0, 0);
				border-radius: 17px;
				font-size: 14px;
			}
		}
	}
	
	@media (min-width: 600px){
		
	}
	
</style>
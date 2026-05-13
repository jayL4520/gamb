<template>
	<view class="">
		<view class="navbar_box">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
				<view class="status_bar_bg">
					
				</view>
			</view>
			<uni-nav-bar class="nav-bar" backgroundColor="#472822">
				<template v-slot:left>
					<div class="navleft">
						<slot name="navleft"></slot>
					</div>
				</template>
				<view class="title">{{title}}</view>
				<template v-slot:right>
					<div class="navright">
						<slot name="navright"></slot>
					</div>
					
				</template>
			</uni-nav-bar>
			
		</view>
		<view class="nav-bar-h">
			
		</view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: {
			title: {
				type: String,
				default: ""
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.navbar_box{
		background: #472822;
	}
	.status_bar {
		background: #472822;
		height: var(--status-bar-height);
		width: 100%;
	}
	.nav-bar-h{
		height: 44px;
	}
	.status_bar_bg{
		position: fixed;
		top: 0;
		height: var(--status-bar-height);
		width: 100%;
		background: #472822;
		z-index: 998;
	}

	.nav-bar {
		position: fixed;
		width: 100%;
		max-width: var(--max-width);
		box-sizing: border-box;
		z-index: 999;
		.title {
			color: #fff;
			font-size: 20px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		// .navleft{
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	z-index: 10;
		// }
		// .navright{
		// 	position: absolute;
		// 	top: 0;
		// 	right: 0;
		// 	z-index: 10;
		// }
	}
</style>
<style lang="scss">
	.uni-navbar__header{
		justify-content: space-between;
	}
	::v-deep .uni-navbar__header-btns-left,
	::v-deep .uni-navbar__header-btns-right{
		width: 30% !important;
		position: relative;
		color: #fff;
		cursor: default !important;
	}
	
</style>
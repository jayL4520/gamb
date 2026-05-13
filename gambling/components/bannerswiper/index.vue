<template>
	<view class="">
		<swiper class="bannerswiper" circular :indicator-dots="false" :autoplay="true" :interval="2000"
			:duration="500">
			<swiper-item>
				<image class="bannerimg" src="@/static/img/colorimagelibrary.jpg" mode="aspectFill">
				</image>
			</swiper-item>
			<swiper-item>
				<image class="bannerimg" src="@/static/img/lotteryresults3.jpg" mode="aspectFill">
				</image>
			</swiper-item>
			<swiper-item>
				<image class="bannerimg" src="@/static/img/lotteryresults4.jpg" mode="aspectFill">
				</image>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	export default {
		name: "bannerswiper",
		props: {
			
		},
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.bannerswiper {
		height: 57px !important;
	
		.bannerimg {
			width: 100%;
			height: 57px !important;
		}
	}
</style>
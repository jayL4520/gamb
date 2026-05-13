<template>
	<view class="">
	<!-- 生肖/五行/波色 -->
	<view class="" v-if="type==1">
		<view class="referencebox">
			<view class="referencetitle box-center">
				生肖参照表
			</view>
			<view class="sxlist">
				<view class="sxitem" v-for="(item,index) in lists.sxlist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<view v-for="(items,indexs) in item.list" :key="indexs">
						<text
							:class="items.bose=='绿'?'txtgreen':items.bose=='蓝'?'txtblue':items.bose=='红'?'txtred':''">{{items.hm}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				五行参照表
			</view>
			<view class="wxlist">
				<view class="sxitem" v-for="(item,index) in lists.wxlist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<view class="wxhmlist">
						<view class="wxhmitem" v-for="(items,indexs) in item.list" :key="indexs">
							<text
								:class="items.bose=='绿'?'txtgreen':items.bose=='蓝'?'txtblue':items.bose=='红'?'txtred':''">{{items.hm}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				波色参照表
			</view>
			<view class="bslist">
				<view class="sxitem" v-for="(item,index) in lists.boselist" :key="index">
					<view class="name">
						{{item.name}}波
					</view>
					<view class="bshmlist">
						<view class="bshmitem" v-for="(items,indexs) in item.list" :key="indexs">
							<text
								:class="items.bose=='绿'?'txtgreen':items.bose=='蓝'?'txtblue':items.bose=='红'?'txtred':''">{{items.hm}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 家禽野兽/其他 -->
	<view class="" v-if="type==2">
		<view class="referencebox">
			<view class="referencetitle box-center">
				家禽野兽参照表
			</view>
			<view class="jqlist">
				<view class="jqitem" v-for="(item,index) in lists.jiaqinyeshoulist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<view class="jqhmlist">
						<view class="jqhmitem" v-for="(items,indexs) in item.list" :key="indexs">
							<text class="txt">{{items}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				男女生肖参照表
			</view>
			<view class="jqlist">
				<view class="jqitem" v-for="(item,index) in lists.nannvshoulist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<template v-if="item.name=='男肖'">
						<view class="jqhmlist" >
							<view class="jqhmitem" v-for="(items,indexs) in item.list" :key="indexs">
								<text class="txt">{{items}}</text>
							</view>
						</view>
					</template>
					<template v-else>
						<view class="jqhmlist" >
							<view class="jqhmitem" v-for="i in 7" :key="indexs">
								<text class="txt">{{item.list[i-1]}}</text>
							</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				天地生肖参照表
			</view>
			<view class="jqlist">
				<view class="jqitem" v-for="(item,index) in lists.tiandishoulist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<view class="jqhmlist">
						<view class="jqhmitem" v-for="(items,indexs) in item.list" :key="indexs">
							<text class="txt">{{items}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				四季生肖参照表
			</view>
			<view class="jqlist">
				<view class="jqitem" v-for="(item,index) in lists.sijishoulist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<view class="jqhmlist">
						<view class="jqhmitem" v-for="(items,indexs) in item.list" :key="indexs">
							<text class="txt">{{items}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				琴棋书画生肖参照表
			</view>
			<view class="jqlist">
				<view class="jqitem" v-for="(item,index) in lists.qingqilist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<view class="jqhmlist">
						<view class="jqhmitem" v-for="(items,indexs) in item.list" :key="indexs">
							<text class="txt">{{items}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				三色生肖参照表
			</view>
			<view class="jqlist">
				<view class="jqitem" v-for="(item,index) in lists.sanselist" :key="index">
					<view class="name">
						{{item.name}}
					</view>
					<view class="jqhmlist">
						<view class="jqhmitem" v-for="(items,indexs) in item.list" :key="indexs">
							<text class="txt">{{items}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="referencebox">
			<view class="referencetitle box-center">
				生肖对冲参照表
			</view>
			<view class="duichonglist">
				<view class="duichongitem" v-for="(item,index) in lists.duichonglist" :key="index">
					<view class="jqhmlist">
						<view class="jqhmitem">
							<text class="txt">{{item.list[0]}}</text>
						</view>
						<view class="jqhmitem">
							<text class="txtred">冲</text>
						</view>
						<view class="jqhmitem">
							<text class="txt">{{item.list[1]}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
				
	</view>

</template>

<script>
	
	export default {
		props:{
			type:{
				type:String,
				default:""
			},
			lists:{
				type:Object,
				default:{}
			},
		},
		data() {
			return {
			
			}
		},
		onLoad(options) {
			
		},

		methods: {
			

		},

	}
</script>

<style lang="scss" scoped>

	.referencebox {
		.referencetitle {
			width: 100%;
			height: 60rpx;
			background-color: rgb(244, 244, 244);
			font-size: 40rpx;
			color: rgb(51, 51, 51);
		}
	
		.sxlist {
			display: flex;
			align-items: stretch;
			border-top: 2rpx solid #e6e6e6;
			border-bottom: 2rpx solid #e6e6e6;
			.sxitem {
				flex: 1 1 0%;
				font-size: 35rpx;
				color: rgb(51, 51, 51);
				line-height: 50rpx;
				text-align: center;
				background: #fff;
				border-right: 2rpx solid #e6e6e6;
				&:nth-child(2n){
					background: #f4f4f4;
				}
			}
	
			.name {
				height: 50rpx;
			}
		}
		.wxlist{
			border-top: 2rpx solid #e6e6e6;
			.sxitem {
				display: flex;
				width: 100%;
				font-size: 35rpx;
				color: rgb(51, 51, 51);
				line-height: 50rpx;
				text-align: center;
				background: #fff;
				border-bottom: 2rpx solid #e6e6e6;
				&:nth-child(2n){
					background: #f4f4f4;
				}
			}
			
			.name {
				width: 60rpx;
				border-right: 2rpx solid #e6e6e6;
			}
			.wxhmlist{
				flex: 1 1 0%;
				display: flex;
				.wxhmitem{
					width: 9%;
				}
			}
		}
		.bslist{
			border-top: 2rpx solid #e6e6e6;
			.sxitem {
				display: flex;
				width: 100%;
				font-size: 35rpx;
				color: rgb(51, 51, 51);
				line-height: 50rpx;
				text-align: center;
				background: #fff;
				border-bottom: 2rpx solid #e6e6e6;
				&:nth-child(2n){
					background: #f4f4f4;
				}
			}
			
			.name {
				width: 60rpx;
				border-right: 2rpx solid #e6e6e6;
			}
			.bshmlist{
				flex: 1 1 0%;
				display: flex;
				flex-wrap: wrap;
				.bshmitem{
					width: 11%;
				}
			}
		}
		.jqlist{
			border-top: 2rpx solid #e6e6e6;
			.jqitem {
				display: flex;
				width: 100%;
				font-size: 35rpx;
				color: rgb(51, 51, 51);
				line-height: 50rpx;
				text-align: center;
				background: #fff;
				border-bottom: 2rpx solid #e6e6e6;
			}
			
			.name {
				width: 90rpx;
				border-right: 2rpx solid #e6e6e6;
			}
			.jqhmlist{
				flex: 1 1 0%;
				display: flex;
				flex-wrap: wrap;
				color: #666666;
				.jqhmitem{
					flex: 1 1 0%;
					border-right: 2rpx solid #e6e6e6;
				}
			}
		}
		.duichonglist{
			display: flex;
			border-top: 2rpx solid #e6e6e6;
			.duichongitem{
				flex: 1 1 0%;
				width: 100%;
				font-size: 35rpx;
				color: rgb(51, 51, 51);
				line-height: 50rpx;
				text-align: center;
				background: #fff;
				border-right: 2rpx solid #e6e6e6;
				.jqhmitem{
					border-bottom: 2rpx solid #e6e6e6;
				}
			}
		}
		.txtgreen{
			color: #219f1f;
		}
		.txtblue{
			color: #008dda;
		}
		.txtred{
			color: #e7443a;
			
		}
	}
	
@media (min-width: 600px){
	.referencebox {
		.referencetitle {
			height: 37px;
			font-size: 28px;
		}
	
		.sxlist {
			border-top: 1px solid #e6e6e6;
			border-bottom: 1px solid #e6e6e6;
			.sxitem {
				font-size: 26px;
				line-height: 30px;
				border-right: 1px solid #e6e6e6;
			}
	
			.name {
				height: 30px;
			}
		}
		.wxlist{
			border-top: 1px solid #e6e6e6;
			.sxitem {
				font-size: 26px;
				line-height: 30px;
				border-bottom: 1px solid #e6e6e6;
			}
			
			.name {
				width: 37px;
				border-right: 1px solid #e6e6e6;
			}
		}
		.bslist{
			border-top: 1px solid #e6e6e6;
			.sxitem {
				font-size: 26px;
				line-height: 30px;
				border-bottom: 1px solid #e6e6e6;
			}
			
			.name {
				width: 30px;
				border-right: 1px solid #e6e6e6;
			}
		
		}
		.jqlist{
			border-top: 1px solid #e6e6e6;
			.jqitem {
				font-size: 26px;
				line-height: 30px;
				border-bottom: 1px solid #e6e6e6;
			}
			
			.name {
				width: 60px;
				border-right: 1px solid #e6e6e6;
			}
			.jqhmlist{
				.jqhmitem{
					flex: 1 1 0%;
					border-right: 1px solid #e6e6e6;
				}
			}
		}
		.duichonglist{
			border-top: 1px solid #e6e6e6;
			.duichongitem{
				font-size: 26px;
				line-height: 30px;
				border-right: 1px solid #e6e6e6;
				.jqhmitem{
					border-bottom: 1px solid #e6e6e6;
				}
			}
		}
	}
	
}
</style>
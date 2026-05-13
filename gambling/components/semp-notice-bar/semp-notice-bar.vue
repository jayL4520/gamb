<template>
	<view class="semp-notice-bar">
		<view class="show-box flex-row" :class="round?'round':''" v-show="showNotice" :style="{'background':bgColor}">
			<view class="icon"  v-if="icon!=''">
				<uni-icons :type="icon" size="20" :color="setIconColor"></uni-icons>
			</view>
			<view class="show-info flex-row" :class="icon==''?'no-icon':''" v-if="showType=='slider'">
				<view class="text-box" :class="rows && !scrollable?'text-rows':''" :style="{'margin-left':sw+'px','color':color}" @click="onItemClick">{{strText}}</view>
			</view>
			<view class="scroll-box" :style="{'color':color}" v-if="showType=='scrollTop'">
				<swiper vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item v-for="(item, index) in arrayText" :key="index">
						<navigator @click="onItemClick">{{item}}</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="scroll-box" :style="{'color':color}" v-if="showType=='scrollLeft'">
				<swiper autoplay="true" circular="true" interval="3000">
					<swiper-item v-for="(item, index) in arrayText" :key="index">
						<navigator @click="onItemClick">{{item}}</navigator>
					</swiper-item>
				</swiper>
			</view>			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'semp-notice-bar',
		components: {
		},
		data() {
			return {								
				boxWidth:'398',
				textwidth:'',
				sw:'0',
				timer:null,				
				showNotice:true
			}
		},
		props:{
			strText:{
				type: String,
				default: '新版震撼发部了！',
			},
			//多条信息滚动模式
			arrayText:{
				type: Array,
				default () {
					return [
						'新版震撼发部了！',
						'人气爆红，发布日流量超过十万',
						'36氪热文榜推荐、CSDN公号推荐分享文章'
					]
				}
			},
			//slider 滑动 scrollTop 上下滚动 scrollLeft横向滚动
			showType:{
				type: String,
				default: 'slider',
			},
			showTime: {
				type: [Number, String],
				default: ''
			},
			icon: {
			  type: String,
			  default: 'sound',
			},
			setIconColor: {
			  type: String,
			  default: 'red',
			},
			bgColor: {
			  type: String,
			  default: 'transparent',
			},
			color: {
			  type: String,
			  default: 'red',
			},
			 scrollable: {
			  type: [Boolean, String],
			  default: false,
			},
			//圆角
			round: {
			  type: [Boolean, String],
			  default: false,
			},
			//是否多行
			rows: {
			  type: [Boolean, String],
			  default: false,
			},
		},
		 mounted() {			
			if(this.scrollable && !this.rows && this.showType=="slider"){				
				this.sinit();			
				this.move();
			}			
			this.close()			
		},
		methods: {
			sinit(){
				let query=uni.createSelectorQuery();
				let view = query.select(".text-box");
				view.fields({
						size: true,
						scrollOffset: true
					}, data => {						
						this.textwidth=data.width;
				}).exec();
				let box=query.select(".show-box");
				box.fields({
						size: true,
						scrollOffset: true
					}, data => {
						// console.log("得到节点信息" + JSON.stringify(data));											
						this.boxWidth=data.width;
				}).exec();
			},
			move(){				
				this.sw=this.boxWidth;											
				//console.error('运行长度:'+this.textwidth)
				this.timer=setInterval(() =>{
					this.sw=this.sw-1;
					if(-this.sw-this.textwidth>0){
						//clearInterval(this.timer);
						this.sw=this.boxWidth
					}					
				},25)
			},
			show(){
				this.showNotice=true;
			},
			close(){
				if((this.timer || this.showType!='slider') && this.showTime!=''){
					setInterval(()=>{
						if(this.timer){
							clearInterval(this.timer);
						}	
						this.showNotice=false;
					},this.showTime)					
				}	
				this.$emit("close");
			},
			onItemClick(){
				this.$emit('click')
			}
		},		
	}
</script>

<style>
	.flex-row{
		display: flex;
		align-items: center;
	}
	.show-box{
		width:96%;
		overflow: hidden;
		padding:0 2%;
	}
	.text-box{
		font-size: 15px;
		white-space:nowrap;		
		line-height: 36upx;
		/* padding:20upx 0;		 */
	}
	.icon{
		padding-top:5upx;
		padding-right: 10upx;
	}
	.no-icon{
		flex: 1;
	}
	.show-info{
		overflow: hidden;
	}
	.scroll-box{
		width:94%;
		overflow: hidden;
		height:76upx;
		line-height: 76upx;
	}
	.round{
		border-radius: 50upx;
	}
	.text-box.text-rows{
		white-space:normal;
	}
</style>

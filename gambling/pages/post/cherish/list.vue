<template>
	<view class="listbox">
		<view v-for="(item,index) in data">
			<view class="title" v-if="item.name!=''">
				{{item.name}}
			</view>
			<view class="list">
				<template v-for="(items,indexs) in item.list" :key="indexs">
					<view v-for="(col,cols) in items.list" :key="cols"
						class="item box-center"
						:class="items.checked.includes(col.name)?'active':''"
						@click="onClick(col.name,index,indexs)">
						{{col.name}}
					</view>
				</template>
	
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useTimeAgo
	} from '@/utils/utils.js'
	export default {
		emits:["onClick"],
		props: {
			data:{
				type:Object,
				default:{}
			},
			listsel: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				
			};
		},
		onLoad() {

		},
		mounted() {
			
		},
		methods: {
			onClick(name,index,indexs){
				this.$emit("onClick",name,index,indexs)
			}
		},
	}
</script>




<style lang="scss" scoped>
	.listbox{
		.title {
			margin-left: 20rpx;
			margin-top: 30rpx;
			font-size: 25rpx;
			color: rgb(0, 0, 0);
		}
	}
	.list {
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(5, 1fr);
		padding: 15rpx;
	
	
	
		.item {
			width: 100%;
			height: 60rpx;
			border: 2rpx solid rgb(204, 204, 204);
			border-radius: 6rpx;
			font-size: 25rpx;
	
			&.active {
				color: #fff;
				background: rgb(245, 142, 3);
				border: 2rpx solid rgb(245, 142, 3);
			}
		}
	}
	@media (min-width: 600px){
		.listbox{
			.title {
				margin-left: 10px;
				margin-top: 15px;
				font-size: 17px;
			}
		}
		.list {
			display: grid;
			gap: 8px;
			padding: 8px;
		
		
			.item {
				height: 40px;
				border: 1px solid rgb(204, 204, 204);
				border-radius: 3px;
				font-size: 17px;
		
				&.active {
					border: 1px solid rgb(245, 142, 3);
				}
			}
		}
	}
</style>
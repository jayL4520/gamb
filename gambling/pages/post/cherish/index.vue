<template>
	<view class="container">
		<navbar title="心水推荐" class="navbar">
			<template v-slot:navleft>
				<view class="navbutton">
					<view class="backbutton" @click="$backOrHome">
						<uni-icons class="back" color="#fff" type="left" size="20" />
						<text class="">返回</text>
					</view>
				</view>
			</template>
			<template v-slot:navright>
				<view class="navrightbutton">
					<view class="button" @click="navigatorTo('/pages/lottery/colorimage_search/index?code='+code)">
						<uni-icons color="#fff" type="help" size="16" />
						<text>帮助</text>
					</view>
				</view>
			</template>
		</navbar>
		<view class="">
			<view class="topfixed" :style="{ top: titleHeight + 'px' }">
				<view class="toptypebox box-middle ">
					<scroll-view class="tmtbtoptypebox" scroll-x="true" style="white-space: nowrap; display: flex;"
						:show-scrollbar="false">
						<view class="typelist box-middle">
							<view v-for="(item,index) in categoryList" :key="index" class="type box-center"
								:class="{active:index==swiperCurrent}" @click="typeclick(index)" :id="'id' + index">
								{{item.name}}
								<view class="num" v-if="item.num>0">
									{{item.num}}
								</view>
							</view>
						</view>
					</scroll-view>

				</view>
			</view>
			<view class="">
				<view class="">
					<swiper indicator-color="rgba(255,255,255,0.6)" :current="swiperCurrent" @change="swiperChange"
						:style="'height:'+swiperHeight+'px'">
						<swiper-item item-id="swiper0">
							<scroll-view scroll-y="true" :show-scrollbar="false" class="scroll-view"
								:style="'height:'+swiperHeight+'px'">
								<view class="topfixedh"></view>
								<view class="tips">
									全部类型的心水均可发布，每期每种类型仅限发布一次，且发布后不可修改。
								</view>
								<view class="">
									<ball :ballobj="tmball" :listsel="tmballsel"
										@onClick="(e,max)=>ballselclick('tmballsel',e,max)"></ball>
									<view class="underline"></view>
									<list :data="tmdata"
										@onClick="(name,index,indexs)=>selclick('tmdata',name,index,indexs)"></list>
									<!-- <view class="list">
										<template v-for="(item,index) in tmdata">
											<view v-for="(items,indexs) in item.list" :key="indexs"
												class="item box-center"
												:class="item.checked.includes(items.name)?'active':''"
												@click="selclick('tmdata',items.name,index)">
												{{items.name}}
											</view>
										</template>

									</view> -->
								</view>
								<view class="bottomfixedh"></view>
							</scroll-view>
						</swiper-item>
						<swiper-item item-id="swiper1">
							<scroll-view scroll-y="true" :show-scrollbar="false" class="scroll-view"
								:style="'height:'+swiperHeight+'px'">
								<view class="topfixedh"></view>
								<view class="tips">
									全部类型的心水均可发布，每期每种类型仅限发布一次，且发布后不可修改。
								</view>
								<view class="">
									<ball :ballobj="zmball" :listsel="zmballsel"
										@onClick="(e,max)=>ballselclick('zmballsel',e,max)"></ball>
									<view class="underline"></view>
									<list :data="zmdata"
										@onClick="(name,index,indexs)=>selclick('zmdata',name,index,indexs)"></list>
								</view>
								<view class="bottomfixedh"></view>
							</scroll-view>
						</swiper-item>
						<swiper-item item-id="swiper2">
							<scroll-view scroll-y="true" :show-scrollbar="false" class="scroll-view"
								:style="'height:'+swiperHeight+'px'">
								<view class="topfixedh"></view>
								<view class="tips">
									全部类型的心水均可发布，每期每种类型仅限发布一次，且发布后不可修改。
								</view>
								<list :data="tmyldata"
									@onClick="(name,index,indexs)=>selclick('tmyldata',name,index,indexs)"></list>
								<view class="bottomfixedh"></view>
							</scroll-view>
						</swiper-item>
						<swiper-item item-id="swiper3">
							<scroll-view scroll-y="true" :show-scrollbar="false" class="scroll-view"
								:style="'height:'+swiperHeight+'px'">
								<view class="topfixedh"></view>
								<view class="tips">
									全部类型的心水均可发布，每期每种类型仅限发布一次，且发布后不可修改。
								</view>
								<view class="">
									<list :data="twdata"
										@onClick="(name,index,indexs)=>selclick('twdata',name,index,indexs)"></list>
								</view>
								<view class="bottomfixedh"></view>
							</scroll-view>
						</swiper-item>
						<swiper-item item-id="swiper4">
							<scroll-view scroll-y="true" :show-scrollbar="false" class="scroll-view"
								:style="'height:'+swiperHeight+'px'">
								<view class="topfixedh"></view>
								<view class="tips">
									全部类型的心水均可发布，每期每种类型仅限发布一次，且发布后不可修改。
								</view>
								<view class="">
									<ball :ballobj="bzball" :listsel="bzballsel"
										@onClick="(e,max)=>ballselclick('bzballsel',e,max)"></ball>
								</view>
								<view class="bottomfixedh"></view>
							</scroll-view>
						</swiper-item>
						<swiper-item item-id="swiper5">
							<scroll-view scroll-y="true" :show-scrollbar="false" class="scroll-view"
								:style="'height:'+swiperHeight+'px'">
								<view class="topfixedh"></view>
								<view class="tips">
									全部类型的心水均可发布，每期每种类型仅限发布一次，且发布后不可修改。
								</view>
								<view class="">
									<list :data="yxdata"
										@onClick="(name,index,indexs)=>selclick('yxdata',name,index,indexs)"></list>
								</view>
								<view class="bottomfixedh"></view>
							</scroll-view>
						</swiper-item>
						<swiper-item item-id="swiper6">
							<scroll-view scroll-y="true" :show-scrollbar="false" class="scroll-view"
								:style="'height:'+swiperHeight+'px'">
								<view class="topfixedh"></view>
								<view class="tips">
									全部类型的心水均可发布，每期每种类型仅限发布一次，且发布后不可修改。
								</view>
								<view class="">
									<list :data="txdata"
										@onClick="(name,index,indexs)=>selclick('txdata',name,index,indexs)"></list>
								</view>
								<view class="bottomfixedh"></view>
							</scroll-view>
						</swiper-item>

					</swiper>
				</view>
			</view>

			<view class="bottomfixed box-center">
				<button class="btn-primary btn">发布</button>
			</view>
		</view>

	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import ball from "./ball.vue"
	import list from "./list.vue"
	import {
		arrayToggle
	} from "@/utils/utils.js"

	export default {
		components: {
			navbar,
			ball,
			list,
		},
		data() {
			return {
				code: "",
				titleHeight: 0,
				windowWidth: 0,
				typeindex: 0,
				swiperHeight: 0,
				categoryList: [{
						name: "特码",
						num: 0,
					},
					{
						name: "正码",
						num: 0,
					},
					{
						name: "正码1-6",
						num: 0,
					},
					{
						name: "平特尾",
						num: 0,
					},
					{
						name: "不中",
						num: 0,
					},
					{
						name: "一肖",
						num: 0,
					},
					{
						name: "特肖",
						num: 0,
					},
				],
				swiperCurrent: 0,
				tmball: {
					max: 20,
					list: [{
							"hm": "01",
							"bose": "红",
						},
						{
							"hm": "02",
							"bose": "红",
						},
						{
							"hm": "03",
							"bose": "蓝",
						},
						{
							"hm": "04",
							"bose": "蓝",
						},
						{
							"hm": "05",
							"bose": "绿",
						},
						{
							"hm": "06",
							"bose": "绿",
						},
						{
							"hm": "07",
							"bose": "红",
						},
						{
							"hm": "08",
							"bose": "红",
						},
						{
							"hm": "09",
							"bose": "蓝",
						},
						{
							"hm": "10",
							"bose": "蓝",
						},
						{
							"hm": "11",
							"bose": "绿",
						},
						{
							"hm": "12",
							"bose": "红",
						},
						{
							"hm": "13",
							"bose": "红",
						},
						{
							"hm": "14",
							"bose": "蓝",
						},
						{
							"hm": "15",
							"bose": "蓝",
						},
						{
							"hm": "16",
							"bose": "绿",
						},
						{
							"hm": "17",
							"bose": "绿",
						},
						{
							"hm": "18",
							"bose": "红",
						},
						{
							"hm": "19",
							"bose": "红",
						},
						{
							"hm": "20",
							"bose": "蓝",
						},
						{
							"hm": "21",
							"bose": "绿",
						},
						{
							"hm": "22",
							"bose": "绿",
						},
						{
							"hm": "23",
							"bose": "红",
						},
						{
							"hm": "24",
							"bose": "红",
						},
						{
							"hm": "25",
							"bose": "蓝",
						},
						{
							"hm": "26",
							"bose": "蓝",
						},
						{
							"hm": "27",
							"bose": "绿",
						},
						{
							"hm": "28",
							"bose": "绿",
						},
						{
							"hm": "29",
							"bose": "红",
						},
						{
							"hm": "30",
							"bose": "红",
						},
						{
							"hm": "31",
							"bose": "蓝",
						},
						{
							"hm": "32",
							"bose": "绿",
						},
						{
							"hm": "33",
							"bose": "绿",
						},
						{
							"hm": "34",
							"bose": "红",
						},
						{
							"hm": "35",
							"bose": "红",
						},
						{
							"hm": "36",
							"bose": "蓝",
						},
						{
							"hm": "37",
							"bose": "蓝",
						},
						{
							"hm": "38",
							"bose": "绿",
						},
						{
							"hm": "39",
							"bose": "绿",
						},
						{
							"hm": "40",
							"bose": "红",
						},
						{
							"hm": "41",
							"bose": "蓝",
						},
						{
							"hm": "42",
							"bose": "蓝",
						},
						{
							"hm": "43",
							"bose": "绿",
						},
						{
							"hm": "44",
							"bose": "绿",
						},
						{
							"hm": "45",
							"bose": "红",
						},
						{
							"hm": "46",
							"bose": "红",
						},
						{
							"hm": "47",
							"bose": "蓝",
						},
						{
							"hm": "48",
							"bose": "蓝",
						},
						{
							"hm": "49",
							"bose": "绿",
						},

					]
				},
				tmdata: [{
					name: "",
					list: [{
							list: [{
									name: "1-10",
								},
								{
									name: "11-20",
								},
								{
									name: "21-30",
								},
								{
									name: "31-40",
								},
								{
									name: "41-49",
								},
							],
							max: 2,
							checked: [],
							tips: "号码段",
						},
						{
							list: [{
									name: "大",
								},
								{
									name: "小",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "单",
								},
								{
									name: "双",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "合单",
								},
								{
									name: "合双",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "家禽",
								},
								{
									name: "野兽",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "尾大",
								},
								{
									name: "尾小",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "红波",
								},
								{
									name: "绿波",
								},
								{
									name: "蓝波",
								},
							],
							max: 2,
							checked: [],
							tips: "",
						},

					]
				}],
				tmballsel: [],

				zmball: {
					max: 20,
					list: [{
							"hm": "01",
							"bose": "红",
						},
						{
							"hm": "02",
							"bose": "红",
						},
						{
							"hm": "03",
							"bose": "蓝",
						},
						{
							"hm": "04",
							"bose": "蓝",
						},
						{
							"hm": "05",
							"bose": "绿",
						},
						{
							"hm": "06",
							"bose": "绿",
						},
						{
							"hm": "07",
							"bose": "红",
						},
						{
							"hm": "08",
							"bose": "红",
						},
						{
							"hm": "09",
							"bose": "蓝",
						},
						{
							"hm": "10",
							"bose": "蓝",
						},
						{
							"hm": "11",
							"bose": "绿",
						},
						{
							"hm": "12",
							"bose": "红",
						},
						{
							"hm": "13",
							"bose": "红",
						},
						{
							"hm": "14",
							"bose": "蓝",
						},
						{
							"hm": "15",
							"bose": "蓝",
						},
						{
							"hm": "16",
							"bose": "绿",
						},
						{
							"hm": "17",
							"bose": "绿",
						},
						{
							"hm": "18",
							"bose": "红",
						},
						{
							"hm": "19",
							"bose": "红",
						},
						{
							"hm": "20",
							"bose": "蓝",
						},
						{
							"hm": "21",
							"bose": "绿",
						},
						{
							"hm": "22",
							"bose": "绿",
						},
						{
							"hm": "23",
							"bose": "红",
						},
						{
							"hm": "24",
							"bose": "红",
						},
						{
							"hm": "25",
							"bose": "蓝",
						},
						{
							"hm": "26",
							"bose": "蓝",
						},
						{
							"hm": "27",
							"bose": "绿",
						},
						{
							"hm": "28",
							"bose": "绿",
						},
						{
							"hm": "29",
							"bose": "红",
						},
						{
							"hm": "30",
							"bose": "红",
						},
						{
							"hm": "31",
							"bose": "蓝",
						},
						{
							"hm": "32",
							"bose": "绿",
						},
						{
							"hm": "33",
							"bose": "绿",
						},
						{
							"hm": "34",
							"bose": "红",
						},
						{
							"hm": "35",
							"bose": "红",
						},
						{
							"hm": "36",
							"bose": "蓝",
						},
						{
							"hm": "37",
							"bose": "蓝",
						},
						{
							"hm": "38",
							"bose": "绿",
						},
						{
							"hm": "39",
							"bose": "绿",
						},
						{
							"hm": "40",
							"bose": "红",
						},
						{
							"hm": "41",
							"bose": "蓝",
						},
						{
							"hm": "42",
							"bose": "蓝",
						},
						{
							"hm": "43",
							"bose": "绿",
						},
						{
							"hm": "44",
							"bose": "绿",
						},
						{
							"hm": "45",
							"bose": "红",
						},
						{
							"hm": "46",
							"bose": "红",
						},
						{
							"hm": "47",
							"bose": "蓝",
						},
						{
							"hm": "48",
							"bose": "蓝",
						},
						{
							"hm": "49",
							"bose": "绿",
						},

					]
				},
				zmballsel: [],
				zmdata: [{
					name: "",
					list: [{
							list: [{
									name: "总单",
								},
								{
									name: "总双",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "总大",
								},
								{
									name: "总小",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "总尾大",
								},
								{
									name: "总尾小",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},
						{
							list: [{
									name: "龙",
								},
								{
									name: "虎",
								},
							],
							max: 1,
							checked: [],
							tips: "",
						},

					]
				}],

				tmyldata: [{
						name: "正码一",
						list: [{
								list: [{
										name: "大",
									},
									{
										name: "小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "单",
									},
									{
										name: "双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "合单",
									},
									{
										name: "合双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "红波",
									},
									{
										name: "绿波",
									},
									{
										name: "蓝波",
									},
								],
								max: 2,
								checked: [],
								tips: "",
							}, {
								list: [{
										name: "尾大",
									},
									{
										name: "尾小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							}
						]
					},
					{
						name: "正码二",
						list: [{
								list: [{
										name: "大",
									},
									{
										name: "小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "单",
									},
									{
										name: "双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "合单",
									},
									{
										name: "合双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "红波",
									},
									{
										name: "绿波",
									},
									{
										name: "蓝波",
									},
								],
								max: 2,
								checked: [],
								tips: "",
							}, {
								list: [{
										name: "尾大",
									},
									{
										name: "尾小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							}
						]
					},
					{
						name: "正码三",
						list: [{
								list: [{
										name: "大",
									},
									{
										name: "小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "单",
									},
									{
										name: "双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "合单",
									},
									{
										name: "合双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "红波",
									},
									{
										name: "绿波",
									},
									{
										name: "蓝波",
									},
								],
								max: 2,
								checked: [],
								tips: "",
							}, {
								list: [{
										name: "尾大",
									},
									{
										name: "尾小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							}
						]
					},
					{
						name: "正码四",
						list: [{
								list: [{
										name: "大",
									},
									{
										name: "小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "单",
									},
									{
										name: "双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "合单",
									},
									{
										name: "合双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "红波",
									},
									{
										name: "绿波",
									},
									{
										name: "蓝波",
									},
								],
								max: 2,
								checked: [],
								tips: "",
							}, {
								list: [{
										name: "尾大",
									},
									{
										name: "尾小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							}
						]
					},
					{
						name: "正码五",
						list: [{
								list: [{
										name: "大",
									},
									{
										name: "小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "单",
									},
									{
										name: "双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "合单",
									},
									{
										name: "合双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "红波",
									},
									{
										name: "绿波",
									},
									{
										name: "蓝波",
									},
								],
								max: 2,
								checked: [],
								tips: "",
							}, {
								list: [{
										name: "尾大",
									},
									{
										name: "尾小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							}
						]
					},

					{
						name: "正码六",
						list: [{
								list: [{
										name: "大",
									},
									{
										name: "小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "单",
									},
									{
										name: "双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "合单",
									},
									{
										name: "合双",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							},
							{
								list: [{
										name: "红波",
									},
									{
										name: "绿波",
									},
									{
										name: "蓝波",
									},
								],
								max: 2,
								checked: [],
								tips: "",
							}, {
								list: [{
										name: "尾大",
									},
									{
										name: "尾小",
									},
								],
								max: 1,
								checked: [],
								tips: "",
							}
						]
					},



				],

				twdata: [{
					name: "",
					list: [{
						list: [{
								name: "0尾",
							},
							{
								name: "1尾",
							},
							{
								name: "2尾",
							},
							{
								name: "3尾",
							},
							{
								name: "4尾",
							},
							{
								name: "5尾",
							},
							{
								name: "6尾",
							},
							{
								name: "7尾",
							},
							{
								name: "8尾",
							},
							{
								name: "9尾",
							},
						],
						max: 3,
						checked: [],
						tips: "",
					}, ]
				}],

				bzball: {
					max: 10,
					list: [{
							"hm": "01",
							"bose": "红",
						},
						{
							"hm": "02",
							"bose": "红",
						},
						{
							"hm": "03",
							"bose": "蓝",
						},
						{
							"hm": "04",
							"bose": "蓝",
						},
						{
							"hm": "05",
							"bose": "绿",
						},
						{
							"hm": "06",
							"bose": "绿",
						},
						{
							"hm": "07",
							"bose": "红",
						},
						{
							"hm": "08",
							"bose": "红",
						},
						{
							"hm": "09",
							"bose": "蓝",
						},
						{
							"hm": "10",
							"bose": "蓝",
						},
						{
							"hm": "11",
							"bose": "绿",
						},
						{
							"hm": "12",
							"bose": "红",
						},
						{
							"hm": "13",
							"bose": "红",
						},
						{
							"hm": "14",
							"bose": "蓝",
						},
						{
							"hm": "15",
							"bose": "蓝",
						},
						{
							"hm": "16",
							"bose": "绿",
						},
						{
							"hm": "17",
							"bose": "绿",
						},
						{
							"hm": "18",
							"bose": "红",
						},
						{
							"hm": "19",
							"bose": "红",
						},
						{
							"hm": "20",
							"bose": "蓝",
						},
						{
							"hm": "21",
							"bose": "绿",
						},
						{
							"hm": "22",
							"bose": "绿",
						},
						{
							"hm": "23",
							"bose": "红",
						},
						{
							"hm": "24",
							"bose": "红",
						},
						{
							"hm": "25",
							"bose": "蓝",
						},
						{
							"hm": "26",
							"bose": "蓝",
						},
						{
							"hm": "27",
							"bose": "绿",
						},
						{
							"hm": "28",
							"bose": "绿",
						},
						{
							"hm": "29",
							"bose": "红",
						},
						{
							"hm": "30",
							"bose": "红",
						},
						{
							"hm": "31",
							"bose": "蓝",
						},
						{
							"hm": "32",
							"bose": "绿",
						},
						{
							"hm": "33",
							"bose": "绿",
						},
						{
							"hm": "34",
							"bose": "红",
						},
						{
							"hm": "35",
							"bose": "红",
						},
						{
							"hm": "36",
							"bose": "蓝",
						},
						{
							"hm": "37",
							"bose": "蓝",
						},
						{
							"hm": "38",
							"bose": "绿",
						},
						{
							"hm": "39",
							"bose": "绿",
						},
						{
							"hm": "40",
							"bose": "红",
						},
						{
							"hm": "41",
							"bose": "蓝",
						},
						{
							"hm": "42",
							"bose": "蓝",
						},
						{
							"hm": "43",
							"bose": "绿",
						},
						{
							"hm": "44",
							"bose": "绿",
						},
						{
							"hm": "45",
							"bose": "红",
						},
						{
							"hm": "46",
							"bose": "红",
						},
						{
							"hm": "47",
							"bose": "蓝",
						},
						{
							"hm": "48",
							"bose": "蓝",
						},
						{
							"hm": "49",
							"bose": "绿",
						},

					]
				},
				bzballsel: [],

				yxdata: [{
					name: "",
					list: [{
						list: [{
								name: "鼠",
							},
							{
								name: "牛",
							},
							{
								name: "虎",
							},
							{
								name: "兔",
							},
							{
								name: "龙",
							},
							{
								name: "蛇",
							},
							{
								name: "马",
							},
							{
								name: "羊",
							},
							{
								name: "猴",
							},
							{
								name: "鸡",
							},
							{
								name: "狗",
							},
							{
								name: "猪",
							},

						],
						max: 5,
						checked: [],
						tips: "",
					}, ]
				}],

				txdata: [{
					name: "",
					list: [{
						list: [{
								name: "鼠",
							},
							{
								name: "牛",
							},
							{
								name: "虎",
							},
							{
								name: "兔",
							},
							{
								name: "龙",
							},
							{
								name: "蛇",
							},
							{
								name: "马",
							},
							{
								name: "羊",
							},
							{
								name: "猴",
							},
							{
								name: "鸡",
							},
							{
								name: "狗",
							},
							{
								name: "猪",
							},

						],
						max: 9,
						checked: [],
						tips: "",
					}, ]
				}],


			}
		},
		onLoad(options) {
			var that = this;
			let systemInfo = uni.getSystemInfoSync();
			let statusBarHeight = systemInfo.statusBarHeight;
			that.windowWidth = systemInfo.windowWidth;
			that.titleHeight = statusBarHeight + 44
			that.swiperHeight = systemInfo.windowHeight - 44
			if (options.code) {
				this.code = options.code
			}
		},

		methods: {
			selclick(prop, e, i, j) {
				let {
					max,
					checked,
					tips
				} = this[prop][i].list[j]
				let arr = []
				if (max > 1) {
					let idx = this[prop][i].list[j].checked.indexOf(e)
					if (idx == -1 && checked.length == max) {
						return uni.showToast({
							title: `最多选择${max}个${tips}`,
							icon: "none"
						})
					}
					if (checked.length < max) {
						arr = arrayToggle(this[prop][i].list[j].checked, e)
					} else {
						if (idx != -1) {
							arr = arrayToggle(this[prop][i].list[j].checked, e)
						} else {
							return uni.showToast({
								title: `最多选择${max}个${tips}`,
								icon: "none"
							})
						}
					}
				} else {
					if (e == checked[0]) {
						arr = []
					} else {
						arr = [e]
					}
				}
				this[prop][i].list[j]['checked'] = arr
				this.$set(this, prop, this[prop])
				this.categoryNum()
			},
			categoryNum() {
				let swiperCurrent = this.swiperCurrent
				let categoryData = this.categoryList[swiperCurrent]
				if (swiperCurrent == 0) {
					let num = 0
					if (this.tmballsel.length > 0) {
						num = num + 1
					}
					this.tmdata[0].list.forEach(x => {
						if (x.checked.length > 0) {
							num += 1
						}
					})
					this.categoryList[swiperCurrent].num = num
				} else if (swiperCurrent == 1) {
					let num = 0
					if (this.zmballsel.length > 0) {
						num = num + 1
					}
					this.zmdata[0].list.forEach(x => {
						if (x.checked.length > 0) {
							num += 1
						}
					})
					this.categoryList[swiperCurrent].num = num
				} else if (swiperCurrent == 2) {
					let num = 0
					this.tmyldata.forEach(x => {
						let checkedlist = x.list.filter(item => item.checked.length > 0)
						if (checkedlist.length > 0) {
							num += 1
						}
					})
					this.categoryList[swiperCurrent].num = num
				} else if (swiperCurrent == 3) {
					let num = 0
					this.twdata[0].list.forEach(x => {
						if (x.checked.length > 0) {
							num += 1
						}
					})
					this.categoryList[swiperCurrent].num = num
				} else if (swiperCurrent == 4) {
					let num = 0
					if (this.bzballsel.length > 0) {
						num = num + 1
					}
					this.categoryList[swiperCurrent].num = num
				} else if (swiperCurrent == 5) {
					let num = 0
					this.yxdata[0].list.forEach(x => {
						if (x.checked.length > 0) {
							num += 1
						}
					})
					this.categoryList[swiperCurrent].num = num
				} else if (swiperCurrent == 6) {
					let num = 0
					this.txdata[0].list.forEach(x => {
						if (x.checked.length > 0) {
							num += 1
						}
					})
					this.categoryList[swiperCurrent].num = num
				}

			},
			ballselclick(prop, e, max) {
				console.log(prop, e, max, "prop, e, max");
				let idx = this[prop].indexOf(e)
				let checked = this[prop],
					arr = []
				if (idx == -1 && checked.length == max) {
					return uni.showToast({
						title: `最多选择${max}个号码`,
						icon: "none"
					})
				}
				if (checked.length < max) {
					arr = arrayToggle(this[prop], e)
				} else {
					if (idx != -1) {
						arr = arrayToggle(this[prop], e)
					} else {
						return uni.showToast({
							title: `最多选择${max}个号码`,
							icon: "none"
						})
					}
				}
				this.categoryNum()
			},
			typeclick(e) {
				this.swiperCurrent = e
			},
			swiperChange(e) {
				let {
					current,
					source,
				} = e.detail;
				if (source === 'autoplay' || source === 'touch') {
					this.swiperCurrent = current
				}
			},
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

		.navrightbutton {
			width: auto !important;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #fff;
			font-size: 12px;

			.button {
				cursor: pointer;
				width: 25px;
				margin: 0 3px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}


	.topfixedh {
		height: 100rpx;
	}

	.topfixed {
		position: fixed;
		left: 0;
		right: 0;
		background: #fff;
		width: 100%;
		z-index: 998;
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.toptypebox {
		width: 100%;
		height: 100rpx;
		background: #fff;
		border-bottom: 10rpx solid rgb(238, 238, 238);

		.tmtbtoptypebox {
			width: 100%;
			height: 100%;
			padding-right: 10rpx;
		}

		.typelist {
			height: 100%;
		}

		.type {
			position: relative;
			margin: 0 10rpx;
			padding: 6rpx 14rpx;
			color: rgb(51, 51, 51);
			font-size: 28rpx;
			border-radius: 60rpx;

			.num {
				position: absolute;
				right: 0rpx;
				top: -5rpx;
				width: 18rpx;
				height: 18rpx;
				border-radius: 50%;
				background-color: rgb(197, 50, 44);
				font-size: 15rpx;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			&.active {
				color: #fff;
				background: rgb(245, 142, 3);
			}
		}
	}

	.tips {
		padding: 20rpx 30rpx 0;
		font-size: 20rpx;
		color: rgb(102, 102, 102);
	}



	// .tmyldata {
	// 	.title {
	// 		margin-left: 20rpx;
	// 		margin-top: 30rpx;
	// 		font-size: 25rpx;
	// 		color: rgb(0, 0, 0);
	// 	}
	// }

	// .list {
	// 	display: grid;
	// 	gap: 15rpx;
	// 	grid-template-columns: repeat(5, 1fr);
	// 	padding: 15rpx;



	// 	.item {
	// 		width: 100%;
	// 		height: 60rpx;
	// 		border: 2rpx solid rgb(204, 204, 204);
	// 		border-radius: 6rpx;
	// 		font-size: 25rpx;

	// 		&.active {
	// 			color: #fff;
	// 			background: rgb(245, 142, 3);
	// 			border: 2rpx solid rgb(245, 142, 3);
	// 		}
	// 	}
	// }

	.underline {
		width: 100%;
		height: 10rpx;
		background: rgb(238, 238, 238);
	}

	.bottomfixedh {
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
	}

	.bottomfixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		background: #fff;
		width: 100%;
		max-width: var(--max-width);
		height: calc(100rpx + constant(safe-area-inset-bottom));
		height: calc(100rpx + env(safe-area-inset-bottom));
		padding: 10rpx 30rpx;
		border-top: 10rpx solid rgb(238, 238, 238);
		color: #666666;
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
		margin: 0 auto;

		.btn {
			width: 75%;
			height: 50rpx;
			font-size: 18rpx;
		}
	}

	@media (min-width: 600px) {

		.topfixedh {
			height: 50px;
		}

		.toptypebox {
			height: 50px;
			border-bottom: 5px solid rgb(238, 238, 238);

			.tmtbtoptypebox {
				padding-right: 10rpx;
			}


			.type {
				position: relative;
				margin: 0 5px;
				padding: 3px 7px;
				font-size: 17px;
				border-radius: 30px;

				.num {
					position: absolute;
					right: 0rpx;
					top: -3px;
					width: 12px;
					height: 12px;
					font-size: 10px;
				}
			}
		}

		.tips {
			padding: 10px 15px 0;
			font-size: 15px;
		}


		// .list {
		// 	display: grid;
		// 	gap: 8px;
		// 	padding: 8px;


		// 	.item {
		// 		height: 40rpx;
		// 		border: 1px solid rgb(204, 204, 204);
		// 		border-radius: 3px;
		// 		font-size: 17px;

		// 		&.active {
		// 			border: 1px solid rgb(245, 142, 3);
		// 		}
		// 	}
		// }

		// .tmyldata {
		// 	.title {
		// 		margin-left: 10px;
		// 		margin-top: 15px;
		// 		font-size: 17px;
		// 	}
		// }


	}

	.underline {
		height: 5px;
	}

	.bottomfixedh {
		height: calc(70px + constant(safe-area-inset-bottom));
		height: calc(70px + env(safe-area-inset-bottom));
	}

	.bottomfixed {
		height: calc(70px + constant(safe-area-inset-bottom));
		height: calc(70px + env(safe-area-inset-bottom));
		padding: 5px 15px;
		border-top: 5px solid rgb(238, 238, 238);

		.btn {
			height: 40px;
			font-size: 14px;
		}
	}
</style>
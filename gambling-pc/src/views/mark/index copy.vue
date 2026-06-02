<template>
  <div class="w-full">
    <div
      class="bg-white flex rounded-[1rem] h-[11rem] my-[1rem] items-center py-[1.5rem]"
    >

      <div class="px-[1.5rem] w-[50%] h-full">
        <div class="flex items-end">
          <div class="text-black font-bold text-[1.2rem]/[2rem] mr-[10px]">
            {{ codeToLottery(winresultsinfo.lotteryType) }}
          </div>
          <div class="text-[0.8rem]/[1.6rem] text-[#666]">
            第<span class="text-[red] px-[5px]"
              >{{ winresultsinfo.year }}{{ winresultsinfo.period }}</span
            >期开奖<span class="text-[#999999] ml-[3px]"
              >({{ formatTimestamp1(winresultsinfo.date) }})</span
            >
          </div>
        </div>
       
        <ul class="flex mt-[1rem]" v-if=" winresultsinfo.ball">
          <transition-group name="fade" class="flex"   tag="div">
            <li
              class="flex flex-col items-center mr-[1.2rem]"
              v-for="(item, index) in '正准备开奖'.split('')"
              :key="index"
              :class="{ 'animated-ball':  winresultsinfo.ball[index]?.animated }" 
            ><!-- 动态绑定动画类 -->
              <div
                class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
                :class="`${
                isOpen('openTime')&&(winresultsinfo.ball[index]?.sb)?'bg-gray-400':
               winresultsinfo.ball[index]?.sb == 'red'
                    ? 'bg-rose-600'
                    : winresultsinfo.ball[index]?.sb == 'blue'
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                  
                }`"
              >
                {{  winresultsinfo.ball[index]?.num|| item }}
              </div>
              <div class="text-[gray] text-[1rem] mt-[0.5rem]">{{  winresultsinfo.ball[index]?.sx }}</div>
            </li>
          </transition-group>
     
        <!-- </ul>
        <ul class="flex mt-[1rem]"> -->
          <li class="text-[2rem]">+</li>
          <li class="flex flex-col items-center ml-[0.8rem]">
            <div
              class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
              :class="`${
               showLive&&(!winresultsinfo.lastBall?.num|| winresultsinfo.lastBall?.sb=='')?'bg-gray-400': 
                winresultsinfo.lastBall?.sb == 'red'
                  ? 'bg-rose-600'
                  : winresultsinfo.lastBall?.sb == 'blue'
                  ? 'bg-blue-500':
                'bg-green-500'
              }`"
            >
              {{ winresultsinfo.lastBall?.num || '中' }}
            </div>
            <div class="text-[gray] text-[1rem] mt-[0.5rem]">
              {{ winresultsinfo.lastBall?.sx }}
            </div>
          </li>
        </ul>
      </div>
      <div class="w-[1px] h-[5rem] bg-slate-200"></div>
      <div class="w-[50%] px-[1.5rem] h-full flex justify-between items-center ">
        <div v-if="!isOpen()">
          <div class="text-[0.8rem]/[1.6rem] text-[#666]">
            距<span class="text-[red] px-[5px]"
              >{{ nextwinresultst.year }}{{ nextwinresultst.period }}</span
            >期开奖<span class="text-[#999999] ml-[3px]"
              >({{ formatTimestamp(nextwinresultst.date) }})</span
            >
          </div>
          <div class="flex items-center text-[#666] mt-[10px]">
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mr-[5px]"
            >
              {{ countdownTime[0] || "00" }}
            </div>
            时
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px]"
            >
              {{ countdownTime[1] || "00" }}
            </div>
            分
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px]"
            >
              {{ countdownTime[2] || "00" }}
            </div>
            秒
          </div>
        </div>
        <div v-else-if="isOpen()"
              class="w-[8.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px] margR20"
            >
              {{'开奖中...' }}
            </div>
        <div class="line margt20" id="startVideo" style="position:relative;cursor:pointer;"  @click.prevent="playback({...nextwinresultst,liveUrl,})">

				<img :src="logo" width="185" height="122">
				<img src="@/assets/d01.png" style="height:63px;width:63px;border-radius:50%;position:absolute;top:40px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);" width="185" height="122" />
			</div>
      </div>
    </div>

    <!-- 开奖记录 -->
    <div class="bg-white max-w-[1250px] mx-auto mb-[2rem]">
      <div class="flex justify-between items-center px-[1rem] py-[0.8rem]">
        <span class="font-bold text-[1.1rem]">开奖记录</span>
        <div class="flex items-center text-[1rem] text-[#555]">
          <span class="">日期：</span>
          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年份"
            :disabled-date="disabledDate"
            :editable="false"
            :clearable="false"
            @change="onYearChange"
          />
        </div>
      </div>
      <div class="pb-[10px]">
        <el-table
          :data="resultslist"
          style="width: 100%"
          v-loading="tableLoading"
          stripe
          border
          class="text-[1rem]"
          ref="tableRef"
        >
          <el-table-column label="时间" align="center" width="200">
            <template #default="scope">
              <div class="text-center">
                {{ formatTimestamp(scope.row.date) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="期数" align="center" width="100">
            <template #default="scope">
              <div class="text-center">
                {{ scope.row.year + scope.row.period }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="号码" align="center" min-width="350">
            <template #default="scope">
              <ul class="flex text-[1rem] justify-center">
                <li
                  class="flex flex-col items-center mr-[5px]"
                  v-for="(item, index) in scope.row.ball"
                  :key="index"
                >
                  <div
                    class="text-white w-[2rem] h-[2rem] flex items-center justify-center rounded-full"
                    :class="`${
                      item.sb == 'red'
                        ? 'bg-rose-600'
                        : item.sb == 'blue'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`"
                  >
                    {{ item.num }}
                  </div>
                  <div class="text-[gray] mt-[5px]">
                    {{ item.sx }}
                  </div>
                </li>
                <li class="text-[1.5em]">+</li>
                <li class="flex flex-col items-center ml-[0.8rem]">
                  <div
                    class="text-white w-[2rem] h-[2rem] flex items-center justify-center rounded-full"
                    :class="`${
                      scope.row.lastBall?.sb == 'red'
                        ? 'bg-rose-600'
                        : scope.row.lastBall?.sb == 'blue'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`"
                  >
                    {{ scope.row.lastBall?.num }}
                  </div>
                  <div class="text-[gray] mt-[5px]">
                    {{ scope.row.lastBall?.sx }}
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="尾数" align="center">
            <el-table-column label="大小" align="center" width="80">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.lastNum >= 25 ? "大" : "小" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单双" align="center" width="80">
              <template #default="scope">
                <div class="text-center">
                  {{ oddEven(scope.row.lastNum) }}
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="总和" align="center">
            <el-table-column label="数量" align="center" width="80">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.total }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="大小" align="center" width="80">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.total >= 175 ? "大" : "小" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单双" align="center" width="80">
              <template #default="scope">
                <div class="text-center">
                  {{ oddEven(scope.row.total) }}
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="视频"
            align="center"
            width="100"
          >
            <template #default="scope">
              <el-button
                v-if="
                  scope.row.videoUrl &&
                  scope.row.videoUrl != '' &&
                  categoryId != 'HK'
                "
                type="primary"
                size="small"
                @click.prevent="playback(scope.row)"
              >
                回放
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end my-[10px] px-[10px]">
          <el-pagination
            :page-size="pageSize"
            :current-page="pageNum"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="playbackinfo.dialogVisibleTitle"
      max-width="50rem"
    >
      <div class="w-full h-auto shadow-lg min-h-[25rem]">
        <!-- controlsList="nodownload nofullscreen noremoteplayback disablePictureInPicture" 隐藏全屏... -->
        <video
          :src="playbackinfo.videoUrl"
          class="w-full h-auto shadow-lg min-h-[25rem]"
          controls
          autoplay
          preload="metadata"
          v-if="!playbackinfo.liveUrl"
        
        >
          您的浏览器不支持视频播放。
        </video>
          <iframe class="w-full h-auto shadow-lg  min-h-[25rem]" v-else-if="showLive" :src="playbackinfo.liveUrl" style="height:100%;width:100%;border:none;" scrolling="no"></iframe>
        <!-- <iframe v-else style="height:100%;width:100%;border:none;" scrolling="no" src="https://135ka.com/index.php/index/lhc_video.html?t=xal"></iframe> -->
        <div v-else style="width:100%;height:565px;background-color:black;position:relative;" id="live_div">
			<div style="position:absolute;top:40%;width:100%;height:45px;line-height:45px;color:white;text-align:center;font-size:18px;" id="live_tip">
				<span class="unicode_key"> {{codeToLottery(winresultsinfo.lotteryType)}}</span><input type="hidden" :value="codeToLottery(winresultsinfo.lotteryType)"><span class="unicode_key">搅珠</span><input type="hidden" value="搅珠">直播时间为<span class="unicode_key">开奖</span><input type="hidden" value="开奖">日 <span style="color:red;">{{indMenu?.openTime}}</span> (<span class="unicode_key">北京</span><input type="hidden" value="北京">时间)
			</div>
		</div>
      
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getNewDataApi, datalistApi } from "@/api/index";
import {
  codeToLottery,
  formatTimestamp,
  formatTimestamp1,
  oddEven,
} from "@/utils/utils";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import  settingMer  from "@/utils/settingMer";
const route = useRoute();
const categoryId = ref(route.params.id);
const year = ref(new Date(new Date().getFullYear(), 0));
const nowyear = ref(new Date(new Date().getFullYear(), 0));
const nextwinresultst = ref({});
const winresultsinfo = ref({ball:[]});
const loading = ref(false);
const tableLoading = ref(false);
console.log("sdddd",settingMer)
const liveUrl = computed(()=>
// http://202.146.223.40:8123
`http://202.146.223.40:8123/index.html?t=${new Date().getTime()}&url=${indMenu.value?.liveUrl}`
)
const segmentedProps = {
  label: "name",
  value: "code",
};
const timer = ref(null);
const countdownTime = ref([]);
const pageNum = ref(1);
const pageSize = ref(20);
const total = ref(0);
const resultslist = ref([]);
const tableRef = ref();
const dialogVisible = ref(false);
const playbackinfo = ref({});
let isRef = ref(false)
const indMenu = computed(() => {
  return settingMer.menuList.find((e) => e.code === categoryId.value) || {};
});
const hasNewIndex = ref(-1); // 记录最新号码的索引
const getNewData = async () => {
  // indMenu.value.data?indMenu.value.data
  loading.value = true;
  const res = await getNewDataApi({
    year: year.value.getFullYear(),
    lotteryType: categoryId.value,
  });
  loading.value = false;
  if (res.code === 200) {
    let list = res.data;
    list.forEach((x) => {
      if (x.status == 0) {
        nextwinresultst.value = x;
        countdownTimeStr(nextwinresultst.value.date);
      } else if (x.status == 1) {
        let numberarr = x.numbers.split(",");
        let sbarr = x.sb.split(",");
        let sxarr = x.sx.split(",");
        let ball = [];
        console.log("sdddd",numberarr,sbarr,sxarr)
        hasNewIndex.value = numberarr.length-2;
        
        numberarr.forEach((j, i) => {
         // 记录最新号码的索引
          ball.push({
            num: j,
            sb: sbarr[i],
            sx: sxarr[i],
            animated: false, // 初始化动画标记为 false
          });
        });
        x.lastBall = ball.pop();
        x.ball = ball;
        winresultsinfo.value = x;

        // 触发动画
        if (showLive.value && hasNewIndex.value !== -1) {
          nextTick(() => {
            // winresultsinfo.value.ball.forEach((_, index) => {
                   console.log("sdddd", hasNewIndex.value,  winresultsinfo.value.ball)
              // setTimeout(() => {
              // winresultsinfo.value.ball[hasNewIndex.value].animated = true; // 按顺序触发动画
              // },  hasNewIndex.value*500); // 每个球延迟 500ms
            // });
          });
        }
      }
    });
  } else {
    if (timer) {
      clearInterval(timer);
    }
  }
};
function getImageUrl(name) {
  return new URL(`${name}`, import.meta.url).href
}
const logo = computed(()=>{
   let url
  if(winresultsinfo.value.lotteryType){
       url = getImageUrl(`../../assets/${winresultsinfo.value.lotteryType}.png`)
  }

  console.log("sd",url,winresultsinfo.value)
  return url 
})
const isOpen = (K='_openTime')=>{
  let open = false
  if(indMenu.value[K]){
    let timeArr = indMenu.value[K].split("-");
    if(timeArr.length==2){
      let start = timeArr[0].split(":");
      let end = timeArr[1].split(":");
      let now = new Date();
      let startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), start[0], start[1]);
      let endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), end[0], end[1]);
      open = now >= startTime && now <= endTime;
    }
  }
  return open
}
const showLive = computed(()=>{
  let isShow  = false
  // nextwinresultst.value.status = 1
  let t = new Date(nextwinresultst.value.date*1000).getTime() ;
  let lic = Date.now() - t;
  console.log("sd==",lic,new Date(t),winresultsinfo.value.status==1,nextwinresultst.value)
  let show = isOpen('openTime');  
  console.log("sd",nextwinresultst.value.date,show)

  isShow = show
    // setTimeout(()=>{
    //   isShow = false
    // },4000)
  
 return true
})
const getdatalist = async   () => {

  tableLoading.value = isRef.value;
  const res = await datalistApi({
    year: year.value.getFullYear(),
    lotteryType: categoryId.value,
    status: 1,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  });
  tableLoading.value = false;
  if (res.code === 200) {
    total.value = res.total;
    if (res.rows) {
      let list = [];
      res.rows.forEach((x) => {
        let numberarr = x.numbers.split(",");
        let lastNum = [...numberarr].pop();
        let sbarr = x.sb.split(",");
        let sxarr = x.sx.split(",");
        let wxarr = x.wx.split(",");
        let ball = [];
        let total = 0;
        numberarr.forEach((j, i) => {
          total += Number(j);
          ball.push({
            num: j,
            sb: sbarr[i],
            sx: sxarr[i],
            wx: wxarr[i],
          });
        });
        x.lastBall = ball.pop();
        x.ball = ball;
        x.lastNum = lastNum;
        x.total = total;
        x.videoUrl = x.videoUrl || (winresultsinfo.value.lotteryType=='MO'?"https://vod.cctywlkj.com/lottery/video/":"https://video2m6-qq.dldydn.com/" ) + x.year+'/2032/'+ x.year+x.period + ".mp4";
        list.push(x);
      });
      resultslist.value = list;
    }
  }
  tableRef.value.scrollTo({ top: 0 });
};

const segmentedChange = (Ref) => {
  getNewData();
  pageNum.value = 1;

  isRef.value = !!Ref
  if(!Ref){
     getdatalist();
   
  }

};

const handleCurrentChange = (val) => {
  pageNum.value = val;
  getdatalist();
};

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};

const onYearChange = (e) => {
  pageNum.value = 1;
  getdatalist();
};

//回放
const playback = (item) => {
  
  playbackinfo.value = {
    dialogVisibleTitle:
      codeToLottery(item.lotteryType) + "：第" + item.year + item.period + "期",
    videoUrl: item.videoUrl,
    liveUrl:item.liveUrl,
  };
  dialogVisible.value = true;
};

// 倒计时
const countdownTimeStr = (timestamp) => {
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    let now = Date.now();
    let diff = Math.max(0, timestamp * 1000 - now);
    const total = Math.floor(diff / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    countdownTime.value = [h, m, s];

    // 倒计时结束后刷新数据
    if (total <= 0) {
      clearInterval(timer.value);
      segmentedChange(1); // 刷新数据
    }
    // console.log("sd=====",isOpen())
    
  }, 1000);
};

// getNewData();
// getdatalist();
// 页面加载后执行动画
onMounted(() => {
   segmentedChange();
    setTimeout(() => {
       setInterval(()=>{
        segmentedChange(1); // 刷新数据
        
      },isOpen()?2000:60000)
    }, 1000);
  //   nextTick(() => {
  //   });
});
onUnmounted(() => clearInterval(timer.value));
</script>

<style scoped lang="scss">
.margt20{
  float: right;
    padding: 10px;
    border-left: 1px solid #f0f0f0;
}

.animated-ball {
  animation: fadeInScale 0.5s ease-out forwards;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

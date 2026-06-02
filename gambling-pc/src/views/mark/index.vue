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
     
        <ul class="flex mt-[1rem]" v-if="winresultsinfo.ball">
              
          <transition-group name="fade" class="flex items-center"   tag="div">
            <li
              class="flex flex-col items-center mr-[1.2rem]"
              v-for="(item, index) in '正在准备开奖'.split('')"
              :key="index"
              :class="{ 'animated-ball':  winresultsinfo.ball[index]?.animated }" 
            ><!-- 动态绑定动画类 -->

              <div
                class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
                :class="`${
               (isOpen('_openTime')&&(winresultsinfo.ball.length<7&&!winresultsinfo.ball[index].num))||(winresultsinfo.status==2&& isOpen('_openTime'))?'bg-gray-400':
               winresultsinfo.ball[index]?.sb == 'red'
                    ? 'bg-rose-600'
                    : winresultsinfo.ball[index]?.sb == 'blue'
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                  
                }`"
              >
     
                {{   isOpen('_openTime','')&&[2,1].includes(+winresultsinfo.status)?item:winresultsinfo.ball[index]?.num || item }}
              </div>
              <div  class="text-[gray] text-[1rem] mt-[0.5rem]">{{getZodiacsObj(winresultsinfo.date*1000)[+winresultsinfo.ball[index]?.num] ||'-' }}</div>
            </li>
          </transition-group>
     
        <!-- </ul>
        <ul class="flex mt-[1rem]"> -->
        
          <li class="text-[2rem]">+</li>
          <li class="flex flex-col items-center justify-center ml-[0.8rem]">
            <div
              class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
              :class="`${
               (isOpen('_openTime')&&[2,1].includes(+winresultsinfo.status))||(winresultsinfo.status==1&& isOpen('_openTime',winresultsinfo.lastBall?.num))?'bg-gray-400': 
                winresultsinfo.lastBall?.sb == 'red'
                  ? 'bg-rose-600'
                  : winresultsinfo.lastBall?.sb == 'blue'
                  ? 'bg-blue-500':
                'bg-green-500'
              }`"
            >
          
             {{  (isOpen('_openTime')&&[2,1].includes(+winresultsinfo.status))||(winresultsinfo.status==1&& isOpen('_openTime',winresultsinfo.lastBall?.num))?'中':winresultsinfo.lastBall?.num||'中'  }}
            </div>
            <div class="text-[gray] text-[1rem] mt-[0.5rem]">
              {{getZodiacsObj(winresultsinfo.date*1000)[+winresultsinfo.lastBall?.num] ||'-' }}
            </div>
          </li>
        </ul>
      </div>
      <div class="w-[1px] h-[5rem] bg-slate-200"></div>
      <div class="w-[50%] px-[1.5rem] h-full flex justify-between items-center ">
      
        <div v-if="isOpen('_openTime', winresultsinfo.lastBall?.num1)" 
              class="w-[8.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px] margR20"
            >
              {{'开奖中...' }}
            </div>
            <div v-else >
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
          <el-table-column label="时间" align="center" width="160">
            <template #default="scope">
              <div class="text-center">
                {{ formatTimestamp(scope.row.date) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="期数" align="center" width="90">
            <template #default="scope">
              <div class="text-center">
                {{ scope.row.year + scope.row.period }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="号码" align="center" width="240">
            <template #default="scope">
              <ul class="flex text-[1rem] justify-center">
                <li
                  class="flex flex-col items-center mr-[3px]"
                  v-for="(item, index) in scope.row.ball"
                  :key="index"
                >
                  <div
                    class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
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
                  <div class="text-[gray] mt-[2px]">
                    {{ getZodiacsObj(scope.row.date*1000)[+item.num] || '-'  }}
                  </div>
                </li>
                <li class="text-[1.5em]">+</li>
                <li class="flex flex-col items-center ml-[0.3rem]">
                  <div
                    class="text-white w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-full"
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
                  <div class="text-[gray] mt-[2px]">
                
                    {{ getZodiacsObj(scope.row.date*1000)[+scope.row.lastBall?.num] || '-' }}
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          
            <el-table-column label="生肖量" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
            
                  {{ sxliang([...scope.row.ball.map(e=>e.num), scope.row.lastBall?.num], getZodiacsObj(scope.row.date*1000)) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="尾数量" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  {{ weishuliang([...scope.row.ball.map(e=>e.num), scope.row.lastBall?.num]) }}
                </div>
              </template>
            </el-table-column>
        <el-table-column label="特码" align="center" >
     
      
              <!-- {{ getSpecial(scope.row.lastBall?.num) }} -->
         
           
             <el-table-column label="单双" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.lastBall?.num==49 ?'和' :oddEven(scope.row.lastBall?.num) }}
                </div>
              </template>
            </el-table-column>
          
            <el-table-column label="大小" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.lastBall?.num==49 ?'和' :isBig(scope.row.lastBall?.num) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="合单双" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
              
                  {{ scope.row.lastBall?.num==49 ?'和' :'合'+oddEven(weishuSum(scope.row.lastBall?.num)) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="合大小" align="center" width="70">
              <template #default="scope">
                <div class="text-center"> 
                  {{ scope.row.lastBall?.num==49 ?'和' :'合'+isBig(weishuSum(scope.row.lastBall?.num),7) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="尾大小" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  {{'尾'+scope.row.lastBall?.num==49 ?'和' : weiSize(scope.row.lastBall?.num) }}
                </div>
              </template>
            </el-table-column> 
           
          </el-table-column>

          <el-table-column label="总和" align="center">
            <el-table-column label="总分" align="center" width="70">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.total }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="大小" align="center" width="65">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.total >= 175 ? "大" : "小" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单双" align="center" width="55">
              <template #default="scope">
                <div class="text-center">
                  {{ oddEven(scope.row.total) }}
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
        
            label="视频"
            align="center"
            width="65"
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
                style="width: 45px;padding: 5px 2px;"
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
      max-width="896px"
    >

      <div class="w-full h-auto shadow-lg min-h-[565px]">
        <!-- controlsList="nodownload nofullscreen noremoteplayback disablePictureInPicture" 隐藏全屏... -->
        <video
          :src="playbackinfo.videoUrl"
          class="w-full h-auto shadow-lg min-h-[565px]"
          controls
          autoplay
          preload="metadata"
          v-if="!playbackinfo.liveUrl"
        
        >
          您的浏览器不支持视频播放。
        </video>
        <!-- <iframe data-v-98da589e="" width="746.6666666666666" height="420" src="/player/index.html?url=https://play8398.lianwin88.com/live/mosixmark.flv" frameborder="0" allow="autoplay" scrolling="no"></iframe> -->
          <iframe class="w-full h-auto shadow-lg  min-h-[565px]" v-else-if="showLive" :src="playbackinfo.liveUrl" style="height:100%;width:100%;border:none;" scrolling="no"></iframe>
        <!-- <iframe v-else style="height:100%;width:100%;border:none;" scrolling="no" src="https://135ka.com/index.php/index/lhc_video.html?t=xal"></iframe> -->
        <div v-else style="width:100%;height:565px;background-color:black;position:relative;" id="live_div">
			<div style="position:absolute;top:40%;width:100%;height:45px;line-height:45px;color:white;text-align:center;font-size:18px;" id="live_tip">
				<span class="unicode_key"> {{codeToLottery(winresultsinfo.lotteryType)}}</span><input type="hidden" :value="codeToLottery(winresultsinfo.lotteryType)"><span class="unicode_key">搅珠</span><input type="hidden" value="搅珠">直播时间为<span class="unicode_key">开奖</span><input type="hidden" value="开奖">日 <span style="color:red;">{{indMenu.openTime}}</span> (<span class="unicode_key">北京</span><input type="hidden" value="北京">时间)
			</div>
		</div>
      
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getNewDataApi, getNewDataApiG,datalistApi } from "@/api/index";
import {
  codeToLottery,
  formatTimestamp,
  formatTimestamp1,
  oddEven,
  isBig,
  weishuSum,
  sxliang,
  weishuliang,
  getZodiacsObj,
  ColorDict,
  getSpecial
} from "@/utils/utils";

import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import  settingMer  from "@/utils/settingMer";
import { weiSize } from "../../utils/utils";
const route = useRoute();
const categoryId = ref(route.params.id);
const year = ref(new Date(new Date().getFullYear(), 0));
const nowyear = ref(new Date(new Date().getFullYear(), 0));
const nextwinresultst = ref({});
const winresultsinfo = ref({});
const loading = ref(false);
const tableLoading = ref(false);
console.log("sdddd",settingMer)
const liveUrl = computed(()=>
// http://202.146.223.40:8123
// ${indMenu.value?.liveUrl2}
`${indMenu.value?.liveUrl2}?url=${indMenu.value?.liveUrl}`
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
const lastBall = ref('');
let isRef = ref(false)
let isRefList = ref(false)
const indMenu = computed(() => {
  return settingMer.menuList.find((e) => e.code === categoryId.value) || {};
});
const hasNewIndex = ref(-1); // 记录最新号码的索引
const getColors = (n) => {
  let str = 'red'
  console.log("sfff=11", n,ColorDict)
  for(let i in ColorDict){
    let ars = ColorDict[i].map(e=>+e)
    // console.log("sfsff=",i,ars,String(n),(ars).includes(+n))
    if((ars).includes(+n)){
      str = i

    }
   
  }
  return str
};
const resFn = (x) => {
  let numberarr = x.numbers.split(",");
        let sbarr = x.sb.split(",");
        let sxarr = x.sx.split(",");
        let ball = [];
        hasNewIndex.value = numberarr.length-1;

        numberarr.forEach((j, i) => {
          ball.push({
            num: j,
            sb: sbarr[i],
            sx: sxarr[i],
          });
        });
        console.log("sdddd==", hasNewIndex.value,  winresultsinfo.value.ball)
            x.ball = ball;
           winresultsinfo.value = x;
        //  sb
        //   sx
        if(isOpen()&&!ball[0].num&&!winresultsinfo.value.lastBall){
           // 触发动画
        }else if(ball?.length==7){
          // lastBall.value = ball[ball.length - 1];
          
          winresultsinfo.value.lastBall = ball[ball.length - 1];
        }
};
const getNewData = async (s) => {
   let lotCode = categoryId.value.toLowerCase()
  loading.value = true;
  isRef.value = s
  const res = await getNewDataApi({
    year: year.value.getFullYear(),
    lotteryType: categoryId.value,
  });
  loading.value = false;
   let list = res.data;
  if (res.code === 200) {
  
   
    list.forEach(async (x, s) => {
      if (x.status == 0) {
        nextwinresultst.value = x;
        countdownTimeStr(nextwinresultst.value.date);
      } else {
       
        resFn(x)   
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
const opening = computed(()=>{
  return +winresultsinfo.value.status ==1&&winresultsinfo.value.ball&&winresultsinfo.value.ball.length<7
})
const isOpen = (K='_openTime',num)=>{
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
      if(open&&opening.value){

      }
    }
     
  }
 
  return open && (!num || num=='')
}
const showLive = computed(()=>{
  let isShow  = false
  let lic = Date.now() - new Date(nextwinresultst.value.date);

  let show = +winresultsinfo.value.status==1|| isOpen('_openTime');  
  if(show){
     isShow = true
  }
 return show
})
const getdatalist = async   () => {

  tableLoading.value = true;
  const res = await datalistApi({
    year: year.value.getFullYear(),
    lotteryType: categoryId.value,
    status: 2,
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
  nextTick(()=>{
    tableRef.value.scrollTo&&tableRef.value.scrollTo({ top: 0 });
  })
  
};

const segmentedChange = (rev) => {
  
  getNewData();
  pageNum.value = 1;

  isRefList.value = !!rev
  if(!rev){
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
    if (countdownTime.value.length > 0&&diff<=800) {
    if (
      countdownTime.value[0] == "00" &&
      countdownTime.value[1] == "00" &&
      countdownTime.value[2] == "00"
    ) {
      clearInterval(timer.value);
      if(!isRef.value){
        getNewData(1);
      }
       if(!isOpen()){
        isRef.value = false
       }
    }
  }
  }, 1000);
};

// getNewData();
// getdatalist();
// 页面加载后执行动画
onMounted(() => {
   segmentedChange();
    setTimeout(() => {
       setInterval(()=>{
          let op = isOpen()
        if(op){

      console.log("sd=op",op)
       getNewData();
        pageNum.value = 1;
        }else if(+resultslist.value[0]?.period!==winresultsinfo.value.period&&+winresultsinfo.value.status==2){
          console.log("sd=close",op)
           getdatalist();
        }
      
        
      },isOpen()?5000:60000)
    }, 5000);
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

::v-deep td,::v-deep th{
  padding:  0 !important;
.cell{
  font-size: 15px !important;
  padding:3px  0 !important;
  *{
    font-size: 15px !important;
  }
   button {
    line-height: 25px !important;
    height:25px !important;
    *{
    font-size: 13px !important;
    line-height: 25px !important;
    height:25px !important;
  }
   }
}
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

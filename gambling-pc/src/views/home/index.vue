<template>
  <div
    class="w-full bg-white my-[1rem] px-[1rem] grow grid grid-cols-2 gap-[1rem] py-[1rem]"
  >
    <!-- 澳门六合彩 新澳门六合彩 -->
    <div class="card">
      <div class="title border-b-1 border-[#e6e6e6] w-[100%] max-w-[60%]">
        <div
          class="py-[0.3rem] px-[0.5rem] inline-block cursor-pointer"
          :class="
            tabactive == 'MO' ? 'bg-[#409EFF] text-white' : 'bg-[#eeeeee]'
          "
          @click="tabClick('MO')"
        >
          澳门六合彩
        </div>
        <div
          class="py-[0.3rem] ml-[1rem] px-[0.5rem] inline-block cursor-pointer"
          :class="
            tabactive == 'XMO' ? 'bg-[#409EFF] text-white' : 'bg-[#eeeeee]'
          "
          @click="tabClick('XMO')"
        >
          新澳门六合彩
        </div>
      </div>
      <winresults :info="aminfo"></winresults>
    </div>

    <!-- 香港 -->
    <card :info="xginfo" v-loading="xginfo.loading"></card>
  </div>
  <div class="mt-[2rem] grid grid-cols-3 gap-[2rem] px-[2rem]">
    <div
      class="cardKa rounded-md pb-[0.5rem]"
      v-for="(item, index) in kajiangltst"
      :key="index"
    >
      <div class="title border-b-1 border-[#e6e6e6] w-[100%] max-w-[60%]">
        <div
          class="py-[0.3rem] px-[0.5rem] inline-block cursor-pointer text-white"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="px-[1rem] py-[0.5rem]">
        <kajiangcard :info="item"></kajiangcard>
      </div>
      <div class="flex justify-end pr-[1rem]">
        <el-button type="primary" :to="'/markKa/'+item.gameCode" @click="go(item.gameCode)"
          >查看更多</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { getNewDataApi, getKajiangApi } from "@/api/index";
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from "vue";
import card from "./card.vue";
import kajiangcard from "./kajiangcard.vue";
import winresults from "./winresults.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const winresultsinfo = ref({});
const loading = ref(false);
const year = ref(new Date(new Date().getFullYear(), 0));
const nowyear = ref(new Date(new Date().getFullYear(), 0));
const nextwinresultst = ref({});
const tabactive = ref("MO");
const aminfo = reactive({
  winresultsinfo: {},
  nextwinresultst: {},
  timer: null,
  countdownTime: [],
});
const xaminfo = reactive({
  winresultsinfo: {},
  nextwinresultst: {},
  timer: null,
  countdownTime: [],
  loading: false,
});

const xginfo = reactive({
  winresultsinfo: {},
  nextwinresultst: {},
  timer: null,
  countdownTime: [],
  loading: false,
});

const tabClick = (tab) => {
  tabactive.value = tab;
  amGetNewData();
};

// 澳门
const amGetNewData = async () => {
  aminfo.loading = true;
  const res = await getNewDataApi({
    year: year.value.getFullYear(),
    lotteryType: tabactive.value,
  });
  if (res.code === 200) {
    let list = res.data;
    list.forEach((x) => {
      if (x.status == 0) {
        aminfo.nextwinresultst = x;
        aminfo.value = countdownTimeStr(aminfo);
      } else if (x.status == 1) {
        let numberarr = x.numbers.split(",");
        let sbarr = x.sb.split(",");
        let sxarr = x.sx.split(",");
        let ball = [];
        numberarr.forEach((x, i) => {
          ball.push({
            num: x,
            sb: sbarr[i],
            sx: sxarr[i],
          });
        });
        x.lastBall = ball.pop();
        x.ball = ball;
        aminfo.winresultsinfo = x;
        console.log(aminfo, "aminfos");
      }
    });
    aminfo.loading = false;
  } else {
    aminfo.loading = false;
    if (aminfo.timer) {
      clearInterval(aminfo.timer);
    }
  }
};

//香港
const xgGetNewData = async () => {
  xginfo.loading = true;
  const res = await getNewDataApi({
    year: year.value.getFullYear(),
    lotteryType: "HK",
  });
  if (res.code === 200) {
    let list = res.data;
    list.forEach((x) => {
      if (x.status == 0) {
        xginfo.nextwinresultst = x;
        xginfo.value = countdownTimeStr(xginfo);
      } else if (x.status == 1) {
        let numberarr = x.numbers.split(",");
        let sbarr = x.sb.split(",");
        let sxarr = x.sx.split(",");
        let ball = [];
        numberarr.forEach((x, i) => {
          ball.push({
            num: x,
            sb: sbarr[i],
            sx: sxarr[i],
          });
        });
        x.lastBall = ball.pop();
        x.ball = ball;
        xginfo.winresultsinfo = x;
      }
    });
    xginfo.loading = false;
  } else {
    xginfo.loading = false;
    if (xginfo.timer) {
      clearInterval(xginfo.timer);
    }
  }
};

const kajiangltst = ref([]);

const getKajiang = async () => {
  xginfo.loading = true;
  const res = await getKajiangApi();
  if (res.code === 200) {
    let list = [];
    res.data.forEach((x) => {
      if (x.name != "分分彩") {
        list.push(x);
      }
    });
    kajiangltst.value = list;
  }
};

// 倒计时
const countdownTimeStr = (data) => {
  if (data.timer) {
    clearInterval(data.timer);
  }
  if (data.countdownTime.length > 0) {
    if (
      data.countdownTime[0] == "00" &&
      data.countdownTime[1] == "00" &&
      data.countdownTime[2] == "00"
    ) {
      clearInterval(data.timer);
    }
  }
  data.timer = setInterval(() => {
    let now = Date.now();
    let diff = Math.max(0, data.nextwinresultst.date * 1000 - now);
    const total = Math.floor(diff / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    data.countdownTime = [h, m, s];
  }, 1000);
  return data;
};

const go = (gameCode) => {
  router.push({ path: `/markKa/${gameCode}` })
};

const getData = () => {
  amGetNewData();
  xgGetNewData();
  getKajiang();
};

getData();
</script>

<style scoped lang="scss">
.cardKa {
    background-image: linear-gradient(180deg, #ff70be, transparent);
}
</style>

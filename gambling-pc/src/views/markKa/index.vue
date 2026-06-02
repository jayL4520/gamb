<template>
  <div class="w-full">
    <div
      class="bg-white flex rounded-[1rem] h-[10rem] my-[1rem] items-center py-[1.5rem]"
    >
      <div class="px-[1.5rem] w-[50%] h-full">
        <div class="flex items-end">
          <div class="text-black font-bold text-[1.2rem]/[2rem] mr-[10px]">
            {{ winresultsinfo.name }}
          </div>
          <div class="text-[0.8rem]/[1.6rem] text-[#666]">
            第<span class="text-[red] px-[5px]">{{
              winresultsinfo.period
            }}</span
            >期开奖<span class="text-[#999999] ml-[3px]"
              >({{ formatTimestamp2(winresultsinfo.drawDate) }})</span
            >
          </div>
        </div>
        <ul class="flex mt-[1rem]">
          <li
            class="flex flex-col items-center mr-[1.2rem]"
            v-for="(item, index) in winresultsinfo.ball"
            :key="index"
          >
            <div
              class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
              :class="`${
                item.sb == 'red'
                  ? 'bg-rose-600'
                  : item.sb == 'blue'
                  ? 'bg-blue-500'
                  : item.sb == 'green'
                  ? 'bg-green-500'
                  : 'bg-[#0092DD]'
              }`"
            >
              {{
                ["三星彩", "四星彩"].includes(winresultsinfo.name)
                  ? item.num
                  : (item.num + "").padStart(2, "0")
              }}
            </div>
            <div
              class="text-[gray] text-[1rem] mt-[0.5rem]"
              v-if="winresultsinfo.lotNumber.length > 6"
            >
              {{ item.sx }}
            </div>
          </li>
          <template v-if="winresultsinfo.lastBall">
            <li class="text-[2rem]">+</li>
            <li class="flex flex-col items-center ml-[0.8rem]">
              <div
                class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
                :class="`${
                  winresultsinfo.lastBall?.sb == 'red'
                    ? 'bg-rose-600'
                    : winresultsinfo.lastBall?.sb == 'blue'
                    ? 'bg-blue-500'
                    : winresultsinfo.lastBall?.sb == 'green'
                    ? 'bg-green-500'
                    : 'bg-[#0092DD]'
                }`"
              >
                {{
                  ["三星彩", "四星彩"].includes(winresultsinfo.name)
                    ? winresultsinfo.lastBall?.num
                    : (winresultsinfo.lastBall?.num + "").padStart(2, "0")
                }}
              </div>
              <div class="text-[gray] text-[1rem] mt-[0.5rem]">
                {{ winresultsinfo.lastBall?.sx }}
              </div>
            </li>
          </template>
        </ul>
      </div>
      <div class="w-[1px] h-[5rem] bg-slate-200"></div>
      <div class="w-[50%] px-[1.5rem] h-full flex justify-center">
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>

    <!-- 开奖记录 -->
    <div class="bg-white max-w-[1250px] mx-auto mt-[1rem] mb-[2rem]">
      <div class="flex justify-between items-center px-[1rem] py-[0.8rem]">
        <span class="font-bold text-[1.1rem]">开奖记录</span>
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
                {{ formatTimestamp2(scope.row.drawDate) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="期数" align="center" width="120">
            <template #default="scope">
              <div class="text-center">
                {{ scope.row.period }}
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
                        : item.sb == 'green'
                        ? 'bg-green-500'
                        : 'bg-[#0092DD]'
                    }`"
                  >
                    {{
                      ["三星彩", "四星彩"].includes(scope.row.name)
                        ? item.num
                        : (item.num + "").padStart(2, "0")
                    }}
                  </div>
                  <div
                    class="text-[gray] mt-[5px]"
                    v-if="scope.row.lotNumber.length > 6"
                  >
                    {{ item.sx }}
                  </div>
                </li>
                <template v-if="scope.row.lastBall">
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
                </template>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="一肖量" align="center" width="80">
            <template #default="scope">
              <div class="text-center">
                {{ scope.row.tongji.yx }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="尾数量" align="center" width="80">
            <template #default="scope">
              <div class="text-center">
                {{ scope.row.tongji.wx }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="总和" align="center">
            <el-table-column label="数量" align="center" width="80">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.tongji.he }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单双" align="center" width="80">
              <template #default="scope">
                <div class="text-center">
                  {{ scope.row.tongji.ds }}
                </div>
              </template>
            </el-table-column>
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
  </div>
</template>

<script setup>
import { getKajiangListApi, getKajiangApi } from "@/api/index";
import {
  codeToLottery,
  formatTimestamp,
  formatTimestamp2,
  oddEven,
} from "@/utils/utils";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const categoryId = ref(route.params.id);
const year = ref(new Date(new Date().getFullYear(), 0));
const nowyear = ref(new Date(new Date().getFullYear(), 0));
const nextwinresultst = ref({});
const winresultsinfo = ref({});
const loading = ref(false);
const tableLoading = ref(false);
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

const getNewData = async () => {
  loading.value = true;
  const res = await getKajiangListApi({
    gamecode: categoryId.value,
    page: 1,
    pageSize: pageSize.value,
  });
  loading.value = false;
  if (res.code === 200) {
    if (res.data.list) {
      let x = res.data.list[0];

      let sbarr = x.tongji.sb.split(",");
      let sxarr = x.tongji.sx.split(",");
      let ball = [];
      x.lotNumber.forEach((j, i) => {
        ball.push({
          num: j,
          sb: sbarr[i],
          sx: sxarr[i],
        });
      });
      if (ball.length > 6) {
        x.lastBall = ball.pop();
      }
      x.ball = ball;
      winresultsinfo.value = x;
      console.log(winresultsinfo, "winresultsinfowinresultsinfo");
    }
  }
};

const getdatalist = async () => {
  tableLoading.value = true;
  const res = await getKajiangListApi({
    gamecode: categoryId.value,
    page: pageNum.value,
    pageSize: pageSize.value,
  });
  tableLoading.value = false;
  if (res.code === 200) {
    total.value = res.data.total;
    if (res.data.list) {
      let list = [];
      res.data.list.forEach((x) => {
        let sbarr = x.tongji.sb.split(",");
        let sxarr = x.tongji.sx.split(",");
        let ball = [];
        x.lotNumber.forEach((j, i) => {
          ball.push({
            num: j,
            sb: sbarr[i],
            sx: sxarr[i],
          });
        });
        if (ball.length > 6) {
          x.lastBall = ball.pop();
        }
        x.ball = ball;
        list.push(x);
      });
      resultslist.value = list;
    }
  }
  tableRef.value.scrollTo({ top: 0 });
};

const segmentedChange = () => {
  getNewData();
  pageNum.value = 1;
  getdatalist();
};

const handleCurrentChange = (val) => {
  pageNum.value = val;
  getdatalist();
};

getNewData();
getdatalist();
// 页面加载后执行动画
onMounted(() => {
  //   nextTick(() => {
  //   });
});
onUnmounted(() => clearInterval(timer.value));
</script>

<style scoped lang="scss"></style>

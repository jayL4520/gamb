<template>
    <div
        class="bg-[#f4f4f4] mt-[5px] flex flex-col items-center py-[1.2rem] px-[1rem] h-[12rem]"
      >
        <div class="text-[1rem] text-[#666] font-bold">
          第<span class="text-[#f44a07] mx-[5px]"
            >{{ info.winresultsinfo.year
            }}{{ info.winresultsinfo.period }}</span
          >期开奖<span class="text-[0.8rem] text-[#999999]"
            >({{ formatTimestamp1(info.winresultsinfo.date) }})</span
          >
        </div>
        <ul class="flex mt-[1rem]">
          <li
            class="flex flex-col items-center mr-[1.2rem]"
            v-for="(item, index) in info.winresultsinfo.ball"
            :key="index"
          >
            <div
              class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
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
            <div class="text-[gray] text-[1rem] mt-[0.5rem]">{{ item.sx }}</div>
          </li>
          <li class="text-[2rem]">+</li>
          <li class="flex flex-col items-center ml-[0.8rem]">
            <div
              class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full"
              :class="`${
                info.winresultsinfo.lastBall?.sb == 'red'
                  ? 'bg-rose-600'
                  : info.winresultsinfo.lastBall?.sb == 'blue'
                  ? 'bg-blue-500'
                  : 'bg-green-500'
              }`"
            >
              {{ info.winresultsinfo.lastBall?.num }}
            </div>
            <div class="text-[gray] text-[1rem] mt-[0.5rem]">
              {{ info.winresultsinfo.lastBall?.sx }}
            </div>
          </li>
        </ul>
        <div class="flex w-full">
          <div class="w-[46%] flex justify-end pr-[10px]">
            <div class="flex flex-col items-center justify-end">
              <div class="text-[1rem] text-[#666] font-bold">
                距<span class="text-[#f44a07] mx-[5px]"
                  >{{ info.nextwinresultst.year
                  }}{{ info.nextwinresultst.period }}</span
                >期开奖
              </div>
              <div class="text-[0.8rem] text-[#999999]">
                ({{ formatTimestamp(info.nextwinresultst.date) }})
              </div>
            </div>
          </div>
          <div class="flex items-center text-[#666] mt-[10px]">
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mr-[5px]"
            >
              {{ info.countdownTime[0] || "00" }}
            </div>
            时
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px]"
            >
              {{ info.countdownTime[1] || "00" }}
            </div>
            分
            <div
              class="w-[2.5rem] h-[2.5rem] bg-[#20b0cd] flex justify-center items-center text-white mx-[5px]"
            >
              {{ info.countdownTime[2] || "00" }}
            </div>
            秒
          </div>
        </div>
      </div>
</template>

<script setup>
import {
  codeToLottery,
  formatTimestamp,
  formatTimestamp1,
} from "@/utils/utils";
defineProps({
  info: Object,
})
</script>

<style scoped lang="scss">

</style>

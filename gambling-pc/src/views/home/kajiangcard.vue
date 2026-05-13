<template>
  <div
    class="bg-[#fff] rounded-md border-1 border-[#409EFF] mt-[5px] flex flex-col items-center py-[1.2rem] px-[1rem]"
  >
    <div class="text-[0.8rem] mb-[0.2rem]">{{ info.name }}开奖号码</div>
    <div  class="text-[1rem] text-[#666] font-bold">
      第<span class="text-[#f44a07] mx-[5px]">{{ info.period }}</span
      >期开奖
    </div>
    <div class="text-[0.8rem] text-[#999999]">
      ({{ formatTimestamp2(info.drawDate) }})
    </div>
    <ul class="flex flex-wrap mt-[1rem]">
      <li
        class="flex flex-col items-center mr-[0.5rem] mb-[0.5rem]"
        v-for="(item, index) in info.lotNumber"
        :key="index"
      >
        <div
          class="text-white text-[1.2rem] w-[2.1rem] h-[2.1rem] flex items-center justify-center rounded-full bg-[#0092DD]"
        >
          {{ ["三星彩","四星彩"].includes(info.name)?item:(item+"").padStart(2, '0') }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  codeToLottery,
  formatTimestamp,
  formatTimestamp2,
} from "@/utils/utils";
defineProps({
  info: Object,
});
</script>

<style scoped lang="scss"></style>

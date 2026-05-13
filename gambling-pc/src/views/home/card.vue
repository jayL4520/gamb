<template>
   <div class="card">
      <div class="title border-b-1 border-[#e6e6e6] w-[100%] max-w-[60%]">
        <div
          class="py-[0.3rem] px-[0.5rem] bg-[#409EFF] text-white inline-block"
        >
          {{ codeToLottery(info.winresultsinfo.lotteryType) }}
        </div>
      </div>
      <winresults :info="info"></winresults>
    </div>
</template>

<script setup>
import winresults from "./winresults.vue"
import {
  codeToLottery,
} from "@/utils/utils";
defineProps({
  info: Object,
})
</script>

<style scoped lang="scss">

</style>

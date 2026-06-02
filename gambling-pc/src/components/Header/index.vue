<template>
  <div class="w-full h-[3rem]">
    <div
      class="w-full custom-style flex justify-center h-[3rem] fixed top-[0] left-[0] z-[100]"
    >
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo max-w-[1350px] mx-auto h-[3rem] justify-center border-[0]"
        mode="horizontal"
        background-color="transparent"
        text-color="#fff"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menuList"
          :key="item.url"
          :index="item.url"
          style="height:48px !important;line-height: 48px !important;"
        >
          <div class="text-white text-[1rem]">{{ item.name }}</div>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { lotteryTypelistApi } from "@/api/index";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import  settingMer from "@/utils/settingMer";
const router = useRouter();
const route = useRoute();

const activeIndex = ref(route.path || "/home");
const menuList = ref(settingMer.menuList);

const loading = ref(false);

// const getlotteryTypelist = async () => {
//   const res = await lotteryTypelistApi({
//     show: true,
//   });
//   if (res.code === 200) {
//     if (res.data) {
//       res.data.map((x) => {
//         x["url"] = "/mark/" + x.code;
//       });
//       menuList.value = menuList.value.concat(...res.data);
//     }
//   }
// };

const handleSelect = (val, keyPath,item) => {
  if(keyPath[0]=="sub-menu-more"){
    router.push(keyPath[1]);
  }else{
    router.push(keyPath[0]);
  }
  // router.push(keyPath[0]);
};

// getlotteryTypelist();

// 页面加载后执行动画
onMounted(() => {
  //   nextTick(() => {
  //   });
});
</script>

<style scoped lang="scss">

.custom-style {
  background: #68b0db;
  .el-menu-demo {
    width: 100%;
    .el-menu-item.is-active {
      border: none;
      background: var(--el-color-primary);
    }
  }
  .el-segmented {
    background: transparent;
  }
}

</style>
<style lang="scss">
.el-popper.el-tooltip {
  background: #68b0db;
}
</style>

<template>
  <div class="layoutBox w-full min-h-[100vh] bg-[#f0f0f0]">
    <el-container>
      <el-header class="p-[0] h-[auto] ">
        <Header></Header>
      </el-header>
      <el-main class="p-[0]  w-full m-[0]">
        <div class="max-w-[1250px] mx-auto">
           <router-view v-slot="{ Component, route }">
              <transition
                mode="out-in"
                :name="route.meta.transitionType || 'slide'"
              >
                <keep-alive>
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </transition>
          </router-view>
        </div>

        <!-- <div class="mainBox">
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </div> -->
      </el-main>
    </el-container>
  </div>
</template>



<script setup>
import Header from "@/components/Header/index.vue";
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()

</script>

<style scoped lang="scss">

</style>

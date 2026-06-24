<script setup>
import { useRouter, useRoute } from "vue-router";
const route = useRoute();

</script>

<template>
  <div>
    <router-view :key="route.fullPath" />
  </div>
</template>

<style scoped>
*,div{
  box-sizing: border-box;
}


    

    

</style>

<style lang="scss">
.bg-green-500{
  background:#1fc26b !important;
} 
.bg-blue-500{
  background: #0093e8 !important;
} 
.bg-rose-600{
  background:#f8223c !important;
} 
</style>
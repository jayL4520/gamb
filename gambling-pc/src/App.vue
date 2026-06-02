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

    :root, :host {
        --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        --color-green-500: #1fc26b !important;
        --color-blue-500: #0093e8 !important;
        --color-rose-600: #f8223c !important;
        --color-slate-200: rgb(226, 232, 240);
        --color-gray-400: rgb(153, 161, 175);
        --color-black: #000;
        --color-white: #fff;
        --font-weight-bold: 700;
        --radius-md: .375rem;
        --ease-out: cubic-bezier(0, 0, .2, 1);
        --default-transition-duration: .15s;
        --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        --default-font-family: var(--font-sans);
        --default-mono-font-family: var(--font-mono)
    }

    

</style>

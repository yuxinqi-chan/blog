<template>
  <div class="flex min-h-screen flex-col items-center">
    <Banner />
    <main class="flex w-full max-w-screen-xl grow flex-col items-center">
      <NuxtPage />
    </main>
    <footer class="flex w-full justify-between border-t p-5">
      <span>Copyright © 2024 Compilesoul</span>
      <span>友情链接</span>
      <span>Powered by Nuxt.js</span>
    </footer>
  </div>
</template>
<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "zh-CN",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/4.7.0/css/font-awesome.min.css",
    },
  ],
});
</script>

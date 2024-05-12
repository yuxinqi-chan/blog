<template>
  <section
    class="relative h-[250px] w-full bg-cover bg-[center_top_10%] bg-no-repeat lg:h-[480px]"
    style="
      background-image: url(&quot;https://api.boxmoe.com/random.php?UKAFp8&quot;);
    "
  >
    <div
      class="absolute z-10 flex h-16 w-full items-center justify-around text-sm"
    >
      <div></div>
      <div class="flex gap-x-1">
        <NuxtLink
          class="rounded-md p-2 font-semibold text-white hover:bg-white/10"
          to="/"
        >
          首页
        </NuxtLink>
        <NuxtLink
          class="rounded-md p-2 font-semibold text-white hover:bg-white/10"
          to="/vps"
        >
          Vps列表
        </NuxtLink>
      </div>
      <div></div>
    </div>
    <div class="masking"></div>
    <div class="absolute bottom-0 w-full">
      <svg
        class="h-[100px] w-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          ></path>
        </defs>
        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.7"
          ></use>
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          ></use>
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          ></use>
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
        </g>
      </svg>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
.masking {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKUlEQVQImU3IMREAIAgAwJfNkQCEsH8cijjpMf6vnXlQaIiJFx+omEBfmqIEZLe2jzcAAAAASUVORK5CYII=);
}
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>

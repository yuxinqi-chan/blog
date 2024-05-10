<template>
  <div :class="['section-head', $props.class]">
    <span>{{ title }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: ["class", "title"],
};
</script>

<style>
.section-head span {
  color: #4c6280;
  font-family: "Play";
  padding-bottom: 20px;
  font-size: 12px;
  letter-spacing: 2px;
  position: relative;
  padding-left: 80px;
  display: block;
}
.section-head span:before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 50px;
  height: 1px;
  background: #4c6280;
}
.section-head span:after {
  content: "";
  position: absolute;
  left: 50px;
  height: 5px;
  width: 5px;
  top: 6px;
  border-radius: 50%;
}
</style>

<script setup lang="ts">
import setting from "@/setting.ts";
</script>

<template>
  <div class="logo">
    <div :class="['iconfont','icon-' + setting.logo]"></div>
    <div class="name">{{ setting.title }}</div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;

  .icon-yunpan {
    font-size: 58px;
    color: $color-theme;
  }

  .name {
    font-weight: bold;
    font-size: 36px;
    color: #05a1f5;
    margin-left: 10px;
  }
}
</style>
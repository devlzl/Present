<script setup lang="ts">
import { TOOL_LIST } from "../const";
</script>

<template>
  <div class="tool-list">
    <span v-for="item in TOOL_LIST" :key="item.value">{{ item.label }}</span>
  </div>
</template>

<style scoped lang="scss">
.tool-list {
  height: 90px;
  background-color: #f5f5f5;
}
</style>

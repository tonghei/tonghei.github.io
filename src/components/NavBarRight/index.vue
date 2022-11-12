<template>
  <div class="navbar-right">
    <SearchList />
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import SearchList from "@/components/SearchList.vue";
</script>
<style lang="less">
.navbar-right {
  box-sizing: border-box;
  height: 100%;
  padding: 0 30px;
}
</style>
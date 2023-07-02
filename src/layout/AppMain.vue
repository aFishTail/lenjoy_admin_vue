<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="route.path" />
      </keep-alive>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const cachedViews = []
</script>

<style lang="scss" scoped>
.app-main {
  background-color: #fff;
  padding: 16px;
}
</style>

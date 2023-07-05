<template>
  <div class="sidebar-wrap">
    <div class="sidebar-logo">
      Lenjoy 管理系统
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="false"
        background-color="#001529"
        text-color="#a5acb3"
        :default-active="activeMenu"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in staticRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
          :is-first-level="false"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SidebarItem from './sidebarItem.vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/store/modules/setting'
import { staticRoutes } from '@/router/staticRoutes'

const route = useRoute()
const settingStore = useSettingStore()

const activeMenu = computed(() => {
  const { meta, path } = route
  //   if (meta !== null || meta !== undefined) {
  //     if (meta.activeMenu) {
  //       return meta.activeMenu
  //     }
  //   }
  return path
})

const isCollapse = computed(() => !settingStore.sidebarOpen)
</script>

<style lang="scss" scoped>
.sidebar-wrap {
  background: #001529;
  .sidebar-logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #a5acb3;
}
}
</style>

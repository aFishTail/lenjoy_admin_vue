<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <Navbar class="navbar-container" />
    <div class="main-container">
      <!-- <div >
        <Navbar />
        <TagsView v-if="showTagsView" />
      </div> -->
      <AppMain />
      <!-- <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './sidebar/index.vue'
import AppMain from './AppMain.vue'
import Navbar from './navbar/index.vue'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-columns: 220px auto;
  grid-template-rows: 60px auto;
  grid-template-areas:
    'sidebar navbar'
    'sidebar main';
  .sidebar-container {
    grid-area: sidebar;
  }
  .navbar-container {
    grid-area: navbar;
    border-bottom: 1px solid #a5acb3;
  }
  .main-container {
    grid-area: main;
    padding: 16px;
    background-color: #f0f2f5;
  }
}
</style>

<template>
    <SidebarItemLink v-if="noChildren" :to="item.path">
        <el-menu-item
          :index="item.path"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <svg
            v-if="item.meta.icon"
            class="icon"
            aria-hidden="true"
            font-size="17px"
          >
            <use :xlink:href="item.meta.icon" />
          </svg>
          <span v-if="item.meta.title">{{
            item.meta.title
          }}</span>
        </el-menu-item>
    </SidebarItemLink>
    <el-sub-menu v-else :index="item.path">
        <template #title>
        <svg
          v-if="item.meta && item.meta.icon"
          class="icon"
          aria-hidden="true"
          font-size="16px"
        >
          <use :xlink:href="item.meta.icon" />
        </svg>
        <span v-if="item.meta && item.meta.title">{{
          item.meta.title
        }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="child.path"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteRecordRaw } from 'vue-router'
import SidebarItemLink from './sidebarItemLink.vue'

interface IProp {
  item: RouteRecordRaw
  basePath: string
  isCollapse: boolean
  isFirstLevel: boolean
}
const props = withDefaults(defineProps<IProp>(), {
  isCollapse: false,
  isFirstLevel: false,
  basePath: ''
})


const noChildren = computed(() => {
      if (!props.item.children || props.item.children.length === 0) {
        return true
      }
      return false
    })

</script>

<style></style>

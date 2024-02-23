<template>
  <a-layout style="overflow-y: auto; min-width: 1280px">
    <a-layout-header class="layout-header" :style="style.headStyle" v-show="!isQiankun">
      <Header></Header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-show="!isQiankun"
        style="position: fixed; height: 100%; margin-top: 54px; z-index: 3"
      >
        <Menus />
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <!-- <PageTabs style="position: fixed; z-index: 1" /> -->
        <a-layout-content
          style="padding: 20px; overflow-y: auto; margin-top: 46px; min-width: 1280px"
        >
          <router-view v-slot="{ Component, route }">
            <keep-alive>
              <component :is="Component" v-if="route.meta.keepAlive" :key="getRouteName(route)" />
            </keep-alive>
            <component :is="Component" v-if="!route.meta.keepAlive" :key="getRouteName(route)" />
          </router-view>
        </a-layout-content>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Menus from './Menus.vue';
// import PageTabs from '@/components/PageTabs/Index.vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { computed, reactive } from 'vue';
import { isQiankun } from '@/utils/isQiankun';

const style = reactive({
  headStyle: isQiankun ? { marginLeft: '-200px' } : {},
});

const getRouteName = (route: RouteLocationNormalizedLoaded) => {
  return (
    (typeof route.meta.getRouteName === 'function' && route.meta.getRouteName(route)) || route.name
  );
};

</script>

<style lang="less" scoped>
.layout-header {
  background: @brand-color;
  height: 54px;
  line-height: 54px;
  position: fixed;
  width: 100%;
  z-index: 11;
}
.layout-content {
  flex-direction: column;
  position: absolute;
  right: 0;
  margin-top: 54px;
}
.ant-layout.ant-layout-has-sider > .ant-layout,
.ant-layout.ant-layout-has-sider > .ant-layout-content {
  width: calc(100% - 200px);
}
</style>

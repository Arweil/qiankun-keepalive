<template>
  <a-menu
    v-model:selectedKeys="layoutSelectedKeys"
    v-model:openKeys="layoutOpenKeys"
    mode="inline"
    theme="dark"
    :inline-indent="10"
  >
    <template v-for="menuItem in formattedMenus" :key="menuItem.path">
      <a-menu-item v-if="!menuItem.children || !menuItem.children.length" :key="menuItem.path">
        <RouterLink :to="menuItem.path"> {{ menuItem.nameZn }} </RouterLink>
      </a-menu-item>
      <sub-menu v-else :menu-item="menuItem"></sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { defineComponent, onMounted, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { simple2Tree } from '@m-tools/browser-utils';
import { RouterLink } from 'vue-router';
import SubMenu from './SubMenu.vue';
// import { PieChartOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    'sub-menu': SubMenu,
    // PieChartOutlined,
    RouterLink,
  },
  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    const { menus, layoutSelectedKeys, layoutOpenKeys } = toRefs(userStore.$state);
    onMounted(async () => {
      // await userStore.getUserMenu();
    });
    watch(route, () => {
      // userStore.getSelectedKeys(); // 更新菜单高亮项
    });

    return {
      layoutSelectedKeys,
      layoutOpenKeys,
      menus,
    };
  },
  computed: {
    formattedMenus() {
      const m = simple2Tree({
        simpleData: this.menus.filter((m) => m.isHidden === 'N'),
        pIdKey: 'pid',
      });
      console.log('menus', m);

      return m;
    },
  },
  methods: {},
});
</script>

<style lang="less"></style>

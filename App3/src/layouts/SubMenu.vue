<template>
  <a-sub-menu :key="menuItem.path">
    <template #title>{{ menuItem.nameZn }}</template>
    <template v-for="item in menuItem.children" :key="item.path">
      <template v-if="!item?.children?.length">
        <a-menu-item :key="item.path">
          <RouterLink :to="item.path"> {{ item.nameZn }}</RouterLink>
        </a-menu-item>
      </template>
      <template v-else-if="item?.children?.length">
        <sub-menu :key="item.path" :menu-item="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Menu } from '@/api/login';
export default defineComponent({
  name: 'SubMenu',
  props: {
    menuItem: {
      type: Object as PropType<Menu>,
      default: () => ({ children: [] }),
    },
  },
});
</script>

<style scoped></style>

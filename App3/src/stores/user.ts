import { defineStore, acceptHMRUpdate } from 'pinia';
// import {
//   login,
//   logout,
//   Login,
//   getCurrentUser,
//   getMenus,
//   Menu,
//   getGrantAccessOrgs,
//   Org,
//   ERR_DESC,
// } from '@/api/login';
import { message } from 'ant-design-vue';
// import { getSelectedMenu, getFullPath } from '@/utils';
import { isQiankun } from '@/utils/isQiankun';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {
      mail: '邮箱',
      nickname: '昵称',
      userName: '姓名',
      userId: 'id',
    },
    menus: [
      {
        "id": 71001,
        "menuCode": "home",
        "nameZn": "首页",
        "nameEn": "home",
        "path": "/",
        "icon": null,
        "parentCode": "0",
        "isHidden": "N",
        "pid": 0,
      },
      {
        "id": 75002,
        "menuCode": "CustGroup-Management",
        "nameZn": "父菜单",
        "nameEn": "CustGroup-Management",
        "path": "/child/page",
        "icon": null,
        "parentCode": "CustGroup",
        "isHidden": "N",
        "sort": 0,
        "parentName": null,
        "pid": 75001,
        "menuChildren": null
      },
      {
        "id": 75001,
        "menuCode": "CustGroup-Management",
        "nameZn": "子菜单",
        "nameEn": "CustGroup-Management",
        "path": "/child",
        "icon": null,
        "parentCode": "CustGroup",
        "isHidden": "N",
        "sort": 0,
        "parentName": null,
        "pid": 0,
        "menuChildren": null
      },
      {
        "id": 73001,
        "menuCode": "CustGroup-Management",
        "nameZn": "没keepAlive菜单",
        "nameEn": "CustGroup-Management",
        "path": "/nokeep",
        "icon": null,
        "parentCode": "0",
        "isHidden": "N",
        "sort": 0,
        "parentName": null,
        "pid": 0,
        "menuChildren": null
      },
    ],
    layoutSelectedKeys: [] as string[], // 选中的菜单
    layoutOpenKeys: [] as string[], // 展开的菜单
  }),
  getters: {},
  actions: {
    async getUserMenu() {
      // const res = await getMenus();
      const res = {
        result: []
      }
      const { result = [] } = res;
      this.$patch({
        menus: result,
      });
      // this.getSelectedKeys();
      return res;
    },
    // getSelectedKeys() {
    //   const menuKeys = this.menus.map((item) => item.path);
    //   const pathname = this.router.currentRoute.value.path || window.location.pathname;
    //   this.layoutSelectedKeys =
    //     pathname === '/'
    //       ? ['/'] // 首页
    //       : [getSelectedMenu(pathname, menuKeys)];
    //   this.layoutOpenKeys = getFullPath(pathname);
    // },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

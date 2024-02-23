import { action, makeAutoObservable, runInAction } from 'malganis/mobx';
import React from 'react';
import { DollarOutlined } from '@ant-design/icons';
import { simple2Tree, getFullPath, getSelectedMenu } from '@m-tools/browser-utils';

import type { IBaseMenuInfo } from '@m-tools/antd-ext/es/LayoutExt/LayoutExt';
import { MicroAppStateActions } from 'qiankun';
import { TypeAppName } from '@/tabs';

const mapIcon: { [key: string]: React.FunctionComponent } = {
  DollarOutlined,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMenuInfo extends IBaseMenuInfo {
  code: string;
  id: number;
  nameZn: string;
  pId: number;
  path: string;
  icon?: string | React.ReactNode;
}

export class UserStore {
  namespace = 'UserStore';

  userInfo: Partial<{ nickname: string }> | undefined; // 用户信息

  menu: IMenuInfo[] = []; // 菜单树状结构

  mapBreadcrumb: { [path: string]: string } = {}; // 匹配面包屑导航

  layoutOpenKeys: string[] = []; // 默认展开的菜单

  layoutSelectedKeys: string[] = []; // 默认选择的菜单项

  microAction: MicroAppStateActions | null = null;

  constructor(microAction: MicroAppStateActions) {
    makeAutoObservable(this, {
      namespace: false,
      getBaseInfo: action.bound,
      setOpenKeys: action.bound,
      setSelectedKeys: action.bound,
    });

    this.microAction = microAction;
  }

  async login(): Promise<void> {
    // fetch
    const res = await Promise.resolve({ result: { nickname: '未知用户' } });

    runInAction(() => {
      this.userInfo = res.result || { nickname: '未知用户' };
    });
  }

  async logout(): Promise<void> {
    window.localStorage.clear();
    // fetch
    await Promise.resolve({});
  }

  async getBaseInfo(): Promise<void> {
    try {
      const [userInfo, menu] = await Promise.all([
        Promise.resolve({ result: { nickname: '未知用户' } }),
        Promise.resolve<{ result: IMenuInfo[] }>({
          result: [
            // {
            //   code: 'errorpage-app1',
            //   id: 5,
            //   nameZn: 'App 1',
            //   pId: 0,
            //   path: '/app1/ErrorPage',
            //   icon: 'DollarOutlined',
            // },
            // {
            //   code: 'errorpage404-app1',
            //   id: 6,
            //   nameZn: '404',
            //   pId: 5,
            //   path: '/app1/404',
            // },
            // {
            //   code: 'errorpage403-app1',
            //   id: 7,
            //   nameZn: '403',
            //   pId: 5,
            //   path: '/app1/403',
            // },
            // {
            //   code: 'errorpage500-app1',
            //   id: 8,
            //   nameZn: '500',
            //   pId: 5,
            //   path: '/app1/500',
            // },
            // {
            //   code: 'errorpage-app2',
            //   id: 51,
            //   nameZn: 'App 2',
            //   pId: 0,
            //   path: '/app2/ErrorPage',
            //   icon: 'DollarOutlined',
            // },
            // {
            //   code: 'errorpage404-app2',
            //   id: 61,
            //   nameZn: '404',
            //   pId: 51,
            //   path: '/app2/404',
            // },
            // {
            //   code: 'errorpage403-app2',
            //   id: 71,
            //   nameZn: '403',
            //   pId: 51,
            //   path: '/app2/403',
            // },
            // {
            //   code: 'errorpage500-app2',
            //   id: 81,
            //   nameZn: '500',
            //   pId: 51,
            //   path: '/app2/500',
            // },
            {
              code: 'app1',
              id: 5,
              nameZn: 'App 1',
              pId: 0,
              path: '/app1/Demo',
              icon: 'DollarOutlined',
            },
            {
              code: 'app1-1',
              id: 51,
              nameZn: 'DemoBaseCom',
              pId: 5,
              path: '/app1/Demo/DemoBaseCom',
            },
            {
              code: 'app1-1',
              id: 52,
              nameZn: 'DemoMulStore',
              pId: 5,
              path: '/app1/Demo/DemoMulStore',
            },
            {
              code: 'app2',
              id: 6,
              nameZn: 'App 2',
              pId: 0,
              path: '/app2/Demo',
              icon: 'DollarOutlined',
            },
            {
              code: 'app2-1',
              id: 61,
              nameZn: 'DemoSingleStore',
              pId: 6,
              path: '/app2/Demo/DemoSingleStore',
            },
            {
              code: 'app2-2',
              id: 62,
              nameZn: 'DemoMulStore',
              pId: 6,
              path: '/app2/Demo/DemoMulStore',
            },

            {
              code: '71001',
              id: 71001,
              nameZn: 'App3',
              path: '/app3',
              pId: 0,
            },
            {
              code: '71002',
              id: 71002,
              nameZn: '子首页',
              path: '/app3/home',
              pId: 71001,
            },
            {
              code: '75002',
              id: 75002,
              nameZn: '子菜单',
              path: '/app3/child/page',
              pId: 75001,
            },
            {
              code: '75001',
              id: 75001,
              nameZn: '父菜单',
              path: '/app3/child',
              pId: 0,
            },
            {
              code: '73001',
              id: 73001,
              nameZn: '没keepAlive菜单',
              path: '/app3/nokeep',
              pId: 75001,
            },
          ],
        }),
      ]);

      this.microAction?.setGlobalState({
        user: userInfo,
      });

      runInAction(() => {
        this.userInfo = userInfo.result || { nickname: '未知用户' };
        const menus = menu.result || [];

        const mapBreadcrumb: { [path: string]: string } = {};
        const menuKeys: string[] = [];
        menus.forEach(item => {
          mapBreadcrumb[item.path] = item.nameZn;
          menuKeys.push(item.path);
        });

        this.mapBreadcrumb = {
          '/Demo/DemoBaseCom/ThirdPage': '第三级菜单',
          ...mapBreadcrumb,
        };

        this.layoutOpenKeys = getFullPath(window.location.pathname);

        this.layoutSelectedKeys = [getSelectedMenu(window.location.pathname, menuKeys)];

        this.menu = simple2Tree<IMenuInfo>({
          simpleData: menus.map(menuItem => ({
            ...menuItem,
            url: menuItem.path,
            name: menuItem.nameZn,
            icon: menuItem.icon ? React.createElement(mapIcon[menuItem.icon as string]) : undefined,
          })),
        });
      });
    } catch (ex) {
      console.warn(ex);
    }
  }

  setOpenKeys(openKeys: string[]): void {
    this.layoutOpenKeys = openKeys;
  }

  setSelectedKeys(selectedKeys: string[]): void {
    this.layoutSelectedKeys = selectedKeys;
  }
}

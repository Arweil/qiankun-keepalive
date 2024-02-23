import { action, makeAutoObservable } from 'malganis/mobx';
import { loadMicroApp, type MicroApp } from 'qiankun';
import { type Location, type Action } from 'malganis/node_modules/@types/history';

export type TypeAppName = 'app1' | 'app2';

export default class AppStore {
  namespace = 'AppStore';

  cacheLoadedAppInstance: Record<string, MicroApp> = {};

  cacheRouter = '';

  appList = [
    {
      name: 'app1',
      entry: '//localhost:8881',
      container: '#container-app1',
      activeRule: '/app1',
    },
    {
      name: 'app2',
      entry: '//localhost:8882',
      container: '#container-app2',
      activeRule: '/app2',
    },
    {
      name: 'app3',
      entry: '//localhost:5173',
      container: '#container-app3',
      activeRule: '/app3',
    },
  ];

  cachePageKeys: Record<TypeAppName, string[]> = {
    app1: [],
    app2: [],
  };

  constructor() {
    makeAutoObservable(this, {
      namespace: false,
      appList: false,
      listenRefreshAndHistoryChange: action.bound,
    });
  }

  onAddTabsPage(params: {
    appName: TypeAppName;
    location: Location;
  }): void {
    const { appName, location } = params;
    const { pathname, search } = location;

    const pageKey = `${pathname}${search}`.replace(`/${appName}`, '');

    if (!(this.cachePageKeys[appName] || []).some((itm) => itm === pageKey)) {
      // 缓存激活的应用于应用下页面的key
      this.cachePageKeys = {
        ...this.cachePageKeys,
        [appName]: [...(this.cachePageKeys[appName] || []), pageKey],
      };
    }

    const instance = this.cacheLoadedAppInstance[appName];

    if (!instance) {
      const e = this.appList.find((item) => item.name === appName);
      if (e) {
        this.cacheLoadedAppInstance[appName] = loadMicroApp(e);
      }
    }
  }

  onCloseTabsPage(params: {
    appName: TypeAppName;
    pageKey: string;
  }): void {
    const { appName, pageKey } = params;
    this.cachePageKeys = {
      ...this.cachePageKeys,
      [appName]: this.cachePageKeys[appName].reduce(
        (pre, cur) => (cur !== pageKey ? [...pre, cur] : pre),
        [] as string[],
      ),
    };
  }

  listenRefreshAndHistoryChange(location: Location, ac: Action): void {
    console.log('RootApp history change', location, ac);

    const { pathname, search } = location;
    const appName = pathname.split('/')[1] as 'app1' | 'app2';

    const fullpath = `${pathname}${search}`;

    if (this.cacheRouter === fullpath) {
      return;
    }

    this.cacheRouter = fullpath;

    this.onAddTabsPage({
      appName,
      location,
    });
  }
}

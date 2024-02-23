import { MicroApp, loadMicroApp } from 'qiankun';
import { type Location, Action } from 'malganis/node_modules/@types/history';



const appList = [
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
];

const cacheLoadedAppInstance: Record<TypeAppName, MicroApp | null> = {
  app1: null,
  app2: null,
};

export function openTabs(params: {
  appName: TypeAppName;
  type: Action;
  location: Location;
}) {
  const { appName, type, location } = params;
  const { pathname, search } = location;

  const fullpath = `${pathname}${search}`.replace(`/${appName}`, '');

  const instance = cacheLoadedAppInstance[appName];
  // 如果缓存了子应用
  // if (instance && instance.update) {
  //   instance.update({
  //     routeInfo: {
  //       type,
  //       url: fullpath,
  //     },
  //   }).catch(() => {});
  // }

  // 第一次打开
  if (!instance) {
    const e = appList.find((item) => item.name === appName);
    if (e) {
      cacheLoadedAppInstance[appName] = loadMicroApp({
        ...e,
        // props: {
        //   routeInfo: {
        //     type: 'PUSH',
        //     url: fullpath,
        //   },
        // },
      });
    }
  }
}

let cacheRouter = '';

export function listenRefreshAndHistoryChange(location: Location, action: Action) {
  console.log('RootApp history change', location, action);

  const { pathname, search } = location;
  const appName = pathname.split('/')[1] as 'app1' | 'app2';

  const fullpath = `${pathname}${search}`;

  if (cacheRouter === fullpath) {
    return;
  }

  cacheRouter = fullpath;

  openTabs({
    appName,
    type: action,
    location,
  });
}

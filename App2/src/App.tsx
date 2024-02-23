import React from 'react';
import { ConfigProvider, locale } from '@m-tools/antd-ext';
import malganis from 'malganis';
import { AliveScope } from 'react-activation';
import { userStore } from '@/stores';
import RegisterRouter from './routers';

function LoadingComponent(): React.ReactNode {
  return 'App Fetching Loading...';
}

const app = malganis({
  historyOptions: {
    type: 'browser',
    basename: window.__POWERED_BY_QIANKUN__ ? '/app2' : undefined,
  },
  fetchingComp: LoadingComponent,
  clearPageStore: false, // 使用标签页不应该清空页面级Store
});

app.model(userStore);

app.router(RegisterRouter);

export default function App(): JSX.Element {
  return (
    <AliveScope>
      <ConfigProvider locale={locale.zh_CN} prefixCls="app2-ant">
        {app.start()}
      </ConfigProvider>
    </AliveScope>
  );
}

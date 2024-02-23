import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
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
    // basename: window.__POWERED_BY_QIANKUN__ ? '/app1' : undefined,
    basename: '/app1',
  },
  fetchingComp: LoadingComponent,
  clearPageStore: false,
});

app.model(userStore);

app.router(RegisterRouter);

export default function App(): JSX.Element {
  return (
    <AliveScope>
      <ConfigProvider locale={zhCN} prefixCls="app1-ant">
        {app.start()}
      </ConfigProvider>
    </AliveScope>
  );
}

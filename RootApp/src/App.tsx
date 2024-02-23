import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, locale } from '@m-tools/antd-ext';
import malganis from 'malganis';
import { Router, Switch } from 'malganis/router';
import type { History, IMalGanisApp } from 'malganis/lib/type';
import { MicroAppStateActions, loadMicroApp } from 'qiankun';
import type { Location, Action } from 'history';
import { UserStore, AppStore } from '@/stores';
import AppLayoutWrapper from '@/layout/AppLayoutWrapper';
import { listenRefreshAndHistoryChange } from './tabs';

function LoadingComponent(): React.ReactNode {
  return 'App Fetching Loading...';
}

export default function runReactApp(action: MicroAppStateActions) {
  const app = malganis({
    historyOptions: {
      type: 'browser',
    },
    fetchingComp: LoadingComponent,
  });

  const userStore = new UserStore(action);
  const appStore = new AppStore();

  app.model(appStore);
  app.model(userStore);

  app.router(({
    history,
  }: {
    history: History<unknown>;
  }) => {
    appStore.listenRefreshAndHistoryChange(history.location, 'PUSH');

    history.listen(appStore.listenRefreshAndHistoryChange);

    return (
      <Router history={history}>
        <Switch>
          <AppLayoutWrapper />
        </Switch>
      </Router>
    );
  });

  ReactDOM.render(
    <ConfigProvider locale={locale.zh_CN}>
      {app.start()}
    </ConfigProvider>,
    document.getElementById('root-main-app'),
  );
}

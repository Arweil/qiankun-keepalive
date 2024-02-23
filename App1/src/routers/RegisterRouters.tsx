import React, { useMemo } from 'react';
import dynamic from 'malganis/dynamic';
import type { History, IMalGanisApp } from 'malganis/lib/type';
import { Router, Switch, Route, Redirect, RouteComponentProps } from 'malganis/router';
import KeepAlive from 'react-activation';
import AppLayoutWrapper from '@/layout/AppLayoutWrapper';
import ScrollToTop from '@/routers/ScrollToTop';

export type KeepAliveHOCProps = {
  app: IMalGanisApp;
  component: () => Promise<any>;
  fetchingComp?: React.ReactNode;
  models?: (() => Promise<any>[]) | undefined;
} & RouteComponentProps;

function DynamicComponent(props: KeepAliveHOCProps) {
  const {
    app,
    component,
    fetchingComp,
    models,
    ...p
  } = props;

  const D = useMemo(() => (
    dynamic({
      app,
      component,
      models,
      fetchingComp,
    })
  ), []);

  return <D {...p} />;
}

function DynamicComponentKP(props: KeepAliveHOCProps) {
  const { location } = props;

  const k = `${location.pathname}${location.search}`;

  return (
    <KeepAlive id={k} name={k}>
      <DynamicComponent
        {...props}
      />
    </KeepAlive>
  );
}

function appRoutes(props: {
  app: IMalGanisApp,
}) {
  const {
    app,
  } = props;

  return (
    <ScrollToTop selectors="content-scroll">
      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route
          path="/Demo/DemoBaseCom/ThirdPage"
          component={(p: RouteComponentProps) => (
            <DynamicComponentKP
              app={app}
              component={() => import('@/pages/demoBaseCom/ThirdPage')}
              fetchingComp="custom fetching loading..."
              models={() => [import('@/pages/demoBaseCom/DemoStore')]}
              {...p}
            />
          )}
        />
        <Route
          path="/Demo/DemoBaseCom"
          component={(p: RouteComponentProps) => (
            <DynamicComponentKP
              app={app}
              component={() => import('@/pages/demoBaseCom')}
              fetchingComp="custom fetching loading..."
              models={() => [import('@/pages/demoBaseCom/DemoStore')]}
              {...p}
            />
          )}
        />
        <Route
          path="/Demo/DemoMulStore"
          component={(p: RouteComponentProps) => (
            <DynamicComponentKP
              app={app}
              component={() => import('@/pages/demoMulStore')}
              models={() => [
                import('@/pages/demoMulStore/stores/DemoStoreA'),
                import('@/pages/demoMulStore/stores/DemoStoreB'),
              ]}
              {...p}
            />
          )}
        />
        <Route
          path="/Demo/DemoNoStore"
          component={dynamic({
            app,
            component: () => import('@/pages/demoNoStore'),
          })}
        />
        <Route
          path="/500"
          component={dynamic({
            app,
            component: () => import('@/errorPages/Error'),
          })}
        />
        <Route
          path="/403"
          component={dynamic({
            app,
            component: () => import('@/errorPages/Forbidden'),
          })}
        />
        <Route
          path="/*"
          component={dynamic({
            app,
            component: () => import('@/errorPages/NotFoundPage'),
          })}
        />
      </Switch>
    </ScrollToTop>
  );
}

const RegisterRouter = ({
  app,
  history,
}: {
  app: IMalGanisApp;
  history: History<unknown>;
}): JSX.Element => (
  <Router history={history}>
    <Switch>
      {
        window.__POWERED_BY_QIANKUN__ ? appRoutes({ app }) : (
          <AppLayoutWrapper>
            { appRoutes({ app }) }
          </AppLayoutWrapper>
        )
      }
    </Switch>
  </Router>
);

export default RegisterRouter;

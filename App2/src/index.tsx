// import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import type { Action } from 'history';
import App, { history } from './App';
import './public-path';

// const HotApp = hot(App);

type OnGlobalStateChangeCallback =
  (state: Record<string, any>, prevState: Record<string, any>) => void;

interface IQiankunProps {
  container: HTMLElement;
  name: string;
  onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void;
  setGlobalState: (state: Record<string, any>) => boolean;
  mountParcel: () => void;
  singleSpa: any;
}

interface QiankunUpdateProps {
  routeInfo: {
    type: Action;
    url?: string;
  };
}

// const HotApp = hot(App);

if (!window.__POWERED_BY_QIANKUN__) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

export async function bootstrap() {
  console.log('App2 bootstrap');
}

export async function mount(props: IQiankunProps) {
  console.log('App2 mount', props);
  props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);

  ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

export async function unmount(props: IQiankunProps) {
  console.log('App2 unmount');
  const { container } = props;

  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#root') : document.getElementById('root'),
  );
}

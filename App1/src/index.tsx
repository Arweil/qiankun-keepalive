// import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.less';
import './public-path.js';

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

// const HotApp = hot(App);

console.log(window.__POWERED_BY_QIANKUN__);

if (!window.__POWERED_BY_QIANKUN__) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

export async function bootstrap() {
}

export async function mount(props: IQiankunProps) {
  props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);

  ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

export async function unmount(props: IQiankunProps) {
  const { container } = props;

  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#root') : document.getElementById('root'),
  );
}

import {
  registerMicroApps,
  start,
  initGlobalState,
} from 'qiankun';
import runReactApp from './App';

function startMicroApp() {
  registerMicroApps([
    {
      name: 'app1',
      entry: '//localhost:8881',
      container: '#container',
      activeRule: '/app1',
    },
    {
      name: 'app2',
      entry: '//localhost:8882',
      container: '#container',
      activeRule: '/app2',
    },
  ]);

  const action = initGlobalState({});

  start({
    prefetch: true,
    sandbox: true,
    singular: true,
  });

  return action;
}

function run() {
  // const action = startMicroApp();
  const action = initGlobalState({});

  runReactApp(action);
}

run();

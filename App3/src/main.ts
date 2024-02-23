import { createApp, markRaw,  } from 'vue';
import type { AppContext, App as VueApp  } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import '@/assets/style/theme/custom.less';
import App from './App.vue';
import 'dayjs/locale/zh-cn';
import './assets/style/main.less';
import router, { routerHistory } from './routers';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

export let globalComponents: AppContext['components'];
let globalApp: VueApp;
const startApp = () => {
  const app = createApp(App);
  app.use(Antd);
  app.use(router);
  const pinia = createPinia();
  // 添加新的外部属性
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  });
  app.use(pinia);
  globalComponents = app._context.components;

  // app.config.globalProperties.foo = 'bar';

  globalApp = app;
  return app;
};

// TODO: for qiankun

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  // createApp(App).use(router).use(ElementPlus).use(createPinia()).mount('#app');
  const app = startApp();
  app.mount('#container-app3');
} else {
  renderWithQiankun({
    mount(props) {
      console.log('cdp --mount');

      const app = startApp();
      app.mount(
        (props.container
          ? props.container.querySelector('#container-app3')
          : document.getElementById('container-app3')) as Element
      );
    },
    bootstrap() {
      console.log('cdp --bootstrap');
    },
    update() {
      console.log('cdp --update');
    },
    unmount() {
      console.log('cdp --unmount');
      globalApp?.unmount();
      routerHistory.destroy();
    },
  });
}

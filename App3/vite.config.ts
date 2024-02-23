import { fileURLToPath, URL } from 'node:url'
import path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    qiankun('app3', {
      useDevMode: true,
    }),
  ],
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url))
    // }
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/style/variable.less";',
        // TODO: 不要使用全量引入样式表ant-design-vue/dist/antd.less，改为仅修改变量
        // modifyVars: { 'primary-color': 'red' }, // for custom theme
      },
    },
  },
})

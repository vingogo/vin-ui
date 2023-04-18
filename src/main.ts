import { createSSRApp } from 'vue';
import App from './App.vue';

import '@vingogo/uni-ui/styles/extends/index.scss';

export function createApp() {
  const app = createSSRApp(App);

  return {
    app,
  };
}

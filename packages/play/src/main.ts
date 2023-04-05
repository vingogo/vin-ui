import { createSSRApp } from 'vue';

import App from './App.vue';
import '@vingogo/uni-ui/lib/styles/themes/default.scss';

export function createApp() {
  const app = createSSRApp(App);

  return {
    app,
  };
}

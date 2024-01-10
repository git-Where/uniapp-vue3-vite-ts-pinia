import 'uno.css';
import { createSSRApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import uviewPlus from 'uview-plus'
// wxd180602a078f0f39
export function createApp() {
  const app = createSSRApp(App).use(store).use(uviewPlus);
  return {
    app
  };
}

import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import { createPinia } from 'pinia';
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import * as echarts from 'echarts';
loadFonts();
const app = createApp(App);
app.use(Toast, {
  position: 'bottom-right',
  maxToasts: 5,
  rtl: true,
});
app.config.globalProperties.$totas = useToast();
app.config.globalProperties.$echarts = echarts;
app.use(router).use(createPinia()).use(vuetify).mount('#app');

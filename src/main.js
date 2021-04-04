import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import '../node_modules/element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import 'element-plus/lib/theme-chalk/display.css';

const app = createApp(App)
app.use(ElementPlus).use(router)
app.mount('#app')
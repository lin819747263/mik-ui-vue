import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index';
import axios from '@/plugins/axiosInstance.js'
import moment from 'moment';



const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$moment = moment;

app.mount('#app');

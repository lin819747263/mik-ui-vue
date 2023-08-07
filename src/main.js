import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index';
import {API, $get, $post} from '@/plugins/axiosInstance.js'
import moment from 'moment';



const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router);
app.config.globalProperties.$axios = API;
app.config.globalProperties.$get = $get;
app.config.globalProperties.$post = $post;
app.config.globalProperties.$moment = moment;

app.mount('#app');


import '@/utils/config'
import Vue from 'vue'
import Home from './Community.vue'
import Request from '@/utils/web.js'
import * as echarts from "echarts";

import { Button, Dialog, Table, Pagination } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const components = [
  Button,
  Dialog,
  Table,
  Pagination,
];

components.forEach((component) => {
  Vue.use(component);
})


Vue.prototype.$ELEMENT = { size: 'small'};
Vue.use(Button);

//eventBus
let bus = new Vue;
Vue.prototype.$bus = bus;

//echarts
Vue.prototype.$echarts = echarts

//websocket site
Vue.prototype.$websSite ='ws://elder.fanmiot.cn:8202/chat'

//axios
Vue.prototype.$request = Request

Vue.config.productionTip = false;

new Vue({
  render: h => h(Home)
}).$mount('#app');




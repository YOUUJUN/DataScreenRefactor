
import '@/utils/config'
import Vue from 'vue'
import store from './store'
import Home from './Community.vue'
import Request from '@/utils/web.js'
import * as echarts from "echarts";

import { Button, Dialog, Table, Pagination, Tooltip, Scrollbar } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const components = [
  Button,
  Dialog,
  Table,
  Pagination,
  Tooltip,
  Scrollbar,
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

//axios
Vue.prototype.$request = Request

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




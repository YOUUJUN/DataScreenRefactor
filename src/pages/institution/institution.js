
import '@/utils/config'
import Vue from 'vue'
import Home from './Institution.vue'
import Request from '@/utils/web.js'
import * as echarts from "echarts";

//添加 websocket
import SocketService from '@/api/socketService'
//触发对于服务器的socket连接
SocketService.Instance.connect();

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

//websocket
Vue.prototype.$socket = SocketService.Instance;

Vue.config.productionTip = false;

new Vue({
  render: h => h(Home)
}).$mount('#app');




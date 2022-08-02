import Vue from 'vue'
import Home from './Community.vue'
import * as echarts from "echarts";

import { Button, Dialog, Table } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const components = [
  Button,
  Dialog,
  Table,
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

Vue.config.productionTip = false;

new Vue({
  render: h => h(Home)
}).$mount('#app');




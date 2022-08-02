import Vue from 'vue'
import Home from './Community.vue'
import * as echarts from "echarts";

import { Button, Dialog } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const components = [
  Button,
  Dialog,
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

Vue.config.productionTip = false;

new Vue({
  render: h => h(Home)
}).$mount('#app');




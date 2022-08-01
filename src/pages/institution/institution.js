import Vue from 'vue'
import Home from './Institution.vue'

//全局组件
import { Button } from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small'};
Vue.use(Button);


//eventBus
let bus = new Vue;
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

new Vue({
  render: h => h(Home)
}).$mount('#app');




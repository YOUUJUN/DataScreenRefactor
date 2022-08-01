import Vue from 'vue'
import Home from './Test.vue'

//全局组件


//eventBus
let bus = new Vue;
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

new Vue({
  render: h => h(Home)
}).$mount('#app');




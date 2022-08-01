import Vue from 'vue'
import Home from './Developer.vue'

//eventBus
let bus = new Vue;
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

new Vue({
  render: h => h(Home)
}).$mount('#app');




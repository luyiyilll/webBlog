import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './directives'
import './components'
import store from './store'
import Message from './plugins/message'
Vue.use(Message)
Vue.prototype.$message = Message;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入插件
import VueSweetalert2 from './plugins/vue-sweetalert2'
// 使用插件
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

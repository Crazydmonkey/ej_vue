// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Router)
import Router from 'vue-router'
 
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

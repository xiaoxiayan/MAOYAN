import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//这里定义一个插件，用来写组件
import commonUi from './common'

Vue.use(commonUi)

Vue.config.productionTip = false

var vm = new Vue()

Vue.prototype.$center = vm

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

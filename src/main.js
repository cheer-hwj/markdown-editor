import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/root.css'
import '@/assets/css/format.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

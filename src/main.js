import Vue from 'vue'
import App from './App.vue'
import Tree from './tree'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import './plugins/swal'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSimpleContextMenu from './components/contextMenu/index.js'
Vue.component('vue-simple-context-menu', VueSimpleContextMenu)

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.prototype.$http = axios

Vue.use(Tree)



new Vue({
  render: h => h(App)
}).$mount('#app')
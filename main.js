import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

// vuex
import store from '@/store'

Vue.config.productionTip = false

Vue.prototype.$store = store

import Request from '@/utils/luch-request/index.js'
const http = new Request();


http.setConfig((config) => { /* config 为默认全局配置*/
    config.baseURL = 'http://172.16.5.55:8181/api/'; /* 根域名 */
    
    return config
})

Vue.prototype.$http = http;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

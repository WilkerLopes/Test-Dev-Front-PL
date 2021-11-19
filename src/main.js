import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ToastService from "./services/toast.service"

import "./styles/main.css"

Vue.prototype.$toast = ToastService

Vue.config.ignoredElements = [/^ion-/]
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")

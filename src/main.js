import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css' // reset.css
import './assets/fonts/iconfont.css' // iconfont.css
import ElementUI from 'element-ui'; // element JS
import 'element-ui/lib/theme-chalk/index.css'; // element CSS
// 引入本地存储工具函数
import local from "@/utils/local";

// 创建bus
const bus = new Vue();
Vue.prototype.$bus = bus;

Vue.use(ElementUI); // 注册

// 路由守卫（拦截所有路由 进入所有路由之前 必须先走路由守卫）
router.beforeEach((to, from, next) => {
  // 从本地存储获取token
  let token = local.get('token')

  if (token) { // 如果token存在，证明是登录成功进来的
    next() // 放行

  } else { // 如果token不存在，证明没有登录，翻墙进来的
    // 如果要去的是登录  直接放行
    if (to.path === '/login') {
      next()
    } else { // 否则要去其他地址，直接跳转到登录界面
      next('/login')
    }
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

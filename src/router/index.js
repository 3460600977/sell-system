import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      // 后台首页
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home', title: '后台首页' }
          ]
        },
        path: '',
        component: () => import('../views/Index.vue'),
      },
      // 订单管理
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/ordermanage', title: '订单管理' }
          ]
        },
        path: '/home/ordermanage',
        component: () => import('../views/Order/OrderManage.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/ordermanage', title: '订单详情' }
          ]
        },
        name: 'orderdetail',
        path: '/home/orderdetail',
        component: () => import('../views/Order/OrderDetail.vue'),
      },
      // 商品管理
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/goodslist', title: '商品管理' },
            { path: '/home/goodslist', title: '商品列表' },
          ]
        },
        path: '/home/goodslist',
        component: () => import('../views/GoodsManage/GoodsList.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/goodslist', title: '商品管理' },
            { path: '/home/goodsadd', title: '商品添加' },
          ]
        },
        path: '/home/goodsadd',
        component: () => import('../views/GoodsManage/GoodsAdd.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/goodslist', title: '商品管理' },
            { path: '/home/goodsedit', title: '商品编辑' },
          ]
        },
        path: '/home/goodsedit',
        component: () => import('../views/GoodsManage/GoodsEdit.vue'),
      },
      // 店铺管理
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/shopmanage', title: '店铺管理' }
          ]
        },
        path: '/home/shopmanage',
        component: () => import('../views/ShopManage.vue'),
      },
      // 账号管理
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/accountList', title: '账号管理' },
            { path: '/home/accountList', title: '账号列表' },
          ]
        },
        path: '/home/accountList',
        component: () => import('../views/AccountManage/AccountList.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/accountList', title: '账号管理' },
            { path: '/home/accountadd', title: '账号添加' },
          ]
        },
        path: '/home/accountadd',
        component: () => import('../views/AccountManage/AccountAdd.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/accountList', title: '账号管理' },
            { path: '/home/passwordmodify', title: '密码修改' },
          ]
        },
        path: '/home/passwordmodify',
        component: () => import('../views/AccountManage/PasswordModify.vue'),
      },
      // 销售统计
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/goodstotal', title: '销售统计' },
            { path: '/home/goodstotal', title: '商品统计' },
          ]
        },
        path: '/home/goodstotal',
        component: () => import('../views/SalesTotal/GoodsTotal.vue'),
      },
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/goodstotal', title: '销售统计' },
            { path: '/home/ordertotal', title: '订单统计' },
          ]
        },
        path: '/home/ordertotal',
        component: () => import('../views/SalesTotal/OrderTotal.vue'),
      },
      // 个人中心
      {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/personal', title: '个人中心' }
          ]
        },
        path: '/home/personal',
        component: () => import('../views/Personal.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routers from './../router.js'
import Vuex from 'vuex'
import './stylesheet/index.scss'
import product_data from '../product.js';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false

const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0,0);
})

const store = new Vuex.Store({
  state: {
    //商品列表数据
    productList: [],
    //购物车数据
    cartList: []
  },
  getters: {
    brands: state => {
      const brands = state.productList.map( item => item.brand);
      return getFilterArray(brands)
    },
    colors: state => {
      const colors = state.productList.map(item => item.color);
      return getFilterArray(colors)
    }
  },
  mutations: {
    //添加商品列表
    setProductList (state,data) {
      state.productList = data;
    },
    addCart (state,id) {
      //先判断购物车是否已有，如果有，数量+1
      const isAdded = state.cartList.find(item => item.id === id);
      if (isAdded) {
        isAdded.count ++;
      } else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    editCartCount (state, payload) {
      const product = state.cartList.find(item => item.id === payload.id);
      product.count += payload.count;
    },
    deleteCart (state, id) {
      const index = state.cartList.findIndex(item => item.id === id);
      state.cartList.splice(index,1);
    }
  },
  actions: {
    //请求商品列表
    getProductList (context) {
      setTimeout(() => {
        context.commit('setProductList', product_data);
      },500)
    }
  }
})
function getFilterArray (array) {
  const res = [];
  const json = {};
  for (let i = 0; i< array.length; i++) {
    const _self = array[i];
    if (!json[_self]){
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => {
    return h(App)
  }
})

import { resolve } from "url";

const routers = [
  {
    path: '/list',
    meta: {
      title: '商品列表'
    },
    component: (resolve) => require(['./src/views/list.vue'],resolve)
  },
  {
    path: '/product/:id',
    meta: {
      title: '商品详情'
    },
    component: (resolve) => require(['./src/views/product.vue'],resolve)
  },
  {
    path: '*',
    redirect: '/list'
  }
];
export default routers;
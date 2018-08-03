import Vue from 'vue'
import product from '@/components/product'

describe('product.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(product)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})

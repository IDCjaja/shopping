<template>
  <div v-if="product">
    <div class="product-introduce">
      <div class="product-image">
        <img :src="product.image" />
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-cost">￥ {{ product.cost }}</div>
        <div class="product-add-cart"
          @click="handleAddToCart">加入购物车</div>
      </div>
    </div>
    <div class="product-desc">
      <h2>产品介绍</h2>
      <img v-for="n in 10"
        :key="n"
        :src="'http://ordfm6aah.bkt.clouddn.com/shop/' + n + '.jpeg'" />
    </div>
  </div>
</template>

<script>
import product_data from '../../product.js';
export default {
  data () {
    return {
      id: parseInt(this.$route.params.id),
      product: null
    }
  },
  mounted () {
    this.getProduct();
  },
  methods: {
    getProduct () {
      setTimeout(() => {
        this.product = product_data
          .find(item => item.id === this.id)
      }, 500);
    },
    handleAddToCart () {
      this.$store.commit('addCart', this.id);
    }
  }
}
</script>

<style>

</style>

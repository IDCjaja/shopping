<template>
  <div v-show="list.length">
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌：</span>
        <span 
          class="list-control-filter-item"
          :class="{on: item === filterBrand}"
          v-for="item in brands"
          @click="handleFilterBrands(item)"
          :key="item.id">{{ item }}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色：</span>
        <span 
          class="list-control-filter-item"
          :class="{on: item === filterColor}"
          v-for="item in colors"
          @click="handleFilterColors(item)"
          :key="item.id">{{ item }}</span>
      </div>
      <div class="list-control-order">
        <span>排序：</span>
        <span
          class="list-control-order-item"
          :class="{on: order === ''}"
          @click="handleOrderDefault">默认</span>
        <span
          class="list-control-order-item"
          :class="{on: order === 'sales' }"
          @click="handleOrderSales">
          销量
          <template v-if="order === 'sales'">↓</template>
        </span>
        <span
          class="list-control-order-item"
          :class="{on: order.indexOf('cost') > -1}"
          @click="handleOrderCost">价格
          <template v-if="order === 'cost-asc'">↑</template>
          <template v-if="order === 'cost-desc'">↓</template>
        </span>
      </div>
    </div>
    <Product
      v-for="item in filteredAndOrderedList"
      :info="item"
      :key="item.id"></Product>
    <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
  </div>
</template>

<script>
import Product from '../components/product.vue'
export default {
  data () {
    return {
      order: '',
      filterBrand: '',
      filterColor: ''
    }
  },
  mounted () {
    //初始化时，通过vuex的action请求数据
    return this.$store.dispatch('getProductList')
  },
  components: {
    Product
  },
  computed: {
    list() {
      return this.$store.state.productList;
    },
    brands() {
      return this.$store.getters.brands;
    },
    colors () {
      return this.$store.getters.colors;
    },
    filteredAndOrderedList () {
      let list = [...this.list]
      //按品牌过滤
      if (this.filterBrand !== '') {
        list = list.filter(item => item.brand === this.filterBrand);
      }
      //按颜色过滤
      if (this.filterColor !== '') {
        list = list.filter(item => item.color === this.filterColor);
      }
      //排序
      if (this.order !== '') {
        if (this.order === 'sales') {
          list = list.sort((a, b) => b.sales - a.sales);
        } else if (this.order === 'cost-desc') {
          list = list.sort((a, b) => b.cost - a.cost);
        } else if (this.order === 'cost-asc') {
          list = list.sort((a, b) => a.cost - b.cost);
        }
      }
      return list;
    }
  },
  methods: {
    handleOrderDefault () {
      this.order = '';
    },
    handleOrderSales () {
      this.order = 'sales';
    },
    handleOrderCost () {
      if (this.order === 'cost-desc') {
        this.order = 'cost-desc';
      } else {
        this.order = 'cost-desc';
      }
    },
    handleFilterBrands (brand) {
      //单次点击选中，再次点击取消选中
      if (this.filterBrand === brand) {
        this.filterBrand = '';
      } else {
        this.filterBrand = brand;
      }
    },
    handleFilterColors (color) {
      if(this.filterColor === color) {
        this.filterColor = '';
      } else {
        this.filterColor = color;
      }
    }
  }
}
</script>

<style>

</style>

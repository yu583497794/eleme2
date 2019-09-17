<template>
  <div class="menuList">
    <food></food>
    <cart></cart>
  </div>
</template>

<script type="text/ecmascript-6">
import Food from 'components/food/food'
import Cart from 'components/cart/cart'
export default {
  name: 'menu-list',
  components: {
    Food,
    Cart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

<template>
  <div class="menuList">
    <food :menuList="menuList"></food>
    <cart></cart>
  </div>
</template>

<script type="text/ecmascript-6">
import {getMenu} from 'api/seller'
import {mapGetters} from 'vuex'
import Food from 'components/food/food'
import Cart from 'components/cart/cart'
export default {
  name: 'menu-list',
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    _getMenu () {
      getMenu(this.seller.id).then((res) => {
        this.menuList = res.data
        console.log(res)
      })
    }
  },
  created () {
    this._getMenu()
  },
  computed: {
    ...mapGetters([
      'seller'
    ])
  },
  components: {
    Food,
    Cart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

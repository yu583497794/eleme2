<template>
  <div class="menuList">
    <food :menuList="menuList" :loading="loading"></food>
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
      menuList: [],
      loading: true
    }
  },
  methods: {
    _getMenu () {
      getMenu(this.seller.id).then((res) => {
        this.menuList = res.data
        this.loading = false
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

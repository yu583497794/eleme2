<template>
  <div class="user-center">
    <h2 class="title"><i class="iconfont">&#xe849;</i>我的收藏</h2>
    <div class="list-wrapper">
      <seller-list></seller-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import SellerList from 'base/seller-list/seller-list'
export default {
  name: 'user-center',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  components: {
    SellerList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .user-center
    position relative
    .title
      padding 2vw 4.333333vw
      font-size $font-size-large
      .favorite-icon
        margin-right 2.33333vw
</style>

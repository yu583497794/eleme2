<template>
  <div class="tab" id="tab">
    <router-link tag="div" class="tab-item" :to="'/miste/' + seller.id + '/menu'">
      <span class="tab-link">点餐</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="'/miste/' + seller.id + '/rating'">
      <span class="tab-link">评价</span>
    </router-link>
    <!-- this.$router.params.id === this.seller.id -->
    <router-link tag="div" class="tab-item" :to="'/miste/' + seller.id + '/seller-detail'">
      <span class="tab-link">商家</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
// import {EventUtil} from 'common/js/dom-util'
export default {
  name: 'tab',
  // props: {
  //   fixed: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  computed: {
    ...mapGetters([
      'seller'
    ])
  }
  // watch: {
  //   fixed (fixed) {
  //     let tab = document.getElementById('tab')
  //     if (fixed) {
  //       tab.style.position = 'fixed'
  //       tab.style.top = 0
  //       tab.style.left = 0
  //       tab.style.right = 0
  //     } else {
  //       tab.style.position = 'static'
  //       tab.style.top = ''
  //       tab.style.left = ''
  //       tab.style.right = ''
  //     }
  //   }
  // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .tab
    display flex
    width 100%
    height 44px
    line-height 44px
    font-size $font-size-medium
    background-color $color-background
    .tab-item
      flex 1 1 auto
      text-align center
      .tab-link
        padding-bottom 5px
        color $color-text-ll
      &.router-link-active
        .tab-link
          color $color-theme
          border-bottom 2px solid $color-theme
</style>

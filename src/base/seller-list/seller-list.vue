<template>
  <div class="seller-list">
    <ul v-if="user.favorite.length">
      <li class="seller-item"
        v-for="(item, index) in user.favorite"
        :key="index"
        @click="enterShop(item)">
        <div class="seller-avatar">
          <img  width="100%" height="100%" :src="item.image_path">
        </div>
        <div class="seller-desc">
          <h3 class="seller-name">{{item.name}}</h3>
          <p class="seller-base">
            <span class="seller-rating">
              <icon name="star" />{{item.rating}}
            </span>
            <span class="seller-text">月售{{item.recent_order_num}}</span>
          </p>
          <p class="seller-deliver">
            <span class="deliver-fee seller-text">起送¥{{item.float_minimum_order_amount}}</span>
            <span></span>
          </p>
        </div>
      </li>
    </ul>
    <div v-if="!user.favorite.length"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'seller-list',
  methods: {
    enterShop (seller) {
      this.setSeller(seller)
      this.$router.push({
        path: `/miste/${seller.id}`
      })
    },
    ...mapMutations({
      setSeller: 'SET_SELLER'
    })
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .seller-list
    background $color-background-d
    .seller-item
      padding 5vw 0
      margin 0 5vw
      display flex
      border-bottom 0.5px solid $color-dialog-background
      &:last-child
        border none
      .seller-avatar
        flex 0 0 23.333333vw
        margin-right 2.333333vw
      .seller-desc
        flex 1
        display flex
        flex-direction column
        justify-content space-around
        font-size $font-size-medium
        color $color-text-l
        .seller-name
          color $color-text
          font-size $font-size-medium-x
          font-weight 700
        .seller-rating
          color $color-theme
</style>

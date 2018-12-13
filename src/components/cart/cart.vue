<template>
  <div class="cart" @click.stop>
    <div class="active-tip">满22减4元，满30减8元，满45减15元???</div>
    <div class="cart-list" v-if="showCartList">
      <div class="cart-list-title">
        <span>已选商品</span>
        <div class="clear">
          <icon name="clear" scale="1.2"></icon>
          <span>清空</span>
        </div>
      </div>
      <ul class="cart-list-main">
        <li class="cart-item" v-for="(item, index) in cartList" :key="index">
          <div class="item-inf">
            <p class="name">{{item.name}}</p>
            <p class="spec-attr">{{item.spec}}{{item.attr}}</p>
          </div>
          <div class="price">¥{{item.price * item.count}}</div>
          <div class="cart-button-wrapper">
            <cart-button :food="item" :direct=true></cart-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-main">
      <div class="icon-wrapper" @click="toggleCartList">
        <span class="circle" :class="{'actived': totalCount > 0}">
          <icon name="cart" class="cart-icon" scale="2.5"></icon>
          <span class="total-count" v-if="totalCount > 0">{{totalCount}}</span>
        </span>
      </div>
      <div class="price">
        <section v-if="cartList.length === 0">
          <p>未选购商品</p>
          <p>另需配送费¥{{seller.delivery_fee_discount}}</p>
        </section>
        <section v-if="cartList.length > 0">
          <p class="money">¥{{totalMoney}}</p>
          <p>另需配送费¥{{seller.delivery_fee_discount}}</p>
        </section>
      </div>
      <div class="button">
        <section v-if="cartList.length === 0">
          <p class="text">¥{{seller.float_minimum_order_amount}}起送</p>
        </section>
        <section v-if="cartList.length !== 0 && banlance > 0">
          <p class="text">还差¥{{banlance}}起送</p>
        </section>
        <section v-if="cartList.length !== 0 && banlance <= 0" class="meet-min-fee">
          <p class="text">去结算</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import CartButton from 'base/cart-button/cart-button'
export default {
  name: 'cart',
  data () {
    return {
      showCartList: false
    }
  },
  computed: {
    totalCount () {
      let count = 0
      this.cartList.forEach(item => {
        count += item.count
      })
      console.log(this.cartList)
      return count
    },
    totalMoney () {
      let money = 0
      this.cartList.forEach(item => {
        money += item.count * item.price
      })
      return money
    },
    banlance () {
      return this.seller.float_minimum_order_amount - this.totalMoney
    },
    ...mapGetters([
      'cartList',
      'seller'
    ])
  },
  methods: {
    toggleCartList () {
      this.showCartList = !this.showCartList
    }
  },
  components: {
    CartButton
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .cart
    position fixed
    bottom 0
    left 0
    right 0
    background-color #505051
    .active-tip
      line-height 5.333333vw
      font-size $font-size-small
      background $color-theme-dialog
      color $color-text-theme
      text-align center
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .cart-list
      .cart-list-title
        display flex
        justify-content space-between
        align-items center
        padding 0 4vw
        font-size $font-size-medium
        color $color-font-l
        background $color-dialog-background
        height 10.666667vw
      .cart-list-main
        max-height 146.6666667vw
        overflow-y scroll
        padding 0 4vw
        .cart-item
          display flex
          min-height: 14.666667vw
          align-items center
          border-bottom .5px solid rgba(255, 255, 255, 0.2)
          .item-inf
            flex 6.5
            .name
              font-size $font-size-medium
            .spec-attr
              font-size $font-size-small
          .price
            flex 1.5
            display flex
            justify-content flex-end
          .cart-button-wrapper
            flex 2.5
            display flex
            justify-content flex-end
    .cart-main
      display flex
      height 12.8vw
      background $color-dialog-background
      .icon-wrapper
        position relative
        flex 0 0 21.066667vw
        text-align center
        overflow visible
        .circle
          position absolute
          display inline-block
          width 13.333333vw
          height 13.333333vw
          box-sizing border-box
          top -2.333333vw
          left 50%
          transform translate3d(-50%, 0, 0)
          border-radius 50%
          border 1.666667vw solid #444444
          background #363636
          display flex
          justify-content center
          align-items center
          .cart-icon
            fill $color-text-l
          &.actived
            background $color-theme
            .cart-icon
              fill #ffffff
          .total-count
            display inline-block
            position absolute
            top -1.333333vw
            right -2.333333vw
            border-radius 50%
            background #ff4b15
            width 4.333333vw
            height 4.333333vw
            line-height 4.333333vw
            text-align center
            font-size $font-size-small-s
      .price
        flex 1
        display flex
        align-items center
        .text
          line-height $font-size-medium
          color #808080
        .money
          font-size $font-size-medium
          color #ffffff
          font-weight 700
      .button
        flex 0 0 28vw
        background-color #535356
        display flex
        justify-content center
        align-items center
        font-size $font-size-medium
        .text
          // font-weight不会继承父元素的值
          font-weight 700
        .meet-min-fee
          display inline-block
          width 100%
          height 100%
          background-color #38ca73
          position relative
          p
            position absolute
            width 100%
            text-align center
            top 50%
            transform translate3d(0, -50%, 0)
</style>

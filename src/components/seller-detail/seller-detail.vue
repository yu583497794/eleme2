<template>
  <div class="seller-detail">
    <div class="delivery-info info-panel">
      <h3>配送信息</h3>
      <div class="delivery-info-text text">
        由蜂鸟快送提供配送服务, 约{{seller.float_minimum_order_amount}}分钟送达,距离{{getDistance}}<br>配送费￥{{seller.float_delivery_fee}}
      </div>
    </div>
    <div class="activities-info info-panel">
      <h3>活动与服务</h3>
      <ul>
        <li class="info-item" v-for="(item, index) in seller.activities" :key="index">
            <span :class="classMap(item.icon_name)" class="active-icon">{{item.icon_name}}</span>
            <span class="text">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="scence info-panel">
      <h3>实景拍摄</h3>
      <div class="scence-swiper-container">
        <ul class="swiper-wrapper">
        </ul>
      </div>
    </div>
    <div class="seller-info info-panel">
      <h3>商家信息</h3>
      <ul>
        <li class="info-item info-item-text text">{{seller.promotion_info}}</li>
        <li class="info-item">
          <span class="info-item-title">品类</span>
          <span class="info-item-text text">{{getSupporttags}}</span>
        </li>
        <li class="info-item">
          <span class="info-item-title">商家电话</span>
          <span class="info-item-text text">{{seller.phone}}</span>
        </li>
        <li class="info-item">
          <span class="info-item-title">地址</span>
          <span class="info-item-text text">{{seller.address}}</span>
        </li>
        <li class="info-item">
          <span class="info-item-title">营业时间</span>
          <span class="info-item-text text">{{seller.opening_hours[0]}}</span>
        </li>
      </ul>
    </div>
    <div class="qualification info-panel">
      <h3>
        <span class="title">商家信息</span>
        <span class="icon">
          <icon name="enter" scale="2"></icon>
        </span>
      </h3>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
const nameMap = new Map()
  .set('首', 'first')
  .set('减', 'decrease')
  .set('折', 'discount')
  .set('票', 'invoice')
  .set('特', 'special')
  .set('换', 'change')
  .set('惠', 'privilege')
export default {
  name: 'seller-detail',
  data () {
    return {

    }
  },
  methods: {
    classMap (key) {
      return nameMap.get(key)
    }
  },
  computed: {
    getSupporttags () {
      let tags = ''
      if (this.seller.flavors && this.seller.flavors.length > 0) {
        this.seller.flavors.forEach((item) => {
          tags += (item.name + '/')
        })
      }
      tags = tags.slice(0, -1)
      return tags
    },
    getDistance () {
      if (this.seller.distance > 1000) {
        return (this.seller.distance / 1000).toFixed(1) + 'km'
      } else {
        return this.seller.distance + 'm'
      }
    },
    ...mapGetters([
      'seller'
    ])
  },
  mounted () {
    console.log(this.seller)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .seller-detail
    background $color-dialog-background
    .info-panel
      background $color-background
      margin-bottom 2.133333vw
      padding 4.266667vw 4vw 4vw
      h3
        color $color-text
        font-weight 700
        font-size $font-size-medium
      .text
        color $color-text-l
      &.activities-info
        .info-item
          margin  1.666667vw 1.333333vw 1.666667vw 0
          &:first-child
            margin-top 4vw
          &:last-child
            margin-bottom 0
          .active-icon
            border-radius 2px
            padding 1.666667px
            &.first
              background-color rgb(112, 118, 70)
            &.decrease
              background-color rgb(240, 115, 115)
            &.discount
              background-color rgb(240, 115, 115)
            &.invoice
              background-color rgb(153, 153, 153)
            &.special
              background-color rgb(241, 136, 79)
            &.change
              background-color rgb(241, 136, 79)
            &.privilege
              background-color rgb(240, 115, 115)
      &.seller-info
        .info-item
          padding 4vw 4vw 4vw 0
          display flex
          justify-content space-between
          border-bottom 0.5px solid $color-dialog-background
          .info-item-title
            flex 3
          .info-item-text
            flex 7
            text-align right
          &:last-child
            padding-bottom 0
            border-bottom 0
      &.delivery-info
        .delivery-info-text
          padding-top 4vw
      &.qualification
        h3
          display flex
          justify-content space-between
          align-items center
          .title
            display inline-block
            font-weight 700
          .icon
            display inline-block
</style>

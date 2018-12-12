<template>
  <div class="cart-button" @click.stop="hiddenSpec" @scroll.stop>
    <div class="button-group">
      <span class="minus">
        <icon class="icon" name="minus" scale="1.5" fill="#ffcd32"></icon>
      </span>
      <span class="add" @click.stop="addFood">
        <icon class="icon" name="add-fill" scale="1.5" fill="#ffcd32"></icon>
      </span>
    </div>
    <div class="spec-wrapper" v-if="specShow && food.specifications.length > 0">
      <div class="spec-content">
        <div class="specpanel-header">
          <div class="food-icon">
            <img :src="getUrl(food.image_path)">
          </div>
          <div class="food-desc">
            <h3 class="name">{{food.name}}</h3>
            <ul class="selected">
              <span>已选:</span>
            </ul>
            <div class="price">¥{{currentPrice}}</div>
          </div>
          <div class="close">
            <icon name="close" scale="1.5" @click.stop="hiddenSpec"></icon>
          </div>
        </div>
        <div class="specpanel-body">
          <div class="specpanel-main">
            <p class="specpanel-colTitle">{{food.specifications[0].name}}</p>
            <ul class="specpanel-content">
              <li v-for="(value, index) in food.specifications[0].values"
                :key="index"
                class="specpanel-item"
                @click.stop="selectSpec(index)"
                :class="{'current-spec': currentSpec === index, 'invalid': !(priceList.length > 0)}"><span>{{value}}</span></li>
            </ul>
          </div>
          <ul v-for="(attr, aIndex) in food.attrs" :key="aIndex" class="specpanel-main">
            <p class="specpanel-colTitle">{{attr.name}}</p>
            <ul class="specpanel-content">
              <li v-for="(value, vIndex) in attr.values" :key="vIndex" class="specpanel-item">{{value}}</li>
            </ul>
          </ul>
        </div>
        <div class="submit">选好了</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {extraUrl} from 'common/js/banner'
export default {
  name: 'cart-button',
  data () {
    return {
      specShow: false,
      currentSpec: 0,
      currentPrice: 0,
      priceList: []
    }
  },
  props: {
    food: {
      type: Object,
      default: null
    }
  },
  methods: {
    getUrl (path) {
      return extraUrl(path)
    },
    addFood () {
      if (this.food.specifications) {
        this.specShow = true
      }
    },
    hiddenSpec () {
      this.specShow = false
    },
    selectSpec (index) {
      if (!this.priceList[index]) {
        return
      }
      this.currentSpec = index
    }
  },
  watch: {
    currentSpec (newVal) {
      this.currentPrice = this.priceList[newVal]
    }
  },
  created () {
    if (this.food.specifications.length !== 0) {
      this.food.specifications[0].values.forEach((value, index) => {
        this.food.specfoods.forEach(spec => {
          if (spec.specs[0].value === value) {
            this.priceList[index] = spec.price
          }
        })
      })
      this.priceList.forEach((item, index) => {
        if (item !== undefined) {
          this.currentSpec = index
          this.currentPrice = item
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .cart-button
    .button-group
      .add
        margin-left 2.333333vw
        .icon
          fill $color-theme
    .spec-wrapper
      position fixed
      top 0
      bottom 0
      right 0
      left 0
      z-index 1
      background rgba(0, 0, 0, .7)
      .spec-content
        position fixed
        bottom 0
        left 0
        display flex
        flex-direction column
        padding 4.266667vw
        box-sizing padding-box
        background $color-background
        .specpanel-header
          display flex
          overflow hidden
          .food-icon
            flex 0 0 25.333333vw
            img
              width 100%
              height 100%
          .food-desc
            position relative
            margin-left 4.266667vw
            display flex
            flex-direction column
            justify-content flex-start
            flex 1
            .name
              font-size $font-size-medium-x
              color $color-text
              margin-bottom 1.333333vw
              font-weight 700
            .selected
              font-size $font-size-small
              color $color-text-l
            .price
              position absolute
              bottom 0
              left 0
              font-size $font-size-large
              color $color-text-price
        .specpanel-body
          display flex
          flex-direction column
          max-height 106.666667vw
          overflow-y scroll
          .specpanel-main
            margin 2.333333vw 0
            .specpanel-colTitle
              color $color-text-l
              font-size $font-size-medium
              margin-bottom 2.333333vw
            .specpanel-content
              display flex
              flex-wrap wrap
              justify-content flex-start
              .specpanel-item
                flex 0
                display inline-block
                margin 0 2.133333vw 3.2vw 0
                min-width 27.666667vw
                // min-height 8.533333vw
                border-radius .533333vw
                padding 2.666667vw 2.666667vw
                box-sizing border-box
                font-size $font-size-small
                color $color-text
                background $color-dialog-background
                line-height $font-size-small
                text-align center
                display flex
                align-items center
                justify-content center
                &.current-spec
                  background $color-text-l
                  color $color-theme
                &.invalid
                  color $color-text-l
                  background $color-dialog-background
      .submit
        height 10.666667vw
        background $color-theme
        border-radius .533333vw
        color $color-text
        font-size $font-size-medium
        text-align center
        line-height 10.666667vw
</style>

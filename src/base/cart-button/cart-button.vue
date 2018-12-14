<template>
  <div class="cart-button" @click.stop="hiddenSpec" @scroll.stop>
    <div class="button-group">
      <transition name="fade-rotate">
        <span class="minus" @click.stop="minusFood" v-show="count > 0">
          <icon class="icon inner" name="minus" scale="1.5" fill="#ffcd32"></icon>
        </span>
      </transition>
      <span class="add" @click.stop="addFood">
        <icon class="icon" name="add-fill" scale="1.5" fill="#ffcd32"></icon>
      </span>
    </div>
    <transition name="fadeup">
      <div class="spec-wrapper" v-if="specShow && food.specifications.length > 0">
        <div class="spec-content">
          <div class="specpanel-header">
            <div class="food-icon">
              <img :src="getUrl(food.image_path)">
            </div>
            <div class="food-desc">
              <h3 class="name">{{food.name}}</h3>
              <ul class="selected">
                <p>已选:<span>{{food.specifications[0].values[currentSpec]}}</span>{{getAttr}}</p>
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
                  :class="{'current-spec': currentSpec === index, 'invalid': priceList[index] === undefined}"><span>{{value}}</span></li>
              </ul>
            </div>
            <ul v-for="(attr, aIndex) in food.attrs" :key="aIndex" class="specpanel-main">
              <p class="specpanel-colTitle">{{attr.name}}</p>
              <ul class="specpanel-content">
                <li v-for="(value, vIndex) in attr.values"
                  :key="vIndex"
                  class="specpanel-item"
                  @click.stop="selectAttr(aIndex, vIndex)"
                  :class="{'current-attr': attrList[aIndex] === vIndex || (!attrList[aIndex] && vIndex ===0)}">{{value}}</li>
              </ul>
            </ul>
          </div>
          <div class="submit" @click.stop="addSpecFood">选好了</div>
        </div>
      </div>
    </transition>
    <transition name="fade-out">
      <div class="decrease-tip" v-if="showTipFlag">
        多规格商品只能在购物车里删除呢~
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {extraUrl} from 'common/js/banner'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'cart-button',
  data () {
    return {
      specShow: false,
      currentSpec: 0,
      currentPrice: 0,
      priceList: [],
      initSpec: null,
      initPrice: null,
      attrList: [],
      showTipFlag: false,
      lastSpec: null,
      lastAttr: null
      // 要把数据关联起来
      // count: 0
    }
  },
  props: {
    food: {
      type: Object,
      default: null
    },
    direct: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getUrl (path) {
      return extraUrl(path)
    },
    addFood () {
      if (!this.direct) {
        if (this.food.specifications.length > 0) {
          this.specShow = true
        } else {
          let selectedFood = {
            item_id: this.food.item_id,
            name: this.food.name,
            price: this.initPrice,
            spec: null,
            attr: null,
            category: this.food.category_id,
            seller: this.$route.params.id
          }
          this.addFoodAction(selectedFood)
          // this.count++
        }
      } else {
        this.addFoodAction(this.food)
      }
    },
    addSpecFood () {
      let selectedFood = {
        item_id: this.food.item_id,
        name: this.food.name,
        price: this.currentPrice,
        spec: this.food.specifications[0].values[this.currentSpec],
        attr: this.getAttr,
        category: this.food.category_id,
        seller: this.$route.params.id
      }
      this.addFoodAction(selectedFood)
      this.lastSpec = selectedFood.spec
      this.lastAttr = selectedFood.attr
      // this.count++
      this.specShow = false
    },
    minusFood () {
      if (!this.direct) {
        if (this.food.specifications.length > 0) {
          if (this.count > 1) {
            this.showTip()
          } else {
            let selectedFood = {
              item_id: this.food.item_id,
              name: this.food.name,
              price: this.currentPrice,
              spec: this.lastSpec,
              attr: this.lastAttr,
              category: this.food.category_id,
              seller: this.$route.params.id
            }
            this.minusFoodAction(selectedFood)
          }
        } else {
          let selectedFood = {
            item_id: this.food.item_id,
            name: this.food.name,
            price: this.initPrice,
            spec: null,
            attr: null,
            category: this.food.category_id,
            seller: this.$route.params.id
          }
          // if (this.count > 0) {
          //   this.minusFoodAction(selectedFood)
          //   this.count--
          // }
          this.minusFoodAction(selectedFood)
        }
      } else {
        this.minusFoodAction(this.food)
      }
    },
    hiddenSpec () {
      this.init()
      this.specShow = false
    },
    selectSpec (index) {
      if (!this.priceList[index]) {
        return
      }
      this.currentSpec = index
    },
    init () {
      this.currentSpec = this.initSpec
      this.currentPrice = this.initPrice
    },
    selectAttr (aIndex, vIndex) {
      if (this.attrList[aIndex] === vIndex) {
        return
      }
      this.$set(this.attrList, aIndex, vIndex)
      // this.attrList[aIndex] = vIndex
    },
    showTip () {
      this.showTipFlag = true
      setTimeout(() => {
        this.showTipFlag = false
      }, 1500)
    },
    ...mapActions([
      'addFoodAction',
      'minusFoodAction'
    ])
  },
  computed: {
    getAttr () {
      let text = ''
      this.food.attrs.forEach((attr, aIndex) => {
        if (this.attrList[aIndex] === undefined) {
          text = text + '/' + attr.values[0]
        } else {
          text = text + '/' + attr.values[this.attrList[aIndex]]
        }
      })
      return text
    },
    count () {
      let count = 0
      this.cartList.forEach(item => {
        if (item.item_id === this.food.item_id) {
          count += item.count
        }
      })
      return count
    },
    ...mapGetters([
      'cartList'
    ])
  },
  watch: {
    currentSpec (newVal) {
      this.currentPrice = this.priceList[newVal]
    }
  },
  created () {
    if (!this.direct) {
      if (this.food.specifications.length !== 0) {
        this.food.specifications[0].values.forEach((value, index) => {
          this.food.specfoods.forEach(spec => {
            if (spec.specs[0].value === value) {
              this.priceList[index] = spec.price
            }
          })
        })
        let minIndex = 0
        let minPrice
        this.priceList.forEach((item, index) => {
          if (item !== undefined && minPrice === undefined) {
            minPrice = item
            minIndex = index
          } else {
            if (item !== undefined && minPrice > item) {
              minPrice = item
              minIndex = index
            }
          }
        })
        this.initPrice = minPrice
        this.initSpec = minIndex
        this.init()
      } else {
        this.initPrice = this.food.specfoods[0].price
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .cart-button
    .button-group
      .minus
        .inner
          transform rotate(0deg)
          display inline-block
        &.fade-rotate-enter-active,&.fade-rotate-leave-active
          transition all .5s ease
        &.fade-rotate-enter,&.fade-rotate-leave-to
          opacity 0
          transform translate3d(-2.333333vw, 0, 0)
          .inner
            transform rotate(180deg)
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
      z-index 2
      background rgba(0, 0, 0, .7)
      &.fadeup-enter-active,&.fadeup-leave-active
        transition all 0.3s ease
      &.fadeup-enter,&.fadeup-leave-to
        transform translate3d(0, 100%, 0)
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
              // flex-direction row-reverse
              // justify-content flex-end
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
                &.current-spec,&.current-attr
                  background $color-text-l
                  color $color-theme
                &.invalid
                  color $color-text-l
                  background $color-dialog-background-l
      .submit
        height 10.666667vw
        background $color-theme
        border-radius .533333vw
        color $color-text
        font-size $font-size-medium
        text-align center
        line-height 10.666667vw
    .decrease-tip
      position fixed
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      padding 15.333333vw
      width 50.666667vw
      font-size $font-size-small
      background $color-dialog-background
      color $color-text
      opacity 1
      z-index 1
      &.fade-out-enter-active,&.fade-out-leave-active
        transition all 0.3s ease
      &.fade-out-enter,&.fade-out-leave-to
        opacity 0
</style>

<template>
  <div class="food" id="food">
    <div class="menu-category">
      <ul class="menu-category-wrapper" ref="menu">
        <li class="menu-category-item"
        :class="{'active-category': currentIndex === index}"
        v-for="(category, index) in menuList"
        :key="index"
        @click="selectCategory(index)">
          <span>{{category.name}}</span>
          <span class="count-tip" v-if="categoryCountList[index] > 0">{{categoryCountList[index]}}</span>
        </li>
      </ul>
    </div>
    <div class="menu-list" ref="foodWrapper">
      <ul class="menu-category-list-wrapper">
        <li class="menu-category-list food-list-hook" v-for="(category, index) in menuList" :key="index">
          <h3 class="category-name">{{category.name}}<span class="desc">{{category.description}}</span></h3>
          <ul class="menu-category-list-item-wrapper">
            <li class="menu-category-list-item"
              v-for="(food, foodIndex) in category.foods"
              :key="foodIndex"
              @click.stop="selectFood(food)">
              <div class="image">
                <img v-lazy="getUrl(food.image_path)">
              </div>
              <div class="text">
                <!-- <div class="wrapper"> -->
                  <section>
                    <span class="name">{{food.name}}</span>
                  </section>
                  <section v-if="food.description">
                    <span class="desc">{{food.description}}</span>
                  </section>
                  <section>
                    <span>月售{{food.month_seles}}份</span>
                    <span>好评率{{food.satisfy_rate}}%</span>
                  </section>
                  <section class="price">
                    <span>¥{{getPrice(food)}}</span><span v-if="food.specfoods.length > 1">起</span>
                    <div class="cart-button-wrapper">
                      <cart-button :food="food"></cart-button>
                    </div>
                  </section>
                <!-- </div> -->
              </div>
            </li>
          </ul>
        </li>
        <li class="food-tip">没有更多了~</li>
      </ul>
    </div>
    <div ref="fixed-category"  id="fixed-category" class="fixed-category">
      <h3 class="category-name" v-if="fixed">{{fixedCategoryName}}<span class="desc">{{fixedCategoryDesc}}</span></h3>
    </div>
    <transition name="raise">
      <div class="food-detail" v-if="selectedFood.name" @scroll.stop>
        <div class="food-img">
          <img :src="getUrl(selectedFood.image_path)">
        </div>
        <div class="food-desc">
          <section>
            <h3 class="food-name">{{selectedFood.name}}</h3>
          </section>
          <section class="sales-and-rating">
            <span class="sales">月售{{selectedFood.month_sales}}份</span>
            <span>好评率{{selectedFood.satisfy_rate}}%</span>
          </section>
          <section class="price">
            <span>¥{{getPrice(selectedFood)}}</span><span v-if="selectedFood.specfoods.length > 1">起</span>
          </section>
          <section v-if="selectedFood.description" class="desc">
            <span>{{selectedFood.description}}</span>
          </section>
        </div>
        <div class="close" @click="closeDetail">
          <icon name="close" scale="2" class="icon-close"></icon>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {extraUrl} from 'common/js/banner'
import {EventUtil} from 'common/js/dom-util'
import CartButton from 'base/cart-button/cart-button'
import {mapGetters} from 'vuex'
const TITLE_HEIGHT = 28
export default {
  name: 'food',
  data () {
    return {
      top: 0,
      fixed: false,
      listHeight: [],
      currentIndex: 0,
      selectedFood: {}
    }
  },
  props: {
    menuList: {
      type: Array,
      default: null
    }
  },
  methods: {
    getPrice (food) {
      let minPrice = food.specfoods[0].price
      food.specfoods.forEach(spec => {
        if (spec.price < minPrice) {
          minPrice = spec.price
        }
      })
      return minPrice
      // if (food.specifications.length !== 0) {
      //   console.log('spec')
      //   food.specfoods.forEach((spec) => {
      //     spec.specs.forEach(item => {
      //       if (item.value === food.specifications[0].values[0]) {
      //         return spec.price
      //       }
      //     })
      //     if (spec.specs[0].value === food.specifications[0].values[0]) {
      //       return spec.price
      //     }
      //   })
      // } else {
      //   return food.specfoods[0].price
      // }
    },
    getUrl (path) {
      return extraUrl(path)
    },
    resetMenu () {
      const menu = this.$refs.menu
      menu.style.position = 'static'
      menu.style.top = ''
      menu.style.left = ''
      menu.style.right = ''
      menu.style.bottom = ''
      menu.style.overflow = 'auto'
    },
    fixedMenu () {
      const menu = this.$refs.menu
      menu.style.position = 'fixed'
      menu.style.top = this.top + 'px'
      menu.style.right = window.innerWidth * 0.75 + 'px'
      menu.style.left = 0
      menu.style.bottom = '12.8vw'
      menu.style.overflow = 'scroll'
    },
    _calculateHeight () {
      // 容易报错的地方
      let foodList = document.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      // foodList.forEach((item, index) => {
      //   height += item.clientHeight
      //   this.listHeight.push(height)
      // })
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height = height + item.clientHeight
        this.listHeight.push(height)
      }
    },
    // ???有必要保留么
    scrollHandler (event) {
      EventUtil.stop(event)
    },
    _initFixedCategory () {
      const category = this.$refs['fixed-category']
      // category.style.position = 'fixed'
      category.style.top = this.top + 'px'
      // category.style.right = 0
      category.style.left = window.innerWidth * 0.25 + 'px'
      // category.style['box-sizing'] = 'border-box'
      // category.style['z-index'] = 1
    },
    selectCategory (index) {
      if (this.currentIndex === index) {
        return
      }
      this.currentIndex = index
      window.eventBus.$emit('scrollToCat', this.listHeight[index])
    },
    selectFood (food) {
      this.selectedFood = food
    },
    closeDetail () {
      this.selectedFood = {}
    }
  },
  computed: {
    fixedCategoryName () {
      return this.menuList[this.currentIndex].name
    },
    fixedCategoryDesc () {
      return this.menuList[this.currentIndex].description
    },
    categoryCountList () {
      let list = new Array(this.menuList.length).fill(0)
      let i
      this.cartList.forEach(item => {
        i = -1
        this.menuList.forEach((category, index) => {
          if (category.foods[0].category_id === item.category && index !== 0) {
            i = index
          }
        })
        list[i] += item.count
      })
      // this.menuList.forEach((category, index) => {
      //   list[index] = 0
      //   time = 0
      //   this.cartList.forEach(item => {
      //     if (category.foods[0].category_id === item.category && index !== 0) {
      //       list[index] = list[index] + item.count
      //     }
      //   })
      // })
      return list
    },
    ...mapGetters([
      'cartList'
    ])
  },
  watch: {
    fixed (newVal) {
      if (newVal) {
        this.fixedMenu()
      } else {
        this.resetMenu()
      }
    },
    currentIndex (newVal) {
      // if (this.listHeight[newVal])
    }
    // 无效
    // menuList () {
    //   this.listHeight = []
    //   this._calculateHeight()
    // }
  },
  created () {
    window.eventBus.$on('eventFixed', (flag, height) => {
      this.top = height
      this.fixed = flag
      if (this.fixed) {
        // let category = this.$refs['fixed-category']
        let category = document.getElementById('fixed-category')
        category.style.top = this.top + 'px'
      }
    })
  },
  mounted () {
    // this.resetMenu()
    this.$nextTick(() => {
      setTimeout(() => {
        this._calculateHeight()
      }, 1000)
      this.resetMenu()
      // this._calculateHeight()
    })
    EventUtil.addHandler(this.$refs.menu, 'scroll', this.scrollHandler)
    window.eventBus.$on('foodScroll', (scrollTop) => {
      if (scrollTop < this.listHeight[this.currentIndex + 1] && scrollTop >= this.listHeight[this.currentIndex]) {
        // let diff = Math.max(0, Math.min(TITLE_HEIGHT - this.listHeight[this.currentIndex + 1] + scrollTop, TITLE_HEIGHT))
        let diff = Math.max(0, Math.min(TITLE_HEIGHT - this.listHeight[this.currentIndex + 1] + scrollTop, TITLE_HEIGHT))
        if (this.diff === diff) {
          return
        }
        this.diff = diff
        const category = document.getElementById('fixed-category')
        category.style.transform = `translate3d(0, -${diff}px, 0)`
        return
      }
      if (scrollTop >= this.listHeight[this.currentIndex + 1]) {
        this.currentIndex++
      } else {
        if (scrollTop < this.listHeight[this.currentIndex]) {
          this.currentIndex--
        }
      }
    })
    this._initFixedCategory()
  },
  components: {
    CartButton
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .food
    display flex
    .menu-category
      flex 0 0 25%
      .menu-category-item
        position relative
        font-size $font-size-medium
        padding 4.666667vw 2vw
        background-color  $color-highlight-background
        &.active-category
          background-color $color-background
          font-weight bold
        .count-tip
          position absolute
          display inline-block
          top 0.333333vw
          right 0.333333vw
          border-radius 50%
          background #ff4b15
          width 3.333333vw
          height 3.333333vw
          line-height 3.333333vw
          text-align center
          font-size $font-size-small-xs
    .menu-list
      flex 1
      overflow hidden
      .food-tip
        height 12.8vw
        text-align center
      .menu-category-list
        .category-name
          padding 6px 8vw 6px 0
          margin-left 2.666667vw
          font-size $font-size-medium
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          .desc
            font-size $font-size-small
            color $color-text-l
            margin-left 1.333333vw
        .menu-category-list-item-wrapper
          .menu-category-list-item
            display flex
            margin-left 2.666667vw
            margin-right 2.666667vw
            // overflow hidden
            // width 100%
            .image
              flex none
              width 25.333333vw
              height 25.333333vw
              margin-right 2.666667vw
              img
                width 100%
                height 100%
            .text
              flex 1
              overflow hidden
              position relative
              //.wrapper
                // overflow hidden
                // width 100%
              section
                margin 1.333333vw 0
                font-size $font-size-small
                color $color-text-l
                width 100%
                overflow hidden
                .name
                  display inline-block
                  font-size $font-size-medium-x
                  color $color-text
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                  width 100%
                .desc
                  display inline-block
                  width 100%
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                &.price
                  position absolute
                  left 0
                  bottom 2.666667vw
                  font-size 0
                  span
                    font-size $font-size-medium
                    color $color-text-price
                    font-weight bold
                    vertical-align middle
                  .cart-button-wrapper
                    display inline-block
                    float right
                    vertical-align middle
    .fixed-category
      position fixed
      right 0
      box-sizing border-box
      background $color-background
      .category-name
        padding 6px 8vw 6px 0
        margin-left 2.666667vw
        margin-top 0
        font-size $font-size-medium
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        .desc
          font-size $font-size-small
          color $color-text-l
          margin-left 1.333333vw
    .food-detail
      position fixed
      z-index 1
      top 0
      right 0
      left 0
      bottom 12.8vw
      background-color $color-background
      .close
        position absolute
        top 2.5vw
        right 2.5vw
        .icon-close
          fill $color-theme
      .food-img
        width 100%
        height 100vw
        img
          width 100%
          height 100%
      .food-desc
        padding 4vw 4vw 0 4vw
        &>section
          margin-bottom 2.4vw
          .food-name
            font-size $font-size-large
            font-weight 700
          &.sales-and-rating
            font-size $font-size-small
            color $color-text-l
          &.price
            font-size $font-size-medium-x
            color $color-text-price
          &.desc
            font-size $font-size-small
            color $color-text-l
</style>

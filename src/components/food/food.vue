<template>
  <div class="food" id="food">
    <div class="menu-category">
      <ul class="menu-category-wrapper" ref="menu">
        <li class="menu-category-item"
        :class="{'active-category': currentIndex === index}"
        v-for="(category, index) in menuList"
        :key="index"
        @click="selectCategory(index)">
          {{category.name}}
        </li>
      </ul>
    </div>
    <div class="menu-list" ref="foodWrapper">
      <ul class="menu-category-list-wrapper">
        <li class="menu-category-list food-list-hook" v-for="(category, index) in menuList" :key="index">
          <h3 class="category-name">{{category.name}}<span class="desc">{{category.description}}</span></h3>
          <ul class="menu-category-list-item-wrapper">
            <li class="menu-category-list-item" v-for="(food, foodIndex) in category.foods" :key="foodIndex">
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
                    <span>¥{{getPrice(food.specfoods)}}</span><span v-if="food.specfoods.length > 1">起</span>
                  </section>
                <!-- </div> -->
              </div>
            </li>
          </ul>
        </li>
        <li class="food-tip">没有更多了~</li>
      </ul>
    </div>
    <div v-show="fixed" ref="fixed-category" class="fixed-category">
      <h3 class="category-name" v-if="fixed">{{fixedCategoryName}}<span class="desc">{{fixedCategoryDesc}}</span></h3>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {extraUrl} from 'common/js/banner'
import {EventUtil} from 'common/js/dom-util'
const TITLE_HEIGHT = 28
export default {
  name: 'food',
  data () {
    return {
      top: 0,
      fixed: false,
      listHeight: [],
      currentIndex: 0
    }
  },
  props: {
    menuList: {
      type: Array,
      default: null
    }
  },
  methods: {
    getPrice (spec) {
      let minprice = spec[0].price
      spec.forEach(item => {
        if (item.price < minprice) {
          minprice = item.price
        }
      })
      return minprice
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
      console.log('_cal')
      let foodList = document.getElementsByClassName('food-list-hook')
      console.log(foodList.length)
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
      this.currentIndex = index
    }
  },
  computed: {
    fixedCategoryName () {
      return this.menuList[this.currentIndex].name
    },
    fixedCategoryDesc () {
      return this.menuList[this.currentIndex].description
    }
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
      const category = this.$refs['fixed-category']
      category.style.top = this.top + 'px'
    })
  },
  mounted () {
    // this.resetMenu()
    this.$nextTick(() => {
      setTimeout(() => {
        console.log('mounted')
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
        console.log(diff)
        if (this.diff === diff) {
          return
        }
        this.diff = diff
        this.$refs['fixed-category'].style.transform = `translate3d(0, -${diff}px, 0)`
        return
      }
      if (scrollTop >= this.listHeight[this.currentIndex + 1]) {
        console.log('++')
        this.currentIndex++
      } else {
        if (scrollTop < this.listHeight[this.currentIndex]) {
          console.log('--')
          this.currentIndex--
        }
      }
    })
    this._initFixedCategory()
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
        font-size $font-size-medium
        padding 4.666667vw 2vw
        background-color  $color-highlight-background
        &.active-category
          background-color $color-background
          font-weight bold
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
                  font-size $font-size-medium
                  color $color-text-price
                  span
                    font-weight bold
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
</style>

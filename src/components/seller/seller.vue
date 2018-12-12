<template>
  <transition name="slide">
    <div class="seller" @click.stop id="seller">
      <div class="head" id="seller-head">
        <div class="grey-icon" :style="{'background-image': 'url('+ seller.image_path + ')'}">
        </div>
        <div class="icon">
          <img v-lazy="seller.image_path" width="100%" height="100%">
        </div>
        <div class="desc">
          <h2 class="name">
            <span>{{seller.name}}</span>
            <icon name="enter" scale="2" class="enter"></icon>
          </h2>
          <section class="base-info">
            <span class="rating">评价{{seller.rating}}</span>
            <span>月售{{seller.recent_order_num}}单</span>
          </section>
          <section v-if="seller.activities.length > 0" class="activities">
            <div class="active">
              <span class="active-icon" :class="classMap(seller.activities[0].icon_name)">{{seller.activities[0].icon_name}}</span>
              <span>{{seller.activities[0].description}}</span>
            </div>
            <div class="total" v-if="seller.activities.length > 1" @click.stop="toggleFold(seller)">
              <span class="text">{{seller.activities.length}}个活动</span>
              <icon scale="1.5" :name="activeUnfold ? 'fold' : 'unfold'" class="icon-fold"></icon>
            </div>
          </section>
          <section class="bullet" v-if="seller.promotion_info">
            <p>公告:{{seller.promotion_info}}</p>
          </section>
          <div class="back" @click="back">
            <icon name="back" scale="3" fill="white"></icon>
          </div>
        </div>
      </div>
      <div class="tab" id="seller-tab">
        <tab></tab>
      </div>
      <div class="tab-fixed" v-show="fixed">
        <tab></tab>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import Tab from 'components/tab/tab'
import {EventUtil} from 'common/js/dom-util'
const nameMap = new Map()
  .set('首', 'first')
  .set('减', 'decrease')
  .set('折', 'discount')
  .set('票', 'invoice')
  .set('特', 'special')
  .set('换', 'change')
  .set('惠', 'privilege')
export default {
  name: 'seller',
  data () {
    return {
      menu: [],
      bought_list: {},
      activeUnfold: false,
      fixed: false,
      tabHeight: 0
    }
  },
  methods: {
    toggleFold () {
      this.activeUnfold = !this.activeUnfold
    },
    classMap (key) {
      return nameMap.get(key)
    },
    back () {
      this.$router.push({
        path: '/miste'
      })
    },
    scrollHandler (event) {
      if (!this.fixed && event.target.scrollTop >= this.fixHeight) {
        this.fixed = true
        window.eventBus.$emit('eventFixed', true, this.tabHeight)
        return
      }
      if (this.fixed && event.target.scrollTop <= this.fixHeight) {
        this.fixed = false
        window.eventBus.$emit('eventFixed', false, this.tabHeight)
        return
      }
      if (this.fixed) {
        let scrollTop = event.target.scrollTop - this.fixHeight
        window.eventBus.$emit('foodScroll', scrollTop)
      }
    },
    scrollTo (height) {
      let seller = document.getElementById('seller')
      seller.scrollTo(0, height)
    }
  },
  computed: {
    ...mapGetters([
      'seller'
    ])
  },
  components: {
    Tab
  },
  mounted () {
    let seller = document.getElementById('seller')
    let head = document.getElementById('seller-head')
    let tab = document.getElementById('seller-tab')
    EventUtil.addHandler(seller, 'scroll', this.scrollHandler)
    this.fixHeight = head.clientHeight
    this.tabHeight = tab.clientHeight
  },
  created () {
    if (!this.seller.id) {
      this.$router.push('/')
      return
    }
    window.eventBus.$on('scrollToCat', (height) => {
      // const offsetHeight = this.fixHeight + this.tabHeight
      this.scrollTo(height + this.fixHeight)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .seller
    position fixed
    z-index 1
    top 0
    bottom 0
    right 0
    left 0
    background-color  $color-background
    overflow scroll
    &.slide-enter-active,&.slide-leave-active
      transition all 0.3s ease
    &.slide-enter,&.slide-leave-to
      transform translate3d(100%, 0, 0)
    .head
      position relative
      .back
        position absolute
        top 3vw
        left 3vw
        fill $color-text
      .grey-icon
        width 100%
        height 0
        padding-top 30%
        background-size cover
        background-position-y 34%
        box-sizing border-box
        filter blur(2px)
      .icon
        position absolute
        top 0
        left 50%
        width 20vw
        height 20vw
        margin-left -10vw
        margin-top 15vw
      .desc
        padding-top 10vw
        text-align center
        color $color-text-ll
        width 80%
        margin 0 auto
        .name
          font-size $font-size-large
          font-weight bold
          margin-bottom 2vw
          color $color-text
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          .enter
            vertical-align middle
        .base-info
          text-align center
          margin-bottom 1vw
          .rating
            margin-right 5px
        .activities
          display flex
          margin-bottom 1vw
          .active
            flex 1
            margin-right 3vw
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            .active-icon
              border-radius 2px
              padding 2px
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
          .total
            flex 0 0 auto
            .text
              vertical-align top
            .icon-fold
              vertical-align top
              margin-right 0
        .bullet
          p
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    .tab-fixed
      position fixed
      top 0
      left 0
      right 0
      z-index 1
</style>

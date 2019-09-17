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
            <span class="favorite"  v-if="logined" @click="toggleFavorite">
              <!-- <icon scale="2" :name="isFavorite ? 'favorite' : 'unfavorite'" fill="#ffcd32"></icon> -->
              <i class="iconfont">{{isFavorite ? '&#xe849;' : '&#xe8ff;'}}</i>
            </span>
            <span class="name-text">{{seller.name}}</span>
            <span class="enter" @click="toggleDetail('seller')">
              <!-- <icon name="enter" scale="2" class="enter"></icon> -->
              <i class="iconfont">&#xe7eb;</i>
            </span>
          </h2>
          <section class="base-info">
            <span class="rating">评价{{seller.rating}}</span>
            <span>月售{{seller.recent_order_num}}单</span>
          </section>
          <section v-if="seller.activities && seller.activities.length > 0" class="activities">
            <div class="active">
              <span class="active-icon" :class="classMap(seller.activities[0].icon_name)">{{seller.activities[0].icon_name}}</span>
              <span>{{seller.activities[0].description}}</span>
            </div>
            <div class="total" v-if="seller.activities && seller.activities.length > 1" @click.stop="toggleDetail('activity')">
              <span class="text">{{seller.activities && seller.activities.length}}个活动</span>
              <!-- <icon scale="1.5" :name="showFlag.activity ? 'fold' : 'unfold'" class="icon-fold"></icon> -->
              <i class="iconfont">{{showFlag.activity ? '&#xe7ee;' : '&#xe7ed;'}}</i>
            </div>
          </section>
          <section class="bullet" v-if="seller.promotion_info">
            <p>公告:{{seller.promotion_info}}</p>
          </section>
          <div class="back" @click="back">
            <!-- <icon name="back" scale="3" fill="white"></icon> -->
            <i class="iconfont" style='font-size: 20px;text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);'>&#xe7ef;</i>
          </div>
        </div>
      </div>
      <div class="tab" id="seller-tab">
        <tab></tab>
      </div>
      <div class="tab-fixed" v-show="fixed">
        <tab></tab>
      </div>
      <div class="activity-bg" v-show="ifShow" @click.stop="toggleDetail(isShowing)"></div>
      <transition name="slide-up">
        <div class="activity-panel" v-show="showFlag.activity">
          <div class="activity-panel-header"><span class="activity-panel-title">优惠活动</span><span class="active-panel-close" @click.stop="toggleDetail('activity')"><icon name="close" scale="1.5"></icon></span></div>
          <ul class="activity-panel-body">
            <li v-for="(item, index) in seller.activities" :key="index" class="activity-panel-item">
              <span class="active-icon" :class="classMap(item.icon_name)">{{item.icon_name}}</span>
              <span>{{item.description}}</span>
            </li>
          </ul>
        </div>
      </transition>
      <transition name="fade-out">
        <div class="seller-detail-panel" v-show="showFlag.seller">
          <h4 class="name">{{seller.name}}</h4>
          <div class="detail">
            <section>
              <div class="text">{{seller.rating}}</div>
              <div class="title">评分</div>
            </section>
            <section>
              <div class="text">{{seller.recent_order_num}}</div>
              <div class="title">月售</div>
            </section>
            <section>
              <div class="text">商家配送</div>
              <div class="title">约{{seller.order_lead_time}}分钟</div>
            </section>
            <section>
              <div class="text">{{seller.float_delivery_fee}}元</div>
              <div class="title">配送费</div>
            </section>
            <section>
              <div class="text">{{distance}}</div>
              <div class="title">距离</div>
            </section>
          </div>
          <div class="bullet">
            <div class="bullet-title">公告</div>
            <p class="bullet-text">{{seller.promotion_info}}</p>
          </div>
          <div class="close" @click.stop="toggleDetail('seller')">
            <span>
              <icon name="close" scale="2"></icon>
            </span>
          </div>
        </div>
      </transition>
      <keep-alive>
        <transition :name="transitionName">
          <router-view class="child-view"></router-view>
        </transition>
      </keep-alive>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
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
      showFlag: {
        'activity': false,
        'seller': false
      },
      isShowing: '',
      // activeUnfold: false,
      // sellerDetail: false,
      fixed: false,
      tabHeight: 0,
      transitionName: 'slide-left'
    }
  },
  methods: {
    toggleDetail (item) {
      this.showFlag[item] = !this.showFlag[item]
      this.isShowing = item
    },
    // toggleSellerDetail () {
    //   this.sellerDetail = !this.sellerDetail
    // },
    classMap (key) {
      return nameMap.get(key)
    },
    back () {
      this.$router.push({
        path: '/miste'
      })
    },
    scrollHandler (event) {
      const clientHeightDiff = document.documentElement.clientHeight + 1
      if (Math.abs(event.target.scrollHeight - event.target.scrollTop) < clientHeightDiff) {
        window.eventBus.$emit('loadMore')
      }
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
    },
    toggleFavorite () {
      if (this.isFavorite) {
        this.popFavorite({
          id: this.user.id,
          seller: this.seller
        })
      } else {
        this.pushFavorite({
          id: this.user.id,
          seller: this.seller
        })
      }
    },
    ...mapActions([
      'pushFavorite',
      'popFavorite'
    ])
  },
  computed: {
    ifShow () {
      for (let item in this.showFlag) {
        if (this.showFlag[item]) {
          return true
        }
      }
      return false
    },
    distance () {
      if (this.seller.distance > 1000) {
        return Math.floor(this.seller.distance / 100) / 10 + 'km'
      } else {
        return this.seller.distance + 'm'
      }
    },
    isFavorite () {
      let favoriteList = this.user.favorite
      return favoriteList.findIndex((item) => {
        return item.id === this.seller.id
      }) > -1
    },
    ...mapGetters([
      'seller',
      'user',
      'logined'
    ])
  },
  components: {
    Tab
  },
  mounted () {
    if (!this.seller.id) return
    let seller = document.getElementById('seller')
    let head = document.getElementById('seller-head')
    let tab = document.getElementById('seller-tab')
    this.fixHeight = head.clientHeight
    this.tabHeight = tab.clientHeight
    window.eventBus.$on('scrollToCat', (height) => {
      this.scrollTo(height + this.fixHeight)
    })
    EventUtil.addHandler(seller, 'scroll', this.scrollHandler)
  },
  created () {
    if (this.seller.id === undefined) {
      this.$router.push({
        path: '/miste'
      }, () => { console.log('Jump to', this.$route.path) })
    }
  },
  watch: {
    '$route' (to, from) {
      const pathIndex = {
        'menu': 1,
        'rating': 2,
        'seller-detail': 3
      }
      let oldIndex = pathIndex[from.path.split('/').pop()]
      let newIndex = pathIndex[to.path.split('/').pop()]
      let head = document.getElementById('seller-head')
      this.transitionName = newIndex - oldIndex > 0 ? 'slide-right' : 'slide-left'
      this.$nextTick(() => {
        // 确保切换子路由后滚动状态会复原
        // document.querySelector('#seller').scrollTop = document.querySelector('#seller').scrollTop > head.clientHeight ? head.clientHeight : document.querySelector('#seller').scrollTop
        document.querySelector('#seller').scrollTo(0, document.querySelector('#seller').scrollTop > head.clientHeight ? head.clientHeight : document.querySelector('#seller').scrollTop)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .seller
    position fixed
    z-index 2
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
          .name-text
            display inline-block
            max-width 80%
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            vertical-align middle
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
            // .active-icon
            //   border-radius 2px
            //   padding 2px
            //   &.first
            //     background-color rgb(112, 118, 70)
            //   &.decrease
            //     background-color rgb(240, 115, 115)
            //   &.discount
            //     background-color rgb(240, 115, 115)
            //   &.invoice
            //     background-color rgb(153, 153, 153)
            //   &.special
            //     background-color rgb(241, 136, 79)
            //   &.change
            //     background-color rgb(241, 136, 79)
            //   &.privilege
            //     background-color rgb(240, 115, 115)
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
    .activity-bg
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      background rgba(0, 0, 0, .7)
      z-index 1
    .activity-panel
      position fixed
      bottom 0
      left 0
      right 0
      min-height 50vw
      padding 4.266667vw
      background $color-background
      z-index 1
      &.slide-up-enter, &.slide-up-leave-to
        transform translate3d(0, 100%, 0)
      &.slide-up-enter-active, &.slide-up-leave-active
        transition all .3s ease
      .activity-panel-header
        font-size $font-size-medium
        text-align center
        margin-bottom 4.133333vw
        color $color-text
        position relative
        .activity-panel-title
          vertical-align bottom
          font-weight 700
        .active-panel-close
          position absolute
          right 0
          top 0
      .activity-panel-body
        max-height 146.666667vw
        overflow scroll
        .activity-panel-item
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          margin-bottom 2.333333vw
    .seller-detail-panel
      position absolute
      width 80%
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      z-index 1
      padding 4.266667vw
      background $color-dialog-background
      min-height 30.666667vw
      &.fade-out-enter, &.fade-out-leave-to
        opacity 0
      &.fade-out-enter-active,&.fade-out-leave-active
        transition all 0.3s ease
      .name
        text-align center
        font-size $font-size-medium-x
        font-weight 700
        margin-bottom 4.133333vw
      .detail
        display flex
        flex-wrap nowrap
        margin-bottom 2.333333vw
        section
          flex 1
          text-align center
          overflow hidden
          .text
            color $color-text
            font-size $font-size-medium
          .title
            color $color-text-l
            font-size $font-size-small-x
      .bullet
        text-align center
        // display flex
        // justify-content center
        // align-items center
        .bullet-title
          margin-bottom 1.666667vw
        .bullet-title::before
          content '.'
          font-size 0
          display inline-block
          width 4.333333vw
          height 0.5px
          // border 0.5px solid $color-text-l// linear-gradient($color-dialog-background, #fff)
          background linear-gradient(to right, $color-dialog-background , $color-text-l)
          margin-right 1.666667vw
          // position relative
          // top -50%
          transform translate3d(0, -4px, 0)
        .bullet-title::after
          content '.'
          font-size 0
          display inline-block
          width 4.333333vw
          height 0.5px
          // border 0.5px solid $color-text-l// linear-gradient($color-dialog-background, #fff)
          background linear-gradient(to left, $color-dialog-background , $color-text-l)
          margin-left 1.666667vw
          // transform translate3d(0, -50%, 0)
          transform translate3d(0, -4px, 0)
        .bullet-text
          max-height 20.666667vw
          overflow scroll
          font-size $font-size-small-x
          color $color-text
          text-align left
      .close
        position absolute
        bottom -18.333333vw
        left 50%
        transform translate3d(-50%, 0, 0)
// .slide-left-enter-active, .slide-left-leave-active
//   transition all 1s ease
// .slide-left-enter, .slide-left-leave-to
//   transform translate3d(100%, 0, 0)
//   opaccity 0
// .slide-right-enter-active, .slide-right-leave-active
//   transition all 1s ease
// .slide-right-enter, .slide-right-leave-to
//   transform translate3d(-100%, 0, 0)
//   opacity 0
.child-view
  // position: absolute;
  transition all .5s cubic-bezier(.55,0,.1,1)
.slide-left-enter, .slide-right-leave-active
  opacity 0
  transform translate3d(-100%, 0, 0)
.slide-left-leave-active, .slide-right-enter
  opacity 0
  transform translate3d(100%, 0, 0)
</style>

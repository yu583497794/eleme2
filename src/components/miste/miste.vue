<template>
  <div class="miste" id="miste">
    <!-- <div class="head">
      <icon name="girl" scale="6" class="head-icon"></icon>
      <h1 class="title">Fairy Eleme</h1>
    </div> -->
    <eleme-head></eleme-head>
    <div class="banner-wrapper">
      <banner :banners="banners"></banner>
    </div>
    <div class="recommend-shops">
      <h2 class="title">--- 推荐商家 ---</h2>
      <ul class="recommend-shops-wrapper">
        <li v-for="(recommend, index) in recommends" :key="index" class="recommend-item" @click="enter(recommend)">
          <div class="icon">
            <img width="100%" height="100%" v-lazy="recommend.image_path">
            <span class="cart-count-tip" v-if="cartCount[index] > 0">{{cartCount[index]}}</span>
          </div>
          <div class="desc">
            <div class="part-one">
              <section>
                <h3 class="name">{{recommend.name}}</h3>
              </section>
              <section>
                <star :score="recommend.rating" class=""></star>
                <span>{{recommend.rating}}</span>
                <span>月售{{recommend.recent_order_num}}单</span>
                <!-- <span class="delivery-mode">{{recommend.restaurant.delivery_mode.text}}</span> -->
              </section>
              <section>
                <span>¥{{recommend.float_minimum_order_amount}}起送</span>
                <span class="deliver-fee">配送费¥{{recommend.float_delivery_fee}}</span>
              </section>
              <section>
                <ul class="tag-wrapper">
                  <li v-for="(tag, index) in recommend.support_tags" :key="index" class="tag">{{tag.text}}</li>
                </ul>
                <div v-if="recommend.recommend.reason" class="recommend">
                  <img width=12 height=12 :src="_getUrl(recommend.recommend.image_hash)">
                  <span :style="`color:${recommend.recommend.color}`" class="recommend-reason">{{recommend.recommend.reason}}</span>
                </div>
              </section>
            </div>
            <div class="part-two">
              <section class="activities">
                <ul class="activities-wrapper">
                  <li v-for="(activity, index) in recommend.activities" :key="index" class="activity" v-if="(index < 2 && !recommend.unfold) || recommend.unfold">
                    <span class="icon" :class="classMap(activity.icon_name)">{{activity.icon_name}}</span>
                    <span class="text">{{activity.description}}</span>
                  </li>
                </ul>
                <div class="total" v-if="recommend.activities.length > 2" @click.stop="toggleFold(recommend)">
                  <span class="text">{{recommend.activities.length}}个活动</span>
                  <icon scale="1.5" :name="recommend.unfold ? 'fold' : 'unfold'" class="icon-fold"></icon>
                </div>
              </section>
              <section></section>
            </div>
          </div>
        </li>
        <loading v-if="isLoading && hasNext"></loading>
        <div class="tip" v-if="!hasNext">Sorry,没有更多内容了</div>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import {getBanners, getRecommends} from 'api/miste.js'
import {extraUrl} from 'common/js/banner'
import Banner from 'base/banner/banner'
import Star from 'base/star/star'
import {EventUtil} from 'common/js/dom-util'
import Loading from 'base/loading/loading'
import {mapMutations, mapGetters} from 'vuex'
import ElemeHead from 'base/eleme-head/eleme-head'
const nameMap = new Map()
  .set('首', 'first')
  .set('减', 'decrease')
  .set('折', 'discount')
  .set('票', 'invoice')
  .set('特', 'special')
  .set('换', 'change')
  .set('惠', 'privilege')
export default {
  name: 'miste',
  data () {
    return {
      banners: [],
      recommends: [],
      hasNext: true,
      scrollTop: 0,
      queryTime: 0,
      limit: 8,
      loading: false
    }
  },
  methods: {
    _getBanners () {
      getBanners().then((res) => {
        this.banners = res.data
        this.banners.forEach((item) => {
          item.url = extraUrl(item.image_hash)
        })
      })
    },
    _getRecommends () {
      getRecommends().then((res) => {
        this.recommendHandler(res)
      })
    },
    _getUrl (hash) {
      return extraUrl(hash)
    },
    _initScroll () {
      const miste = document.getElementById('miste')
      EventUtil.addHandler(miste, 'scroll', this.scroll)
    },
    scroll (event) {
      event = EventUtil.getEvent(event)
      this.scrollHeight = event.target.scrollHeight
      this.scrollTop = event.target.scrollTop
    },
    next () {
      const offset = this.queryTime * this.limit
      getRecommends(offset).then((res) => {
        this.recommendHandler(res)
      })
    },
    recommendHandler (res) {
      if (res.data.length < 1) {
        this.loading = false
        this.hasNext = false
        return
      }
      res.data.forEach((item) => {
        item.unfold = false
        item.image_path = extraUrl(item.image_path)
      })
      this.recommends = this.recommends.concat(res.data)
      this.queryTime++
      this.loading = false
    },
    classMap (key) {
      return nameMap.get(key)
    },
    toggleFold (recommend) {
      recommend.unfold = !recommend.unfold
    },
    enter (seller) {
      this.setSeller(seller)
      this.$router.push({
        path: `/miste/${seller.id}`
      })
    },
    ...mapMutations({
      setSeller: 'SET_SELLER'
    })
  },
  watch: {
    scrollTop (newTop) {
      const miste = document.getElementById('miste')
      const height = miste.offsetHeight
      // 可以设置成提醒到达底部了
      if (Math.abs((newTop + height) - this.scrollHeight) > 3 || !this.hasNext) {
        return
      }
      if (this.hasNext) {
        this.loading = true
        this.next()
      }
    }
  },
  mounted () {
    this._getBanners()
    this._getRecommends()
    this._initScroll()
  },
  computed: {
    isLoading () {
      return this.loading
    },
    cartCount () {
      let list = []
      this.recommends.forEach((seller, index) => {
        list[index] = 0
        this.cartList.forEach(item => {
          if (item.seller === seller.id) {
            list[index] += item.count
          }
        })
      })
      return list
    },
    ...mapGetters([
      'cartList'
    ])
  },
  components: {
    Banner,
    Star,
    Loading,
    ElemeHead
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
.miste
  position fixed
  top 0
  right 0
  left 0
  bottom 80px
  overflow-y auto
  overflow-x hidden
  font-size $font-size-small
  .recommend-shops
    width 100%
    .title
      font-size $font-size-large
      text-align center
      line-height 50px
      color $color-theme
      background-color $color-highlight-background
    .recommend-shops-wrapper
      .recommend-item
        display flex
        justify-content: flex-start
        align-items: stretch
        overflow hidden
        box-sizing border-box
        border-bottom 1px solid $color-dialog-background
        padding 20px 10px
        .icon
          flex none
          position relative
          margin-right 8px
          width 20vw
          height 20vw
          .cart-count-tip
            position absolute
            min-width 3.733333vw
            line-height 3.733333vw
            font-size $font-size-small
            background #ff4b15
            text-align center
            border-radius 50%
            top -1.333333vw
            right -1.333333vw
        .desc
          flex 1
          display flex
          flex-direction column
          overflow hidden
          color $color-text-ll
          .part-one
            overflow hidden
            section
              overflow hidden
              margin-bottom 8px
              .name
                display inline-block
                width 90%
                font-size $font-size-large
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                color $color-text
                font-weight bold
                margin-top 5px
              .star
                display inline-block
              .deliver-fee::before
                content ""
                border-right 1px solid $color-text-l
                margin-right 5px
              .tag-wrapper
                display inline-block
                .tag
                  display inline-block
                  padding 2px 5px
                  border 1px solid $color-text-l
                  margin-right 5px
              .recommend
                display inline-block
                font-size 0
                vertical-align middle
                img
                  vertical-align middle
                  display inline-block
                .recommend-reason
                  margin-left 5px
                  vertical-align middle
                  font-size $font-size-small
                  line-height $font-size-small
        .part-two
          border-top 1px solid $color-dialog-background
          padding-top 15px
          .activities
            display flex
            position: relative
            overflow hidden
            justify-content space-between
            .activities-wrapper
              overflow-x hidden
              white-space nowrap
              text-overflow ellipsis
              .activity
                flex 1
                line-height 20px
                margin-bottom 3px
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                margin-right 10px
                .icon
                  border-radius 3px
                  padding 3px
                  color $color-text
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
              white-space nowrap
              padding-right 0px
              color $color-theme
              font-size 0
              transform translate(0, 2px)
              .text
                font-size  $font-size-small
                vertical-align middle
              .icon-fold
                vertical-align middle
                margin-right 2px
      .tip
        padding 10px 0
        text-align center
        font-size $font-size-medium
</style>

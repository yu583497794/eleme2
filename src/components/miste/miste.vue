<template>
  <div class="miste">
    <div class="head">
      <icon name="girl" scale="6" class="head-icon"></icon>
      <h1 class="title">Fairy Eleme</h1>
    </div>
    <div class="banner-wrapper">
      <banner :banners="banners"></banner>
    </div>
    <div class="recommend-shops">
      <h2 class="title">--- 推荐商家 ---</h2>
      <ul>
        <li v-for="(recommend, index) in recommends" :key="index" class="recommend-item">
          <div class="icon">
            <img width=130 height=130 :src="recommend.restaurant.image_path">
          </div>
          <div class="desc">
            <div class="part-one">
              <section>
                <h3 class="name">{{recommend.restaurant.name}}</h3>
              </section>
              <section>
                <star :score="recommend.restaurant.rating" class=""></star>
                <span>{{recommend.restaurant.rating}}</span>
                <span>月售{{recommend.restaurant.recent_order_num}}单</span>
                <!-- <span class="delivery-mode">{{recommend.restaurant.delivery_mode.text}}</span> -->
              </section>
              <section>
                <span>¥{{recommend.restaurant.float_minimum_order_amount}}起送</span>
                <span class="deliver-fee">配送费¥{{recommend.restaurant.float_delivery_fee}}</span>
              </section>
              <section>
                <ul class="tag-wrapper">
                  <li v-for="(tag, index) in recommend.restaurant.support_tags" :key="index" class="tag">{{tag.text}}</li>
                </ul>
                <div v-if="recommend.restaurant.recommend.reason" class="recommend">
                  <img width=15 height=15 :src="_getUrl(recommend.restaurant.recommend.image_hash)">
                  <span :style="`color:${recommend.restaurant.recommend.color}`" class="recommend-reason">{{recommend.restaurant.recommend.reason}}</span>
                </div>
              </section>
            </div>
            <div class="part-two">
              <section>
                <ul>
                  <!-- <li v-for="(activity, index) in recommend.restaurant.activities" :key="index" class="activity">
                    <span class="icon" :class="classMap(activity.icon_name)"></span>
                    <span class="text"></span>
                  </li> -->
                </ul>
              </section>
              <section></section>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getBanners, getRecommends} from 'api/miste.js'
import {extraUrl} from 'common/js/banner'
import Banner from 'base/banner/banner'
import Star from 'base/star/star'
export default {
  name: 'miste',
  data () {
    return {
      banners: [],
      recommends: [],
      hasNext: false
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
        this.recommends = res.data.items
        this.recommends.forEach((item) => {
          item.restaurant.image_path = extraUrl(item.restaurant.image_path)
        })
        this.hasNext = res.data.has_next
      })
    },
    _getUrl (hash) {
      return extraUrl(hash)
    }
  },
  mounted () {
    this._getBanners()
    this._getRecommends()
  },
  components: {
    Banner,
    Star
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
  .head
    height 60px
    font-size 0
    text-align center
    .title
      display inline-block
      font-size $font-size-large-x
      line-height 60px
      vertical-align top
      margin-left 10px
      color $color-theme
  .recommend-shops
    width 100%
    padding 0 10px
    .title
      font-size $font-size-large
      text-align center
      line-height 50px
      color $color-theme
    .recommend-item
      display flex
      box-sizing border-box
      margin-bottom 10px
      .icon
        flex 0 0 130px
        margin-right 8px
      .desc
        flex 1
        display flex
        overflow hidden
        color $color-text-ll
        .part-one
          section
            margin-bottom 8px
            .name
              display inline-block
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
               display inline-block
              .recommend-reason
                margin-left 5px
                font-size $font-size-medium
                line-height $font-size-medium
      .part-two
        border-top 1px solid $color-text-ll
</style>

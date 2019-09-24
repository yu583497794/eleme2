<template>
  <div class="rating">
    <div class="rating-overview">
      <div class="overview overview-left">
        <section class="part-left">
          <p>{{typeof ratingOverview.star_level === 'number' && ratingOverview.star_level.toFixed(1)}}</p>
        </section>
        <section class="part-right">
          <span>商家评分</span>
          <star :score="ratingOverview.star_level" class="star"></star>
        </section>
      </div>
      <div class="overview overview-center">
        <section class="part"><span class="title">菜品</span><p class="text">{{fixNum(ratingOverview.food_score, 1)}}</p></section>
        <section class="part"><span class="title">服务</span><p class="text">{{fixNum(ratingOverview.service_score, 1)}}</p></section>
      </div>
      <div class="overview overview-right">
        <section><span class="title">好评率</span><p class="text">{{ratingOverview.positive_rating*100}}%</p></section>
      </div>
      <div class="rating-btn" @click="toggleRatingEditor">
        <span class="text">评价一发</span>
      </div>
    </div>
    <transition name="wrap">
      <div class="rating-editor-wrapper" v-show="ratingEditorShow">
        <h3 class="rating-title"><i class="iconfont">&#xe871;</i>店铺评价</h3>
        <!-- <react :component='component' num='5' :sellerId="getSellerId" :toggleRatingEditor="toggleRatingEditor"></react> -->
        <div id="editor-wrapper"></div>
      </div>
    </transition>
    <div class="rating-list-wrapper" v-if="errno">
      <div class="rating-filter">
        <div :class="['rating-filter-item', recordType === 1 ? 'active' : '']" @click="filter(1)">全部</div>
        <div :class="['rating-filter-item', recordType === 2 ? 'active' : '']" @click="filter(2)">满意</div>
        <div :class="['rating-filter-item', recordType === 3 ? 'active' : '']" @click="filter(3)">不满意</div>
        <div :class="['rating-filter-item', recordType === 4 ? 'active' : '']" @click="filter(4)">有图</div>
      </div>
      <ul class="rating-main">
        <li v-for="(rating, index) in ratings" :key="index" class="rating-item">
          <div class="avatar">
            <img :src="getAvatar(rating.avatar)">
          </div>
          <div class="desc">
            <section class="part-top">
              <span>{{rating.username}}</span>
              <span class="rated-time">{{rating.rated_at}}</span>
            </section>
            <section class="part-middle">
              <star :score="rating.rating_star"></star>
              <span  class="text">{{ratingWords(rating.rating_star)}}</span>
            </section>
            <p class="text">{{rating.rating_text}}</p>
            <section class="part-reply" v-if="rating.reply_text && rating.reply_text.length !== 0">
              <p class="reply">商家回复:{{rating.reply_text}}</p>
            </section>
            <section class="part-image" v-if="rating.item_rating_list && rating.item_rating_list.length > 0 && getPic(rating.item_rating_list).length > 0">
              <img :src="getPic(rating.item_rating_list)">
            </section>
            <section class="part-food" v-if="rating.item_rating_list && rating.item_rating_list.length > 0">
              <ul>
                <span class="good-icon"><i class="iconfont">&#xe7c8;</i></span>
                <li v-for="(item, index) in rating.item_rating_list"
                :key="index" class="item-rating">{{item.rate_name}}
                </li>
              </ul>
            </section>
          </div>
        </li>
        <li v-show="loading" class="rating-item"><loading></loading></li>
        <li class="rating-item no-more-tip" v-if="noMore">没有更多数据了~</li>
      </ul>
    </div>
    <div class="unattach" v-if="!errno">
      <p>饿了么不给接口,我也很无奈啊</p>
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545653225553&di=4bf80892b7650615eaf8a248d97e5bba&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2F043ad3b9b04603a7.jpg">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import {mapGetters} from 'vuex'
import {getRating, getRatingOverview} from 'api/seller'
import Star from 'base/star/star'
import {extraUrl} from 'common/js/banner'
import Loading from 'base/loading/loading'
import ReactDOM from 'react-dom'
import RatingEditor from '../rating-pannel'
// eslint-disable-next-line
import React from 'react'
const ratingWordsList = ['超赞', '满意', '一般', '失望', '极差']
export default {
  name: 'rating',
  data () {
    return {
      ratings: [],
      limit: 10,
      ratingOverview: {},
      recordType: 0,
      offset: 0,
      loading: false,
      errno: false,
      noMore: false,
      ratingEditorShow: false
    }
  },
  methods: {
    filter (flag) {
      if (flag === this.recordType) {
        return
      }
      this.recordType = flag
      this.loading = false
      this.noMore = false
      this.offset = 0
      this.ratings = []
      this.loadMore()
    },
    getAvatar (path) {
      if (!path) {
        return 'http://image.little-fairy.club/timg.jpg'
      } else {
        return extraUrl(path)
      }
    },
    getPic (list) {
      let url = ''
      list.forEach(path => {
        if (path.image_hash) {
          url = extraUrl(path.image_hash)
          return true
        }
      })
      return url
    },
    ratingWords (scroll) {
      let index = 5 - scroll
      return ratingWordsList[index]
    },
    fixNum (num, dim) {
      return Math.floor(num * 10) / 10
    },
    toggleRatingEditor () {
      this.ratingEditorShow = !this.ratingEditorShow
    },
    loadMore () {
      if (!this.loading && !this.noMore) {
        this.loading = true
        getRating(this.seller.id, this.limit, this.offset, this.recordType).then((res) => {
          // this.ratings = this.ratings.concat(res.data)
          if (res.data.length < this.limit) {
            this.noMore = true
          }
          this.ratings.push(...(res.data))
          this.offset = this.ratings.length
          this.loading = false
        })
      }
    }
  },
  watch: {
    recordType (newVal) {
      this.offset = 0
      this.noMore = false
      getRating(this.seller.id, this.limit, this.offset, this.recordType).then(res => {
        if (res.errno) {
          if (res.data.length < this.limit) {
            this.noMore = true
          }
          this.ratings = res.data
          this.offset = this.ratings.length
          this.errno = true
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  computed: {
    getSellerId () {
      return this.$route.params.id
    },
    ...mapGetters([
      'seller'
    ])
  },
  components: {
    Star,
    Loading
  },
  created () {
    getRating(this.seller.id, this.limit).then((res) => {
      if (res.data.length < this.limit) {
        this.noMore = true
      }
      this.ratings = res.data
      this.offset = res.data.length
      this.errno = true
    })
    getRatingOverview(this.seller.id).then((res) => {
      this.ratingOverview = res.data
    })
    window.eventBus.$on('loadMore', this.loadMore)
  },
  mounted () {
    ReactDOM.render(<RatingEditor sellerId={this.$route.params.id} num='5' toggleRatingEditor={() => this.toggleRatingEditor()}/>, document.querySelector('#editor-wrapper'))
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .rating
    background $color-dialog-background
    .rating-overview
      display flex
      flex-wrap nowrap
      padding 5.333333vw 6.4vw 8vw 6.4vw
      margin-bottom 2.133333vw
      background $color-background
      border-top 0.5px solid $color-text-l
      .rating-btn
        flex 2
        display flex
        height 100%
        background $color-theme
        border-radius 10%
        border 2px solid $color-theme
        align-self  center
        .text
          display inline-block
          width 100%
          padding 2px 0
          text-align center
      .overview
        .title
          font-size $font-size-small
        .text
          font-size $font-size-medium
          margin-top 1.333333vw
      .overview-left
        flex 3.5
        display flex
        .part-left
          font-size $font-size-large-x
          margin-right 2.333333vw
          display flex
          align-items center
          p
            vertical-align middle
            color $color-theme
            font-weight 700
        .part-right
          flex 1
          .star
            margin-top 1.333333vw
      .overview-center
        flex 2.5
        display flex
        border-right 0.5px solid $color-text-l
        margin-right 2.333333vw
        text-align center
        .part
          flex 1
      .overview-right
        flex 2
    .rating-editor-wrapper
      opacity 100
      background $color-background
      padding 5.333333vw 6.4vw
      color white
      &.wrap-enter-active, &wrap-leave-active
        transition all 0.3s ease
      &.wrap-leave-to, &.wrap-enter
        transform translateY(0)
        opacity 0
      .rating-title
        font-weight 700
        font-size $font-size-small-x
        display flex
        align-items center
        span
          margin-right 5px
    .rating-list-wrapper
      background $color-background
      padding 5.333333vw 6.4vw 8vw 6.4vw
      .rating-filter
        display flex
        .rating-filter-item
          flex 1
          text-align center
          padding 1.333333vw 2.333333vw
          margin 0 1vw
          border 1px solid $color-text-l
          border-radius 2px
          &.active
            background $color-theme
            font-weight 800
      .rating-main
        .rating-item
          display flex
          // margin 3.333333vw 0
          border-bottom 0.5px solid $color-dialog-background
          padding 3.333333vw 0
          &:last-child
            border-bottom none
          section
            margin-bottom 1.333333vw
          .avatar
            flex 0 0 60.032px
            width  60.032px
            height 60.032px
            border-radius 50%
            overflow hidden
            img
              width 100%
              height 100%
          .desc
            flex 1
            margin-left 2.333333vw
            .part-top
              display flex
              justify-content space-between
              .rated-time
                color $color-text-l
            .part-middle
              display flex
              .text
                margin-left 2.333333vw
            .part-reply
              margin-top 3.666667vw
              .reply
                position relative
                padding 2.333333vw
                background $color-dialog-background
                border-radius 5px
                overflow visible
                &::after
                  display inline-block
                  content " "
                  position absolute
                  bottom 100%
                  left 3vw
                  width 0px
                  height 0px
                  border-left 2.133333vw solid transparent
                  border-right 2.133333vw solid transparent
                  border-bottom 2.133333vw solid $color-dialog-background
            .part-image
              width 40vw
              height 40vw
              margin 2.333333vw 0
              img
                width 100%
                height 100%
            .part-food
              font 0
              .item-rating
                display inline-block
                vertical-align top
                background $color-theme-ll
                padding 0.666667vw 1.333333vw
                border-radius 2px
                color $color-highlight-background
                max-width 27vw
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                margin 0.666667vw
    .unattach
      background $color-background
      padding 2.3333vw
      text-align center
      p
        margin-bottom 1.666667vw
</style>

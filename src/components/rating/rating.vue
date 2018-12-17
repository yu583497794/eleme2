<template>
  <div class="rating">
    <div class="rating-overview">
      <div class="overview overview-left">
        <section class="part-left">
          <p>{{ratingOverview.star_level}}</p>
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
    </div>
    <div class="rating-list-wrapper">
      <div class="rating-filter">
        <div class="rating-filter-item" @click="filter(1)">全部</div>
        <div class="rating-filter-item" @click="filter(2)">满意</div>
        <div class="rating-filter-item" @click="filter(3)">不满意</div>
        <div class="rating-filter-item" @click="filter(4)">有图</div>
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
            <section class="part-reply" v-if="rating.reply_text.length !== 0">
              <p class="reply">商家回复:{{rating.reply_text}}</p>
            </section>
            <section class="part-image" v-if="rating.item_rating_list[0].image_hash.length > 0">
              <img :src="getAvatar(rating.item_rating_list[0].image_hash)">
            </section>
            <section class="part-food" v-if="rating.item_rating_list.length > 0">
              <ul>
                <span class="good-icon"><icon name="good" scale="2"></icon></span>
                <li v-for="(item, index) in rating.item_rating_list"
                :key="index" class="item-rating">{{item.rate_name}}
                </li>
              </ul>
            </section>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getRating, getRatingOverview} from 'api/seller'
import Star from 'base/star/star'
import {extraUrl} from 'common/js/banner'
const ratingWordsList = ['超赞', '满意', '一般', '失望', '极差']
export default {
  name: 'rating',
  data () {
    return {
      ratings: [],
      limit: 10,
      ratingOverview: {},
      recordType: 0,
      offset: 0
    }
  },
  methods: {
    filter (flag) {
      if (flag === this.recordType) {
        return
      }
      this.recordType = flag
    },
    getAvatar (path) {
      if (path.length === 0) {
        return 'http://image.little-fairy.club/timg.jpg'
      } else {
        return extraUrl(path)
      }
    },
    ratingWords (scroll) {
      let index = 5 - scroll
      return ratingWordsList[index]
    },
    fixNum (num, dim) {
      // if (!(num instanceof Number)) {
      //   return 0
      // }
      // console.log(num)
      // return num.toFixed(dim)
      return Math.floor(num * 10) / 10
    }
  },
  watch: {
    recordType (newVal) {
      this.offset = 0
      getRating(this.seller.id, this.limit, this.offset, this.recordType).then(res => {
        this.ratings = res.data
        console.log(this.ratings)
      })
    }
  },
  computed: {
    ...mapGetters([
      'seller'
    ])
  },
  components: {
    Star
  },
  created () {
    getRating(this.seller.id, this.limit).then((res) => {
      this.ratings = res.data
      console.log(this.ratings)
    })
    getRatingOverview(this.seller.id).then((res) => {
      this.ratingOverview = res.data
      console.log(this.ratingOverview)
    })
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
      padding 5.333333vw 0 8vw 6.4vw
      margin-bottom 2.133333vw
      background $color-background
      border-top 0.5px solid $color-text-l
      .overview
        flex 1
        .title
          font-size $font-size-small
        .text
          font-size $font-size-medium
          margin-top 1.333333vw
      .overview-left
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
        display flex
        border-right 0.5px solid $color-text-l
        margin-right 2.333333vw
        text-align center
        .part
          flex 1
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
      .rating-main
        .rating-item
          display flex
          margin 3.333333vw 0
          border-bottom 0.5px solid $color-dialog-background
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
</style>

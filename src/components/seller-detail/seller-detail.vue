<template>
  <div class="seller-detail">
    <div class="delivery-info info-panel">
      <h3>配送信息</h3>
      <!-- {{seller.delivery_mode.text}} -->
      <div class="delivery-info-text text">
        由蜂鸟专送提供配送服务, 约{{seller.float_minimum_order_amount}}分钟送达,距离{{getDistance}}<br>配送费￥{{seller.float_delivery_fee}}
      </div>
    </div>
    <div class="activities-info info-panel">
      <h3>活动与服务</h3>
      <ul>
        <li class="info-item" v-for="(item, index) in seller.activities" :key="index">
            <span :class="classMap(item.icon_name)" class="active-icon">{{item.icon_name}}</span>
            <span class="text">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="scence info-panel">
      <h3>实景拍摄<span class="title-tip">接口受限,随便找的图</span></h3>
      <div class="swiper-container" id="scence-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item, index) in scence" :key="index" :style="{'background-image': `url(${item})`}">
            <!-- <img :src="item"> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="seller-info info-panel">
      <h3>商家信息</h3>
      <ul>
        <li class="info-item info-item-text text">{{seller.promotion_info}}</li>
        <li class="info-item">
          <span class="info-item-title">品类</span>
          <span class="info-item-text text">{{getSupporttags}}</span>
        </li>
        <li class="info-item">
          <span class="info-item-title">商家电话</span>
          <span class="info-item-text text">{{seller.phone}}</span>
        </li>
        <li class="info-item">
          <span class="info-item-title">地址</span>
          <span class="info-item-text text">{{seller.address}}</span>
        </li>
        <li class="info-item">
          <span class="info-item-title">营业时间</span>
          <span class="info-item-text text">{{seller.opening_hours[0]}}</span>
        </li>
      </ul>
    </div>
    <div class="qualification info-panel" @click="toggleQualification">
      <h3>
        <span class="title">商家资质</span>
        <span class="icon">
          <icon name="enter" scale="2"></icon>
        </span>
      </h3>
    </div>
    <transition name="slide">
      <div class="qual-container" v-show="qualFlag">
        <h4><span class="icon" @click="toggleQualification"><icon name="back" scale="2" fill="rgb(255, 255, 255)"></icon></span><span>营业资质</span></h4>
        <div class="swiper-contianer" id="qualification-swiper">
          <ul class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in qualification.images" :key="index">
              <img :src="getUrl(item)">
            </div>
          </ul>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getQualification} from 'api/seller'
import {extraUrl} from 'common/js/banner'
import Swiper from 'swiper'
const nameMap = new Map()
  .set('首', 'first')
  .set('减', 'decrease')
  .set('折', 'discount')
  .set('票', 'invoice')
  .set('特', 'special')
  .set('换', 'change')
  .set('惠', 'privilege')
export default {
  name: 'seller-detail',
  data () {
    return {
      qualFlag: false,
      qualification: {},
      scence: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546406676904&di=ed67c5179fbc1948487e44f34070e173&imgtype=0&src=http%3A%2F%2Fpic.tugou.com%2Fmeitu_gather%2F1456980853_8516727.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545648703745&di=4509b9d5a8f598cabedcd15f8f99cb25&imgtype=0&src=http%3A%2F%2Fpic2bj.shejibao.com%2Fimg%2F2016%2F07%2F04%2F46a469e6b064d0dafa16d05797ef8113.jpg%40%2521width_800',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545648703744&di=52cf2468752e9a95ff0a9fe3facc08df&imgtype=0&src=http%3A%2F%2Fpic2bj.shejibao.com%2Fimg%2F2016%2F07%2F05%2Fd383b6347efe0a56c7a8e6374f81acc6.jpg%40%2521width_800'
      ]
    }
  },
  methods: {
    classMap (key) {
      return nameMap.get(key)
    },
    toggleQualification () {
      this.qualFlag = !this.qualFlag
    },
    getUrl (path) {
      return extraUrl(path) + '/imageMogr/format/webp/thumbnail/1000x/'
    },
    getScenceUrl (item) {
      return `url('${item}')`
    }
  },
  watch: {
    // qualFlag (newVal) {
    //   if (newVal) {
    //     if (this.qualification.length === 0) {
    //       getQualification(this.seller.id).then(res => {
    //         this.qualification = res
    //       })
    //     } else {
    //       return
    //     }
    //   }
    // }
  },
  computed: {
    getSupporttags () {
      let tags = ''
      if (this.seller.flavors && this.seller.flavors.length > 0) {
        this.seller.flavors.forEach((item) => {
          tags += (item.name + '/')
        })
      }
      tags = tags.slice(0, -1)
      return tags
    },
    getDistance () {
      if (this.seller.distance > 1000) {
        return (this.seller.distance / 1000).toFixed(1) + 'km'
      } else {
        return this.seller.distance + 'm'
      }
    },
    ...mapGetters([
      'seller'
    ])
  },
  created () {
    if (!this.seller) {
      this.$router.push({
        path: '/miste'
      })
    }
  },
  mounted () {
    getQualification(this.seller.id).then(res => {
      this.qualification = res.data
    })
    // .catch(e => {
    //   console.log(e)
    //   if (e.data.name.search(/ERROR/) < 0) {
    //     this.qualification.images = ['b65be36c9540d3963d49b583a182229fjpeg', '1514dce1b89136537dab5725d558741bjpeg']
    //   }
    //   console.log(this.qualification)
    // })
    setTimeout(() => {
      this.swiper = new Swiper('#qualification-swiper', {
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        onSlideChangeEnd: function (swiper) {
          if (swiper.isEnd) {
            swiper.nextButton.css('display', 'none')
          } else {
            swiper.nextButton.css('display', 'block')
          }
        }
      })
    }, 20)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .seller-detail
    background $color-dialog-background
    .info-panel
      background $color-background
      margin-bottom 2.133333vw
      padding 4.266667vw 4vw 4vw
      h3
        color $color-text
        font-weight 700
        font-size $font-size-medium
      .text
        color $color-text-l
      &.activities-info
        max-height 23vh
        overflow-y scroll
        .info-item
          margin  1.666667vw 1.333333vw 1.666667vw 0
          &:first-child
            margin-top 4vw
          &:last-child
            margin-bottom 0
          .active-icon
            border-radius 2px
            padding 1.666667px
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
      &.seller-info
        .info-item
          padding 4vw 4vw 4vw 0
          display flex
          justify-content space-between
          border-bottom 0.5px solid $color-dialog-background
          .info-item-title
            flex 3
          .info-item-text
            flex 7
            text-align right
          &:last-child
            padding-bottom 0
            border-bottom 0
      &.delivery-info
        .delivery-info-text
          padding-top 4vw
      &.qualification
        h3
          display flex
          justify-content space-between
          align-items center
          .title
            display inline-block
            font-weight 700
          .icon
            display inline-block
      &.scence
        h3
          .title-tip
            position relative
            &::before
              content ''
              font-size 0
              display inline-block
              border-bottom 0.5px solid $color-text
              width 5vw
              margin 0 1.333333vw
              transform translate3d(0, -500%, 0)
        .swiper-wrapper
          height 20vh
          width 100%
          overflow scroll
          margin-top 2.33333vw
          // display flex
          // flex-wrap nowrap
          // align-items stretch
          // &::after
          //   content ''
          //   display block
          //   clear both
          // &::after
          //   zoom 1
          .swiper-slide
            // flex 1 1 auto
            display inline-block
            margin-right 2.333333vw
            height 100%
            max-width 50vw
            background-repeat no-repeat
            background-size contain
            // img
            //   height 100%
    .qual-container
      position fixed
      top 0
      bottom 0
      right 0
      left 0
      z-index 1
      background $color-dialog-background
      &.slide-enter-active,&.slide-leave-active
        transition all 0.4s ease
      &.slide-enter,&.slide-leave-to
        transform translate3d(100%, 0, 0)
      h4
        position relative
        color $color-text
        font-size $font-size-medium
        background $color-theme
        height 11.733333vw
        line-height 11.733333vw
        text-align center
        span
          font-weight 700
        .icon
          position absolute
          left 2.333333vw
          top 10%
      .swiper-contianer
        position relative
        width 100%
        height 80vw
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            width 100%
            padding 4vw
            box-sizing border-box
            background $color-background
            text-align center
            img
              height  100%
        .swiper-button-prev,.swiper-button-next
          color $color-theme
          &.swiper-button-prev
            background-image url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffcd32'%2F%3E%3C%2Fsvg%3E")
          &.swiper-button-next
            background-image url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffcd32'%2F%3E%3C%2Fsvg%3E")
          &.swiper-button-disabled
            cursor none
</style>

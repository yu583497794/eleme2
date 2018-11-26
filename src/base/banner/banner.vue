<template>
  <div class="swiper-container" id="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner, index) in banners" :key="index" :style="{backgroundImage: `url(${banner.url})`}">
      </div>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'banner',
  props: {
    banners: {
      type: Array,
      default: null
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    mouseWheel: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.swiper = new Swiper('#swiper', {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: this.loop, // 循环模式选项
        mousewheel: this.mouseWheel,
        autoplay: this.autoPlay,
        observer: true,
        observeParents: false,
        onSlideChangeEnd (swiper) {
          swiper.upload()
          this.swiper.stratAutoplay()
          this.swiper.reLoop()
        }
      })
    }, 20)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .swiper-container
    width 100%
    height 10rem
    .swiper-wrapper
      width 100%
      height 100%
      .swiper-slide
        background-position center
        background-size 100% 100%
        width 100%
        height 100%
      .swiper-pagination-bullet {
        width:0.833rem;
        height: 0.833rem;
        display: inline-block;
        background: #7c5e53;
      }
</style>

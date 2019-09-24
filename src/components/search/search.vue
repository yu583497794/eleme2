<template>
  <div class="search">
    <eleme-head></eleme-head>
    <div class="test">实现中
      <!-- <dot class="loading">...</dot> -->
      <loading-dot></loading-dot>
      <div id="editor-wrapper"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ElemeHead from 'base/eleme-head/eleme-head'
import LoadingDot from 'base/loading-dot/loading-dot'
import ReactDOM from 'react-dom'
// eslint-disable-next-line
import React from 'react'
import Editor from '../editor'
export default {
  name: 'search',
  data () {
    return {
      flag: false
    }
  },
  components: {
    ElemeHead,
    LoadingDot
  },
  // methods: {
  //   toggleFlag () {
  //     this.flag = !this.flag
  //   }
  // }
  mounted () {
    ReactDOM.render(<Editor/>, document.querySelector('#editor-wrapper'))
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .loading
    display inline-block
    height 1em
    line-height 1em
    vertical-align -.25em
    text-align left
    overflow hidden
    &:before
      display block
      white-space pre-wrap
      content '...\A..\A.'
      animation fixed-loading  2s infinite step-start both
@keyframes fixed-loading {
  33% {
    transform translate3d(0, -2em, 0)
  }
  66% {
    transform translate3d(0, -1em, 0)
  }
}
</style>

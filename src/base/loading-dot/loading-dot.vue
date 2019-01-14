<template>
  <div class="loading-dot">...</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'loading-dot'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loading-dot
    display inline-block
    line-height 1em
    height 1em
    overflow hidden
    vertical-align -.25em
    &:before
      display block
      content '...\A..\A.'
      white-space pre-wrap
      animation loading 2s infinite step-start both
  @keyframes loading {
    33% {
      transform translate3d(0, -2em, 0)
    }
    66% {
      transform translate3d(0, -1em, 0)
    }
  }
</style>

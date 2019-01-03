<template>
  <div class="eleme-head">
    <icon name="girl" scale="6" class="head-icon"></icon>
    <h1 class="title">Fairy Eleme</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'eleme-head'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .eleme-head
    height 60px
    font-size 0
    text-align center
    background-color $color-background-d
    .title
      display inline-block
      font-size $font-size-large-x
      line-height 60px
      vertical-align top
      margin-left 10px
      color $color-theme
      background-color $color-background-d
</style>

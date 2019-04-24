<template>
  <div class="message-wrapper">
    <div :class="[msg.self ? 'self-message': 'other-message' , msg.id === -1 ? 'welcome' : 'message']">{{msg.msg}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'message',
  data () {
    return {

    }
  },
  props: {
    msg: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .message-wrapper
    padding 5px 8px
    border-radius 20%
    min-height 52px
    .welcome
      text-align center
      color #fff
      font-size $font-size-small
      margin 5px auto
    .message
      width 60%
      position relative
      background $color-theme-ll
      color #000
      padding 5%
      font-size $font-size-medium
      line-height $font-size-medium-x
      border-radius 5px
      &::after
        position absolute
        content ""
        border-top 6px solid $color-theme-ll
        border-left 6px solid transparent
        border-right 6px solid transparent
        bottom -6px
        width 0
      &.self-message
        transform translate3d(40%, 0 ,  0)
        background $color-theme-dialog
        &::after
          right 10px
      &.other-message
        &::after
          left 10px
</style>

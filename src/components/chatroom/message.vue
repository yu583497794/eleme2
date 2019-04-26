<template>
  <div class="message-wrapper">
    <div class="welcome-message" v-if="msg.id === -1">
      {{msg.msg}}
    </div>
    <div class="chat-message" :class="[msg.self ? 'self-message': 'other-message']" v-if="msg.id !== -1">
      <div class="avatar">
        <img :src="msg.avatar" alt="">
      </div>
      <div class="message-content">{{msg.msg}}</div>
    </div>
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
    .welcome-message
      text-align center
      color #fff
      font-size $font-size-small
      margin 5px auto
    .chat-message
      width 100%
      display flex
      .message-content
        position relative
        flex 0
        color #ccc
        padding 3vw
        font-size $font-size-medium
        line-height $font-size-medium
        border-radius 5px
        white-space pre-wrap
        word-wrap break-word
        max-width 50vw
        vertical-align middle
        &::after
          position absolute
          content ""
          border-top 6px solid $color-theme-ll
          border-left 6px solid transparent
          border-right 6px solid transparent
          bottom -6px
          width 0
      &.self-message
        flex-direction row-reverse
        .message-content
          background $color-theme-dialog
          margin-right 2vw
          &::after
            right 10px
      &.other-message
        .message-content
          background $color-theme-ll
          margin-left 2vw
          &::after
            left 10px
      .avatar
        flex 0 0 auto
        width 10vw
        height 10vw
        box-sizing border-box
        border-radius 50%
        overflow hidden
        img
          width 100%
          height 100%
</style>

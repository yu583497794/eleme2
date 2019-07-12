<template>
  <div class="message-wrapper">
    <div class="welcome-message" v-if="msg.id === -1">
      {{msg.msg}}
    </div>
    <div class="chat-message" :class="[msg.self ? 'self-message': 'other-message']" v-if="msg.id !== -1">
      <div class="avatar">
        <img :src="msg.avatar" alt="">
      </div>
      <div class="message-content-wrapper"><span class="message-content">{{msg.msg}}</span></div>
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
      .message-content-wrapper
        position relative
        flex 0 0 50%
        color #ccc
        display flex
        min-width 3em
        .message-content
          flex 0 0 auto
          position relative
          max-width 100%
          font-size $font-size-medium
          line-height $font-size-medium
          border-radius 5px
          padding 3vw
          white-space pre-wrap
          vertical-align middle
          word-break break-word
          &::after
            position absolute
            content ""
            border-top 6px solid transparent
            border-bottom  6px solid transparent
            width 0
            top 6px
      &.self-message
        flex-direction row-reverse
        .message-content-wrapper
          margin-right 2vw
          justify-content flex-end
          .message-content
            background $color-theme-dialog
            &::after
              border-left 6px solid $color-theme-dialog
              right -6px
      &.other-message
        .message-content-wrapper
          margin-left 2vw
          .message-content
            background $color-theme-ll
            &::after
              border-right 6px solid $color-theme-ll
              left -6px
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

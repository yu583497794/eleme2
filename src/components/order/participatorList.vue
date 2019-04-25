<template>
  <div class="participator-list">
    <h2 class="total">当前在线: <span class="content">{{this.total}}</span> 人</h2>
    <ul class="list-wrapper" @scroll="listScroll">
      <li v-for="(item, index) in participators" :key="index" class="item">
        <span class="avatar">
          <img :src="item.avatar" alt="">
        </span>
        <span class="user-id">{{item.id}}</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {EventUtil} from 'common/js/dom-util'
export default {
  name: 'participator-list',
  data () {
    return {
      reqFlag: true
    }
  },
  props: {
    participators: {
      type: Array,
      default: null
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    listScroll (event) {
      console.log('!!!')
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      console.log(this.reqFlag)
      console.log(Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight))
      if (this.reqFlag && Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight) < 0.5) {
        this.$emit('reqmore')
        this.reqFlag = false
        // 避免重复请求
        setTimeout(1000, function () {
          this.reqFlag = true
          console.log('turn true')
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .participator-list
    position absolute
    bottom 15vw
    right 0
    background $color-background
    padding 0 3vw
    .total
      font-size $font-size-medium
      background $color-background
      color $color-theme
      padding 3vw 0
      .content
        color #fff
        font-weight 700
    .list-wrapper
      max-height 50vw
      overflow scroll
      .item
        display flex
        margin-bottom 2vw
        &:last-child
          margin-bottom 0
        .avatar
          display inline-block
          width 10vw
          height 10vw
          margin-right 3vw
          img
            width 100%
            height 100%
        .user-id
          line-height 10vw
          padding-right 3vw
</style>

<template>
  <div class="eleme-head">
    <div class="background" @click="closeMenu" v-if="showMenu"></div>
    <transition name="slide-down">
      <div class="user-menu-wrapper" v-show="showMenu">
        <ul class="user-menu" v-if="logined">
          <li class="user-menu-item" @click.stop="jumpToProfile('user-center')"  v-if="userBtn">用户中心</li>
          <li class="user-menu-item" @click.stop="onLogout">退出登录</li>
        </ul>
        <ul class="user-menu" v-if="!logined">
          <li class="user-menu-item" @click.stop="jumpToProfile('login')">登录</li>
          <li class="user-menu-item" @click.stop="jumpToProfile('register')">注册</li>
        </ul>
      </div>
    </transition>
    <div class="eleme-head-main">
      <icon name="girl" scale="6" class="head-icon"></icon>
      <h1 class="title">Fairy Eleme</h1>
      <div class="user-icon-wrapper" @click="toggleMenu">
        <i class="iconfont" style='color: #ffcd32; font-size: 20px;'>&#xe7ae;</i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'eleme-head',
  data () {
    return {
      showMenu: false
    }
  },
  props: {
    userBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    jumpToProfile (str) {
      this.showMenu = false
      this.$router.push({
        path: `/profile/${str}`
      })
    },
    onLogout () {
      this.showMenu = false
      this.logoutAction()
      this.$router.push({
        path: '/profile/login'
      })
    },
    closeMenu () {
      this.showMenu = false
    },
    ...mapActions([
      'logoutAction'
    ])
  },
  computed: {
    ...mapGetters([
      'logined'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .eleme-head
    position relative
    background $color-background
    z-index 2
    .eleme-head-main
      height 60px
      font-size 0
      text-align center
      background-color $color-background
      z-index 2
      // overflow visible
      .title
        display inline-block
        font-size $font-size-large-x
        line-height 60px
        vertical-align top
        margin-left 10px
        color $color-theme
        background-color $color-background
      .user-icon-wrapper
        position absolute
        top 50%
        transform translate3d(0, -50%, 0)
        right 3.333333vw
    .background
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      // background rgba(0, 0, 0, 0.5)
      z-index -1
    .user-menu-wrapper
      position absolute
      z-index -1
      top 60px
      right 0
      width 25vw
      // min-height 12vw
      background $color-dialog-background
      &.slide-down-enter-active, &.slide-down-leave-active
        transition transform .25s ease
      &.slide-down-enter, &.slide-down-leave-to
          transform translate3d(0, -100%, 0)
      .user-menu
        display flex
        flex-direction column
        padding 0 1.333333vw
        .user-menu-item
          height 8vw
          line-height 8vw
          color $color-text
          border-bottom 0.2px solid $color-text-l
          font-size $font-size-medium
          text-align center
          &:last-child
            border-bottom none
</style>

<template>
  <div class="foot">
    <router-link tag="div" to="/miste" class="foot-item" id="miste">
      <icon name="home" scale="2" class="icon"></icon>
      <span class="text">外卖</span>
    </router-link>
    <router-link tag="div" to="/order" class="foot-item" id="order">
      <icon name="form" scale="2" class="icon"></icon>
      <span class="text">订单</span>
    </router-link>
    <router-link tag="div" to="/search" class="foot-item" id="search">
      <icon name="search" scale="2" class="icon"></icon>
      <span class="text">搜索</span>
    </router-link>
    <router-link tag="div" to="/profile" class="foot-item" id="profile">
      <icon name="Smile" scale="2" class="icon"></icon>
      <span class="text">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'foot'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .foot
    position fixed
    height 80px
    bottom 0
    left 0
    right 0
    display flex
    border-top 1px solid $color-text-d
    .foot-item
      flex 1
      text-align center
      display flex
      flex-direction column
      align-items center
      justify-content center
      .text
        margin-top 10px
        color $color-text-d
      .icon
        fill $color-text-d
      &.router-link-active
        border-top 2px solid $color-theme
        .text
          color $color-theme
        .icon
          fill $color-theme
</style>

<template>
  <div class="profile">
    <eleme-head></eleme-head>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ElemeHead from 'base/eleme-head/eleme-head'
export default {
  name: 'profile',
  components: {
    ElemeHead
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .profile
    background $color-background-d
</style>

<template>
  <div class="profile">
    <eleme-head :userBtn="false"></eleme-head>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ElemeHead from 'base/eleme-head/eleme-head'
import {mapGetters} from 'vuex'
export default {
  name: 'profile',
  components: {
    ElemeHead
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  activated () {
    if (!this.user.id) {
      this.$router.push({
        path: `/profile/login`
      })
    } else {
      this.$router.push({
        path: `/profile/user-center`
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .profile
    background $color-background-d
    position fixed
    top 0
    bottom 78px
    right 0
    left 0
    overflow-y scroll
</style>

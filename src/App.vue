<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <foot></foot>
  </div>
</template>

<script type="text/ecmascript-6">
import Foot from 'components/foot/foot'
import {mapActions} from 'vuex'
import CookieUtil from 'common/js/cookie-util'
export default {
  name: 'app',
  components: {
    Foot
  },
  beforeMount () {
    if (document.cookie) {
      this.loginAction({
        id: CookieUtil.get('user_id')
      })
    }
  },
  methods: {
    ...mapActions([
      'loginAction'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common/stylus/variable"
</style>

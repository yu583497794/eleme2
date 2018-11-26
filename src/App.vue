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
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    Foot
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common/stylus/variable"
</style>

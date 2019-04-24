<template>
  <div class="order">
    <ul ref="messages">
      <li v-for="(message, index) in messages" :key="index">
        <message :msg="message"></message>
      </li>
    </ul>
    <form @submit="submitMessage">
      <input type="text" placeholder="冒个泡吧~" ref="message"/>
      <button ref="msgBtn">发送</button>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import io from 'socket.io-client'
import Message from './message'
import {EventUtil} from 'common/js/dom-util'
import {mapGetters} from 'vuex'
var socket = io('127.0.0.1:3010')
export default {
  name: 'order',
  data () {
    return {
      messages: []
    }
  },
  components: {
    Message
  },
  methods: {
    submitMessage (event) {
      event = EventUtil.getEvent(event)
      EventUtil.prevent(event)
      console.log('submit')
      socket.emit('chat message', this.$refs.message.value)
      this.$refs.message.value = ''
    }
  },
  mounted () {
    socket.on('chat message', (msg) => {
      if (msg) {
        this.messages.push(Object.assign(msg, {
          self: socket.id === msg.id
        }))
      }
    })
    socket.on('welcome', (msg) => {
      this.messages.push(Object.assign(msg, {
        self: socket.id === msg.id
      }))
    })
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .order
    position absolute
    top 0
    bottom 80px
    left 0
    right 0
    background $color-theme
    ul
      padding 10px
      overflow scroll
    form
      position absolute
      bottom 0px
      display flex
      width 100%
      input
        flex 1
        border 3px solid $color-background
        padding 5px 10px
        min-height 30px
      button
        flex 0 0 15vw
        direction none
        border none;
        background $color-background
        color $color-theme
</style>

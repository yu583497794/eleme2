<template>
  <div class="chatroom">
    <ul ref="messages" id="messages">
      <li v-for="(message, index) in messages" :key="index">
        <message :msg="message"></message>
      </li>
    </ul>
    <form @submit="submitMessage">
      <input type="text" placeholder="冒个泡吧~" ref="message" class="chatroom-input"/>
      <button ref="msgBtn">发送</button>
      <div class="participator" @click="toggleShow">
        <!-- <icon name="participator" scale="3"></icon> -->
        <i class="iconfont">&#xe7af;</i>
      </div>
    </form>
    <transition name="unfold">
      <participator-list
        :participators="participators"
        :total="total" v-show="showFlag"
        class="participator-list"
        @reqmore="reqServerMore">
      </participator-list>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import io from 'socket.io-client'
import Message from './message'
import {EventUtil} from 'common/js/dom-util'
import {mapGetters} from 'vuex'
import ParticipatorList from './participatorList'
// import {getAvatar} from 'api/chatRoom'
var socket = io('127.0.0.1:3010')
export default {
  name: 'chatroom',
  data () {
    return {
      messages: [],
      avatar: '',
      participators: [],
      showFlag: false,
      offset: 0,
      reqNum: 5,
      total: 0
    }
  },
  components: {
    Message,
    ParticipatorList
  },
  methods: {
    submitMessage (event) {
      event = EventUtil.getEvent(event)
      EventUtil.prevent(event)
      socket.emit('chat message', {
        msg: this.$refs.message.value,
        avatar: this.avatar
      })
      this.$refs.message.value = ''
    },
    scrollToView () {
      const item = this.$refs.messages.lastElementChild
      if (item) {
        item.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
          inline: 'nearest'
        })
      }
    },
    _getAvatar () {
      // getAvatar().then(res => {
      //   if (res.code) {
      //     this.avatar = res.imgurl
      //   } else {
      //     this.avatar = 'http://b-ssl.duitang.com/uploads/item/201902/04/20190204104319_gcngt.jpg'
      //   }
      // })
      let number = Math.random().toString().slice(2, 11)
      this.avatar = `https://q2.qlogo.cn/headimg_dl?dst_uin=${number}&spec=100`
    },
    toggleShow () {
      console.log('click')
      if (!this.showFlag) {
        this.showAllParticipator(this.offset, this.reqNum)
      } else {
        this.showFlag = !this.showFlag
      }
    },
    showAllParticipator (offset = 0, num = this.reqNum) {
      socket.emit('reqAllPart', [offset, num])
    },
    reqServerMore () {
      this.offset = this.participators.length
      this.showAllParticipator(this.offset, this.reqNum)
    }
  },
  mounted () {
    socket.on('chat message', (msg) => {
      if (msg.msg) {
        this.messages.push(Object.assign(msg, {
          self: socket.id === msg.id
        }))
        this.$nextTick(() => {
          this.scrollToView()
        })
      }
    })
    socket.on('welcome', (msg) => {
      this.messages.push(Object.assign(msg, {
        self: socket.id === msg.id
      }))
      this.$nextTick(() => {
        this.scrollToView()
      })
    })
    socket.on('leave', (msg) => {
      this.messages.push(Object.assign(msg, {
        self: socket.id === msg.id
      }))
      this.$nextTick(() => {
        this.scrollToView()
      })
    })
    // 响应服务器获取当前用户信息的请求
    socket.on('reqUser', () => {
      socket.emit('resUser', {
        avatar: this.avatar,
        id: socket.id
      })
    })
    socket.on('resAllPart', (data) => {
      // this.participators = this.participators.concat(data.participators)
      this.participators = data.participators
      this.showFlag = !this.showFlag
      this.total = data.total
    })
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  activated () {
    this.$nextTick(() => {
      this.scrollToView()
    })
  },
  created () {
    this._getAvatar()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
// @keyframes unfold {
//   0% {
//     transform scale(0, 0, 0) skew(10deg, 10deg) rotate3d(90deg,  90deg, 90deg)
//   }
//   33% {
//     transform scale(0.3, 0.3, 0.3) skew(6deg, 6deg) rotate3d(60deg,  60deg, 60deg)
//   }
//   66% {
//     transform scale(0.6, 0.6, 0.6) skew(3deg, 3deg) rotate3d(30deg,  30deg, 30deg)
//   }
//   100% {
//     transform scale(1, 1, 1) skew(0, 0) rotate3d(0,  0, 0)
//   }
// }
  .chatroom
    position absolute
    top 0
    bottom 80px
    left 0
    right 0
    background $color-theme
    display flex
    flex-direction column
    overflow hidden
    ul
      flex 1
      padding 10px
      overflow scroll
    form
      flex 1
      display flex
      width 100%
      max-height 15vw
      .participator
        background $color-background
        text-align center
        display flex
        align-items center
        padding 0 3vw
      input
        flex 1
        border 3px solid $color-background
        padding 5px 10px
        min-height 30px
        color $color-text-theme
      button
        flex 0 0 15vw
        direction none
        outline none
        border-style:None
        background $color-background
        color $color-theme
    .participator-list
      transform-origin 100% 100%
      &.unfold-enter-active
        animation unfold .5s
      &.unfold-leave-active
        animation fold .5s
@keyframes unfold
  0%
    opacity 0
    scale 0
  60%
    opacity 1
    transform scale(1.1)
  100%
    transform scale(1)
@keyframes fold
  0%
    transform scale(1)
    opacity 1
  100%
    opacity 0
    transform scale(0.1)
</style>

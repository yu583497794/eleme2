<template>
  <div class="foget-pass">
    <transition name="slide-left">
      <div class="step-panel" v-show="step === 1">
        <div class="input-fill-x">
          <input type="text" class="input-fill input-control" id="foget-name" placeholder="请输入您的用户名">
          <label class="input-label" for="foget-name">用户名</label>
        </div>
        <div class="input-submit" :class="{'input-submit-ok': nextStepOk}" @click="submitName">下一步</div>
        <transition name="shake">
          <div class="err-tip" v-show="errMessage">{{errMessage}}</div>
        </transition>
      </div>
    </transition>
    <transition name="slide-left">
      <div class="step-panel" v-show="step === 2">
        <div class="input-fill-x">
          <input type="email" id="foget-email" class="input-fill input-control" placeholder="请输入账号绑定的邮箱">
          <label class="input-label" for="foget-email">邮箱</label>
        </div>
        <div class="verify-code">
          <div class="input-fill-x verify-code-input not-marigin-bottom">
            <input type="text" class="input-fill input-control" id="verify-code"  placeholder="请进入邮箱确认验证码">
            <label class="input-label" for="verify-code">验证码</label>
          </div>
          <div class="verify-code-send" @click="queryVerifyCode">
            <span v-if="sendOk">发送验证码</span>
            <span v-if="!sendOk">{{remainTime}}s后可重新发送验证码</span>
          </div>
        </div>
        <div class="input-submit" :class="{'input-submit-ok': nextStepOk}" @click="submitCode" >下一步</div>
        <transition name="shake">
          <div class="err-tip" v-show="errMessage">{{errMessage}}</div>
        </transition>
      </div>
    </transition>
    <transition name="slide-left">
      <div class="step-panel" v-show="step === 3">
        <div class="pass input-fill-x">
          <input type="password" class="input-fill input-control" id="pass" placeholder="请输入8-16位密码">
          <label for="pass" class="input-label">密码</label>
        </div>
        <div class="repeat-pass input-fill-x">
          <input type="password" id="repeat-pass" class="input-fill input-control" placeholder="请确认输入的密码">
          <label for="repeat-pass" class="input-label">重复密码</label>
        </div>
        <div class="input-submit" :class="{'input-submit-ok': nextStepOk}" @click="finish" >完成</div>
        <transition name="shake">
          <div class="err-tip" v-show="errMessage">{{errMessage}}</div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import {EventUtil} from 'common/js/dom-util'
export default {
  name: 'foget-pass',
  data () {
    return {
      id: 0,
      step: 1,
      // 是否可以发生验证码
      sendOk: true,
      errMessage: '',
      remainTime: 0,
      success: {
        'foget-name': 0
      }
      // nextStepOk: false
    }
  },
  methods: {
    inputHandler (event) {
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      let id = target.id
      if (target.value) {
        // !!!Vue 不能检测到对象属性的添加或删除
        // 使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
        if (!this.success[id]) {
          this.$set(this.success, id, 1)
          console.log('++')
        }
      } else {
        if (this.success[id]) {
          this.$set(this.success, id, 0)
        }
      }
    },
    nextStep () {
      this.step++
      // Computed property "nextStepOk" was assigned to but it has no setter.
      // this.nextStepOk = 0
      this.errMessage = ''
    },
    submitName () {
      let name = document.getElementById('foget-name').value
      if (this.nextStepOk) {
        this.$http.post('/api/user/getUserId', {
          name
        }).then(res => {
          if (res.body.id) {
            this.id = res.body.id
            this.nextStep()
            this.success = {
              'foget-email': 0,
              'verify-code': 0
            }
          } else {
            this.errMessage = '该用户不存在'
          }
        })
      }
    },
    submitCode () {
      let code = document.getElementById('verify-code').value
      let date = Date.parse(new Date())
      if (code) {
        this.$http.post('/api/user/sendVerifyCode', {
          code,
          date,
          id: this.id
        }).then(res => {
          if (res.body.code) {
            this.nextStep()
            this.success = {
              'pass': 0,
              'repeat-pass': 0
            }
          } else {
            this.errMessage = res.body.message
          }
        })
      }
    },
    queryVerifyCode () {
      let email = document.getElementById('foget-email').value
      if (email && this.sendOk) {
        this.$http.post('/api/user/queryVerifyCode', {
          email,
          id: this.id
        }).then((res) => {
          this.errMessage = res.body.message
          this.sendOk = false
          this.remainTime = 60
          let remain = setInterval(() => {
            this.remainTime--
          }, 1000)
          setTimeout(() => {
            clearInterval(remain)
            this.sendOk = true
          }, 60000)
        })
      }
    },
    finish () {
      let pass = document.getElementById('pass').value
      let repeatPass = document.getElementById('repeat-pass').value
      if (!pass) {
        this.errMessage = '请输入密码'
      } else if (!repeatPass) {
        this.errMessage = '请输入重复密码'
      } else if (pass !== repeatPass) {
        this.errMessage = '两次密码输入不一致'
      } else {
        let date = Date.parse(new Date())
        this.$http.post('/api/user/modifyPassword', {
          id: this.id,
          pass,
          date
        }).then((res) => {
          if (res.body.code) {
            this.$router.push({
              path: '/profile/login'
            })
          } else {
            this.errMessage = res.body.message
          }
        })
      }
    }
  },
  // watch: {
  //   success () {
  //     console.log(this.success)
  //     for (let key in this.success) {
  //       console.log(this.success[key])
  //       if (!this.success[key]) {
  //         this.nextStepOk = false
  //         return
  //       }
  //     }
  //     this.nextStepOk = true
  //   }
  // },
  computed: {
    nextStepOk () {
      for (let key in this.success) {
        if (!this.success[key]) {
          return false
        }
      }
      return true
    }
  },
  mounted () {
    let inputs = document.getElementsByClassName('input-fill')
    for (let i = 0; i < inputs.length; i++) {
      EventUtil.addHandler(inputs[i], 'blur', this.inputHandler)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .foget-pass
    position relative
    margin 0 2.333333vw
    .step-panel
      position absolute
      top 0
      left 0
      right 0
      padding 2.333333vw 0
      &.slide-left-enter-active, &.slide-left-leave-active
        transition .25s all ease
      &.slide-left-enter
        transform translate3d(100%,  0, 0)
        opacity 0
      &.slide-left-leave-to
        transform translate3d(-100%, 0, 0)
        opacity 0
      .err-tip
        color $color-text-price
        &.shake-enter-active
          animation shake 0.5s
      .input-fill-x
        position relative
        margin-bottom 2.333333vw
        &.not-marigin-bottom
          margin-bottom 0
        .input-control
          padding 26px 0px 10px 5px
          box-sizing border-box
          width 100%
          background $color-highlight-background
          border-radius 3px
          &:placeholder-shown::placeholder
            color transparent
        .input-label
          position absolute
          top 50%
          transform translate3d(5px, -50%, 0)
          color $color-text
          transition all 0.25s
      .input-fill-x
        &::after
          content ''
          position absolute
          left 0
          right 0
          bottom -1px
          border-bottom 2px solid $color-theme
          transform scaleX(0)
          transition transform .25s
        &:focus-within::after
          transform scaleX(1)
        .input-fill
          color $color-text
          font-size $font-size-small
          &:focus
            background  $color-dialog-background
          &:focus::placeholder
            color $color-dialog-background
            font-size $font-size-small
          &:focus ~ .input-label, &:not(:placeholder-shown) ~ .input-label
            transform translate3d(-5px, -20px, 0) scale(0.75)
            color $color-theme-dd
      .input-submit
        padding 2.666667vw 0
        margin-top 2.666667vw
        text-align center
        background $color-highlight-background
        color $color-text-l
        border-radius 5px
        &.input-submit-ok
          background $color-theme
          color $color-text
      .verify-code
        display flex
        margin-top 2.666667vw
        .verify-code-input
          flex 6
        .verify-code-send
          flex 6
          line-height 48px
          text-align center
@keyframes shake {
  0% {
    transform scale(1.3) translate3d(100%, 0, 0)
  }
  33% {
    transform scale(0.9) translate3d(-10%, 0, 0)
  }
  55% {
    transform scale(1.2) translate3d(20%, 0, 0)
  }
  60% {
    transform scale(0.95) translate3d(-5%, 0, 0)
  }
  70% {
    transform scale(1.1) translate3d(10%, 0, 0)
  }
  80% {
    transform scale(0.97) translate3d(-3%, 0, 0)
  }
  90% {
    transform scale(1.05) translate3d(5%, 0, 0)
  }
  100% {
    transform scale(1) translate3d(0, 0, 0)
  }
}
</style>

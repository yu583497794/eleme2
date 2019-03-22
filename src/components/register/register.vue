<template>
  <div class="register">
    <form id="register-form" method="POST">
      <div class="input-fill-x">
        <input type="text" name="username" id="username" class="input-control input-fill" placeholder="6~18个字符(汉字、字母、数字、下划线),设置后不可改" v-model="form.name">
        <label class="input-label" for="username">昵称</label>
        <div class="tip" v-if="usernameError.length > 0">{{usernameError}}</div>
      </div>
      <div class="input-fill-x">
        <input type="email" name="email" id="email" class="input-control input-fill" placeholder="请输入您的邮箱地址" v-model="form.email">
        <label class="input-label" for="email">邮箱</label>
        <div class="tip" v-if="emailError.length > 0">{{emailError}}</div>
      </div>
      <div class="input-fill-x">
        <input type="password" name="password" id="password" class="input-control input-fill" placeholder="长度为8-16位字符,区分大小写" v-model="form.pass">
        <label class="input-label" for="password">密码</label>
        <div class="tip" v-if="passwordError.length > 0">{{passwordError}}</div>
      </div>
      <div class="input-fill-x">
        <input type="password" id="password-again" class="input-control input-fill" placeholder="请再一次输入密码" v-model="form.checkPass">
        <label class="input-label" for="password-again">确认密码</label>
        <div class="tip" v-if="passwordAgainError.length > 0">{{passwordAgainError}}</div>
      </div>
      <!-- <div class="input-outline-x">
        <input type="text" class="input-control input-outline" placeholder="昵称">
        <label class="input-label">昵称</label>
      </div> -->
      <div class="register-submit-x">
        <!-- <input type="submit" value="注册" :class="loginOk" class="register-submit" @click="onSubmit('form')"> -->
        <div class="register-submit" :class="loginOk" id="register-submit" @click="onSubmit('form')">
          <span v-if="!submit">注册</span>
          <span v-if="submit" class="loading">注册中</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
import {EventUtil} from 'common/js/dom-util'
const USERNAME_INDEX = 0
const EMAIL_INDEX = 1
const PASSWORD_INDEX = 2
const PASSWORD_AGAIN_INDEX = 3
const INPUT_NUM = 4
export default {
  name: 'register',
  data () {
    return {
      usernameError: '',
      emailError: '',
      passwordError: '',
      passwordAgainError: '',
      form: {
        name: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      success: new Array(INPUT_NUM).fill(0),
      submit: false
    }
  },
  methods: {
    usernameCheck (event) {
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      let text = target.value
      if (!text) {
        this.usernameError = ''
        return
      }
      if (text.length < 2) {
        this.usernameError = '昵称过短'
      } else if (text.length > 18) {
        this.usernameError = '昵称过长'
      } else {
        if (/\W&[^\u4e00-\u9fa5]/.test(text)) {
          this.usernameError = '使用了非法字符'
        } else {
          this.usernameError = ''
          // this.register.username = text
          if (!this.success[USERNAME_INDEX]) {
            this.success[USERNAME_INDEX] = 1
            this.success = this.success.slice(0)
          }
          return
        }
      }
      if (this.success[USERNAME_INDEX]) {
        this.success[USERNAME_INDEX] = 0
        this.success = this.success.slice(0)
      }
    },
    emailCheck (event) {
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      let text = target.value
      if (!text) {
        this.emailError = ''
        return
      }
      if (!/\w+@\w+\.\w+/.test(text)) {
        this.emailError = '非法的邮箱地址'
      } else {
        this.emailError = ''
        // this.register.this.register.email = text
        if (this.success[EMAIL_INDEX]) {
          return
        } else {
          this.success[EMAIL_INDEX] = 1
          this.success = this.success.slice(0)
          return
        }
      }
      if (this.success[EMAIL_INDEX]) {
        this.success[EMAIL_INDEX] = 0
        this.success = this.success.slice(0)
      }
    },
    passwordCheck (event) {
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      let text = target.value
      if (!text) {
        this.passwordError = ''
        return
      }
      if (/^.{8,16}$/.test(text)) {
        this.passwordError = ''
        // this.register.password = text
        if (!this.success[PASSWORD_INDEX]) {
          this.success[PASSWORD_INDEX] = 1
          this.success = this.success.slice()
        }
        if (this.form.checkPass && this.form.checkPass.length > 0) {
          if (this.form.pass !== this.form.checkPass) {
            this.passwordAgainError = '两次密码不一致'
            if (this.success[PASSWORD_AGAIN_INDEX]) {
              this.success[PASSWORD_AGAIN_INDEX] = 0
              this.success = this.success.slice(0)
            }
          } else {
            if (!this.success[PASSWORD_AGAIN_INDEX]) {
              this.success[PASSWORD_AGAIN_INDEX] = 1
              this.success = this.success.slice(0)
            }
          }
        }
        return
      } else {
        this.passwordError = '密码的长度有误'
      }
      if (this.success[PASSWORD_INDEX]) {
        this.success[PASSWORD_INDEX] = 0
        this.success = this.success.slice(0)
      }
    },
    passwordAgainCheck (event) {
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      let text = target.value
      if (!text) {
        this.passwordAgainError = ''
        return
      }
      // this.register.passwordAgain = text
      if (this.form.checkPass && this.form.checkPass.length > 0) {
        if (this.form.pass === this.form.checkPass) {
          this.passwordAgainError = ''
          // this.form.checkPass = text
          if (!this.success[PASSWORD_AGAIN_INDEX]) {
            this.success[PASSWORD_AGAIN_INDEX] = 1
            this.success = this.success.slice(0)
          }
          return
        } else {
          this.passwordAgainError = '两次密码不一致'
        }
      }
      if (this.success[PASSWORD_AGAIN_INDEX]) {
        this.success[PASSWORD_AGAIN_INDEX] = 0
        this.success = this.success.slice(0)
      }
    },
    onSubmit (form) {
      if (!this.success.some(item => {
        return !item
      })) {
        this.$http.post('/log-api/user/addUser', JSON.stringify(this.form), {
          emulateJSON: true
        }).then(function (response) {
          this.submit = true
          let self = this
          setTimeout(() => {
            self.$router.push({
              path: '/profile/login'
            })
          }, 2000)
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  },
  computed: {
    loginOk () {
      return this.success.every((item) => {
        return item === 1
      }) ? 'login-ok' : ''
    }
  },
  mounted () {
    let username = document.getElementById('username')
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let passwordAgain = document.getElementById('password-again')
    EventUtil.addHandler(username, 'change', this.usernameCheck)
    EventUtil.addHandler(email, 'change', this.emailCheck)
    EventUtil.addHandler(password, 'change', this.passwordCheck)
    EventUtil.addHandler(passwordAgain, 'change', this.passwordAgainCheck)
  },
  activated () {
    this.submit = false
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .register
    padding 2.33333vw 1.666667vw
    .input-fill-x,.input-outline-x
      position relative
      margin-bottom 2.666667vw
      .input-control
        width 100%
        box-sizing border-box
        font-size $font-size-medium-x
        line-height 1.5
        outline none
        &:placeholder-shown::placeholder
          color transparent
      .input-label
        position absolute
        left 16px
        top 50%
        transform translate3d(0, -50%, 0)
        color $color-background
        transition all .25s
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
      .tip
        position absolute
        top 6px
        right 6px
        color $color-text-price
        font-size $font-size-small
      .input-fill
        padding 20px 16px 6px
        &:focus::placeholder
          color $color-dialog-background
          font-size $font-size-small
        &:focus
          color $color-background
          font-size $font-size-medium
        &:focus ~ .input-label, &:not(:placeholder-shown)  ~ .input-label
          transform translate3d(-2px, -20px, 0) scale(.75)
          color $color-theme-dd
    .input-outline-x
      // 当元素本身或其后代获得焦点时 :focus-within伪类的元素就会有效
      .input-outline
        padding 13px 16px
        transition all .25s
        &:focus
          outline 2px solid $color-theme
        &:not(:placeholder-shown) ~ .input-label, &:focus ~ .input-label
          transform translate3d(0, -30px, 0) scale(.75)
          color $color-theme-dd
    .register-submit-x
      .register-submit
        width 100%
        text-align center
        padding 2.33333vw 0
        background $color-dialog-background
        color $color-text-l
        &.login-ok
          background $color-theme
          color $color-text
        .loading
          display inline-block
          &:after
            content '...'
            display inline-block
            animation loading 2s infinite
@keyframes loading {
  0% {
    content '...'
    }
  33% {
    content '.'
    }
  66% {
    content '..'
    }
  100% {
    content '...'
    }
}
</style>

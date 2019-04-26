<template>
  <div class="login">
    <form id='normal-login-form'>
      <dl class="list">
        <dd class="visibale">
          <dl >
            <dd>
              <input type="text" name="log-in" id="username" placeholder="账户名/手机号/Email" class="input" v-model="form.name">
            </dd>
            <dd>
              <input type="password" name="log-in" id="password" placeholder="请输入您的密码" class="input" v-model="form.pass">
            </dd>
          </dl>
        </dd>
        <dd class="login-btn">
          <button type="button" id="login-btn" @click="onSubmit">
            <div v-if="!submit">登录</div>
            <div v-if="submit">登录中<loading-dot></loading-dot></div>
          </button>
        </dd>
      </dl>
    </form>
    <div class="subline">
      <router-link to="./register" tag="div">立即注册</router-link>
      <router-link to="/profile/foget-pass" tag="div">忘记密码</router-link>
    </div>
    <div class="login-tip" v-if="loginMessage">{{loginMessage}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
import {EventUtil} from 'common/js/dom-util'
import {mapActions} from 'vuex'
import LoadingDot from 'base/loading-dot/loading-dot'
export default {
  name: 'login',
  data () {
    return {
      form: {
        name: '',
        pass: ''
      },
      loginMessage: '',
      submit: false
    }
  },
  components: {
    LoadingDot
  },
  methods: {
    focusHandledr (event) {
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      target.style.backgroundColor = '#666'
    },
    blurHandler (event) {
      event = EventUtil.getEvent(event)
      let target = EventUtil.getTarget(event)
      target.style.backgroundColor = '#222'
    },
    onSubmit () {
      if (this.form.name && this.form.pass) {
        this.$http.post('/log-api/user/login', JSON.stringify(this.form), {
          emulateJSON: true
        }).then((response) => {
          let res = response.body
          if (res.code < 1) {
            this.loginMessage = res.message
          } else {
            // let loginBtn = document.getElementById('login-btn')
            this.submit = true
            // loginBtn.innerText = '登陆中...'
            this.loginAction(res)
            setTimeout(() => {
              this.$router.push('/profile/user-center')
            }, 2000)
          }
        })
      }
    },
    ...mapActions([
      'loginAction'
    ])
  },
  mounted () {
    let form = document.getElementById('normal-login-form')
    let elements = form.elements
    EventUtil.addHandler(elements[0], 'focus', this.focusHandledr)
    EventUtil.addHandler(elements[0], 'blur', this.blurHandler)
    EventUtil.addHandler(elements[1], 'focus', this.focusHandledr)
    EventUtil.addHandler(elements[1], 'blur', this.blurHandler)
    // form.elements.forEach(elem => {
    //   EventUtil.addHandler(elem, 'focus', this.focusHandledr)
    // })
  },
  activated () {
    this.submit = false
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
  .login
    #normal-login-form
      .list
        .visibale
          padding 2vw 3.666667vw
          dd
            margin-bottom 2vw
            &:last-child
              margin-bottom 0
          .input
            width 100%
            height 12vw
            border-radius 2vw
            background $color-background
            color $color-text
        .login-btn
          text-align center
          padding 0 3.666667vw
          margin 2vw 0
          #login-btn
            display inline-block
            width 100%
            background $color-theme
            border-radius 1vw
            color $color-text
            padding 1vw 0
            // .loading
            //   display inline-block
            //   line-height 1em
            //   &:after
            //     overflow pre-wrap
            //     display block
            //     content '.\A..\A...'
            //     height 1em
            //     animation fixed-loading 2s infinite
    .subline
      display flex
      padding 0 3vw
      justify-content space-between
      color $color-theme
      margin 2vw 0
    .login-tip
      padding 0 3vw
      color $color-text-price
      font-size $font-size-medium
// @keyframes fixed-loading {
//   33% {
//     transform translate3d(0, 33%, 0)
//   }
//   66% {
//     transform translate3d(0, 66%, 0)
//   }
// }
</style>

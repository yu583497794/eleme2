<template>
  <div class="login">
    <form id='normal-login-form'>
      <dl class="list">
        <dd class="visibale">
          <dl >
            <dd>
              <input type="text" name="log-in" id="username" placeholder="账户名/手机号/Email" class="input">
            </dd>
            <dd>
              <input type="password" name="log-in" id="password" placeholder="请输入您的密码" class="input">
            </dd>
          </dl>
        </dd>
        <dd class="login-btn">
          <input type="submit" value="登陆" id="login-btn">
        </dd>
      </dl>
    </form>
    <div class="subline">
      <router-link to="./register" tag="div">立即注册</router-link>
      <router-link to="/profile/foget" tag="div">忘记密码</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {EventUtil} from 'common/js/dom-util'
export default {
  name: 'login',
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
    }
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
    .subline
      display flex
      padding 0 3vw
      justify-content space-between
      color $color-theme
      margin 2vw 0
</style>

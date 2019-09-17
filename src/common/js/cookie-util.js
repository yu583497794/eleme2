var CookieUtil = {
  get (name) {
    let cookieReg = new RegExp('(^| )' + encodeURIComponent(name) + '=([^;]*)(;|$)')
    let arr = document.cookie.match(cookieReg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  },
  set (name, value, expires, path, domain, secure) {
    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';'
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString()
    }
    if (path) {
      cookieText += '; path=' + path
    }
    if (domain) {
      cookieText += '; domain' + domain
    }
    if (secure) {
      cookieText += '; secure'
    }
    document.cookie = cookieText
  },
  unset (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure)
  }
}

export default CookieUtil

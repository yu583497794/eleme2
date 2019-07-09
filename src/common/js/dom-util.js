export const EventUtil = {
  addHandler: (el, type, handler) => {
    if (!el) return
    if (el.addEventListener) {
      el.addEventListener(type, handler, false)
    } else {
      if (el.attchEvent) {
        el.attchEvent('on' + type, handler)
      } else {
        el['on' + type] = handler
      }
    }
  },
  removeHandler: (el, type, handler) => {
    if (el.removeEventListener) {
      el.removeEventListener(type, handler, false)
    } else {
      if (el.detachEvent) {
        el.detachEvent('on' + type, handler)
      } else {
        el['on' + type] = null
      }
    }
  },
  getEvent: (event) => {
    // eslint-disable-next-line
    return event ? event : window.event
  },
  getTarget: (event) => {
    if (event.target) {
      return event.target
    } else {
      return event.srcElement
    }
  },
  getCharCode: (event) => {
    if (typeof event.charCode === 'number') {
      return event.charCode // 按下那个键的所代表字符的ASCII编码
    } else {
      return event.keyCode
    }
  },
  getClipboardText: (event) => {
    var clipboardData = event.clipboardData || window.clipboardData
    return clipboardData.getData('text')
  },
  setClipboardText: (event, value) => {
    if (event.clipboardData) {
      return event.clipboardData.setData('text/plain', value)
    } else if (window.clipboradData) {
      return window.clipboradData.setData('text', value)
    }
  },
  prevent: (event) => {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  },
  stop: (event) => {
    if (event.stopPropagation) {
      // console.log('stop')
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  }
}

export const EventUtil = {
  addHandler: (el, type, handler) => {
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

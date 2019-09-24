import React from 'react'
import IconButton from '../../components/IconButton'
import { Editor } from 'slate'
let markIconMap = {
  bold: '\ue7f7',
  italic: '\ue7fb',
  underline: '\ue7fa'
}
function clickHandler (type, value, setValue) {
  const controller = new Editor({
    value
  })
  setValue(controller.toggleMark(type).focus().value)
}

export default function ({value, setValue, type}) {
  // const clickHandler = React.useCallback(() => {
  //   // editor.current.focus().toggleMark(type).focus()
  //   const controller = new Editor({
  //     value
  //   })
  //   setValue(controller.toggleMark(type).focus().value)
  // }, [type, editor, setValue, value])
  const isActive = React.useMemo(() => {
    // return editor.current.value ? editor.current.value.activeMarks.some(mark => mark.type === type) : false
    return value.activeMarks.some(mark => mark.type === type)
  }, [value, type])
  return (
    <IconButton clickHandler={() => { clickHandler(type, value, setValue) }} isActive={isActive}>
      <i className='iconfont'>{markIconMap[type]}</i>
    </IconButton>
  )
}

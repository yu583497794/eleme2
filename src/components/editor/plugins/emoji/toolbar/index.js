// eslint-disable-next-line
import React from 'react'
import EmojisPannel from './emojisPannel'
import {Inline} from 'slate'
import IconButton from '../../components/IconButton'
import './index.styl'

function EmojisButton ({editor, value, setValue}) {
  const [isVisible, setVisible] = React.useState(false)
  const togglePannel = React.useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible(visible => !visible)
    editor.current.focus()
  }, [editor])

  const clickEmojiHandler = React.useCallback((e, code) => {
    const newInline = Inline.create({
      data: {code},
      type: 'emoji'
    })
    e.preventDefault()
    e.stopPropagation()
    return editor.current.insertInline(newInline).moveToStartOfNextText().focus()
  }, [editor])

  const hidePannel = React.useCallback((e) => {
    e.stopPropagation()
    setVisible(false)
    editor.current.focus()
  }, [editor])
  return (
    <span className='emoji-btn-wrapper'>
      <IconButton className='emoji-toolbar-btn' isActive={isVisible} clickHandler={togglePannel}>
        <span><i className='iconfont'>&#xe783;</i></span>
      </IconButton>
      <div className={`emojis-pannel-wrapper ${isVisible ? 'emojis-pannel-wrapper-visible' : ''}`}>
        <EmojisPannel clickEmojiHandler={clickEmojiHandler} hidePannel={hidePannel}/>
      </div>
    </span>
  )
}

export default EmojisButton

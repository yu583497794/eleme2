import React from 'react'
import './emojisPannel.styl'
import EmojisContext from './emojisContext'

function EmojiPannel ({clickEmojiHandler, hidePannel}) {
  const emojis = React.useContext(EmojisContext)
  const pannel = React.useRef()
  const mask = React.useRef()
  React.useEffect(() => {
    const children = pannel.current.children
    let events = emojis.map((emoji, index) => {
      let event = (e) => {
        clickEmojiHandler(e, emoji)
      }
      children.item(index).addEventListener('click', event)
      return event
    })
    return () => {
      events.map((event, index) => {
        children.item(index).removeEventListener('click', event)
      })
    }
  }, [emojis, clickEmojiHandler, pannel])
  React.useEffect(() => {
    mask.current.addEventListener('click', hidePannel)
    return () => {
      mask.current.removeEventListener('click', hidePannel)
    }
  }, [mask, hidePannel])
  return (
    <React.Fragment>
      <div className='emojis-pannel-mask' ref={mask}/>
      <div className='emojis-pannel' ref={pannel}>
        {emojis.map((emoji, index) => (
          <span className='emojis-pannel-item' key={index}>{emoji}</span>
        ))}
      </div>
    </React.Fragment>
  )
}
export default EmojiPannel

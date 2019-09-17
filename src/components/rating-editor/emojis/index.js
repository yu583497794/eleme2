
import { Editor } from 'slate-react'
import { Value, Block } from 'slate'

import React from 'react'
import initialValueAsJson from './value.json'
import {isKeyHotkey} from 'is-hotkey'
import { cx, css } from 'emotion'
import { Button, Icon, Toolbar } from '../components'
import './index.styl'
// import PlaceholderPlugin from 'slate-react-placeholder'
/**
 * Deserialize the initial editor value.
 *
 * @type {Object}
 */

const initialValue = Value.fromJSON(initialValueAsJson)

/**
 * Emojis.
 *
 * @type {Array}
 */

const EMOJIS = [
  '😃',
  '😬',
  '😂',
  '😅',
  '😆',
  '😍',
  '😱',
  '👋',
  '👏',
  '👍',
  '🙌',
  '👌',
  '🙏',
  '👻',
  '🍔',
  '🍑',
  '🔑'
]
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
/**
 * The links example.
 *
 * @type {Component}
 */
// const plugins = [
//   {
//     queries: {
//       isEmpty: editor => {
//         return editor.value.document.text === ''
//       }
//     }
//   },
//   PlaceholderPlugin({
//     placeholder: '请输入评价...',
//     when: 'isEmpty'
//   })
// ]

const schema = {
  document: {
    nodes: [
      {match: {min: 1}}
    ],
    last: { type: 'paragraph' },
    normalize: (editor, {code, node, child, index}) => {
      switch (code) {
        case 'child_type_invalid':
          return editor.setNodeByKey(child.key, { type: 'paragraph' })
        case 'child_min_invalid':
          const block = Block.create('paragraph')
          return editor.insertNodeByKey(node.key, index, block)
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    }
  },
  inlines: {
    parent: {
      type: 'paragram'
    },
    emoji: {
      // users cant edit the text of emoji
      isVoid: true,
      nodes: [
        {match: {object: 'text'}}
      ]
    }
  }
}

class Emojis extends React.Component {
  /**
   * The editor's schema.
   *
   * @type {Object}
   */
  constructor (props) {
    super(props)
    this.toggleEmojisBar = this.toggleEmojisBar.bind(this)
    this.render = this.render.bind(this)
    this.renderBlock = this.renderBlock.bind(this)
    this.renderInline = this.renderInline.bind(this)
    this.renderMark = this.renderMark.bind(this)
    this.renderMarkButton = this.renderMarkButton.bind(this)
    this.onClickEmoji = this.onClickEmoji.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onBlur = this.onBlur.bind(this)
    // this.hasMark = this.hasMark.bind(this)
    this.editor = React.createRef()
    this.init = this.init.bind(this)
  }
  state = {
    showEmojisBar: false
  }
  init () {
    // const controller = this.editor.current
    console.log('before init', this.editor.current.value.document.text)
    let nodes = this.editor.current.value.document.nodes
    // 保留一个paragraph
    while (nodes.size > 1) {
      this.editor.current.removeNodeByKey(nodes.get(1).key)
    }
    const block = Block.create({
      type: 'paragraph'
    })
    this.editor.current.replaceNodeByKey(nodes.get(0).key, block)
    // 必须 Synchronously flush the current changes to editor, calling onChange.
    // 同步将当前更改刷新到编辑器，调用onChange。
    console.log('after init', this.editor.current.value.document.text)
    this.editor.current.normalize()
  }
  toggleEmojisBar () {
    let {showEmojisBar} = this.state
    this.setState({
      showEmojisBar: !showEmojisBar
    })
  }
  render () {
    let {showEmojisBar} = this.state
    return (
      <div className="editor-wrapper">
        <Editor
          placeholder="请输入评价😍👋🎉..."
          ref={this.editor}
          defaultValue={initialValue}
          schema={schema}
          renderBlock={this.renderBlock}
          renderInline={this.renderInline}
          renderMark={this.renderMark}
          // plugins={plugins}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          // onBlur={this.onBlur}
          className={
            css`
              box-sizing: content-box;
              min-height: 4.2em;
              line-height: 1.4em;
              background: rgba(125, 125, 125, 0.7);
              padding: 1em;
            `
          }
        />
        <Toolbar>
          <div
            className="emojis-btn"
          >
            <Button onMouseDown={this.toggleEmojisBar}>
              <Icon >{'face'}</Icon>
            </Button>
            { showEmojisBar && (<div
              className={cx(
                'emojis-bar',
                'container',
                'material-icons'
                // css`
                //   display: ${showEmojisBar ? 'none' : 'block'};
                // `
              )}
            >
              <div className='row'>
                {EMOJIS.map((emoji, i) => (
                  <Button key={i} onMouseDown={e => this.onClickEmoji(e, emoji)} className='col-xs-2'>
                    <Icon>{emoji}</Icon>
                  </Button>
                ))}
              </div>
            </div>)}
          </div>
          {/* 使用类似&#xe7f7;不会被转义！！！ */}
          { this.renderMarkButton('bold', '\ue7f7') }
          { this.renderMarkButton('italic', '\ue7fb') }
          { this.renderMarkButton('underlined', '\ue7fa') }
        </Toolbar>
      </div>
    )
  }

  /**
   * Render a Slate block.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */
  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'paragraph':
        return <p {...attributes}>{children}</p>
      default:
        return next()
    }
  }

  /**
   * Render a Slate inline.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderInline = (props, editor, next) => {
    const { attributes, node, isFocused } = props

    switch (node.type) {
      case 'emoji':
        return (
          <span
            {...attributes}
            contentEditable={false}
            onDrop={e => e.preventDefault()}
            className={css`
              outline: ${isFocused ? '2px solid blue' : 'none'};
            `}
          >
            {node.data.get('code')}
          </span>
        )
      default:
        return next()
    }
  }

  renderMark (props, editor, next) {
    const {mark, children, attributes} = props
    switch (mark.type) {
      case 'bold':
        return (<strong {...attributes}
          className={css`
            font-weight: 900;
          `}
        >{children}</strong>)
      case 'italic':
        return (<span {...attributes}
          className={css`
            font-style: italic;
          `}
        >{children}</span>)
      case 'underlined':
        return (<span {...attributes}
          className={css`
            text-decoration: underline;
          `}
        >{children}</span>)
      default:
        return next()
    }
  }
  renderMarkButton (type, icon) {
    // const isActive = this.hasMark(type)
    return (
      <Button
        onMouseDown={e => { this.onClickMark(e, type) }}
        // active={isActive}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }
  onClickEmoji = (e, code) => {
    e.preventDefault()

    this.editor.current
      .insertInline({ type: 'emoji', data: { code } })
      .moveToStartOfNextText()
      .focus()
  }
  onChange ({value}) {
    this.setState({
      value: JSON.stringify(value.toJSON())
    })
  }
  onKeyDown (event, editor, next) {
    let mark = ''
    if (isKeyHotkey('mod+r')(event)) {
      event.preventDefault()
      this.init()
      return next()
    }
    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else {
      return next()
    }
    event.preventDefault()
    editor.toggleMark(mark)
  }
  onClickMark (event, type) {
    event.preventDefault()
    this.editor.current.toggleMark(type)
  }
  hasMark (type) {
    const {value} = this.editor.current
    return value.activeMarks.some(mark => mark.type === type)
  }
  onBlur (e) {
    this.setState({
      showEmojisBar: false
    })
  }
}

export default Emojis

import React from 'react'
// import {Editor} from 'slate-react'
import Emojis from './emojis/index.js'
// import {Value} from 'slate'
// import initalValueJSON from './value.json'
import Star from '../star/Star'
import './index.styl'
// import Plain from 'slate-plain-serializer'

// const initialValue = Value.fromJSON(initalValueJSON)

// class RatingEditor extends React.Component {
//   constructor (props) {
//     super(props)
//     this.onChange = this.onChange.bind(this)
//     this.state = {
//       value: initialValue
//     }
//     this.renderBlock = this.renderBlock.bind(this)
//   }
//   render () {
//     return (
//       <React.Fragment>
//         <Star num={5}></Star>
//         <Editor
//           contentable
//           spellCheck
//           autoFocus
//           placeholder="Get to work..."
//           defaultValue={initialValue}
//           onChange={this.onChange}
//           className="Editor"
//           renderBlock={this.renderBlock}
//         />
//       </React.Fragment>
//     )
//   }
//   onChange ({value}) {
//     this.setState({
//       value
//     })
//   }
//   renderBlock (props, editor, next) {
//     const {type} = props
//     switch (type) {
//       default: {
//         return next()
//       }
//     }
//   }
// }

// const initialValue = Plain.deserialize(
//   'This is editable plain text, just like a <textarea>!'
// )

class RatingEditor extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    // this.render = this.render.bind(this)
  }
  render () {
    return (
      <div className="rating-editor-wrapper">
        <ul className="rating-star-wrapper">
          <li className="rating-star-item">
            <span className="rating-star-label">商家</span><Star></Star>
          </li>
          <li className="rating-star-item">
            <span className="rating-star-label">菜品</span><Star></Star>
          </li>
          <li className="rating-star-item">
            <span className="rating-star-label">服务</span><Star></Star>
          </li>
        </ul>
        <Emojis />
        {/* <Editor
          contenteditable
          placeholder="Enter some plain text..."
          defaultValue={initialValue}
        /> */}
      </div>
    )
  }
  handleClick (e) {
    console.log(e)
  }
}
export default RatingEditor

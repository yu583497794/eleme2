import React from 'react'
import Emojis from './emojis/index.js'
// eslint-disable-next-line
import {Value} from 'slate'
import Star from '../star/Star'
import './index.styl'
import loading from './loading.gif'
class RatingEditor extends React.Component {
  constructor (props) {
    super(props)
    this.sellerStar = React.createRef()
    this.serviceStar = React.createRef()
    this.foodStar = React.createRef()
    this.editor = React.createRef()
    this.submitRating = this.submitRating.bind(this)
    this.state = {
      completed: false
    }
    // this.render = this.render.bind(this)
  }
  render () {
    const {completed} = this.state
    return (
      <div className={`rating-editor-wrapper`}>
        <ul className="rating-star-wrapper">
          <li className="rating-star-item">
            <span className="rating-star-label">商家</span><Star ref={this.sellerStar}></Star>
          </li>
          <li className="rating-star-item">
            <span className="rating-star-label">菜品</span><Star ref={this.foodStar}></Star>
          </li>
          <li className="rating-star-item">
            <span className="rating-star-label">服务</span><Star ref={this.serviceStar}></Star>
          </li>
        </ul>
        <Emojis ref={this.editor}/>
        <button
          className='rating-submit-btn'
          onMouseDown={this.submitRating}
        >提交评价</button>
        {
          completed && (<div className="filter-level">
            <img width="24" height="24" src={loading}></img>
          </div>)
        }
      </div>
    )
  }
  submitRating () {
    const {sellerId} = this.props
    const data = {
      sellerStar: this.sellerStar.current.state.selected,
      serviceStar: this.serviceStar.current.state.selected,
      foodStar: this.foodStar.current.state.selected,
      content: this.editor.current.state.value,
      sellerId
    }
    console.log(data)
    this.setState({
      completed: true
    })
    this.editor.current.setState({
      showEmojisBar: false
    })
    this.editor.current.init()
    this.sellerStar.current.init()
    this.serviceStar.current.init()
    this.foodStar.current.init()
    this.props.toggleRatingEditor()
    setTimeout(() => {
      this.setState({
        completed: false
      })
    }, 2000)
  }
}
export default RatingEditor

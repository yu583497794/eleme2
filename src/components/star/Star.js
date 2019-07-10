import React from 'react'
import { cx, css } from 'emotion'

import FullStar from './star.svg'
import HalfStar from './star_half.svg'
import NullStar from './star_border.svg'

const FULL = 1
const HALF = 0.5
class Star extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stars: Array.from({length: 5}).fill(0),
      selected: 0
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.render = this.render.bind(this)
    this.init = this.init.bind(this)
  }
  num = this.props.num || 5
  init () {
    this.setState({
      stars: Array.from({length: 5}).fill(0),
      selected: 0
    })
  }
  render () {
    let {stars} = this.state
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        className={cx(
          'react-rating-star',
          css`
            display: inline-block;
          `
        )}
      >
        {Array.from({length: this.num}).map((star, index) => (
          <span
            key={index}
            onMouseDown={(e) => { this.handleMouseDown(e, index) }}
            className={cx(
              'star-item',
              css`
                display: inline-block;
                padding: 3px;
              `
            )}
          >
            <img src={this.getSVG(stars[index])} />
          </span>
        ))}
      </div>
    )
  }
  getSVG (star) {
    switch (star) {
      case FULL: {
        return FullStar
      }
      case HALF: {
        return HalfStar
      }
      default: {
        return NullStar
      }
    }
  }
  handleMouseEnter (e) {
    console.log('enter')
  }
  handleMouseDown (e, index) {
    let {stars} = this.state
    let {target: {offsetWidth}, offsetX} = event
    let middle = parseFloat(offsetWidth / 2)
    this.setState({
      stars: stars.map((n, m) => m < index || (m === index && offsetX > middle) ? 1 : m === index ? 0.5 : 0),
      selected: index + 1
    })
  }
}

export default Star

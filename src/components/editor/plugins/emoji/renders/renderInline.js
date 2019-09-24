// eslint-disable-next-line
import React from 'react'
function renderInline (props, editor, next) {
  const {attributes, node} = props
  switch (node.type) {
    case 'emoji':
      return <span
        {...attributes}
        contentEditable={false}
        onDrop={(e) => e.preventDefault()}
      >
        {node.data.get('code')}
      </span>
    default:
      return next()
  }
}

export default renderInline

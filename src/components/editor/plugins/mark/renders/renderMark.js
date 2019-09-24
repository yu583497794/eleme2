// eslint-disable-next-line
import React from 'react'
export default function renderMark (props, editor, next) {
  const { children, mark, attributes } = props
  switch (mark.type) {
    case 'bold':
      return <strong { ...attributes}>{children}</strong>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underline':
      return <u {...attributes}>{children}</u>
    default:
      return next()
  }
}

import React from 'react'
import { cx, css } from 'emotion'
import 'common/iconfont/iconfont.css'

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        'btn',
        css`
          cursor: pointer;
          color: ${reversed ? active ? 'white' : '#aaa' : active ? 'black' : '#ccc'};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: bottom
        `
      )}
    />
  )
)

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      // 'material-icons',
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
        flex 1;
      `
    )}
  >
    <i className='iconfont'>{props.children}</i>
  </span>
))

export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        white-space: pre-wrap;
        margin: 0 -20px 10px;
        padding: 10px 20px;
        font-size: 14px;
        background: #f8f8e8;
      `
    )}
  />
))

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }

        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
))

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        position: relative;
        padding: 6px 0;
        border-bottom: 2px solid #eee;
        margin-bottom: 5px;
      `
    )}
  />
))

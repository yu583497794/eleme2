// eslint-disable-next-line
import React from 'react'
import { Editor } from 'slate-react'
import Toolbar from './Toolbar'
import Plain from 'slate-plain-serializer'
import plugins from './plugins'
import './index.styl'
const initialValue = Plain.deserialize('')
function RatingEditor () {
  const [value, setValue] = React.useState(initialValue)
  const editorRef = React.useRef(React.createRef())
  const changeHandler = React.useCallback(
    // change
    ({value}) => {
      setValue(value)
    }, [setValue])
  return (
    <div className='editor-wrapper'>
      <Toolbar editor={editorRef} value={value} setValue={setValue}/>
      <div className='editor-pannel'>
        <Editor
          value={value}
          defaultValue={initialValue}
          placeholder='请输入...'
          onChange={changeHandler}
          ref={editorRef}
          plugins={plugins}
          style={{padding: '8px'}}
        />
      </div>
    </div>
  )
}

export default RatingEditor

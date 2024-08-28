import React from 'react'

const Label = ({text,...props}) => {
  return (
    <label {...props} >{text}</label>
  )
}

export default Label;

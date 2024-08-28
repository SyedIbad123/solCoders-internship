import React from 'react'

const Input = ({error,...props}) => {
  return (
    <>
    <input {...props} />
    {error && <p style={{
      color:"red",
      marginTop:"-17px",
      fontSize:'0.8rem'
    }}>{error}</p>}
    </>
  )
}

export default Input;

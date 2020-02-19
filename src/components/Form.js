import React from 'react'

const Form = ({onSubmit, onChange, text, input, onfocus ,onblur}) => (
    <form onSubmit={onSubmit}>
      <input 
        value={input}
        onChange={onChange}
        onFocus={onfocus}
        onBlur={onblur}
      />
      <button type="submit">{text}</button>
    </form>
  )

  export default Form
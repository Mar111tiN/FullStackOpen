import React, { useState} from 'react'


const Input = ({text, value, onChange}) => (
  <div>
    {text} : 
    <input 
      value={value}
      onChange={onChange}
    />
</div>
)

const Form = ({
    onSubmit,
    name,
    onNameChange,
    phone,
    onPhoneChange
  }) => {

  // STATE

  return (
    <form onSubmit={onSubmit}>
      <Input text="name" value={name} onChange={onNameChange} />
      <Input text="phone" value={phone} onChange={onPhoneChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form




import React from 'react'

const Notification = ({ message }) => 
    (message)
        ? <div className={message.type}>
            {message.text}
        </div>
        : null

export default Notification
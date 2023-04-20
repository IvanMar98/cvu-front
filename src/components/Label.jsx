import React from 'react'

function Label(props) {
    return (
        <div className='text-secondary fw-bold mb-2'>
            <label> {props.text}</label>
        </div>
    )
}
export default Label;

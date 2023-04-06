import React from 'react'

function Label(props) {
    return (
        <div className='text-secondary fw-bold'>
            <label> {props.text}</label>
        </div>
    )
}
export default Label;

import React from 'react'

function Label(props) {
    return (
        <div className={`${props.class ? props.class: 'text-secondary'} fw-bold mb-2`}>
            <label> {props.text}</label>
        </div>
    )
}
export default Label;

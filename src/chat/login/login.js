import React, { useState } from 'react'
import './login.css'

export default function Login(props) {
    const [inputValue, setInputValue] = useState('')
    const handleSubmit = event => {
        event.preventDefault()
        if (!inputValue) return
        props.setYourName(inputValue)
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className='main'>
            <p className='p1'>输入称呼就能与AI对话</p>
                <input
                    className="input"
                    type="text"
                    placeholder="Please enter your name"
                    value={inputValue}
                    autoFocus
                    onChange={event => setInputValue(event.target.value)}
                    onBlur={event => setInputValue(event.target.value.trim())}
                />
                <button type="submit" className="button">确认</button>
            </form>
        </div>
    )
}

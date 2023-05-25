import React, { useState, useCallback, useRef, useEffect } from 'react'
import axios from 'axios'

import Header from '../Header'
import Footer from '../Footer'
import './chat.css'

const api = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'http://54.176.63.104:8000',
  timeout: 10000,
})

export default function Chat(props) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [temperature, setTemperature] = useState(0.7)
  const [isSending, setIsSending] = useState(false)
  const chatBoxRef = useRef(null)

  const handleSubmit = useCallback(async event => {
    event.preventDefault()
    if (!inputValue) return

    setMessages(prevMessages => [...prevMessages, { content: `${inputValue}`, isUser: true }])
    setIsSending(true)
    const params = { msg: inputValue, user_id: props.yourName, temperature }
    console.log("发送的参数：", params)
    try {
      const res = await api.post('/chat', params)
      console.log("res：", res)
      const { msg } = res.data
      const content = msg.replace(/\n/g, '<br />')
      setMessages(prevMessages => [...prevMessages, { content, isUser: false }])
    } catch (err) {
      console.error(err)
      setMessages(prevMessages => [...prevMessages, { content: '网络错误或请求太频繁', isUser: false }])
    } finally {
      setIsSending(false)
    }

  }, [inputValue, props.yourName, temperature])

  const temperatureChange = useCallback(event => {
    setTemperature(prevTemperature => Math.min(Math.max(parseFloat(event.target.value), 0), 2))
  }, [])

  const temperatureBlur = useCallback(event => {
    const num = Math.abs(parseFloat(event.target.value))
    setTemperature(num)
  }, [])

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    setInputValue('')
    return () => {
      chatBoxRef.current.scrollTop = 0
    }
  }, [messages])

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        <Header yourName={props.yourName} />

        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
            {message.isUser ? (
              <p>
                <span className="icon iconMe">{props.yourName}</span>
                {message.content}
              </p>
            ) : (
              <p className="resMsg">
                <span className="icon">AI</span>
                <span dangerouslySetInnerHTML={{ __html: message.content }}></span>
              </p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          placeholder={isSending ? '' : 'Type your message here'}
          disabled={isSending}
          value={inputValue}
          autoFocus
          onChange={event => setInputValue(event.target.value)}
          onBlur={event => setInputValue(event.target.value.trim())}
          className="input-field"
        />
        {isSending ? (
          <span className="loading"></span>
        ) : (
          <button disabled={!inputValue} type="submit" className={inputValue ? "send_button button_active" : "send_button  button_disabled"}>
            Send
          </button>
        )}
      </form>
      <div className='temperatureBox'>
        <label>temperature温度参数：</label>
        <input
          type="number"
          placeholder={'请输入temperature值'}
          value={temperature}
          onChange={temperatureChange}
          onBlur={temperatureBlur}
          className="temperature"
        />
        <p className='p1'>temperature的值0到2，越高，内容随机性越强，创造力越好。对于要求GPT回答严谨的，需要设置temperature = 0</p>
      </div>

      <Footer />
    </div>
  )
}
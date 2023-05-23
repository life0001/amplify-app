import { useRef, useState } from 'react'
import Axios from 'axios'
import Header from '../Header'
import './chat.css'
import Footer from '../footer'

function Chat(props) {
  // const inputRef = useRef(null);
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [temperature, setTemperature] = useState(0.7)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    if (!inputValue) return

    setMessages([...messages, { content: inputValue, isUser: true }])
    setIsSending(true)
    setTimeout(() => (document.querySelector('.chat-box').scrollTop = 99999999), 100)
    const params = { msg: inputValue, user_id: props.yourName, temperature }
    console.log("发送的参数：", params)
    // Axios.post('http://54.176.63.104:8000/chat', params)
      Axios.post('https://localhost:8000/chat', params)
      .then(res => {
        console.log('接口返回：', res)
        const content = res.data.msg.replace(/\n/g, '<br />')
        setMessages(newMessages => [...newMessages, { content, isUser: false }])
      })
      .catch(err => {
        console.error(err)
        setMessages(newMessages => [...newMessages, { content: '网络错误或请求太频繁', isUser: false }])
      })
      .finally(() => {
        setIsSending(false)
        setTimeout(() => {
          document.querySelector('.chat-box').scrollTop = 99999999
          // inputRef.current.focus();
        }, 100)
      })

    setInputValue('')
  }

  function temperatureChange(event) {
    if (event.target.value < 0) return
    return setTemperature(event.target.value > 2 ? 2 : event.target.value)
  }

  function temperatureBlur(event) {
    const num = Math.abs(parseFloat(event.target.value))
    setTemperature(num)
  }



  return (
    <div className="chat-container">
      <div className="chat-box">
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
          // ref={inputRef}
          type="text"
          placeholder={isSending ? '' : 'Type your message here'}
          disabled={isSending}
          value={inputValue}
          autoFocus
          onChange={event => setInputValue(event.target.value)}
          onBlur={event => setInputValue(event.target.value.trim())}
          className="input-field"
        />
        {!isSending ? (
          <button disabled={!inputValue} type="submit" className={inputValue ? "send_button button_active" : "send_button  button_disabled"}>
            Send
          </button>
        ) : (
          <span className="loading"></span>
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

export default Chat

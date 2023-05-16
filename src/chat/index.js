import {useState} from 'react'
import Axios from 'axios'
import Header from '../Header'
import './chat.css'
import Footer from '../footer'

function Chat({signOut, user}) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    if (!inputValue) return

    setMessages([...messages, {content: inputValue, isUser: true}])
    setIsSending(true)
    setTimeout(() => (document.querySelector('.chat-box').scrollTop = 99999999), 100)

    Axios.post('https://54.176.63.104/:8000/chat', {msg: inputValue})
      // Axios.post('https://localhost:8000/chat/', {msg: inputValue})
      .then(res => {
        console.log('接口返回：', res)
        const content = res.data.msg.replace(/\n/g, '<br />')
        setMessages(newMessages => [...newMessages, {content, isUser: false}])
      })
      .catch(err => {
        console.error(err)
        setMessages(newMessages => [...newMessages, {content: '网络错误', isUser: false}])
      })
      .finally(() => {
        setIsSending(false)
        setTimeout(() => (document.querySelector('.chat-box').scrollTop = 99999999), 100)
      })

    setInputValue('')
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
        <Header signOut={signOut} user={user} />

        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
            {message.isUser ? (
              <p>
                <span className="icon iconMe">{user.username}</span>
                {message.content}
              </p>
            ) : (
              <p className="resMsg">
                <span className="icon">AI</span>
                <span dangerouslySetInnerHTML={{__html: message.content}}></span>
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
          onChange={event => setInputValue(event.target.value)}
          className="input-field"
        />
        {!isSending ? (
          <button type="submit" className="send-button">
            Send
          </button>
        ) : (
          <span className="loading"></span>
        )}
      </form>
      <Footer />
    </div>
  )
}

export default Chat

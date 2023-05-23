import { useState } from 'react';
import Chat from './chat'
import Login from './chat/login/login'
export default function App() {
  const [yourName, setYourName] = useState('')

  return yourName ? <Chat yourName={yourName}/> : <Login setYourName={setYourName}></Login>
}
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './chat';
import Login from './chat/login/login';
import BirthdayPage from './BirthdayPage';
import NotFound from './NotFound'

export default function App() {
  const [yourName, setYourName] = useState('');

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home yourName={yourName} setYourName={setYourName} />} /> */}
        <Route path="/chat" element={<Home yourName={yourName} setYourName={setYourName} />} />
        <Route path="/birthday" element={<BirthdayPage />} />
        {/* 其他路由 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function Home({ yourName, setYourName }) {
  return yourName ? <Chat yourName={yourName} /> : <Login setYourName={setYourName} />;
}

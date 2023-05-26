import React, { useEffect, useState } from 'react';
import './index.css';
import BirthdayPage from './birthday'

export default function BirthdayTitle() {
  const [showBirthdayPage, setShowBirthdayPage] = useState(false);

  const handleEnterBirthdayPage = () => {
    setShowBirthdayPage(true);
  };

  return (
    showBirthdayPage ? <BirthdayPage /> :
      <div className="BirthdayTitle">
        <div className="IntroPage">
          <h1 className="intro-title">生日快乐！</h1>
          <p className="intro-description">
            生日是一个特殊的日子，是你来到这个世界的纪念日，希望你的生日充满欢乐和幸福！
          </p>
          <button className="intro-button" onClick={handleEnterBirthdayPage}>
            进入
          </button>
        </div>
      </div>
  );
}



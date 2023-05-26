import React, { useEffect, useState } from 'react'
import backgroundMusic from './birthday_song.mp3';

export default function BirthdayPage() {
    useEffect(() => {
      const audioElement = new Audio(backgroundMusic);
      audioElement.loop = true;
      audioElement.volume = 0.5; // 调整音量为0.5（可根据需求自行调整）
      audioElement.play().catch((error) => {
        console.log('播放音乐失败:', error);
      });
  
      return () => {
        audioElement.pause();
        audioElement.currentTime = 0;
      };
    }, []);
  
    return (
      <div className="BirthdayPage">
        <div class="overlay"></div>
        <h1 className="title">Happy Birthday, 玲玲!</h1>
        <div className="content">
          <p className="description">亲爱的玲玲，</p>
          <p className="description">在这个特殊的日子里，我想向你送上最真挚的祝福和衷心的祝福。生日快乐！🎉</p>
          <p className="description">今天，让我们一起庆祝你的生日，庆祝你生命中的这个美好时刻。这是一个属于你的特殊日子，充满了欢笑、温暖和无尽的喜悦。</p>
          <p className="description">愿你的生活充满喜悦和幸福，不断追求梦想。享受逛街、品尝美食的美好时光！</p>
        </div>
      </div>
    );
  }
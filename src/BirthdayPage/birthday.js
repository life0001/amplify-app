import React, { useEffect } from 'react';
import backgroundMusic from './birthday_song.mp3';
import cake1 from './cake2.png';
import cake2 from './cake2.png';
import cake3 from './cake3.png';
import cake4 from './cake4.png';
import cake5 from './cake5.png';
import cake6 from './cake6.png';
import cake7 from './cake7.png';
import cake8 from './cake8.png';

export default function BirthdayPage() {
  useEffect(() => {
    const audioElement = new Audio(backgroundMusic);
    audioElement.loop = true;
    audioElement.volume = 0.5;
    audioElement.play().catch((error) => {
      console.log('播放音乐失败:', error);
    });

    const cakeContainer = document.getElementById('cake-container');
    const numCakes = 19;
    const cakeImages = [cake1, cake2, cake3, cake4, cake5, cake6, cake7, cake8];
    const animationDuration = 8;
    const staggerDelay = .5; // 延迟时间

    const createCake = () => {
      const cake = document.createElement('div');
      cake.classList.add('cake');
      cake.style.backgroundImage = `url(${cakeImages[Math.floor(Math.random() * cakeImages.length)]})`;
      cake.style.animationDuration = `${animationDuration}s`;
      cake.style.left = `${Math.random() * 98 - 5}%`;
      cakeContainer.appendChild(cake);
    };

    const dropCakes = () => {
      let counter = 0;
      const interval = setInterval(() => {
        createCake();
        counter++;
        if (counter === numCakes) {
          clearInterval(interval);
        }
      }, staggerDelay * 1000);
    };

    const clearCakes = () => {
      cakeContainer.innerHTML = '';
    };

    const handleAnimationEnd = (event) => {
      event.target.remove();
    };

    cakeContainer.addEventListener('animationend', handleAnimationEnd);

    const timeout = setTimeout(() => {
      dropCakes();
    }, 3000); // 延迟时间

    return () => {
      clearTimeout(timeout);
      clearCakes();
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  return (
    <div className="BirthdayPage">
      <div className="overlay"></div>
      <div id="cake-container" className="cake-container"></div>
      <h1 className="title">Happy Birthday, 玲玲!</h1>
      <div className="content">
        <p className="description">亲爱的玲玲，</p>
        <p className="description">在这个特殊的日子里，我想向你送上最真挚的祝福和衷心的祝福。</p>
        <p className="description">38岁生日快乐！🎉</p>
        <p className="description">今天，让我们一起庆祝你的生日，庆祝你生命中的这个美好时刻。这是一个属于你的特殊日子，充满了欢笑、温暖和无尽的喜悦。</p>
        <p className="description">愿你的每一天都充满爱和快乐。生日快乐，我的挚爱！🎂❤️</p>
      </div>
      <audio className="audio" src={backgroundMusic} />
    </div>
  );
}

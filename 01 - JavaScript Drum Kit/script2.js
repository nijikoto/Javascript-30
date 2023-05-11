"use strict";
// 1. 於視窗設定監聽事件，並設定按下按鍵會function的event
// 2. 設定function內的內容：
// 1. 宣告並選擇指定的audio，並設定dynamic
// 2. 設定function的內容：設定若無符合return
// 3. 設定播放音訊
// 4. 設定播放的 current time
// 5. 宣告選擇的key並設定 dynamic 相應的內容
// 6. 在指定的key追加playing class
// 3. 設定每個key的監聽事件，宣告並選擇所有key
// 4. 使用forEach 指定所有key的transition end，加上removeTransition
// 5. 設定remove transition的function
// 1. 設定若event object的內容 propertyName 不等同 transform則return
// 2. 以this.(key) remove class playing
// 6. 將步驟2設定的function 內容整理成playSoundfunction
// 7. 將步驟一轉移到文件底部

function playSound(e) {
  const audio = document.querySelector(`audio[data-key=${e.key}]`);
  const key = document.querySelector(`div[data-key=${e.key}]`);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function removePlaying(e) {
  if (e.propertyName !== transform) return;
  // e.target.classList.remove('playing');
  this.classList.remove("playing");
}

window.addEventListener("keydown", playSound);
const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removePlaying));

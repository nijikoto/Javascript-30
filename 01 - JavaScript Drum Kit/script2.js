"use strict";

// 取得所有的按鍵和音效元素
const keys = document.querySelectorAll(".key");
const audios = document.querySelectorAll("audio");

// 將每個按鍵與音效做配對，並加上事件監聽器
keys.forEach((key, index) => {
  key.addEventListener("click", () => {
    playSound(index);
  });
});

// 當鍵盤按下時，判斷按下的鍵是否為已配對的按鍵，如果是，則播放相對應的音效
document.addEventListener("keydown", (event) => {
  const keyPressed = event.key.toLowerCase();
  const index = getKeyIndex(keyPressed);
  if (index !== -1) {
    playSound(index);
  }
});

// 播放音效並顯示按鍵的特效
function playSound(index) {
  const audio = audios[index];
  const key = keys[index];
  if (!audio) return; // 如果找不到對應的音效，則跳出函式
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
  audio.addEventListener("ended", () => {
    key.classList.remove("playing");
  });
}

// 根據按下的鍵，尋找其對應的按鍵在配對陣列中的位置
function getKeyIndex(key) {
  const keyValues = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const index = keyValues.indexOf(key);
  return index;
}

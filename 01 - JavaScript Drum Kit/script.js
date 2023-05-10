"use strict";
//////////////////////////////////////////////////////
const a = document.querySelector('[data-key="65"]');
const s = document.querySelector('[data-key="83"]');
const d = document.querySelector('[data-key="68"]');
const f = document.querySelector('[data-key="70"]');
const g = document.querySelector('[data-key="71"]');
const h = document.querySelector('[data-key="72"]');
const j = document.querySelector('[data-key="74"]');
const k = document.querySelector('[data-key="75"]');
const l = document.querySelector('[data-key="76"]');
const audio = document.querySelector('audio[data-key="74"]');

function playing(element) {
  element.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
  // element.classList.remove("playing");
}
// function notPlaying(element) {}j

document.addEventListener("keydown", function (event) {
  if (event.key === "j") {
    playing(j);
  }
});

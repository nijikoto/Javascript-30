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

const audioA = document.querySelector('audio[data-key="65"]');
const audioS = document.querySelector('audio[data-key="83"]');
const audioD = document.querySelector('audio[data-key="68"]');
const audioF = document.querySelector('audio[data-key="70"]');
const audioG = document.querySelector('audio[data-key="71"]');
const audioH = document.querySelector('audio[data-key="72"]');
const audioJ = document.querySelector('audio[data-key="74"]');
const audioK = document.querySelector('audio[data-key="75"]');
const audioL = document.querySelector('audio[data-key="76"]');

const key = document.getElementById("key");

function playing(element) {
  element.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}
function notPlaying() {
  key.classList.remove("playing");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "j") {
    playing(j);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "s") {
    playing(s);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "a") {
    playing(a);
  }
});

audio.addEventListener("ended", notPlaying);

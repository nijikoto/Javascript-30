# Day 11 Custom video player

## 理解問題

- 客製化一影片播放器，讓播放器有播放\暫停、聲音大小調節、加速播放、進度條控制、快進快退的功能。

## 拆解問題

### 播放、暫停

- 按按紐開始使影片播放或暫停播放：如果播放就暫停，如果暫停就播放

### 聲音大小控制

- 透過拖拉來控制聲音大小
  - 聲音大小是由什麼在控制

### 加速

- 透過拖拉來加速影片

### 進度條

- 當影片在播放狀態時，符合影片的進度百分比
- 拖拉時能同步進度的百分比

### 快進快退

能藉由點擊按鈕達到指定快進時間

## 研究課題

### 如何切換影片的播放與暫停

#### play()、video()

```javascript
function toggleVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
```

### 如何控制 slider

#### slider 的本體

`<input type="range">`

#### 可以如何控制

- 獲取 slider 的值

```javascript
const volumeSlider = document.querySelector('.player__slider[name="volume"]');
const currentValue = volumeSlider.value;
```

- 設置 slider 的值

```javascript
const volumeSlider = document.querySelector('.player__slider[name="volume"]');
volumeSlider.value = newValue;
```

#### 使用者「拖拉」相應的監聽事件為何

##### 即時變化：`mousemove`事件

- 用於監聽滑鼠在滑塊上的移動

```javascript
const volumeSlider = document.querySelector('.player__slider[name="volume"]');

volumeSlider.addEventListener("mousemove", function (event) {
  // 在滑鼠移動時觸發的操作
  console.log("Mouse moved:", event.clientX, event.clientY);
});
```

##### 最終變化：`change` 事件

- 這個事件在使用者完成拖動滑塊並釋放滑鼠時觸發。
- 可以使用 `change` 事件來監聽滑塊值的最終變化。

```javascript
const volumeSlider = document.querySelector('.player__slider[name="volume"]');

volumeSlider.addEventListener("change", function () {
  const currentValue = volumeSlider.value;
  // 在這裡處理滑塊值的變化
});
```

##### 其他補充：`input` 事件

- 這個事件在使用者拖動滑塊的過程中連續觸發。
- 可以使用 `input` 事件來監聽滑塊值的即時變化。

```javascript
const volumeSlider = document.querySelector('.player__slider[name="volume"]');

volumeSlider.addEventListener("input", function () {
  const currentValue = volumeSlider.value;
  // 在這裡處理滑塊值的變化
});
```

### 進度條的程式邏輯

#### function

- 計算當前播放時間 (`video.currentTime`) 和總播放時間 (`video.duration`) 的比例，通過將當前播放時間除以總播放時間然後乘以 100 來取得。這個比例表示影片已經播放了多少百分比。
  > `video.duration`
  > The *read-only* [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) property **`duration`** indicates the length of the element's media in seconds. (MDN)

→ 指出媒體元素的總長度（秒數）

> `video.currentTime`
> The [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) interface's **`currentTime`** property specifies the current playback time in seconds.

→ 指出當前媒體元素的時間（秒數）

- 將計算得到的進度條百分比 (`percent`) 格式化成字串，並加上百分號符號，以便將其應用到進度條元素的 `flexBasis` 屬性上。例如，如果 `percent` 是 50，則 `flexBasis` 的值為 "50%"。

- 將計算得到的進度條百分比設置給進度條元素的 `flexBasis` 屬性，這樣進度條的寬度就會根據播放進度的變化而改變。

#### event listeners

- 宣告一個名為 `mousedown` 的變數，並將其初始化為 `false`。這個變數用於追蹤滑鼠按鈕的狀態，當滑鼠按鈕按下時，將 `mousedown` 設置為 `true`，當滑鼠按鈕釋放時，將 `mousedown` 設置為 `false`。
- 綁定 `click` 事件到進度條元素，並將 `scrub` 函式作為事件處理程序。這表示當使用者在進度條上點擊時，會執行 `scrub` ，以將影片的播放位置調整為點擊位置對應的時間。
- 綁定 `mousemove` 事件到進度條元素，並使用 `(e) => mousedown && scrub(e)` 作為事件處理程序。這個處理程序首先檢查 `mousedown` 變數的值，只有當 `mousedown` 為 `true` 時才執行 `scrub` 函式。 ⇨⇨ 意味著只有在滑鼠按鈕按下且滑鼠在進度條上移動時，才會執行 `scrub`，這樣能避免在拖曳進度條時不必要地觸發 `scrub` 函式。
- 綁定 `mousedown` 事件到進度條元素，並將 `mousedown` 設置為 `true`。這表示當滑鼠按鈕按下時，會將 `mousedown` 設置為 `true`，以標記滑鼠按鈕的狀態。
- 綁定 `mouseup` 事件到進度條元素，並將 `mousedown` 設置為 `false`。這表示當滑鼠按鈕釋放時，會將 `mousedown` 設置為 `false`，以標記滑鼠按鈕的狀態。

### 快進快退按鈕

#### function

- 透過`parseFloat(this.dataset.skip)`將 data-skip 轉為浮點數
- 將目前的播放時間 `video.currentTime` 加上 `parseFloat(this.dataset.skip)` 的值。

> The **`parseFloat()`** function parses a string argument and returns a floating point number.

能夠將字串轉換為浮點

## 學習筆記

- function 應該為 togglePlay，而不是 playVideo，應以要控制的元件可能出現的情況來設想
- 在選定 document，同質性的可以寫一起不用分開控制，如：range
- 播放影片應同時考量到直接點選 video 的可能，也就是 toggle 按鈕和 video 都應該設置 addEventListener
- 當有複數選定項目，addEventListener 要記得用 forEach
- 隨時透過 console.log()來檢視目前正要製作的項目是否被執行

```javascript
function adjustRange() {
  console.log(this.value);
}
```

- range 自己試做沒有成功的原因：

  - 沒有使用到 forEach()
  - 將`mousemove`誤用為`input`
  - 應該要更新影片元素的屬性值，而不是更新 `<input>` 元素的值。（這邊不太懂，待研究）

- 透過 console.log function 來確認

```javascript
function scrub(e) {
  console.log(e);
}

progress.addEventListener("click", scrub);
```

![](https://i.imgur.com/QK0jCvC.png)

- 使用者「拖曳」這件事情可以拆分的更細，拖曳本身即包含「點擊、拖曳（同步）、釋放滑鼠」，也應當設想「不必要觸發的情境」

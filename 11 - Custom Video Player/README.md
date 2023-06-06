# Day 11 Custom video player（未完）

## 理解問題

- 客製化一影片播放器，讓播放器有播放、快轉、skipped

## 拆解問題

### 播放、暫停

- 按按紐開始使影片播放或暫停播放：如果播放就暫停，如果暫停就播放

### 聲音大小控制

- 透過拖拉來控制聲音大小
  - 聲音大小是由什麼在控制

### 加速

### skipped

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

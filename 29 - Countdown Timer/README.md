# Day 29 Vanilla JS Countdown Timer

## 理解問題

- 製作一個倒數計時器，並有預設秒數按鈕以及透過使用者自行輸入秒數的功能。

## 研究課題

### Date.now()

> The **`Date.now()`** static method returns the number of milliseconds elapsed since the [epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date), which is defined as the midnight at the beginning of January 1, 1970, UTC. (MDN)

返回自 1970 年 1 月 1 日 00:00:00 UTC（協調世界時）至今的毫秒數。具體來說，它返回一個表示當前時間的時間戳（timestamp）。

![](https://i.imgur.com/CGVq8VP.png)

![](https://i.imgur.com/P7SPZrq.png)

## 操作筆記

### timer function

#### now & then

```javascript
function timer(seconds) {
  const now = Date.now();

  const then = now + seconds * 1000; //the number of seconds that you wish to run the timer for

  console.log({ now, then });
}
```

![](https://i.imgur.com/VlmfFfy.png)

- `now` 變數使用 `Date.now()` 方法獲取當前的時間戳，表示從 1970 年 1 月 1 日 00:00:00 UTC（協調世界時）至今的毫秒數。
- `then` 變數計算了結束時間的時間戳。它使用了傳遞給 `timer` 函式的 `seconds` 參數，將其乘以 1000（轉換為毫秒）並加到 `now` 的時間戳上，得到了結束時間的時間戳。

### 計算剩餘時間

```javascript
setInterval(() => {
  const secondsLeft = Math.round((then - Date.now()) / 1000);

  console.log(secondsLeft);
}, 1000);
```

![](https://i.imgur.com/0LZEqMo.png)

結果開始倒數，會倒數至負數，因為 setInterval()不曉得什麼時候要停，因此
先將 setInterval 設置成變數，也就是成為了全域變數。

```javascript
let countdown;

function timer(seconds) {
  const now = Date.now();

  const then = now + seconds * 1000; //the number of seconds that you wish to run the timer for

  // figure out how much time is left on the clock

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //check if we should stop it

    if (secondsLeft < 0) {
      clearInterval(countdown);

      return;
    }

    //display it

    console.log(secondsLeft);
  }, 1000);
}
```

### 顯示剩餘時間

#### 倒數剩餘時間

```javascript
let countdown;

function timer(seconds) {
  const now = Date.now();

  const then = now + seconds * 1000; //the number of seconds that you wish to run the timer for

  displayTimeLeft(seconds);

  // figure out how much time is left on the clock

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //check if we should stop it

    if (secondsLeft <= 0) {
      clearInterval(countdown);

      return;
    }

    //display it

    displayTimeLeft(secondsLeft);
  }, 1000);

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);

    const remainderSeconds = seconds % 60;

    console.log({ minutes, remainderSeconds });
  }
}
```

- 將 displayTimeLeft 設成 function，
- 時間的計算參考：
  ![](https://i.imgur.com/IBHU5Ce.png)

#### 連動畫面

設定 Dom

```javascript
const timerDisplay = document.querySelector(".display__time-left");
```

在 displayTimeLeft 裡面設定顯示的內容

```javascript
const display = `${minutes}:${
  remainderSeconds < 10 ? "0" : ""
}${remainderSeconds}`;
document.title = display;
timerDisplay.textContent = display;
```

remainderSeconds 的顯示邏輯：當剩餘秒數小於 10，顯示`0＋剩餘秒數`

```javascript
document.title = display;
```

![](https://i.imgur.com/xstIvFv.png)

- 讓分頁也顯示倒數的秒數

### 顯示預期結束時間

作法與剩餘時間雷同

```javascript
function displayEndTime(timestamp) {
  const end = new Date(timestamp);

  const hours = end.getHours();

  const adjustedHours = hours > 12 ? hours - 12 : hours;

  const minutes = end.getMinutes();

  endTime.textContent = `Be back at ${adjustedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}
```

- 透過 new Date()取得現在時間戳記
- 在 adjusted Hours 轉換為 12 小時制，邏輯為：若小時大於 12 則 - 12

### 開始計時

- 使用預設的時間啟動倒數計時器

```javascript
function startTimer() {
  const seconds = parseInt(this.dataset.time); // parseInt turn into real number

  timer(seconds);
}
```

- 必須同時在 timer 的 function 中的第一行追加 clear 以確保每次只啟用一個計時器

```javascript
clearInterval(countdown);
```

### 使用者自由鍵入分鐘數

#### 事件監聽的其他種寫法

- 可透過以下操作取得指定物件
  ![](https://i.imgur.com/i3FaQPh.png)
- 事件監聽器也用同樣的寫法：

```javascript
document.customFrom.addEventListener("submit", function (e) {});
```

#### 取得使用者輸入資料

```javascript
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const mins = this.minutes.value;

  console.log(mins);

  timer(mins * 60);

  this.reset();
});
```

- 透過事件監聽器 submit 取得使用者鍵入的資料
- 呼叫 timer function 並將取得的的分鐘轉換為秒數

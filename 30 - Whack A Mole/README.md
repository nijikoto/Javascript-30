# Day 30 Make a Whack A Mole Game with Vanilla JS

## 理解問題

- 製作打地鼠（鼴鼠）遊戲

## 操作筆記

### randTime function

```javascript
function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

![](https://i.imgur.com/g3KauLn.png)

- 生成一個介於 `min` 和 `max` 之間的隨機整數
- `Math.round()` 函式將這個隨機數四捨五入為最接近的整數，以確保返回的值是一個整數

### 製作隨機的洞

```javascript
//(taking a list of holes) give us a random 'DOM'

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);

  const hole = holes[idx];

  if (hole === lastHole) {
    console.log("the same bud");

    return randomHole(holes);
  }

  lastHole = hole; //save the reference to what one got popped up last time was called

  return hole;
}
```

- 洞口清單中隨機選擇一個洞口元素，並且確保每次選中的洞口不與上一次相同。

### 讓鼴鼠跑出來

- 讓鼴鼠從地底跑出來

```javascript
function peep() {
  const time = randTime(200, 1000);

  const hole = randomHole(holes);

  // console.log(time, hole);

  hole.classList.add("up");
}
```

- setTimeout 的`time` 是從 `randTime(200, 1000)` 取得的值，這表示 `time` 的值會在 200 到 1000 的範圍內隨機產生。這個隨機的時間值會作為延遲時間傳遞給 `setTimeout` 函式。
- 設定 timeUp 變數並預設設定為 false，程式邏輯則設定若 timeUp 為 true ，peep()會持續執行。

### 開始遊戲

```javascript
function startGame() {
  scoreBoard.textContent = 0;

  timeUP = false;

  peep();

  setTimeout(() => {
    timeUP = true;
  }, 10000);
}
```

```HTML
<button onClick="startGame()">Start!</button>
```

`onClick` 屬性可以用來設定元素的點擊事件處理器，而不必使用 `addEventListener` 方法。這種方式是比較簡潔和直觀的方法，特別適用於單一事件處理器的情況。

### 打地鼠

- 使用 forEach 啟動事件監聽器，監聽點擊
  ![](https://i.imgur.com/HmOYvJI.png)

打到的鼠是一個 pointerEvent，展開裡面有`isTrusted`屬性
在 Pointer Event API 中，`isTrusted` 是一個布林值屬性，用於判斷事件是否由用戶操作觸發（例如滑鼠點擊、觸控操作等）。這個屬性的值為 `true` 表示事件是由用戶直接操作觸發的，而不是由腳本或程式碼觸發。

`isTrusted` 屬性的存在是為了提供一種機制，可以判斷事件是否可信。由於某些安全限制，網頁中的腳本無法直##接觸發一些事件，例如滑鼠點擊事件。只有用戶實際操作觸發的事件才會被標記為 `isTrusted` 屬性為 `true`。

#### 防作弊機制

```javascript
function bonk(e) {
  if (!e.isTrusted) return; // cheater😡
}
```

→ 檢查事件的觸發是否由用戶操作，若不是則結束程式的執行

#### 更新計分板

- 先將 score 宣告為變數，並預設為 0

```javascript
let score = 0;
```

- 在執行開始遊戲的 function 中追加分數從 0 開始計分

```javascript
function startGame() {
  scoreBoard.textContent = 0;

  timeUP = false;

  score = 0;

  peep();

  setTimeout(() => {
    timeUP = true;
  }, 10000);
}
```

- 在 bonk function 中設計每打到一次鼴鼠就累加分數一次，並將分數更新到 textContent 上

```javascript
function bonk(e) {
  if (!e.isTrusted) return; // cheater😡

  score++;

  this.classList.remove("up"); //even it might only takes a second you should remove it

  scoreBoard.textContent = score;
}
```

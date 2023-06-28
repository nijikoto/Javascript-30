# Day 26 Stripe Follow Along Dropdown Navigation

## 理解問題

- 製作 hover 的 dropdown 選單，選單的背景需依據選單的內容大小來顯示相符合的背景大小達到 resize 的功能。

## 操作筆記

### setTimeout 的 this

- 當使用 setTimeout 來做以下的操作會出現 error

```javascript
function handleEnter() {
  this.classList.add("trigger-enter");

  setTimeout(function () {
    this.classList.add("trigger-enter-active");
  }, 150);
}
```

![](https://i.imgur.com/5xqu8wh.png)
→ 沒辦法找到 this 的 classlist

![](https://i.imgur.com/G5PtNTo.png)
→ console.log this 的結果是 window

- error 的原因：
  函式的 this 關鍵字會依賴於該函式被呼叫的方式，而不是被定義的地方。在這個情況下，setTimeout 函式的匿名函式中的 this 關鍵字會指向全域物件（在瀏覽器中通常是 window 物件），而不是 handleEnter 函式被呼叫時的上下文物件。

- 解決的方法：
  使用箭頭函式（arrow function）來取代匿名函式，因為箭頭函式不會自己綁定 this 關鍵字，而是繼承了其周圍的範疇的 this 值。

```javascript
setTimeout(() => {
  this.classList.add("trigger-enter-active");
}, 150);
```

### navlinks 的動畫特效（前半）

- 透過追加、移除 css 的 class 來呈現動畫

```javascript
const triggers = document.querySelectorAll(".cool>li");

const background = document.querySelector(".dropdownBackground");

const nav = document.querySelector(".top");

function handleEnter() {
  this.classList.add("trigger-enter");

  setTimeout(() => {
    this.classList.add("trigger-enter-active");
  }, 150);
}

function handleLeave() {
  this.classList.remove("trigger-enter", "trigger-enter-active");
}

triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);

triggers.forEach((trigger) =>
  trigger.addEventListener("mouseleave", handleLeave)
);
```

### navlinks 的動畫特效（後半：隨物件大小變動的背景）

```javascript
function handleEnter() {
  this.classList.add("trigger-enter");

  setTimeout(() => {
    this.classList.add("trigger-enter-active");
  }, 150);

  background.classList.add("open");

  const dropdown = this.querySelector(".dropdown");

  console.log(dropdown);
}
```

- 為什麼`dropdown`需要寫在 function 裡面，而不寫在外面？
  → 因為要依據 hover 到的對象，靈活地印出相對應結果。

![](https://i.imgur.com/MfkUwaQ.png)

- 同理，考量到 nav 也有可能會因網頁配置（例如 banner 等）而改變大小，預先設置並更新為每次重新取得有其必要性。

### left 和 top 位置的計算

```javascript
const coords = {
  width: dropdownCoords.width,

  height: dropdownCoords.height,

  top: dropdownCoords.top - navCoords.top,

  left: dropdownCoords.left - navCoords.left,
};
```

- 設定相對值：
  `top` 的計算是透過將 `dropdownCoords` 的 `top` 值減去 `navCoords` 的 `top` 值來得到下拉選單相對於導覽欄的垂直距離。這樣做是為了確保下拉選單的定位是相對於導覽欄的位置。

同樣地，`left` 的計算是透過將 `dropdownCoords` 的 `left` 值減去 `navCoords` 的 `left` 值來得到下拉選單相對於導覽欄的水平距離。

### setTimeout()的條件設定

- 原本的 setTimeout():

```javascript
setTimeout(() => {
  this.classList.add("trigger-enter-active");
}, 150);
```

→ 直接將 `trigger-enter-active` 類別添加到元素，無論它是否具有 `trigger-enter` 類別。

🚧 問題點：
這樣的寫法忽略了的實際使用者在操作時，若高速滑動時當使用者已經 hover 完並離開的瞬間，用於執行動畫的 class 甚至還沒執行到，所以會變成`remove`先於追加`active` 的 class 上去，造成視覺上有時間差。

要解決這個問題在`setTimeout()`追加條件設定：

```javascript
setTimeout(() => {
  this.classList.contains("trigger-enter") &&
    this.classList.add("trigger-enter-active");
}, 150);
```

也就是只有當元素具有 `trigger-enter` 類別時，才會將 `trigger-enter-active` 類別添加到該元素。

## 小地方但需要留意的地方

- 該加`''`的地方要留意，有時從 syntax 看不出來，譬如
  這是 setProperty 的 syntax

```javascript
setProperty(propertyName, value);
setProperty(propertyName, value, priority);
```

於是寫

```javascript
background.style.setProperty(width, `${coords.width}px`);
background.style.setProperty(height, `${coords.height}px`);
```

但 🚨
![](https://i.imgur.com/7Bn3iLp.png)

所以應

```javascript
background.style.setProperty("width", `${coords.width}px`);
background.style.setProperty("height", `${coords.height}px`);
```

## 參考資料

1. [ [教學] 深入了解 getBoundingClientRect() 函數，輕鬆獲得元素的大小和位置](https://shubo.io/get-bounding-client-rect/)

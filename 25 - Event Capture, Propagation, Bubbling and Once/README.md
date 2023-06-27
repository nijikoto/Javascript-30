# Day 25 JavaScript Event Capture, Propagation and Bubbling

## 理解問題

- 學習 Javascript `capture`,`bubbling`, `propagation`的概念

## 研究課題

### Event capture

> Capturing phase—An event is first captured at the top element and trickled down to the target element. (ninja, ch13)

- 傳遞順序是由上到下

### bubbling

> Bubbling phase—After the target element has been reached in the capturing phase, the event handling switches to bubbling, and the event bubbles up again from the target element to the top element. (ninja ch13)

- DOM 傳遞順序是由下到上

#### event capture vs bubbling（圖示）

![](https://i.imgur.com/F99esHh.png)
（忍者第十三章，P356 頁）
→ 先 capture 再 bubbling

### stopPropagation

```javascript
e.stopPropagation(); //stop bubbling
```

可透過這樣的方法阻擋觸發父層

## 操作筆記

### bubbling VS capture

- bubbling

```javascript
function logText(e) {
  console.log(this.classList.value);
}
```

![](https://i.imgur.com/Oyv89QP.png)
這樣的結果是因為 html 的結構
![](https://i.imgur.com/3r4S66N.png)
當點擊最內側的 div 時也點擊到外側的 one and two 以及外層的東西
這樣的情形叫做 bubbling

- capture

```javascript
divs.forEach((div) =>
  div.addEventListener("click", logText, { capture: true })
);
```

![](https://i.imgur.com/qm2QkZa.png)
→ will run the function all the way down not all the way up(bubbling)

- 預設是 false

- 這樣的寫法也通：

```javascript
divs.forEach((div) => div.addEventListener("click", logText, true));
```

### Propagation

```javascript
function logText(e) {
  console.log(this.classList.value);

  e.stopPropagation();
}
```

- 可以 stop bubbling 因此結果只有 three
  ![](https://i.imgur.com/nbqNznZ.png)

### once

```javascript
divs.forEach((div) =>
  div.addEventListener("click", logText, { capture: false, once: true })
);
```

只執行結果一次

- 點擊第一次的結果
  ![](https://i.imgur.com/sQyqmGw.png)
- 後續點擊第二次以上則沒有結果

例如，如果按鈕只想讓使用者點擊一次時適用

```javascript
button.addEventListener(
  "click",
  () => {
    console.log("click!");
  },
  { once: true }
);
```

## 參考資料

1. Secrets of the JavaScript Ninja, Second Edition (忍者第十三章)
2. [Event Propagation I : 事件捕捉和冒泡-Event Capture & Bubble](https://hsien-w-wei.medium.com/dom-event-propagation-i-%E4%BA%8B%E4%BB%B6%E6%8D%95%E6%8D%89%E5%92%8C%E5%86%92%E6%B3%A1-event-capture-bubble-8214bf146b35)
3. [Event Propagation II : 事件可以委託-Event Delegation](https://hsien-w-wei.medium.com/dom-event-propagation-ii-%E4%BA%8B%E4%BB%B6%E5%8F%AF%E4%BB%A5%E5%A7%94%E8%A8%97-event-delegation-ecccb019a48e)

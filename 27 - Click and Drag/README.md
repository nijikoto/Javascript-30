# Day 27 JavaScript Interface Challenge- Click and Drag to Scroll

## 理解問題

- 設置滑鼠事件監聽器，讓彩色的卡片能夠透過點擊拖來來滑動。

## 研究課題

### preventDefault

> The **`preventDefault()`** method of the [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) interface tells the [user agent](https://developer.mozilla.org/en-US/docs/Glossary/User_agent) that if the event does not get explicitly handled, its default action should not be taken as it normally would be. (MDN)

- `event.preventDefault()` 可用來阻止點擊事件的預設行為。
  注意點：`preventDefault` 方法只是阻止事件的預設行為，並不阻止事件的傳播。如果需要停止事件的傳播，應使用 `event.stopPropagation()`

## 操作筆記

### 複習滑鼠相關的事件

1. mouseleave：當滑鼠指針移出某個元素時觸發該事件。該事件在滑鼠離開元素範圍時被觸發，無論是否有其他元素覆蓋在其上。它可以用於在滑鼠離開時執行某些操作，例如恢復元素的預設狀態。
2. mouseup：當滑鼠按鍵被釋放時觸發該事件。無論是左鍵、右鍵還是中鍵被釋放，只要有按鍵釋放，就會觸發此事件。它可以用於實現與滑鼠按鍵相關的操作，例如拖放、按鍵組合等。
3. mousedown：當滑鼠按鍵被按下時觸發該事件。與 mouseup 事件相對應，只要滑鼠按鍵被按下，就會觸發此事件。它通常與 mouseup 事件組合使用，用於實現與滑鼠按鍵相關的操作，例如按住滑鼠進行拖放等。
4. mousemove：當滑鼠指針在元素內移動時觸發該事件。無論是元素內部的平移、拖放還是其他滑鼠移動操作，只要滑鼠指針在元素內移動，就會觸發此事件。它可以用於實現根據滑鼠位置變化的互動效果，例如滑鼠懸停時顯示提示信息。

### pageX vs offsetLeft

1. `pageX` 是一個滑鼠事件（例如 `mousedown` 或 `mousemove`）的屬性，它提供了滑鼠指針相對於整個網頁文檔（或視口）的水平位置。它是相對於文檔左上角的固定參考點。
2. `offsetLeft` 是一個元素的屬性，它提供了該元素相對於其包含元素（通常是父元素）的左側邊緣的水平偏移量。它是相對於包含元素的固定參考點。

`pageX` 提供了滑鼠事件相對於整個網頁文檔的水平位置，而 `offsetLeft` 提供了元素相對於其包含元素的水平偏移量。

```javascript
startX = e.pageX - slider.offsetLeft;
```

`e.pageX - slider.offsetLeft` 可計算出滑鼠點擊事件發生時，滑鼠指針相對於滑塊元素的左側邊緣的水平偏移量。

### mousemove 事件監聽器的內容

```javascript
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return; //stop from running

  e.preventDefault;

  const x = e.pageX - slider.offsetLeft; //recalculate every single time

  // console.log({ x, startX });

  const walk = (x - startX) * 3; //tell us how far have we deviated from

  slider.scrollLeft = scrollLeft - walk;

  // console.log(walk);
});
```

![](https://i.imgur.com/lnuTVOR.png)

- console.log 的結果，滑鼠點擊滑動時 x 值會持續變動，而 startX 則維持這同樣的數值。
  → x 為相對於滑塊元素的左側邊緣

```javascript
const walk = (x - startX) * 3;
```

→ 將差值乘以一個係數（此處為 3）計算出滾動的距離 `walk`

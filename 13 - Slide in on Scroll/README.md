# Day 13 Vanilla JavaScript Slide In on Scroll

## 理解問題

- 當使用者滑動到特定區域，以動畫顯示出相符合的圖片

## 拆解問題

- 特定區域的範圍為何
- 若在指定區域內擇顯示、若在指定區域外則不顯示
- 監聽滑動

## 研究課題

### window.scrollY()

- shows the pixel that scrolls down
  > The read-only **`scrollY`** property of the [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) interface returns the number of pixels that the document is currently scrolled vertically.

→ 顯示文件垂直滾動的位置，單位是 pixel

- 返回的數值為浮點數，可能帶有小數點
- 數值的計算方式是以文件或容器元素的頂部
- 滾動基準點是使用者滾動畫面的頂部畫面位置

### window.innerHeight()

> The read-only **`innerHeight`** property of the [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) interface returns the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.

→ 瀏覽器視窗可見區域的高度，表示當前可見內容的範圍。

- 取決於瀏覽器視窗的大小，而不同的螢幕或設備可能有不同的視窗大小。較大的螢幕可能有更大的視窗高度，而較小的螢幕則可能有較小的視窗高度。

### offsetTop()

- tell us the top of the '' is how far from the actual window
  > The **`HTMLElement.offsetTop`** read-only property returns the distance of the outer border of the current element relative to the inner border of the top of the [`offsetParent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent "offsetParent"), the *closest positioned* ancestor element.

→ 　返回該元素相對於其最近的已定位（positioned）父元素的頂部邊緣的距離，以像素為單位。

## 其他學到的東西

### console.count()

可計算特定的呼叫被呼叫幾次

### debounce 的作用

防抖函式的用途在於對於頻繁觸發的事件，如滾動事件或輸入框輸入事件，可以限制函式的執行頻率，避免不必要的計算或資源浪費。
優點：

1. 控制函式執行頻率：通過設定適當的等待時間，可以有效控制函式的執行頻率，減少不必要的處理。
2. 優化效能：適用於一些需要進行重複計算或複雜操作的函式，可以減少不必要的計算，提高效能。
3. 避免不必要的請求：例如在使用者輸入搜索關鍵字時，可以使用防抖函式延遲發送請求，以避免頻繁的請求。
   注意點：
4. 延遲執行時間：由於引入了等待時間，函式的執行會被延遲，這可能不適用於某些即時性要求高的場景。
5. 只執行最後一次觸發：如果在等待時間內有多個觸發事件，只有最後一個觸發事件執行函式，其他觸發事件被忽略。這可能會導致一些事件被遺漏。

### 補充：debounce 和 throttle 的比較

`debounce`：

- 等待時間內有新的觸發事件時，重置計時器，等待時間重新計算。
- 只在等待時間內沒有新的觸發事件時執行一次函式。
- 適合用於限制連續觸發事件的執行頻率，例如滾動事件、輸入框輸入事件。

`throttle`：

- 固定時間間隔內執行一次函式，無論觸發事件頻率有多高。
- 不重置計時器，固定時間間隔到達後執行函式。
- 適合用於控制函式的執行頻率，例如限制請求的發送頻率、限制事件監聽的觸發頻率。

## 參考資料

1. [# Debounce – How to Delay a Function in JavaScript (JS ES6 Example)](https://www.freecodecamp.org/news/javascript-debounce-example/)
2. [## [有趣面試題] 網頁效能問題改善之 Debounce & Throttle](https://ithelp.ithome.com.tw/articles/10222749)

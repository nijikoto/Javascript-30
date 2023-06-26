# Day 22 Follow Along Link Highlighter

## 理解問題

- 做出滑鼠移動到物件時的背景特效

## 研究課題

### Element: getBoundingClientRect() method

> The **`Element.getBoundingClientRect()`** method returns a [`DOMRect`](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) object providing information about the size of an element and its position relative to the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport).

- 能夠回傳一個 DOMRect 物件
- DOMRect 物件裡包含物件尺寸的資訊

![](https://i.imgur.com/Cm6DElh.png)

### window.scrollY

![](https://i.imgur.com/YR5ObTI.png)

- 參考 Day 13 的筆記

## 操作步驟

1. 首先，程式碼使用`querySelectorAll`方法選取了所有的`<a>`元素，並將其儲存在`triggers`變數中。
2. 接下來，程式碼建立了一個`<span>`元素，並新增一個名為`highlight`的 CSS 類別。然後，將這個`highlight`元素加入到`document.body`中，以便稍後在頁面上顯示高亮效果。
3. 程式碼定義了一個名為`highlighLink`的函式。這個函式用於處理滑鼠在連結上移動的事件。
4. 在`highlighLink`函式內部，程式碼使用`getBoundingClientRect`方法獲取了滑鼠所在的連結元素的位置和尺寸資訊。這些資訊儲存在`linkChords`變數中。
5. 程式碼接著根據`linkChords`中的資訊，計算出連結元素的寬度、高度以及相對於視窗左上角的位置。這些計算結果儲存在`chords`物件中。
6. 接下來，程式碼使用計算出的尺寸和位置資訊，將`highlight`元素的寬度和高度設定為與連結元素相同，並將`highlight`元素移動到連結元素的位置上，以便實現高亮效果。
7. 最後，程式碼使用`forEach`方法遍歷`triggers`中的每個連結元素，並對每個連結元素都新增了一個`mousemove`事件監聽器，當滑鼠在連結上移動時，將呼叫`highlighLink`函式。

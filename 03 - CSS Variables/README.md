## 理解問題

- 製作橫向拖拉工具立即刻更新瀏覽器顯示的 spacing、blur，並可透過顏色選擇器來選擇底色 base color

## 拆解問題

### 橫向拖拉工具

- 越往右數值越大
- 能夠在瀏覽器拖拉的# addEventListener()為何
- 要改變值在哪

### 顏色選擇器

## 研究課題

### addEventListener('change')

> The `change` event is fired for [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), and [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) elements when the user modifies the element's value. Unlike the [`input`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event "input") event, the `change` event is not necessarily fired for each alteration to an element's `value`. (MDN)

- 當使用者控制 element 的值即執行，不一定會在每次值的變動時都被觸發。

syntax:

```javascript
addEventListener("change", (event) => {});

onmousemove = (event) => {};
```

### addEventListener('mousemove')

> The `mousemove` event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.

- 當滑鼠在元素上移動時觸發。
  syntax:

```javascript
addEventListener("mousemove", (event) => {});

onmousemove = (event) => {};
```

#### 其他 mouse 相關補充

1.  mousedown（按下滑鼠）：當使用者按下滑鼠按鈕時觸發。例如，當使用者點擊滑鼠左鍵時，會觸發 mousedown 事件。
2.  mouseenter（滑鼠進入）：當滑鼠游標進入元素區域時觸發。例如，當滑鼠游標進入一個元素的範圍內時，會觸發 mouseenter 事件。
3.  mouseleave（滑鼠離開）：當滑鼠游標離開元素區域時觸發。例如，當滑鼠游標離開一個元素的範圍時，會觸發 mouseleave 事件。
4.  mouseout（滑鼠離開）：當滑鼠游標離開元素或其子元素時觸發。例如，當滑鼠游標離開一個元素或其子元素的範圍時，會觸發 mouseout 事件。
5.  mouseover（滑鼠進入）：當滑鼠游標進入元素或其子元素時觸發。例如，當滑鼠游標進入一個元素或其子元素的範圍內時，會觸發 mouseover 事件。
6.  mouseup（放開滑鼠）：當使用者釋放滑鼠按鈕時觸發。例如，當使用者釋放滑鼠左鍵時，會觸發 mouseup 事件。

### node list vs array

### dataset

- an objects that contain all the data attributes from that specific element (Wes)
- take everything that has data-on that element (Wes)

### forEach()

# 實作筆記

## 理解問題

- 分別控制時針、分針、秒針來使其依照目前的版面時間來運作

## 拆解問題

- 如何將代表小時、分、秒的「線段」旋轉並對應到目前的時間
  - 旋轉的邏輯為何
    - 線段的旋轉點如何設定
    - 時間區間 例如：每～的時間轉一圈
    - 旋轉單位
    - 運轉方式：順時針
  - 如何剛好應對到目前的時間

## 研究課題

### CSS

#### transform-origin

> The transform-origin CSS property sets the origin for an element's transformations. (MDN)

- transform-origin 設定 element 的原點。
- 預設為 50%(center)
- syntax:

```css
transform-origin: x-axis y-axis z-axis;
```

- example:

```css
transform-origin: 50% 50% 0;
transform-origin: center bottom 0;
transform-origin: 0 0;
transform-origin: top left -50px;
```

- 第三個值 z 軸
  transform-origin 的第三個值則是指定元素變換的深度，也就是 z 軸方向的位置。這個值可以是一個長度或是一個百分比，也可以是一個關鍵字，比如 center。

#### transition

> The transition CSS property is a shorthand property for transition-property, transition-duration, transition-timing-function, and transition-delay.(MDN)

- syntax:

```CSS
/* Apply to all changed properties */
transition: all 0.5s ease-out;
```

- `cubic-bezier()`函數接受四個參數，分別是 p1, p2, p3, p4，取值範圍在 0 和 1 之間。這四個參數分別表示了曲線的兩個端點和兩個控制點。其中，p1 和 p2 控制了曲線的起點和終點，p3 和 p4 控制了曲線在中間的走勢。

### JS

#### new Date()、getMinutes()、getSeconds()、getHours()

用於取得目前的時間

- syntax

```javascript
const d = new Date();
let minutes = d.getMinutes();
```

- getSeconds()：取得 Date 物件代表時間的秒數部分，回傳值是一個介於 0 到 59 之間的整數。
- getMinutes()：取得 Date 物件代表時間的分鐘部分，回傳值是一個介於 0 到 59 之間的整數。
- getHours()：取得 Date 物件代表時間的小時部分，回傳值是一個介於 0 到 23 之間的整數。

#### setInterval()

- syntax:

```javascript
setInterval(function, milliseconds);

```

> A function to be executed every `delay` milliseconds. The first execution happens after `delay` milliseconds. (MDN)

→ function 會在每一毫秒後被執行

## 計時器其他補充

- setInterval：每秒呼叫一次（設定一次執行很多次）次與次之間的間隔
- setTimeout：概念為延遲，設定延遲，執行一次，因此要設定自己呼叫自己，達到連續的執行的效果（可用在處理程式邏輯面）
  > The global **`setTimeout()`** method sets a timer which<mark style="background: #FFB8EBA6;"> executes a function or specified piece of code once the timer expires.</mark>
  > 當時間終止後執行
- requestAnimationFrame：專門處理畫面更新的'setTimeOut'
  > The **`window.requestAnimationFrame()`** method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to <mark style="background: #FFB8EBA6;">update an animation right before the next repaint. </mark><mark style="background: #FFB8EBA6;">The method takes a callback as an argument to be invoked before the repaint.</mark> （MDN）

syntax:

```javascript
requestAnimationFrame(callback);
```

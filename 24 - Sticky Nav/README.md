# Day 24 Vanilla JavaScript Sticky Nav

## 理解問題

- 製作導覽列的滑動特效，當視窗上方邊緣（往下滑動的範圍）碰觸到導覽列時顯示出隱藏的一導覽列。

## 研究課題

### offsetTop

> The **`HTMLElement.offsetTop`** read-only property returns the distance of the outer border of the current element relative to the inner border of the top of the [`offsetParent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent "offsetParent"), the *closest positioned* ancestor element. (MDN)

- `HTMLElement.offsetTop`：是一個 DOM 屬性，可以在網頁中的 HTML 元素上使用。它用於獲取該元素相對於其最近的已定位祖先元素的內邊框頂部的距離。
- 外邊框（outer border）：元素的外邊框是指元素邊界框（bounding box）的最外層矩形。它包括元素的邊框、內容區域和內邊距。
- 內邊框（inner border）：元素的內邊框是指元素邊界框內的矩形區域，排除了邊框本身，只包括內容區域和內邊距。
- `offsetParent`：`offsetParent` 是一個 DOM 屬性，表示元素的最近的已定位祖先元素。已定位的元素是指其 CSS `position` 屬性的值為 `relative`、`absolute`、`fixed` 或 `sticky` 的元素。如果元素沒有已定位的祖先元素，則 `offsetParent` 為最接近的包含塊（containing block）元素，通常是 `<body>` 元素。
- 最近的已定位祖先元素：指在元素的父元素鏈中，最接近該元素且具有已定位屬性（`position: relative/absolute/fixed/sticky`）的祖先元素。

### transform: scale()

> The **`scale()`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [function](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions) defines a transformation that resizes an element on the 2D plane. Because the amount of scaling is defined by a vector, it can resize the horizontal and vertical dimensions at different scales. Its result is a [`<transform-function>`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function) data type.（MDN)

`scale()` 是 `transform` 屬性的函式值，它用於定義元素的縮放比例。

`scale(1)` 表示元素的縮放比例是原始大小，也就是不進行任何縮放。數值 1 表示 100% 的原始大小。你可以使用其他數值來進行縮放，例如 `scale(0.5)` 將元素縮小為原始大小的一半，而 `scale(2)` 則將元素放大為原始大小的兩倍。

## 操作筆記

### nav.offsetHeight

![](https://i.imgur.com/95b91nO.png)
→ 　顯示 nav 有多大

### CSS

```CSS
.fixed-nav li.logo {

max-width: 500px;

}
```

- 為什麼不能用`width:auto`？
  因為使用 width:auto 沒辦法搭配 transform 一起使用，無法達到動畫效果。

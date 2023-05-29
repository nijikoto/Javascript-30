# Day 5 Flexbox + JavaScript Image Gallery

## 理解問題

### 初始視覺

- 四張圖片垂直平均分配在畫面上
- 圖片上的文字水平、垂直置中
- 圖片內的上下文字呈現「隱藏狀態」

### 點擊圖片後的動畫效果

#### 單張展開/收合

- 點擊的作用域：該張圖片的任一區域
- 文字：上下文字顯現，由上、下方滑出，中間文字放大
- 動畫：回彈、再展開/收合
- 展開的空間

#### 同時展開

點擊第 2, 3, 4, 5 張的情況

- 展開的空間

## 程式邏輯

針對指定的元素設定事件監聽器，若遇點擊則追加 class 達到動畫一展開，當事件結束則再追加 class 達到動畫二的上下文字動畫

## 實作紀錄

### 自己的嘗試

```javascript
// 選定目標元素

const allPanels = document.querySelectorAll(".panel");

// 設置事件監聽器

allPanels.forEach(function (panel) {
  panel.addEventListener("click", function () {
    // 追加 class 到目標元素

    panel.classList.toggle("open");
  });

  panel.addEventListener("transitionend", function (e) {
    if (e.propertyName.includes("flex")) {
      this.classList.toggle("open-active");
    }
  });
});
```

### Wes Bos 的

```javascript
const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  console.log("Hello");

  this.classList.toggle("open");
}

function toggleActive(e) {
  console.log(e.propertyName);

  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));

panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);
```

### 比較

- 主要差異在於自己的寫法是以- `forEach` 迴圈對每個 `.panel` 元素設置事件監聽器。而 WesBos 的寫法使用兩個獨立的函數 `toggleOpen` 和 `toggleActive`，並使用 `forEach` 迴圈分別對每個 `.panel` 元素設置 `click` 和 `transitionend` 的事件監聽器。

- 自己的寫法雖然行數較簡短，但 wes bos 的寫法可讀性較高、維護性較好。因此，若優先程式碼的維護性，應選擇 Wes Bos 的寫法為佳。

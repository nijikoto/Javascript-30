# Day 10 Hold Shift and Check Checkboxes

## 理解問題

- 將現有的 to-do list 改為 按著 shift 鍵，則第一次點擊的和第二次點擊之間的所有 items 都將被勾選

## 拆解問題

- 如何偵測 shift 案鍵按下
- 如何選取第一次點擊和第二次點擊間的項目
- checkbox 被勾選時是什麼狀態，取消勾選又是什麼狀態

## 程式邏輯

### 自己規劃的想法

#### 使用者的角度

- 點擊第一個 checkbox
- 按了 shift 鍵
- 點擊第二個 checkbox
- 顯示出第一個選取的以及第二個選取的之間的項目都被選取

#### 程式開發的角度

- 在所有的 checkbox 監聽 shift 按鍵 、監聽 checkbox 被選取
- 第一個 checkbox 的觸發
- 第一個 checkbox 被觸發後會顯示 checked 為 true
- 監聽第二個 checkbox 的觸發
- 選取第一個和第二個之間的項目，並將其整理為變數
- 使選取項目呈現選中狀態 也就是 false 變為 true

### chatGPT 建議的程式規劃

1. 在適當的位置添加一個變數，用於存儲先前選取的 checkbox 的索引。
2. 在每個 checkbox 的點擊事件處理程序中，檢查 Shift 鍵是否被按下。
3. 如果 Shift 鍵被按下，獲取當前 checkbox 的索引。
4. 根據先前選取的 checkbox 和當前 checkbox 的索引，判斷介於它們之間的所有 checkbox。
5. 將這些 checkbox 設置為選中狀態。

### Wes Bos 的程式規劃

1. 選擇所有 input 元素，並儲存在變數中。
2. 宣告一個變數來儲存最後一個被選中的 checkbox。
3. 在 function 中檢查是否按下了 Shift 鍵並且當前 checkbox 被勾選。
4. 創建一個名為 `inBetween` 的布林變數，用於標記是否處於要選中的區間內。
5. 使用 `forEach` 方法遍歷所有的 checkbox 元素。
6. 檢查 checkbox 是否與當前 checkbox（`this`）或上一個被選中的 checkbox（`lastChecked`）相同。
7. 如果 checkbox 與當前 checkbox 或上一個被選中的 checkbox 相同，將 `inBetween` 設置為相反的值，表示進入了要選中的區間內。
8. 如果 `inBetween` 為真（表示處於要選中的區間內），將 checkbox 設置為被勾選狀態。
9. 最後，將當前 checkbox（`this`）賦值給 `lastChecked`，以便下一次點擊事件時使用。
10. 將 `handleCheck` 函式綁定到每個 checkbox 的點擊事件上。

### 自己的想法的盲點、不足之處

- 對於 shift 按鍵的誤解：並非以 addEventListener 去監聽 按下 shift 按鍵，而是應該以 event 的屬性 shiftKey 去操作，並將其放到 function()，
- 缺少了儲存選中項目的思維，對於哪些應整理起來以便後續使用掌握不足
- 對於整合第一個被選取、以及第二個被選取間的邏輯不熟悉

## 研究課題

### KeyboardEvent: shiftKey property

> The **`KeyboardEvent.shiftKey`** read-only property is a boolean value that indicates if the shift key was pressed (`true`) or not (`false`) when the event occurred.（MDN）

#### 練習中的應用例

```javascript
if (e.shiftKey && this.checked) {
  //...
}
```

### input type="checkbox"

> `checked`

A [boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML) attribute indicating whether this checkbox is checked by default (when the page loads). It does *not* indicate whether this checkbox is currently checked: if the checkbox's state is changed, this content attribute does not reflect the change. (Only the [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)'s `checked` IDL attribute is updated.) (MDN)

- checked 是一個布林值，當 checkbox 被選取時會顯示 true，當未被勾選時會顯示 false

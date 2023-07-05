# Day 15 How LocalStorage and Event Delegation work.

## 理解問題

- 製作 to-do list

## 研究課題

### local storage

> The **`localStorage`** read-only property of the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) interface allows you to access a [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) object for the [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document)'s [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin); the stored data is saved across browser sessions. (MDN)

> `localStorage` is similar to [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage "sessionStorage"), except that while `localStorage` data has no expiration time, `sessionStorage` data gets cleared when the page session ends — that is, when the page is closed. (`localStorage` data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.)

#### localStorage vs sessionStorage

1. 資料的生命週期：

   - `localStorage`：儲存在 `localStorage` 中的資料具有永久性，即使瀏覽器關閉或重新啟動，資料仍然存在。
   - `sessionStorage`：儲存在 `sessionStorage` 中的資料僅在當前瀏覽器會話期間有效。當瀏覽器窗口或選項卡被關閉時，資料將被清除。

2. 資料的範圍：

   - `localStorage`：`localStorage` 的資料在同一網域下的所有頁面之間共享。不同頁面可以存取相同的 `localStorage` 資料。
   - `sessionStorage`：`sessionStorage` 的資料僅在同一瀏覽器窗口或選項卡的同一網域下共享。不同瀏覽器窗口或選項卡之間的 `sessionStorage` 是隔離的，無法共享資料。

3. 存儲容量限制：

   - `localStorage`：`localStorage` 的存儲容量通常比較大，一般限制在數 MB 到數十 MB 之間（視瀏覽器而定）。
   - `sessionStorage`：`sessionStorage` 的存儲容量通常比較小，一般限制在幾十 KB 到數 MB 之間（視瀏覽器而定）。

4. 存取方式：

   - `localStorage` 和 `sessionStorage` 都可以使用相同的 JavaScript 存取方法，如 `setItem()`、`getItem()`、`removeItem()` 等。

#### Local Storage 的使用

1. 儲存資料到 Local Storage:
   使用 `localStorage.setItem(key, value)` 方法來儲存資料到 Local Storage。`key` 是您指定的鍵，`value` 是您要儲存的資料。例如：

   ```javascript
   localStorage.setItem("username", "John");
   ```

2. 從 Local Storage 中讀取資料:
   使用 `localStorage.getItem(key)` 方法來從 Local Storage 中讀取資料。指定相應的 `key` 來獲取相對應的資料值。例如：

   ```javascript
   const username = localStorage.getItem("username");
   console.log(username); // 輸出: John
   ```

3. 移除資料從 Local Storage:
   使用 `localStorage.removeItem(key)` 方法來從 Local Storage 中移除特定鍵的資料。指定要移除的 `key`。例如：

   ```javascript
   localStorage.removeItem("username");
   ```

4. 清除 Local Storage:
   使用 `localStorage.clear()` 方法來清除整個 Local Storage 中的所有資料。例如：
   ```javascript
   localStorage.clear();
   ```

Local Storage 中的資料會永久保留在瀏覽器中，即使瀏覽器關閉或重新啟動。這使得 Local Storage 成為一個適合存儲使用者偏好、狀態和其他持久性資料的地方。

注意：Local Storage 是基於同一網域（domain）的。這意味著只有在相同網域下的頁面才能訪問同一個 Local Storage。不同網域的頁面無法互相存取彼此的 Local Storage 資料。

### Event delegation

事件委派（Event Delegation）是一種設計模式，用於處理在父元素上捕獲事件並代理處理子元素上的事件。這種模式可以幫助減少事件處理程序的數量，提高性能和效率，尤其在處理大量元素或動態生成的元素時非常有用。

事件委派的基本原理是將事件處理程序綁定到父元素上，而不是直接綁定到每個子元素。當事件在子元素上觸發時，事件會冒泡至父元素，然後在父元素上觸發事件處理程序。然後，可以透過事件對象（event object）中的目標元素（target element）屬性來確定實際觸發事件的子元素。

事件委派的基本步驟：

1. 選取共同的父元素： 選擇一個父元素，它包含您要處理事件的子元素。通常，選擇一個靜態存在於 DOM 中的元素，並且能夠包含所有需要處理事件的子元素。
2. 綁定事件處理程序： 將事件處理程序綁定到父元素上。這可以使用 addEventListener() 方法來完成。可以指定要處理的事件類型（如 click、change 等）以及要執行的處理程序函數。
3. 檢查事件目標： 在事件處理程序函數中，使用事件對象（event object）來獲取觸發事件的實際子元素。您可以使用 event.target 屬性來獲取目標元素。
4. 處理事件： 根據需要進行相應的處理，根據目標元素的特性或其他標識進行區分。

## 操作筆記

### queryselector 選擇器其他的選擇方法

```javascript
const text = this.querySelector("[name=item]");
```

![](https://i.imgur.com/MotuhGA.png)
因為 this 指向的是 form，因此可以針對其屬性值來查找具有`name`屬性值為`item`的元素。

### add item function

```javascript
function addItem(e) {
  console.log(this);

  e.preventDefault();

  const text = this.querySelector("[name=item]").value;

  const item = {
    text, // es6 feature

    done: false, //preserve state here
  };

  console.log(item);
}

addItems.addEventListener("submit", addItem);
```

![](https://i.imgur.com/wbRC8Hk.png)
item 印出的結果，text 顯示出使用者鍵入的訊息

### 使用 array 的 method push()將鍵入的內容儲存於 array

```javascript
items.push(item);
```

鍵入食物
![](https://i.imgur.com/13YkGKr.png)

→ 以 console.table()印出，顯示資料已成功儲存在`item` array 當中了。

### 製作清單

#### 產生出 list

- 產生 list 的 HTML

```javascript
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `<li>

<label for ="">${plate.text}</label>

</li>`;
    })
    .join("");
}
```

- 在 addItems function 中呼叫

```javascript
populateList(items, itemsList);
```

![](https://i.imgur.com/ldga1mZ.png)
→ 如圖鍵入後，list 顯示在面板上

#### 製作 checkbox

- checkbox 的邏輯：如果 items 有 done 的 attribute 則放上 checkbox 用的 checked attribute

##### 關於 checked 屬性貨或特性

如果 `checked` 屬性或特性存在且具有任何值（不論是空字串還是其他值），則該勾選框元素將被預設選中。如果 `checked` 屬性或特性不存在，則該勾選框元素將不被預設選中。

因此，以下情況都可以使該勾選框元素處於選中狀態：

- `checked` 屬性存在且具有任何值（例如 `checked=""`、`checked="true"`、`checked="checked"` 等）
- `checked` 特性存在且具有任何值（例如 `checked`、`checked="true"`、`checked="checked"` 等）

不論是

```javascript
<input type="checkbox" data-index=${i} id="item${i}" checked="" />
```

或是

```javascript
<input type="checkbox" data-index=${i} id="item${i}" checked="🍋" />
```

其結果都是讓 items 顯示被勾選
![](https://i.imgur.com/ITLyGzv.png)

##### checkbox 的邏輯

```javascript
<input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
```

- 運用三元運算式：若 plate 的屬性為 done 則 checked，否則 為空

```javascript
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `<li>

<input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />

<label for ="item${i}">${plate.text}</label>

</li>`;
    })
    .join("");
}
```

- 索引變數`i`
  `i` 是「index」的縮寫。它通常用於表示迴圈的索引值或元素在陣列中的位置。在這個特定的程式碼片段中，`i` 代表著每個元素的索引值，用於標識每個 `input` 元素和相應的 `label` 元素的唯一性。這是一種常見的命名慣例，用於表示迴圈的索引或位置。

### Local storage

當完成 todo list 的功能後會發現，若刷新頁面則原先鍵入的資訊將會消失，因此必須設定 local storage，讓頁面刷新後仍然保留使用者鍵入的資訊。

```javascript
localStorage.setItem("items", items);
```

![](https://i.imgur.com/aaupwEx.png)

- `key: items` 表示儲存在 Local Storage 中的鍵是 "items"。
- `value: [object Object]` 表示存儲的值是一個物件，它被轉換為字串 "[object Object]"。
  因為 Local Storage 只能儲存字串形式的資料，無法直接儲存物件或陣列。當您嘗試存儲物件或陣列時，它們會被自動轉換為字串。在這種情況下，物件被轉換為字串 "[object Object]"，因為它是 JavaScript 中物件的默認字串表示形式。

也就是相當於瀏覽器做了 toString()
![](https://i.imgur.com/2AOkWmv.png)

爲了避免這樣的事情，可以先在它轉換之前將其先字串化（Stringify)：

```javascript
localStorage.setItem("items", JSON.stringify(items));
```

![](https://i.imgur.com/8gb9PfY.png)
→ 使用者鍵入後的結果
![](https://i.imgur.com/WRrNBeM.png)
→ local storage 頁面的結果

![](https://i.imgur.com/PGfegcE.png)
![](https://i.imgur.com/fPrh4bo.png)
→ JSON.parses()能夠使其恢復原樣，這邊會恢復成 array

#### page load 的設定

```javascript
const items = JSON.parse(localStorage.getItem("items")) || [];
```

Local Storage 中讀取名為 "items" 的資料，並將其解析為 JavaScript 物件或陣列。如果資料不存在，則將創建一個空陣列作為預設值。

使用 `JSON.parse()` 方法將從 Local Storage 中讀取的字串資料解析為對應的 JavaScript 物件或陣列。

#### recap

當使用者 add an item ，將會儲存在 local storage（每輸入一次更新一次），在 page load 的階段，檢查是否有內容在 local storage ，若無則創建空陣列。

### toggle function

toggle function 要做三件事：

1. 變更 done 的 property
2. 將其儲存在 local storage
3. 更新視覺畫面

#### event delegation

```javascript
function toggleDone(e) {
  console.log(e.target);
}
```

![](https://i.imgur.com/LTuq2yf.png)
event 的 target 指向二項元素，為了確保 event target 為`<input>` ，使用 if:

```javascript
function toggleDone(e) {
  //make sure the e.target is the thing we're looking for

  if (!e.target.matches("input")) return; // skip this unless it's an input

  console.log(e.target);
}
```

![](https://i.imgur.com/fmBNFC3.png)

☞ 以上是 event delegation 的措施，也就是在事件監聽器時，監聽更高的父元素，並在內部確認 target 是程式需要得到的東西。

#### dataset.index 的應用

- 取得 index 的位置

```javascript
function toggleDone(e) {
  //make sure the e.target is the thing we're looking for

  if (!e.target.matches("input")) return; // skip this unless it's an input

  const el = e.target;

  console.log(el.dataset.index);
}
```

![](https://i.imgur.com/zHPM66J.png)
得到 index 的位置

- 透過 index 來指定 items，並讓 done 的狀態為相反，達到 toggle 的功能。

```javascript
const index = el.dataset.index;

items[index].done = !item[items].done; // turn whatever the original state is and turn into the opposite
// false would be true
// true would be false
```

## 參考資料

1. [Event delegation](https://javascript.info/event-delegation)
2. Secrets of the JavaScript Ninja, 2nd Edition（忍者第十三章，p360，DELEGATING EVENTS TO AN ANCESTOR）

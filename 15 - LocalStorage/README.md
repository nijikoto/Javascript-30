# Day 15 How LocalStorage and Event Delegation work.

## 理解問題

- 製作 to-do list

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

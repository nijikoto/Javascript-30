# Node 學習筆記

## Node 是什麼

- Node 是 document 中的一個節點的介面，它包含 document 中的所有元素包含標籤、文本的內容（text 的內容）、注釋等：
- Element Node
- Text Node
- CData Section Node
- Processing Instruction Node
- Comment Node
- Document Node
- Document Type Node
- Document Fragment Node

### 如何去應用

- 常見的應用方式例如獲取父節點、子節點、兄弟節點，以及修改節點的內容、屬性等。

```javascript
// 獲取父節點
const parent = element.parentNode;

// 獲取子節點
const childNodes = element.childNodes;
const firstChild = element.firstChild;
const lastChild = element.lastChild;

// 獲取兄弟節點
const previousSibling = element.previousSibling;
const nextSibling = element.nextSibling;

// 修改節點的內容
element.nodeValue = "New node value";

// 修改節點的屬性
const attributeValue = element.getAttribute("attributeName");
element.setAttribute("attributeName", "New value");
element.removeAttribute("attributeName");
```

### node 和 elements 的差異

- 相較於 elements 僅包含 HTML 的元素，node 包含所有的內容

```javascript
// 獲取元素的標籤名稱
const element = document.getElementById("myElement");
console.log(element.tagName); // 顯示元素的標籤名稱

// 獲取或設置元素的屬性
const attributeValue = element.getAttribute("data-custom-attribute"); // 獲取自定義屬性的值
element.setAttribute("data-custom-attribute", "new value"); // 設置自定義屬性的值
element.removeAttribute("data-custom-attribute"); // 移除自定義屬性

// 樣式設置和獲取
element.style.color = "red"; // 設置元素的文本顏色為紅色
console.log(element.style.fontSize); // 獲取元素的字體大小
```

## Node list 和 HTML collection

### HTML collection

> An `HTMLCollection` object is an array-like list (collection) of HTML elements. The elements in the collection can be accessed by an index number. (w3school)

`HTMLCollection` 是 array-like 是物件的一種，為 HTML elements 的清單，並可透過  index number 來取得。

```javascript
// 獲取所有具有相同標籤名稱的元素
const elements = document.getElementsByTagName("div");

// 使用索引號來獲取特定的元素
const firstElement = elements[0]; // 獲取第一個元素
const secondElement = elements[1]; // 獲取第二個元素

// 修改元素的樣式
firstElement.style.color = "red";
secondElement.style.backgroundColor = "blue";
```

### node list

> A `NodeList` object is a list (collection) of nodes extracted from a document. (w3school)

`NodeList` 是 nodes 的清單(collection)

### HTML collection 和 Nodelist 的異同

- 兩者皆可透過 index 來訪問，皆從 0 開始計算
- 兩者皆可使用`length` 來返回集合中的元素數量
- 相較於 HTML collection 可以透過 name, id, 或是 index number 來訪問，Nodelist 僅可以透過 index 來訪問
- HTML collection 總是為 live collection，而 node list 大部分的時候是 static collection
- `getElementsByClassName()`  和  `getElementsByTagName()` 可返回 live HTML collection
- `querySelectorAll()`可返回 static 的 node list，而`childNodes` 返回 live 的 Nodelist

👩‍🚀 <mark style="background: #ABF7F7A6;">**Array-like** 並不是 array，所以並不能使用 array 的 method，例如： valueOf(), pop(), push(), join() </mark>

#### live & static

HTMLCollection 是一個始終是活動的集合，它會跟隨文檔的更改。修改文檔中的元素時，HTMLCollection 也會相應地改變。
NodeList 大多是一個靜態的集合，它在創建時就被固定，並不會反映後續的文檔更改。

```javascript
const parents = document.getElementsByClassName("parent");

console.log(parents);

const grandparent = document.querySelector(".grandparent");

const child = document.createElement("div");

child.classList.add("parent");

grandparent.appendChild(child);

console.log(parents);
```

![](https://i.imgur.com/63266Gx.png)

→ HTMLColletion(2) 變為 HTMLCollection(3) 也就是 live

若將 getElementByClassName 變更為 querySelectorAll

```javascript
const parents = document.querySelectorAll(".parent");
```

則結果為：
![](https://i.imgur.com/XZVGlzu.png)

→ Nodelist(2) 維持 node list (2)，也就是 static

#### 延伸： 類陣列(Array-like)

##### 如何轉換成類陣列

- 使用 Array.from()的方法轉換為陣列

```javascript
const elements = document.getElementsByTagName("div");
const array = Array.from(elements); // 使用 Array.from() 方法轉換為陣列

// 或者使用展開運算符（spread operator）來轉換為陣列
// const array = [...elements];

// 使用陣列的方法和屬性來處理陣列
array.forEach((element, index) => {
  console.log(`Element ${index}:`, element);
});

console.log("Number of elements:", array.length);
console.log("Index of a specific element:", array.indexOf(someElement));
```

- 轉換時機：

1.  需要使用陣列的方法：（例如 `forEach`、`map`、`filter`、`reduce` 等）來迭代、轉換或過濾集合中的元素，那麼將 `HTMLCollection` 轉換為陣列將非常有用。
2.  需要使用陣列的屬性：陣列具有一些有用的屬性，如 `length` 屬性可以獲取集合中元素的數量，而 `indexOf`、`includes` 等方法可以用於搜索和判斷元素是否存在於集合中。
3.  需要進行拓展和合併：將多個 `HTMLCollection` 或陣列合併成一個大的集合，或者需要將集合和其他陣列合併

## 參考資料

1. [JavaScript Node Vs Element](https://blog.webdevsimplified.com/2021-05/node-vs-element/)
2. [w3schools DOM node](https://www.w3schools.com/js/js_htmldom_nodes.asp)
3. [w3schools DOM collection](https://www.w3schools.com/js/js_htmldom_collections.asp)
4. [w3schools DOM nodelist](https://www.w3schools.com/js/js_htmldom_nodelist.asp)

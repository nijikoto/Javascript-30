# 實作筆記

## 理解問題

- 製作橫向拖拉工具立即刻更新瀏覽器顯示的 spacing、blur，並可透過顏色選擇器來選擇底色 base color

## 拆解問題

### 橫向拖拉工具

- 越往右數值越大
- 能夠在瀏覽器拖拉的# addEventListener()為何
- 要改變的值在哪

### 顏色選擇器

- 顏色選擇器是怎麼製作的
- 要控制的值是什麼

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

1. mousedown（按下滑鼠）：當使用者按下滑鼠按鈕時觸發。例如，當使用者點擊滑鼠左鍵時，會觸發 mousedown 事件。
2. mouseenter（滑鼠進入）：當滑鼠游標進入元素區域時觸發。例如，當滑鼠游標進入一個元素的範圍內時，會觸發 mouseenter 事件。
3. mouseleave（滑鼠離開）：當滑鼠游標離開元素區域時觸發。例如，當滑鼠游標離開一個元素的範圍時，會觸發 mouseleave 事件。
4. mouseout（滑鼠離開）：當滑鼠游標離開元素或其子元素時觸發。例如，當滑鼠游標離開一個元素或其子元素的範圍時，會觸發 mouseout 事件。
5. mouseover（滑鼠進入）：當滑鼠游標進入元素或其子元素時觸發。例如，當滑鼠游標進入一個元素或其子元素的範圍內時，會觸發 mouseover 事件。
6. mouseup（放開滑鼠）：當使用者釋放滑鼠按鈕時觸發。例如，當使用者釋放滑鼠左鍵時，會觸發 mouseup 事件。

🧝‍♀️ <mark style="background: #ABF7F7A6;">`mouseleave` 事件只在滑鼠離開元素自身時觸發，而 `mouseout` 事件在滑鼠離開元素自身或其子元素時都會觸發。</mark>

### HTMLElement: dataset property

- an objects that contain all the data attributes from that specific element (Wes)
- take everything that has data-on that element (Wes)
- JavaScript 中的 `dataset` 屬性用於存取元素的自訂數據屬性（data-\* 屬性）集合。自訂數據屬性是在 HTML 元素中使用 `data-` 前綴定義的屬性，它們可以用於儲存與元素相關的自訂數據。

> **Note:** The `dataset` property itself can be read, <mark style="background: #FFB8EBA6;">but not directly written</mark>. Instead, all writes must be to the individual properties within the `dataset`, which in turn represent the data attributes. (MDN)

- 屬性本身可以被讀取，但不能直接寫入。所有的寫入操作必須針對 `dataset` 內的各個屬性進行，這些屬性代表了數據屬性。

> An HTML `data-*` attribute and its corresponding DOM `dataset.property` modify their shared name according to where they are read or written:
>
> In HTML The attribute name begins with `data-`.
> It can contain only letters, numbers, dashes (`-`), periods (`.`), colons (`:`), and underscores (`_`). Any ASCII capital letters (`A` to `Z`) are converted to lowercase.
>
> In JavaScript
> The property name of a custom data attribute is the same as the HTML attribute without the `data-` prefix, and removes single dashes (`-`) for when to capitalize the property's "camelCased" name. (MDN)

- 可透過相應的 DOM`dataset.property` 來控制它們的共同名稱。
- 在 HTML 中： 屬性名稱以 data- 開頭。它只能包含字母、數字、破折號 (-)、句點 (.)、冒號 (:) 和底線 ＿。任何 ASCII 大寫字母（A 到 Z）都會轉換為小寫。
- 在 JavaScript 中： 自訂數據屬性的屬性名稱與 HTML 屬性相同，不包括 data- 前綴，並移除單個破折號 (-)，轉換為駝峰式（camelCased）命名的屬性名稱。

#### 延伸示例

```HTML
<div data-custom-data="example" data-another-data="123"></div>
```

```javascript
const element = document.querySelector("div");
const customData = element.dataset.customData; // 獲取自訂數據屬性值，這裡為 "example"
const anotherData = element.dataset.anotherData; // 獲取另一個自訂數據屬性值，這裡為 "123"
```

→`dataset` 屬性使用駝峰式命名法，因此 `data-` 前綴被移除，單個破折號也被去除，而屬性名稱以駝峰式命名。

### Document: documentElement property

> **`Document.documentElement`** returns the `Element` that is the root element of the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) (for example, the `<html>` element for HTML documents). (MDN)

- Document.documentElement 回傳文件中的根元素

> For any non-empty HTML document, `documentElement` will always be an [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html) element. (MDN)

- 任何不是 empty 的 HTML 文件，其 documentElement 就會是`<html>`元素。
- 它包含了整個 HTML 文檔的內容，包括`<head>`元素和`<body>`元素。所有其他的元素都是`<html>`元素的子元素或後代元素。

→ 也就是說，通過 `document.documentElement` 可以存取和修改根元素的樣式。

### setProperty()

> The **`setProperty()`**  sets a new or modifies an existing CSS property in a CSS declaration block. (w3school)

- setProperty()可設定 CSS 新的值或是變更既有的值

syntax:

```javascript
setProperty(propertyName, value);
setProperty(propertyName, value, priority);
```

- value 和 priority 的值為 optional，若 value 無指定則為空字串（empty string)
- priority 可設“important”, "undefined", ""

### forEach()

> The `forEach()` method calls a function for each element in an array.
> The `forEach()` method is not executed for empty elements. (w3school)

- 針對 array 當中的 element 呼叫 function
- 空的 elements 不會執行 forEach

syntax:

```javascript
array.forEach(function(currentValue, index, arr), thisValue)
```

### node list

#### node

#### node list vs array

## 其他補充

### querySelectorAll()的選取的寫法

先前學到的是單純選取 class 的方法，這次練習中出現的寫法：

```javascript
const inputs = document.querySelectorAll(".controls input");
```

→ 選取 HTML 文件中具有`controls`　 class 的所有`input`元素。

- 其他選取寫法參考：
  [Obtaining a list of Matches](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#obtaining_a_list_of_matches)

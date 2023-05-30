# Day 6 Ajax Type Ahead with fetch()

## 理解問題

從指定的 API 獲取城市資料，然後根據使用者輸入的搜尋詞對城市資料進行篩選，最後在網頁上顯示符合搜尋詞的城市列表。

## 研究課題

### fetch()

fetch()用於發送網路請求的內建函式

```javascript
const prom = fetch(endpoint);

console.log(prom);
```

![](https://i.imgur.com/jnQhpSp.png)
console.log 的結果是 promise

#### Promise

Promise 是 JavaScript 中的一個異步處理概念，用於處理非同步操作和回調函式的結果。
當我們處理一些需要花費時間的操作（例如發送網路請求、讀取檔案、執行資料庫查詢等）時，這些操作不會立即返回結果，而是需要等待一段時間。在傳統的回調函式模式下，我們通常會提供一個回調函式，當操作完成時，系統會自動呼叫該函式並將結果作為參數傳遞給它。

> A **`Promise`** is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a *promise* to supply the value at some point in the future. (MDN)

**Promise 的三種狀態**

- _pending_: initial state, neither fulfilled nor rejected.
- _fulfilled_: meaning that the operation was completed successfully.
- _rejected_: meaning that the operation failed.

##### 以外送過程來理解

```javascript
const orderFood = new Promise((resolve, reject) => {
  // 處理訂購外賣的過程
  const isAccepted = true; // 假設外賣店接受了訂單

  if (isAccepted) {
    resolve("訂單已確認並正在處理");
  } else {
    reject("訂單無法完成");
  }
});

orderFood
  .then((message) => {
    console.log(message); // 在控制台上輸出「訂單已確認並正在處理」
    // 在這裡可以做其他處理，例如等待外賣送達
  })
  .catch((error) => {
    console.error(error); // 在控制台上輸出「訂單無法完成」
    // 在這裡可以處理訂單無法完成的情況
  });
```

這個例子中，`orderFood` 是一個 Promise，代表訂購外賣的過程。根據外賣店是否接受訂單，Promise 可以進入不同的狀態。

使用 `.then()` 方法可以處理 Promise「已解決」（resolve）狀態的情況，而使用 `.catch()` 方法可以處理 Promise「已拒絕」（reject）狀態的情況。

##### then()

then()的機制：

1. 當 Promise 進入「履行」狀態時，`.then()` 方法會被觸發，並將 Promise 的回應值作為參數傳遞給它。
2. 你可以在 `.then()` 方法中定義一段處理回應值的程式碼，例如對資料進行處理、顯示在網頁上或進行後續的操作。
3. `.then()` 方法本身也返回一個 Promise 物件，這使得你可以串連多個 `.then()` 方法來處理多個非同步操作。
4. 在串連多個 `.then()` 方法時，後續的 `.then()` 方法可以使用前一個 `.then()` 方法返回的值作為參數，形成一個連貫的流程。

### RegExp

#### 正規表達式常用的操作

1. 文字匹配：使用正則表達式來搜尋字串中是否包含特定的文字模式。
2. 替換文字：使用正則表達式來尋找字串中符合特定模式的文字，並將其替換為新的文字。
3. 提取文字：使用正則表達式尋找字串中符合特定模式的文字，並提取出來。
4. 驗證輸入：使用正則表達式來驗證使用者輸入是否符合特定的格式要求。

#### 文字匹配的範例

```javascript
const text = "Hello, World!";

// 檢查字串中是否包含 "Hello" 字串
const pattern = new RegExp("Hello");
const result = pattern.test(text);
console.log(result); // 輸出: true

// 檢查字串是否以 "W" 開頭
const pattern2 = new RegExp("^W");
const result2 = pattern2.test(text);
console.log(result2); // 輸出: false

// 檢查字串是否以 "!" 結尾
const pattern3 = new RegExp("!$");
const result3 = pattern3.test(text);
console.log(result3); // 輸出: true
```

### join()

`join('')` 是一個陣列方法，用於將陣列的元素連接成一個字串。

#### 範例

```javascript
const array = ["Hello", "World", "!"];
const joinedString = array.join("");
console.log(joinedString);
```

### replace()

> The **`replace()`** method returns a new string with one, some, or all matches of a `pattern` replaced by a `replacement`. The `pattern` can be a string or a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp), and the `replacement` can be a string or a function called for each match. If `pattern` is a string, only the first occurrence will be replaced. The original string is left unchanged. (MDN)

- syntax:

```javascript
replace(pattern, replacement);
```

- pattern 可以是 string 或是 object
- replacement 可以是 string 或 function

#### 使用正規表達式的例子

```javascript
const text = "I love bananas and apples.";
const replacedText = text.replace(/bananas|apples/gi, "fruits");
console.log(replacedText); //I love fruits and fruits.
```

#### 使用字串進行文字替換的例子

```javascript
const text = "I have a red car.";
const replacedText = text.replace("red", "blue");
console.log(replacedText); //I have a blue car.
```

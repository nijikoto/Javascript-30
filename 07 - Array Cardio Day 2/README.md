# Day 7 Array Cardio Day 2

## 理解問題

- 針對指定的資料（array) 進行資料篩選(部分、每項)、單筆資料尋找、刪除指定資料的操作

## 研究課題

### Array.prototype.some()

#### 範例

```javascript
const numbers = [1, 2, 3, 4, 5];

const hasEvenNumber = numbers.some((number) => {
  return number % 2 === 0; //檢查每個數字除以2的餘數是否等於0。
});

console.log(hasEvenNumber); // 輸出: true（因為至少有一個元素是偶數）
```

### Array.prototype.every()

#### 範例

```javascript
const numbers = [2, 4, 6, 8, 10];

const allEvenNumbers = numbers.every((number) => {
  return number % 2 === 0; //檢查每個數字除以2的餘數是否等於0。
});

console.log(allEvenNumbers); // 輸出: true（因為所有元素都是偶數）
```

### IIFE Immediately Invoked Function Expression

1. The first is the anonymous function with lexical scope enclosed within the [`Grouping Operator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping) `()`. This prevents accessing variables within the IIFE idiom as well as polluting the global scope. (MDN)
2. The second part creates the immediately invoked function expression `()` through which the JavaScript engine will directly interpret the function. (MDN)

- IIFE 包含 2 個部分：
  - （1) 匿名函式：這可以預防全域污染
  - （2) function expression (表達式)

#### 預防全域污染的範例

```javascript
(function () {
  // 在這個 IIFE 內部聲明變數
  var message = "Hello, World!";

  // 在 IIFE 內部定義函式
  function showMessage() {
    console.log(message);
  }

  // 在 IIFE 內部調用函式
  showMessage();
})();

// 在全域範疇外部，無法訪問 IIFE 內部的變數和函式
console.log(message); // 會拋出錯誤，因為 message 在全域範疇外部不可見
showMessage(); // 會拋出錯誤，因為 showMessage 在全域範疇外部不可見
```

### Array.prototype.find()

`Array.prototype.find()` 方法會遍歷陣列中的每個元素，並將每個元素傳遞給回呼函式進行檢查。當回呼函式返回 `true` 時，找到的第一個符合條件的元素將被返回。如果沒有找到符合條件的元素，則 `find()` 方法將返回 `undefined`。

#### find()和 filter()的差異

1. 目的：

   - `find()`：用於尋找並返回符合特定條件的第一個元素。
   - `filter()`：用於過濾並返回符合特定條件的所有元素，並以一個新的陣列形式返回。

2. 返回值：

   - `find()`：返回符合條件的第一個元素，如果沒有找到則返回 `undefined`。
   - `filter()`：返回一個包含符合條件的所有元素的新陣列，如果沒有找到符合條件的元素，則返回一個空陣列。

3. 使用場景：

   - `find()`：適合在陣列中尋找一個特定的元素，例如找到符合特定條件的第一個元素。
   - `filter()`：適合在陣列中過濾並取得符合特定條件的多個元素，例如找到所有符合特定條件的元素。

```javascript
const numbers = [1, 2, 3, 4, 5];

const firstEvenNumber = numbers.find((number) => number % 2 === 0);
console.log(firstEvenNumber); // 輸出: 2

const evenNumbers = numbers.filter((number) => number % 2 === 0);
console.log(evenNumbers); // 輸出: [2, 4]
```

### Array.prototype.findIndex()

`findIndex()` 方法會從陣列的開頭開始遍歷，對每個元素應用回呼函式，直到找到符合條件的元素。如果找到符合條件的元素，則返回其索引值。如果沒有找到符合條件的元素，則返回 -1。

#### findIndex() 和 find()的差異

1. 返回值：

   - `find()`：返回找到的符合條件的元素本身。如果沒有找到符合條件的元素，則返回 `undefined`。
   - `findIndex()`：返回找到的符合條件的元素在陣列中的索引位置。如果沒有找到符合條件的元素，則返回 -1。

2. 使用情境：

   - `find()`：需要找到符合條件的元素本身時，可以使用 `find()` 方法。例如，找到第一個大於 3 的數字元素。
   - `findIndex()`：需要找到符合條件的元素的索引位置時，可以使用 `findIndex()` 方法。例如，找到第一個大於 3 的數字元素的索引。

3. 回呼函式：

   - `find()`：回呼函式應該返回一個布林值，用於判斷元素是否符合條件。如果回呼函式返回 `true`，則 `find()` 會返回該元素本身。
   - `findIndex()`：回呼函式應該返回一個布林值，用於判斷元素是否符合條件。如果回呼函式返回 `true`，則 `findIndex()` 會返回該元素的索引。

### slice()

> The **`slice()`** method returns a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) of a portion of an array into a new array object selected from `start` to `end` (`end` not included) where `start` and `end` represent the index of items in that array. The original array will not be modified. (MDN)

`splice()` 是 JavaScript 陣列的一個方法，用於修改陣列，包括刪除、插入和替換元素。它可以修改原始陣列並返回被刪除的元素（如果有的話）。

- syntax:

```javascript
slice();
slice(start);
slice(start, end);
```

- 應用方法：
- 刪除元素：在 `start` 索引位置開始，刪除 `deleteCount` 個元素。
- 插入元素：在 `start` 索引位置開始，插入 `item1, item2, ...` 元素到陣列中。
- 替換元素：在 `start` 索引位置開始，刪除 `deleteCount` 個元素，並插入 `item1, item2, ...` 元素到陣列中。

#### 範例

```javascript
const fruits = ["apple", "banana", "cherry", "date"];

// 刪除元素
const deletedElements = fruits.splice(1, 2);
console.log(fruits); // 輸出: ['apple', 'date']
console.log(deletedElements); // 輸出: ['banana', 'cherry']

// 插入元素
fruits.splice(1, 0, "blueberry", "kiwi");
console.log(fruits); // 輸出: ['apple', 'blueberry', 'kiwi', 'banana', 'cherry', 'date']

// 替換元素
fruits.splice(2, 1, "grape");
console.log(fruits); // 輸出: ['apple', 'blueberry', 'grape', 'date']
```

## 其他學到的東西

### console.log 使用花括號

- console log 裏面使用花誇號會得到

```javascript
console.log({ isAdult });
```

![](https://i.imgur.com/ti86F0y.png)

- 顯示出 variable 的名稱

### (new Date()) 的括號

為了確保 `new Date()` 被當作一個表達式進行評估

```javascript
console.log(new Date().getFullYear()); // 沒有括號，直接呼叫 getFullYear()
console.log(new Date().getFullYear()); // 使用括號明確區分建構子和方法的呼叫
```

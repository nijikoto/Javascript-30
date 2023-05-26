# Day 4 Array Cardio Practice 學習筆記

## 理解問題

- 針對指定的資料（Array）進行篩選、排序、加總等操作

## 研究課題

### Array.prototype.filter()

`Array.prototype.filter()` 是 JavaScript 內建的方法，它可以讓你根據特定條件過濾原始陣列並建立一個新的陣列。它接受一個回呼函式（callback function）作為參數，該函式將對原始陣列中的每個元素進行執行。

> The `filter()` method is an [iterative method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods). It calls a provided `callbackFn` function once for each element in an array, and constructs a new array of all the values for which `callbackFn` returns a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value. Array elements which do not pass the `callbackFn` test are not included in the new array. (MDN)

- syntax:

```javascript
const newArray = array.filter(callback(element, index, array));
```

#### 使用時機

1.  過濾元素：當你需要根據特定條件從陣列中選取符合條件的元素時，可以使用 `filter()` 方法。例如，從一組數字中選取所有大於 10 的元素或選取所有包含特定關鍵字的字串。
2.  篩選資料：當你從資料集合中篩選資料時，可以使用 `filter()` 方法。這對於資料檢索和篩選非常有用，例如從使用者列表中篩選出特定條件下的使用者、篩選出某個時間範圍內的交易等。
3.  移除不需要的元素：如果想要從陣列中移除某些元素，可以使用 `filter()` 方法。這可以根據特定條件將不需要的元素過濾掉，只保留需要的元素。例如，從產品清單中移除已售完的產品或從任務列表中移除已完成的任務。
4.  篩選唯一值：如果你有一個陣列並希望刪除重複的元素，可以使用 `filter()` 方法進行篩選。透過在條件函式中適當比較元素，只保留唯一的元素，並剔除重複的值。
5.  過濾錯誤或無效的資料：當從資料集合中清理錯誤或無效的資料時，可以使用 `filter()` 方法。排除不正確的數值、缺失的數據或無效的輸入。

##### 其他補充 callback function

- **把函式當作另一個函式的參數，透過另一個函式來呼叫它**
  [什麼是 Callback 函式 (Callback function)](https://medium.com/appxtech/%E4%BB%80%E9%BA%BC%E6%98%AFcallback%E5%87%BD%E5%BC%8F-callback-function-3a0a972d5f82)
- 為了解決當一遇到函式需要等待，但其他函式又與該等待的函式有關連時，就會使用 CallBack Function 的時機點來處理。
- call back function 的優勢：
  - 確保程式時機與關連
  - 便於維護
- 缺點：回呼地獄

### Array.prototype.map()

> he **`map()`** method **creates a new array** populated with the results of calling a provided function on every element in the calling array.

- syntax:

```javascript
const newArray = array.map(callback(element, index, array));
```

#### 使用時機

1.  轉換/映射元素：對一個陣列中的每個元素進行特定操作或轉換時，可以使用 `map()` 方法。例如，你可能需要將一個字串陣列中的每個字串轉換為大寫，或者將一個數字陣列中的每個數字加上特定的偏移量。
2.  創建新陣列：當你需要基於現有陣列創建一個新的陣列，其中每個元素都是根據原始陣列的對應元素進行計算或轉換的結果時，可以使用 `map()` 方法。這對於在不修改原始陣列的情況下生成新的陣列很有用。
3.  彙總數據：當你需要對陣列中的元素進行彙總操作，例如計算總和、平均值、最大值、最小值等時，`map()` 方法可以用於在計算過程中生成相關的數據。結合其他方法（例如 `reduce()`）可以實現更複雜的彙總操作。
4.  格式轉換：當你需要將一種數據格式轉換為另一種數據格式時，可以使用 `map()` 方法。例如，你可以將一個包含對象的陣列轉換為僅包含對象某個屬性的陣列，或者將一個日期字串的陣列轉換為對應的 `Date` 對象陣列。

### Array.prototype.sort()

> The **`sort()`** method sorts the elements of an array *[in place](https://en.wikipedia.org/wiki/In-place_algorithm)* and returns the reference to the same array, now sorted. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values. (MDN)

> The `sort()` sorts the elements of an array.
> The `sort()` overwrites the original array.
> The `sort()` sorts the elements as strings in alphabetical and ascending order. (w3school)

`sort()` 會複寫到原始的 array，預設是依照字母排序，以及按照往上加的的順序
若要不變動到原始的陣列可使用[`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)

- syntax

```javascript
items.sort((a, b) => a.value - b.value);
```

#### 使用時機

1.  排序陣列：最常見的用途是對陣列進行排序。使用 `sort()` 方法可以按照特定的排序規則重新排列陣列元素，使它們按照遞增或遞減的順序排列。
2.  自定義排序：預設情況下，`sort()` 方法將元素視為字符串並按照 Unicode 編碼進行排序。然而，你也可以通過提供自定義的排序函式來定義自己的排序邏輯。這允許你根據自己的需求對陣列進行更複雜的排序，例如根據對象的特定屬性進行排序或按照特定的比較條件進行排序。
3.  原地排序：`sort()` 方法直接修改原始陣列，而不是返回一個新的排序後的陣列。這在需要就地排序並且不需要保留原始順序的情況下很有用。
4.  排序對象陣列：當處理包含多個對象的陣列時，你可以使用 `sort()` 方法根據對象的屬性對陣列進行排序。這對於按照特定屬性的值對對象進行排序或按照多個屬性進行優先級排序。

#### 參考資料

1. [JS 將陣列 Array 重新排列的 sort()](https://ithelp.ithome.com.tw/articles/10225733)
2. [淺談 JS sort() 到背後排序方法](https://medium.com/@leokao0726/%E6%B7%BA%E8%AB%87-js-sort-%E5%88%B0%E8%83%8C%E5%BE%8C%E6%8E%92%E5%BA%8F%E6%96%B9%E6%B3%95-1035f5b8cde8)
3. [關於 Array.prototype.sort() 排序這件不小的小事](https://israynotarray.com/javascript/20190426/1966510488/)

###

> The **`reduce()`** method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value. (MDN)

- 用於對陣列中的每個元素進行迭代，並將它們結合為單一值。
- syntax:

```javascript
array.reduce(function(accumulator , currentValue, currentIndex, arr),initialValue)
```

#### 使用時機

1. 計算總和或平均值：你可以使用 `reduce()` 將陣列中的元素相加，得到總和或平均值。例如，計算數值陣列的總和
2. 陣列轉換：可以使用 `reduce()` 將一個陣列轉換成另一種形式的資料結構。例如，將字串陣列轉換成物件
3. 找出最大值或最小值：使用 `reduce()` 可以輕鬆尋找陣列中的最大值或最小值。
4. 統計資料：可以使用 `reduce()` 來統計陣列中符合特定條件的元素數量。

#### 參考資料

1. [Array.prototype reduce](https://hackmd.io/@OKEQYcL7Sb-ViQH80sgQNA/HkN8vYSLt)

### String.prototype.split()

> The **`split()`** method takes a pattern and divides a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array. (MDN)

`.split()` 是 JavaScript 字串的方法之一，用於將一個字串拆分為子字串陣列。它基於指定的分隔符將原始字串分割成多個子字串，並返回這些子字串組成的陣列。

範例：

```javascript
const str = "Hello,World,How,Are,You";
const arr = str.split(","); // 使用逗號作為分隔符

console.log(arr);
// 輸出：["Hello", "World", "How", "Are", "You"]
```

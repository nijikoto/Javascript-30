# Day 12 JavaScript KONAMI CODE

## 理解問題

- 當使用者鍵入指定的 key，讓特定事件發生

## 拆解問題

- 儲存使用者鍵入的內容
- 如何檢查使用者的鍵入資訊

## 研究課題

### Array.prototype.splice()

> The **`splice()`** method changes the contents of an array by removing or replacing existing elements and/or adding new elements [in place](https://en.wikipedia.org/wiki/In-place_algorithm) (MDN)

> The `splice()` method is a [mutating method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods). It may change the content of `this`. If the specified number of elements to insert differs from the number of elements being removed, the array's `length` will be changed as well. At the same time, it uses [`@@species`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@species) to create a new array instance to be returned. (MDN)

- splice 的 method 是 mutable，會改變原本的 array

### Array.prototype.join()

> The **`join()`** method creates and returns a new string by concatenating all of the elements in an array (or an [array-like object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator. (MDN)

- 回傳新的 string，串起所有的元素。若 array 只有一個項目，將在不使用不使用分隔符的狀態下回傳

### Array.prototype.shift()

> **`shift()`**  方法會移除並回傳陣列的**第一個**元素。此方法會改變陣列的長度。

## 操作步驟

1. 建立一個變數用來儲存使用者鍵入的按鍵
2. 設定 secretCode 的內容
3. 建立視窗監聽器，監聽手指離開鍵盤的動作
4. 印出鍵入的按鍵
5. 將鍵入的按鍵傳入步驟 1 建立好的變數
6. 利用 splice()檢查使用者鍵入的內容的長度，若鍵入內容符合長度 secretCode 的內容長度，則變數不會被刪除，若長度不符合只有留下與`secretCode`相同數量的元素。。（這邊用來處理若使用者鍵入過長的內容，但含有 secretCode 的情境）
7. 也可以使用 if 判斷式來檢查使用者輸入的長度是否多出了一個元素，若超出則使用`shift()`方法刪除`pressed`陣列中的第一個元素，以使其長度與`secretCode`相同。
8. 建立 if 判斷式，先使用 join('')使`pressed` 陣列的所有元素連接成一個字串。再來檢查串成的字串是否含有 secretCode 的內容。若有則印出叮叮，並呼叫`cornify_add()`函式，讓彩虹小馬出現。

## 其他學到的東西

- 若要確認程式碼的內容有什麼功用，可由 console.log 在程式碼執行前、執行後印出，比對前後的差異，去回推程式碼的意義。

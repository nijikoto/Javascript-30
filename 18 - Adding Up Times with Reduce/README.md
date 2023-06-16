# Day 18 How JavaScript's Array Reduce Works

## 理解問題

- 加總所有的影片時間，並以「小時、分鐘、秒數」顯示

## 研究課題

### Array.from

> **`Array.from()`**  方法會從類陣列（array-like）或是可迭代（iterable）物件建立一個新的  `Array`  實體。(MDN)

### Array.prototype.reduce()

- syntax

```javascript
Array.reduce(
  callback[(accumulator, currentValue, currentIndex, array)],
  initialValue
);
```

#### reduce 的運作

- 沒有 initial value 的情況

```js
const arr = [1, 2, 3, 4, 5];
const reduceArr = arr.reduce((accumulator, currentValue) => {
  console.log(accumulator); // 1, 3, 6, 10
  console.log(currentValue); // 2, 3, 4, 5
  return accumulator + currentValue;
});
```

- 有 initial value 的情況

```javascript
const arr = [1, 2, 3, 4, 5];
const reduceArr = arr.reduce((accumulator, currentValue) => {
  console.log(accumulator); // 5, 6, 8, 11, 15
  console.log(currentValue); // 1, 2, 3, 4, 5
  return accumulator + currentValue;
}, 5);
```

### math.floor

- Math.floor()：無條件捨去，回傳大於所給數字的最小整數

#### 補充

- Math.ceil()：無條件進位，回傳小於等於所給數字的最大整數
- Math.round()：四捨五入

### 餘數運算子（%）

> The remainder operator (`%`) returns the remainder left over when one operand is divided by a second operand. It always takes the sign of the dividend. (MDN)

- 返回所剩餘的數值。

### ![](https://i.imgur.com/PEkHsQJ.png)

## 操作筆記

### steps

1. 選取所有[data-type]的項目
2. turn node list into array

### nodelist 轉換成 array

```javascript
const timeNodes = document.querySelectorAll("[data-time]");

console.log(timeNodes);
```

→ console.log 的結果會是 nodelist ，不是 array，這時可以使用 spread operator 或用 Array.from 來改寫。

- Array.from()

```javascript
const timeNodes = Array.from(document.querySelectorAll("[data-time]"));
```

- spread operator

```javascript
const timeNodes = [...document.querySelectorAll("[data-time]")];
```

### 更新秒數：使用％來處理剩餘

透過％更新剩餘秒數，做後續的計算

```javascript
const hours = Math.floor(secondsLeft / 3600);

secondsLeft = secondsLeft % 3600; //更新剩餘秒數

const minutes = Math.floor(secondsLeft / 60);

secondsLeft = secondsLeft % 60; //更新剩餘秒數
```

## 參考資料

1. [認識 parseInt、parseFloat 與 Number 轉換成數字的三種方法](https://medium.com/unalai/%E8%AA%8D%E8%AD%98-parseint-parsefloat-%E8%88%87-number-%E8%BD%89%E6%8F%9B%E6%88%90%E6%95%B8%E5%AD%97%E7%9A%84%E4%B8%89%E7%A8%AE%E6%96%B9%E6%B3%95-276640aedb4e)
2. [JavaScript reduce 在做什麼？](https://w3c.hexschool.com/blog/a2cb755f)
3. [Javascript 浮點數](https://hackmd.io/@Heidi-Liu/javascript-floating-number)

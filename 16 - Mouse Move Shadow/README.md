# Day 16 Mouse Move Shadow

## 理解問題

- 使用者滑動游標時顯示出彩色陰影

## 拆解問題

- 使用者滑動
- 陰影
- 滑動的範圍

## 研究課題

### offsetXY

- 容器內的座標
  `offsetXY`：表示元素相對於其父元素（具有目標對象的意思）的偏移座標的屬性。它包含兩個值，`offsetX` 和 `offsetY`，分別表示元素相對於父元素左上角的水平和垂直偏移量。

#### 和 offsetTop, offsetLeft 的區別

1. `offsetXY`：
   - `offsetXY` 是一個表示元素在其父元素內偏移座標的屬性。
   - 它包含兩個值，`offsetX` 和 `offsetY`，分別表示元素相對於父元素左上角的水平和垂直偏移量。
   - `offsetX` 是元素相對於父元素的水平偏移量，`offsetY` 是元素相對於父元素的垂直偏移量。
   - `offsetXY` 不考慮滾動條和邊框等因素的影響，僅計算元素在父元素內的位置。
2. `offsetTop` 和 `offsetLeft`：
   - `offsetTop` 和 `offsetLeft` 用於獲取元素相對於其最近的定位（positioned）祖先元素的垂直和水平偏移量。
   - `offsetTop` 是元素相對於其定位祖先元素（例如，帶有定位屬性的父元素）的垂直偏移量。
   - `offsetLeft` 是元素相對於其定位祖先元素的水平偏移量。
   - `offsetTop` 和 `offsetLeft` 考慮滾動條的位置和邊框的影響。

### Math.floor

> The **`Math.floor()`** static method always rounds down and returns the largest integer less than or equal to a given number. (MDN)

→ Math.floor() 能做無條件捨去

#### 補充：Math.round()

> **`Math.round()`**  函數回傳四捨五入後的近似值. (MDN)

## 其他操作筆記

### offsetXY 的三種作法

```javascript
//第一種：個別宣告event的offsetX, offsetY

let x = e.offsetX;

let y = e.offsetY;

//第二種：將e的offsetX, offsetY 拆出來

let { offsetX, offsetY } = e;

//第三種：將e的offsetXY 拆出來之後命名為x, y

let { offsetX: x, offsetY: y } = e;
```

- 三種結果一樣

### 雙方向的百分比

- 因為陰影要往雙方向跑所以必須要做-1~1 的百分比
- 操作方法：\*2 - 1

例如：

- 將 0.5（50%）套用公式：0.5 \* 2 - 1 = 0，得到的結果是 0。
- 將 0（0%）套用公式：0 \* 2 - 1 = -1，得到的結果是 -1。
- 將 1（100%）套用公式：1 \* 2 - 1 = 1，得到的結果是 1。

### e.target 和 this 的值

```javascript
function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;

  let { offsetX: x, offsetY: y } = e;

  console.log(this, e.target);
}
```

- `this`為 hero div，但`e.target`則會因為 hover 的地方不同而有所變化。
  ![](https://i.imgur.com/rSsIvfp.png)

### 感想

數學好難。

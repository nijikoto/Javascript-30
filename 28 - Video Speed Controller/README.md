# Day 28 Build a Experimental Video Speed Controller UI

## 理解問題

- 製作可透過滑鼠移動來控制影片播放速率的控制器

## 研究課題

### toFixed()

> The **`toFixed()`** method formats a number using fixed-point notation. (MDN)

→ 於將數字的小數位數四捨五入到指定的位數。

```javascript
const number = 3.14159;
const roundedNumber = number.toFixed(2);

console.log(roundedNumber); // 輸出：3.14
```

- `toFixed()` 的返回值是一個字串，而不是一個數字。因此，在進行數學計算或其他需要數字類型的操作之前，可能需要將返回的字串轉換為數字。

## 操作筆記

### 再次釐清 pageXY, offsetTop

```javascript
speed.addEventListener("click", function (e) {
  console.log(this.offsetTop);

  console.log(e.pageY);

  const y = e.pageY - this.offsetTop;

  console.log(y);
});
```

![](https://i.imgur.com/UznvNoA.png)

紅色：代表滑鼠點擊處
藍色：代表`e.pageY`的值
黃色：代表`this.offsetTop`的值
橘色：代表 y 的值，也就是藍色的值減去黃色的值

### playback rate 的計算

```javascript
const playbackRate = percent * (max - min) + min;
```

使用播放速率範圍的差值（即最大值減去最小值）來表示播放速率的範圍的大小。然後，將這個差值乘以滑鼠位置的百分比值，可以得到在播放速率範圍內對應的一個相對值。最後，再加上最小值，就可以將這個相對值映射到播放速率的實際範圍內。

例如，假設滑鼠游標在 0 的位置
計算則會如下：
playbackRate = 0% \*(4-0.4) +0.4 =0.4

再來，假設滑鼠游標位置在全滿的狀態，也就是 100 的位置
計算則會如下：
playbackRate = 100% \*(4-0.4) +0.4 =4

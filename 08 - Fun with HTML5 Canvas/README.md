# Day 8 Let's build something fun with HTML5 canvas

## 理解問題

- 製作一 canvas 畫布讓使用者能透過點擊作畫，並作出顏色漸變、寬度遞增等特效。

## 研究課題

### canvas.getContext

- 指定所需的渲染上下文的類型。
- 常見的參數：

1. `'2d'`: 取得 2D 渲染上下文。這是最常用的選項，用於進行基本的 2D 繪圖操作。
2. `'webgl'`: 取得 WebGL 渲染上下文。WebGL 是一個用於在瀏覽器中進行高性能 3D 渲染的技術。它使用 OpenGL ES API。
3. `'webgl2'`: 取得 WebGL 2 渲染上下文。WebGL 2 是 WebGL 的最新版本，它提供了更多的功能和改進。
4. `'bitmaprenderer'`: 取得 BitmapRenderer 渲染上下文。BitmapRenderer 用於將位圖（Bitmap）渲染到 Canvas 上，通常用於視頻和遊戲渲染。
5. `'webaudio'`: 取得 Web Audio 渲染上下文。Web Audio API 用於處理和控制聲音和音頻。

#### CanvasRenderingContext2D 的 object 內部

![](https://i.imgur.com/uMly7lg.png)
console.log ctx 的結果，內部是 CanvasRenderingContext2D 的 global value，以及 drawing method

### CanvasRenderingContext2D（2D 渲染上下文）物件的屬性

#### 出現在練習中的屬性

1. `globalCompositeOperation` 屬性：

   - 這個屬性用於設定在繪製重疊形狀時的組合方式。
   - 通過更改這個屬性的值，可以創造出各種不同的混合效果，例如透明度、顏色混合等。
   - 可用的值包括 `"source-over"`（默認值）、`"source-in"`、`"source-out"`、`"source-atop"`、`"destination-over"`、`"destination-in"`、`"destination-out"`、`"destination-atop"`、`"lighter"`、`"copy"`、`"xor"` 等。
   - 每個值都代表了不同的混合方式，可以產生不同的視覺效果。

2. `lineCap` 屬性：

   - 這個屬性用於設定線條端點的樣式。
   - 可用的值包括 `"butt"`（默認值）、`"round"` 和 `"square"`。
   - `"butt"` 樣式表示線條的端點為平直的。
   - `"round"` 樣式表示線條的端點為圓形。
   - `"square"` 樣式表示線條的端點為方形，並在線的終點處添加一個與線條粗細相同的方形區域。

3. `lineJoin` 屬性：

   - 這個屬性用於設定線條相交處的樣式。
   - 可用的值包括 `"round"`、`"bevel"` 和 `"miter"`（默認值）。
   - `"round"` 樣式表示線條的相交處為圓角。
   - `"bevel"` 樣式表示線條的相交處為斜角。
   - `"miter"` 樣式表示線條的相交處為尖角。

#### 其他補充屬性

- `strokeStyle`: 設定繪圖的筆觸顏色。
- `fillStyle`: 設定繪圖的填充顏色。
- `lineWidth`: 設定繪圖的線條寬度。
- `globalAlpha`: 設定繪圖的全局透明度。
- `textAlign`: 設定文字對齊方式。
- `font`: 設定文字的字型、大小等屬性。

### CanvasRenderingContext2D（2D 渲染上下文）物件的方法

#### 出現在練習中的方法

1. `beginPath()`: `ctx.beginPath()` 方法用於開始一個新的繪圖路徑。它將清除任何先前的子路徑和動作。
2. `moveTo(x, y)`: 將畫筆移動到指定的座標點(x, y)。這個方法設定畫筆的起點，但不會繪製任何東西。
3. `lineTo(x, y)`: 從當前的畫筆位置繪製一條直線到指定的座標點(x, y)。這個方法定義了畫筆的終點，並且在終點處繪製一條直線。
4. `stroke()`: 使用當前設置的樣式和屬性來繪製畫筆軌跡上的線條。這個方法實際上會繪製出線條，將先前定義的路徑應用到畫布上。

#### 其他常見的方法

1. `fill()`: 使用當前設置的樣式和屬性來填充畫筆軌跡所圍成的區域。這個方法將填充整個路徑所形成的區域。
2. `clearRect(x, y, width, height)`: 清除指定矩形區域內的像素。可以用來清除畫布上的內容。
3. `arc(x, y, radius, startAngle, endAngle, anticlockwise)`: 繪製一個圓弧或部分圓形。可以用來繪製圓形、扇形、圓環等。
4. `rect(x, y, width, height)`: 繪製一個矩形。可以用來繪製自定義形狀的矩形。
5. `fillText(text, x, y [, maxWidth])`: 在指定位置繪製填充的文本。可以用來在 Canvas 上繪製文字。
6. `strokeText(text, x, y [, maxWidth])`: 在指定位置繪製描邊的文本。可以用來在 Canvas 上繪製有輪廓的文字。
7. `drawImage(image, x, y [, width, height])`: 在指定位置繪製圖像。可以用來在 Canvas 上繪製圖片。

### 其他補充研究

#### resize 畫布

```javascript
window.addEventListener("resize", function () {
  //resize event listener to prevent stretching

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  ctx.fillStyle = "white";

  ctx.fillRect(10, 10, 50, 50);
});
```

#### 畫圈 arc()

```javascript
// draw a circle

ctx.fillStyle = "blue";

ctx.strokeStyle = "red";

ctx.lineWidth = 15;

ctx.beginPath(); //let javascript know we're starting a new shape

ctx.arc(100, 100, 50, 0, Math.PI * 2); //take x. and y as

ctx.fill(); //fill with color

ctx.stroke();
```

### 參考資料

[# HTML5 Canvas CRASH COURSE for Beginners](https://www.youtube.com/watch?v=Yvz_axxWG4Y&t=951s)

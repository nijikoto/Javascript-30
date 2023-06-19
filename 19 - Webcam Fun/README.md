# Day 19 Unreal Webcam Fun with getUserMedia() and HTML5 Canvas

## 理解問題

- 製作一個具備拍照、拍照音效、濾鏡特效、下載照片功能的 webCam

## 研究課題

### Navigator. mediaDevices

> The **`Navigator.mediaDevices`** read-only property returns a [`MediaDevices`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) object, which provides access to connected media input devices like cameras and microphones, as well as screen sharing. (MDN)

→ Web API 中的一個屬性，提供了訪問媒體設備（如攝像頭、麥克風）的方法。

- 範例

```javascript
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    // 獲取到視訊串流
    // 在需要顯示視訊的元素中設置 `srcObject` 屬性為 `stream`
    videoElement.srcObject = stream;
  })
  .catch((error) => {
    // 發生錯誤，處理錯誤情況
    console.log("Error accessing media devices: ", error);
  });
```

### toDataURL()

> The **`HTMLCanvasElement.toDataURL()`** method returns a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) containing a representation of the image in the format specified by the `type` parameter.(MDN)

→ `toDataURL()` 方法可以將 `<canvas>` 元素的內容轉換為 Data URL 字串

- syntax:

```javascript
const dataURL = canvas.toDataURL(type, encoderOptions);
```

- `type`（可選）：指定要生成的 Data URL 的圖像類型。預設值為 `"image/png"`。其他可能的值包括 `"image/jpeg"` 和 `"image/webp"`。請注意，不是所有瀏覽器都支援所有圖像類型。
- `encoderOptions`（可選）：用於指定圖像壓縮品質或其他編碼器選項的參數。這個參數的具體值取決於 `type` 參數的值以及瀏覽器的支援情況。對於 `"image/jpeg"` 類型，這個參數表示圖像壓縮品質，範圍從 0 到 1。

### CanvasRenderingContext2D: drawImage() method

> The **`CanvasRenderingContext2D.drawImage()`** method of the Canvas 2D API provides different ways to draw an image onto the canvas. (MDN)

→ 可以根據指定的參數在 `<canvas>` 元素上指定要繪製的圖像、繪製的目標位置、目標寬度和高度以及源圖像的剪裁區域。

- syntax:

```javascript
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

- `image`: 要繪製的圖像，可以是 `<img>` 元素、`<canvas>` 元素、`<video>` 元素或 `ImageBitmap` 物件。
- `dx` 和 `dy`: 繪製圖像的目標位置的 x 和 y 座標。這是繪製圖像的起始點。
- `dWidth` 和 `dHeight`: 可選參數，用於指定繪製圖像的目標寬度和高度。如果未指定，圖像將按照其原始寬度和高度繪製。
- `sx` 和 `sy`: 可選參數，用於指定源圖像的剪裁區域的起始位置的 x 和 y 座標。這允許你從源圖像中選擇特定的區域進行繪製。如果未指定，則將使用整個源圖像。
- `sWidth` 和 `sHeight`: 可選參數，用於指定源圖像剪裁區域的寬度和高度。如果未指定，則將使用整個源圖像的寬度和高度。

### CanvasRenderingContext2D: getImageData() method

> The [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) method **`getImageData()`** of the Canvas 2D API returns an [`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object representing the underlying pixel data for a specified portion of the canvas. (MDN)

- syntax:

```javascript
let imageData = ctx.getImageData(x, y, width, height);
```

- `x` 和 `y`: 是要獲取像素數據的起始位置的 x 和 y 座標。在這個程式碼中，起始位置是 `<canvas>` 元素的左上角 (0, 0)。
- `width` 和 `height`: 是要獲取像素數據的區域的寬度和高度。這決定了要獲取的區域的範圍。

### imageData

> The **`ImageData`** interface represents the underlying pixel data of an area of a [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element.

→ 可讀取、修改和操作像素的 RGBA 值。

#### imageData 的屬性

- - `data`: 一個一維 Uint8ClampedArray 陣列，包含了每個像素的 RGBA 值。這個陣列的長度是指定區域的寬度乘以高度乘以 4。每個像素的 RGBA 值佔用四個連續的陣列元素，分別表示紅色（R）、綠色（G）、藍色（B）和透明度（A）的值。
- `width`: 指定區域的寬度。
- `height`: 指定區域的高度。
- `x` 和 `y`: 指定區域的起始位置的 x 和 y 座標。

## 操作筆記

### window.URL.createObjectURL() 已被棄用

- 替代方法：

```javascript
video.srcObject = localMediaStream;
```

### 圖像資料

```javascript
// take the data out of the canvas

const data = canvas.toDataURL("image/jpeg");

console.log(data);
```

![](https://i.imgur.com/0Rqm7M4.png)
→ 圖像資料的 Base64 編碼

- Base64 編碼：
  Base64 是一種將二進制數據轉換為可打印字符的編碼方式。它將二進制數據透過一組 64 個字符（包括字母、數字和特殊符號）表示，這些字符的範圍在 ASCII 字元表中是連續的。

Base64 編碼通常用於在文本協議中傳輸或存儲二進制數據，例如在電子郵件附件、網頁中嵌入圖片或其他二進制資源等情況下。它的主要目的是確保數據可以通過文本協議進行可靠的傳輸，而不會受到特殊字符的干擾或無法識別的字節。

### 製作下載連結

```javascript
const data = canvas.toDataURL("image/jpeg");

const link = document.createElement("a");

link.href = data;

link.setAttribute("download", "handsome");
strip.insertBefore(link, strip.firstChild);
```

- `const link = document.createElement("a");`：創建一個 `<a>` 元素，用於提供下載連結。
- `link.href = data;`：將剛才生成的 Data URL 賦值給 `<a>` 元素的 `href` 屬性，以指定下載連結的目標。
- `link.setAttribute("download", "handsome");`：使用 `setAttribute()` 方法將 `download` 屬性設定為 `"handsome"`，這將指定下載連結的文件名為 "handsome"。
- `link.innerHTML =` <img src="${data}" alt="Handsome Man" />`;`：設定 `<a>` 元素的內容為一個包含生成圖片的 `<img>` 元素，並設定圖片的 `src` 屬性為剛才生成的 Data URL，同時設定圖片的 `alt` 屬性為 "Handsome Man"。
- `strip.insertBefore(link, strip.firstChild);`：將剛才創建的 `<a>` 元素插入到指定的位置（在 `strip` 元素的子元素的開頭），這樣就可以在網頁中顯示該下載連結。

## 參考資料

1. [Base64 編碼是什麼](https://matthung0807.blogspot.com/2022/06/what-is-base64-encode.html)

# Day 21 JavaScript Geolocation based Speedometer and Compass

## 理解問題

- 製作一羅盤顯示物件的資訊，並設定相符的羅盤旋轉角度

## 研究課題

### Geolocation: getCurrentPosition()

> The **`Geolocation.getCurrentPosition()`** method is used to get the current position of the device.

- syntax:

```javascript
getCurrentPosition(success, error);
```

### Geolocation.watchPosition()

> The [`Geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) method **`watchPosition()`** method is used to register a handler function that will be called automatically each time the position of the device changes. You can also, optionally, specify an error handling callback function.(MDN)

- syntax:
  與 getCurrentPostition() 方法一樣

- 偵測移動
- 類似計時器、事件概念
- 不要一次啟用太多個
- 記得一定要設定名稱，以利後續清掉時操作

#### GeoloactionPostiotion 物件

![](https://i.imgur.com/QJiNuf7.png)

- GeolocationPosition 的屬性：

1. `latitude`：表示位置的緯度，以十進制度數表示。
2. `longitude`：表示位置的經度，以十進制度數表示。
3. `altitude`：表示位置的海拔高度，以公尺為單位。該屬性僅在瀏覽器支援並提供高度資訊時才存在。
4. `accuracy`：表示位置座標的準確性，以公尺為單位。它表示座標的精確程度，較小的值表示更高的準確性。
5. `altitudeAccuracy`：表示海拔高度的準確性，以公尺為單位。僅在支援並提供海拔高度資訊時存在。
6. `heading`：表示移動方向，以度數表示，範圍從 0 到 360 度。0 度表示北方，90 度表示東方，180 度表示南方，270 度表示西方。
7. `speed`：表示移動速度，以公尺/秒為單位。

### watchPostion()和 getCurrentPostion()的差異

- getCurrentPostion()只有拿當下那次，而 watchPostio()會持續監聽
- 使用 `watchPosition()` 方法後，如果想停止監聽位置變化，可以使用 `clearWatch()` 方法並傳入 `watchPosition()` 的返回值（watch ID）來停止監聽。相反，`getCurrentPosition()` 方法在獲取位置資訊後就會停止，不需要額外的停止步驟。

### clearWatch()

> The **`Geolocation.clearWatch()`** method is used to unregister location/error monitoring handlers previously installed using [`Geolocation.watchPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition). (MDN)

當使用 `watchPosition()` 方法開始監聽位置變化時，它會返回一個唯一的監聽 ID（watch ID）。可以使用這個 ID 來識別並停止特定的位置監聽。

- syntax:

```javascript
clearWatch(id);
```

- 範例 code:

```javascript
const watchId = navigator.geolocation.watchPosition(
  successCallback,
  errorCallback
);
navigator.geolocation.clearWatch(watchId);
console.log("Watching stopped.");
```

## 操作筆記

1. 取得地理 data
2. update data
3. 設定羅盤的旋轉角度
4. 設定若程式沒有正常運作的 error 訊息

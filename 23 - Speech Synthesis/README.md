# Day 23 JavaScript Text-To-Speech

## 理解問題

- 製作一個文字轉換成語音的小工具，並且具備調整語音速度、語音音高的功能，並可選擇不同的人聲來發聲。

## 研究課題

### speechSynthesisUtterance

> The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.) (MDN)

`SpeechSynthesisUtterance` 是 Web Speech API 中的介面，用於表示語音請求。它包含了要朗讀的內容以及如何朗讀的相關資訊（例如語言、音調和音量）。

要使用 `SpeechSynthesisUtterance`，你可以按照以下步驟進行：

1. 創建 `SpeechSynthesisUtterance` 物件：

```javascript
const msg = new SpeechSynthesisUtterance();
```

2. 設定朗讀的文字內容：

```javascript
msg.text = "Hello, how are you?";
```

3. 可選：設定其他屬性，如語言、音調和音量：

```javascript
msg.lang = "en-US"; // 設定語言為美式英文
msg.pitch = 1.2; // 設定音調為1.2（較高音調）
msg.volume = 0.8; // 設定音量為0.8（80%的音量）
```

4. 呼叫 `speechSynthesis.speak()` 方法開始朗讀：

```javascript
speechSynthesis.speak(msg);
```

這些步驟將創建一個 `SpeechSynthesisUtterance` 物件，設定其內容和相關屬性，然後使用 `speechSynthesis.speak()` 方法來開始朗讀。Web Speech API 將會使用所選擇的語音合成引擎將文字轉換為語音。

![](https://i.imgur.com/CU7RHbR.png)

### speechSynthesis

> The **`SpeechSynthesis`** interface of the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is the controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides. (MDN)

![](https://i.imgur.com/zUaMWPG.png)

#### speechSynthesis.speak()

![](https://i.imgur.com/l4XRsqy.png)

- 能夠發出訊息內文的語音語音

### speechSynthesis vs speechSynthesisUtterace

1. `speechSynthesis`：`speechSynthesis` 是控制器介面，用於控制整個語音合成服務。它提供了檢索可用語音、控制朗讀的操作，例如開始、暫停和取消朗讀等。透過 `speechSynthesis`，你可以獲取語音列表，設定朗讀的速度、音調和音量，以及進行全局的語音合成控制。
2. `SpeechSynthesisUtterance`：`SpeechSynthesisUtterance` 是語音合成的請求介面，用於指定要朗讀的內容和相關設定。它代表一個朗讀請求，可以設定要朗讀的文字內容、語言、音調、音量等屬性。透過 `SpeechSynthesisUtterance`，可以創建多個不同的朗讀請求，並對每個請求進行獨立的設定。

### getVoices()

> The **`getVoices()`** method of the [`SpeechSynthesis`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) interface returns a list of [`SpeechSynthesisVoice`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice) objects representing all the available voices on the current device. (MDN)

`getVoices()` 方法屬於 `SpeechSynthesis` 介面，用於獲取當前設備上所有可用的語音列表，並以 `SpeechSynthesisVoice` 物件的形式返回。

呼叫 `speechSynthesis.getVoices()` 時，它會返回一個陣列，其中包含了當前設備上可用的所有合成語音。每個 `SpeechSynthesisVoice` 物件代表一個語音，其中包含了與該語音相關的屬性和方法。

可以使用以下步驟來使用 `getVoices()` 方法：

1. 在 `voiceschanged` 事件觸發後獲取語音列表：

```javascript
window.speechSynthesis.onvoiceschanged = function () {
  const voices = speechSynthesis.getVoices();
  // 對語音列表進行相應的處理
};
```

要注意的是，`voiceschanged` 事件在當前設備上的可用語音發生更改時觸發。因此，需要在 `onvoiceschanged` 事件處理程序中獲取語音列表，以確保獲取到最新的可用語音。

2. 使用取得的語音列表進行相應的操作，例如列出可用語音的名稱和屬性：

```javascript
voices.forEach(function (voice) {
  console.log("Name: " + voice.name);
  console.log("Lang: " + voice.lang);
  console.log("URI: " + voice.voiceURI);
  // 其他相關屬性和方法
});
```

![](https://i.imgur.com/TRMBZ1c.png)

### find()

> **`find()`**  方法會回傳第一個滿足所提供之測試函式的元素**值**。否則回傳  [`undefined`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

- syntax:

```javascript
arr.find(callback[, thisArg])
```

## 操作筆記

```javascript
function populateVoices() {
  voices = this.getVoices(); //'this is speechSynthesis'

  console.log(voices);
}
```

![](https://i.imgur.com/MctPmUK.png)

![](https://i.imgur.com/TRMBZ1c.png)

### populate function 的內容

```javascript
function populateVoices() {
  voices = this.getVoices(); //'this is speechSynthesis'

  const voiceOptions = voices

    .map(
      (voice) =>
        `<option value ="${voice.name}">${voice.name}(${voice.lang})</option>`
    )

    .join("");

  voicesDropdown.innerHTML = voiceOptions;
}
```

1. `voices = this.getVoices();`: 首先，程式碼嘗試從 `speechSynthesis` 物件中取得語音合成器的可用語音列表。`this` 可能指向 `speechSynthesis` 物件。
2. `const voiceOptions = voices.map(voice =>` <option value ="${voice.name}">${voice.name}(${voice.lang})</option>`).join('');`: 這行程式碼使用 `map` 函式將可用語音列表轉換為一個包含選項元素的字串陣列。對於每個可用語音，都會建立一個選項元素，該元素的值(`value`)屬性設置為語音的名稱，並在顯示內容(`option`)中顯示語音的名稱和語言。
3. `voicesDropdown.innerHTML = voiceOptions;`: 最後，這行程式碼將 `voiceOptions` 的內容設置為具有 `voicesDropdown` ID 的 HTML 元素的 `innerHTML`。這將會將這些選項插入到具有 `voicesDropdown` ID 的 HTML 元素中，以建立一個語音選擇的下拉選單。

- 也可以寫成這樣：

```javascript
function populateVoices() {
  voices = this.getVoices(); //'this is speechSynthesis'
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value ="${voice.name}">${voice.name}(${voice.lang})</option>`
    )
    .join("");
}
```

- after implementing the function the value of the voice is still null
  ![](https://i.imgur.com/Aa4iG9G.png)
- 使用 msg.text 再次呼叫 speechSynthesis.speak()
  ![](https://i.imgur.com/3jALbWK.png)
  → 即可聽到鍵入的訊息語音
- 製作 change voice function
  ![](https://i.imgur.com/yNoR5wp.png)

### toggle function

```javascript
function toggle(startOver = true) {
  speechSynthesis.cancel(); //stop it from speaking

  if (startOver) {
    speechSynthesis.speak(msg); //restart it
  }
}
```

### 在 addEventListener 設定 toggle(false)的二種方法

- 以下的 code 沒有辦法作用的原因

```javascript
stopButton.addEventListener("click", toggle(false));
```

- 解決的二種方法：
  第一種：

```javascript
stopButton.addEventListener("click", () => toggle(false));
```

第二種：

```javascript
stopButton.addEventListener("click", toggle.bind(null, false));
```

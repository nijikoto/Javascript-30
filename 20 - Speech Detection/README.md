# Day 20 JavaScript Speech Recognition

## 理解問題

- 製作一語音辨識筆記 （🤩）

## 研究課題

### SpeechRecognition: interimResults property

> The **`interimResults`** property of the [`SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) interface controls whether interim results should be returned (`true`) or not (`false`.) Interim results are results that are not yet final (e.g. the [`SpeechRecognitionResult.isFinal`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResult/isFinal) property is `false`.) (MDN)

- `interimResult` 屬性控制是否返回中間結果（即部分識別結果）。
- 當設置為 `true` 時，語音識別器在識別的過程中會返回中間結果，而不僅僅是最終結果。

### SpeechRecognition: result event

> The **`result`** event of the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app (MDN)

→ 當語音識別器處理語音輸入並返回結果時觸發的事件。

- `result` 事件的觸發時機：`result` 事件在識別過程中觸發多次，每次觸發都代表識別的部分結果。
- `result` 事件的回傳值：`result` 事件的事件物件 (`event object`) 包含了 `results` 屬性，該屬性是一個 `SpeechRecognitionResultList` 物件，其中包含了識別的結果列表。
- 識別結果的處理：通過迭代 `results` 屬性的每個元素，獲取識別的結果。每個結果都是一個 `SpeechRecognitionResult` 物件，可能包含多個識別的候選項，每個候選項都有一個 `transcript` 屬性，代表識別的文字內容。
- 事件回調函數中的處理：在 `result` 事件的事件回調函數中，可以使用這些結果進行相應的處理，例如顯示識別結果、執行特定的操作或進行文本分析等。

## 操作筆記

### 打開 SpeechRecognitionResultList

![](https://i.imgur.com/IwZyUkk.png)
→ 可由 transcript 看見偵測到的聲音文字
→ isFinal 可以確認是否已經結束句子了
→ transcript 所在的位置為 0 ，因此操作如下：

```javascript
const transcript = Array.from(e.results) //turn into a string

  .map((result) => result[0]) //map over it and take the first thing

  .map((result) => result.transcript) //map over it and take the first thing

  .join("");
```

### 偵測特定詞彙印出指定內容

![](https://i.imgur.com/mgIs9Zj.png)

```javascript
if (transcript.includes("台灣")) {
  console.log("🧋🧋🧋🧋🧋🧋🧋🧋🧋🧋🧋🧋");
}
```

### 多語種

```javascript
recognition.lang = "ja-JP,en-US,zh-CN";
```

- 雖然這樣寫能夠實踐多語種，但還是會以第一個語言為主進行語音辨識。

![](https://i.imgur.com/OdHmxii.png)

## 其他延伸：如果是語音輸入比對的情況

例如：教育部閩南語的語音辨識

### 流程

使用者點擊錄音按鈕後，錄音器開始錄音並在錄音完成後進行語音識別。識別結果根據伺服器回應進行處理，並在界面上顯示相應的狀態訊息。

### 使用 WebAudioRecorder 來錄音的範例

```javascript
// 創建錄音實例
const recorder = new WebAudioRecorder(input, {
  workerDir: "path/to/worker/dir/", // Web Worker 文件所在目錄，必須以斜杠結尾
  encoding: "wav", // 錄音的編碼格式，例如 wav、mp3
  numChannels: 2, // 錄音的聲道數量，2 表示立體聲
});

// 設置錄音完成時的回調函數
recorder.onComplete = function (record, blob) {
  // 在錄音完成後執行的操作，例如上傳錄音文件或進行後續處理
  console.log("錄音完成");
};

// 設置錄音參數
recorder.setOptions({
  timeLimit: 120, // 錄音時長限制（單位：秒）
  encodeAfterRecord: true, // 錄音完成後是否進行編碼
  ogg: { quality: 0.5 }, // Ogg 編碼的參數設置
  mp3: { bitRate: 160 }, // MP3 編碼的參數設置
  wav: { mimeType: "audio/wav" }, // WAV 編碼的參數設置
});
```

```javascript
recorder.startRecording(); // 開始錄音
recorder.finishRecording(); // 停止錄音
```

## 參考資料

1. [教育部閩南語辭典](https://sutian.moe.edu.tw/zh-hant/#header)
2. https://github.com/higuma/web-audio-recorder-js

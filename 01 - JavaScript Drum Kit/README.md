# 實作筆記

## 理解問題 Understanding The Questions

1. Play the sound that is associated with the correspond key
2. Deal with the animation when 'clicking' the button
   - yellow border
   - popup a little bit bigger
   - class 'playing'
   - changing border color and box shadow and transition

## 拆解問題 Analyzing the Questions

` - click add event listener - changing class - changing css

    - If there is anything I should set as a variable for future use
    - If there is any code that I can turn into a function

## 解決問題 Solve the Problems

1. 理解 flow
2. 按下按鈕改變 class 來改編

```
// 監聽鍵盤事件
document.addEventListener("keydown", function (event) {
  // 如果按下的是 'j' 鍵
  if (event.key === "j") {
    // 取得要修改class的元素
    const element = document.getElementById("elementId");
    // 修改class
    element.classList.add("newClass");
  }
});
```

- keycode 轉變為 key 的寫法
- 如何只選擇特定的 data-key 來修改 class

可以使用以下程式碼來實現這個功能：

javascript
Copy code
// 選擇 data-key 為 68 的元素
var element = document.querySelector('[data-key="68"]');

## 新學會的用法

- forEach:
  \*\* 不直接用 addEventlistner 的原因：若有用 jQuery 或類似的東西則沒辦法選到每一個項目

# Day 9 14 Must Know Chrome Dev Tools Tricks

## 1. Attribute modification

若不確定元素被 Javascript 的哪個地方操控，可透過如此來確認
將指定的元素勾選 ‘break on' → 'attribute modification' → 點選該元素 → 在 sources 頁面即可顯示

## 2. %S

可以置換 string 的內容

```javascript
// Regular

console.log("hello");

// Interpolated

console.log("hello I am a %s string!", "interpolated🤳");

// or use this:
console.log(`Hello I am ${variable}`);
```

## 3. %c

可以印出有樣式的內容

```javascript
console.log(
  "%c I am some great text",
  "font-size:50px; background:red; text-shadow: 10px 10px 0 blue"
);
```

![](https://i.imgur.com/uACyJg5.png)

## 4. console.warn()

印出 warning
![](https://i.imgur.com/yY9M4Jr.png)

## 5.console.error()

![](https://i.imgur.com/7ZPqs67.png)

## 6. console.info()

![](https://i.imgur.com/DYyEIAM.png)

## 7. console.assert()

```javascript
console.assert(1 === 2, "You did not select the right Element!");
```

![](https://i.imgur.com/6Gs7L5G.png)

可以藉由 assert 去檢查 true or false

```javascript
console.assert(p.classList.contains("ouch"), "That is wrong!");
```

![](https://i.imgur.com/nSIMdrd.png)

## 8. console.clear()

清除 console log 的結果

## 9. console.dir()

```javascript
console.dir(p);
```

可打開檢視元素內部內容

## 10.console.group() 、console.groupCollapsed()、console.groupEnd()

建立分組

```javascript
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);

  console.log(`This is ${dog.name}`);

  console.log(`${dog.name} is ${dog.age} years old`);

  console.log(`${dog.name} is ${dog.age * 7} dog years old`);

  console.groupEnd(`${dog.name}`);
});
```

![](https://i.imgur.com/z2kJ4pw.png)

## 11. console.count()

![](https://i.imgur.com/yluUtnp.png)
輸出計數器值
此方法能用於對於追蹤特定事件或程式碼區塊的調用次數
透過瞭解程式碼在執行過程中特定部分被呼叫了多少次，以便進行性能分析或調試

## 12. console.time()

可用於用於計時特定程式碼區塊的執行時間

```javascript
console.time("fetching data");

fetch("https://api.github.com/users/wesbos")
  .then((data) => data.json())

  .then((data) => {
    console.timeEnd("fetching data");

    console.log(data);
  });
```

![](https://i.imgur.com/ClBOIbA.png)

測量程式碼區塊的執行時間，對於優化程式碼有幫助

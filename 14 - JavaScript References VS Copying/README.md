# Day 14 Javascript Fundamental - Reference VS Copy

## start with strings, numbers and booleans

- null, undefined, NaN 也都是同情況

### 範例 1

```javascript
let e = true;
let f = e;
e = !f;
console.log(e, f); //false, true
```

### 範例 2

```javascript
let g = "A";

let f = "A";

let i = "A";

h = "B";

i = "C";

g += h;

g += i;

console.log(g, f, i); //ABC, A, C
```

⇨ 值不變，若有變動是「多開出來的」

- call by value
- 若一段時間沒有參照，記憶體會釋放掉

## Let's say we have an array

```javascript
// Let's say we have an array

let players = ["Wes", "Sarah", "Ryan", "Poppy"];

// and we want to make a copy of it.

// You might think we can just do something like this:

let players2 = players;

// however what happens when we update that array?

players2[0] = "alex";

// now here is the problem!

console.log(players, players2); // ['alex', 'Sarah', 'Ryan', 'Poppy']  ['alex', 'Sarah', 'Ryan', 'Poppy']
```

這樣的結果是因爲他們對應到同樣的陣列
🚨 問題是這樣修改到原本的陣列

## 三種方法：使用 slice(), concat(), spread operator

```javascript
let players2 = players.slice(); // 方法1

players2 = [].concat(players); //方法2

players2 = [...players]; //方法3

players2[0] = "alex";

console.log(players, players2);
```

slice()能夠將找出來的東西再做一個陣列

### 另一個例子

```javascript
function createObj(name) {
  return {
    name,
  };
}

let p1 = createObj("alex");

let p2 = createObj("sara");

let p3 = createObj("howard");

let p4 = createObj("thors");

let f1 = [p1, p2, p3, p4];

let f2 = f1.slice();

f2[0].name = "alexander";

console.log(f1[0].name); //alexander
```

- 因為改變的是原始位置的「內容」，所以印出結果會是'alexander'

#### 若是另一種情況

```javascript
f2[0] = { name: "alexander" };

console.log(f1[0].name); //alex
```

- 因為原始位置的「內容」沒有改變，所以印出的是 alex
- 'alexander' 則儲存在新的記憶體裡

## 物件的情況

### case1

```javascript
let person = {
  name: "Wes Bos",

  age: 80,
};

// and think we make a copy:

let p2 = person;

// CASE 1

// person = "XXX"

// console.log(person, p2); //xxx, {}
```

### case2

```javascript
person.name = "XXX"; //case2

console.log(person, p2); //{xxx...}, {xxx...}
```

### 使用 object.assign

```javascript
let a = { name: "alex", age: 36 };

let b = { name: "sara" };

let c = Object.assign(a, b);

console.log(c); //sara, 36
```

- 後蓋前

### 使用 JSON.parse

JSON.parse

> The **`JSON.parse()`** static method parses a JSON string, constructing the JavaScript value or object described by the string. An optional *reviver* function can be provided to perform a transformation on the resulting object before it is returned.

```javascript
const dev2 = JSON.parse(JSON.stringify(wes));
```

#### 更多練習 1:使用 assign

```javascript
const wes = {
  name: "Wes",

  age: 100,

  social: {
    twitter: "@wesbos",

    facebook: "wesbos.developer",
  },
};

let wes2 = Object.assign({}, wes);

//1.
wes2.social = null;
//2.
wes2.social.facebook = null;
```

1. 若 wes2.social = null; 那 wes.social 會是什麼？改了 wes2.social 會不會影響到 wes.social? A: 不會影響
2. 若 wes2.social.facebook = null 那 wes.social 會是什麼？; A:會變影響到

#### 更多練習 2:使用 JSON.parse

```javascript
let wes3 = JSON.parse(JSON.stringify(wes));
```

- `JSON.parse`的情況下指到一般資料（文字、數字、布林、Null、undefined）則不會再開記憶體
- 結果 wes3 並不會影響到 wes

## 深拷貝、淺拷貝

- 淺拷貝:  
   只做淺層的複製, 記憶體的位址還是一樣.
- 深拷貝:  
   深度的複製物件, 原本物件與複製物件記憶體位址不相同, 操作新物件也不會影響原物件
- 若是資料物件，不帶 function，以`JSON.parse`即可做到深拷貝。
- 淺拷貝的方法： { … obj } 、Object.assign({}, obj)
- 深拷貝的方法： JSON.parse(JSON.stringify(obj))、lodash

## 參考資料

[JavaScript - Shallow Copy vs Deep Copy](https://ithelp.ithome.com.tw/articles/10310102)

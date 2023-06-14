# Day 17JavaScript Practice Sorting Band Names without articles

## 理解問題

- 忽略'the' 'a' 'an'，以英文字母順序排序樂團名稱後將其置於 HTML

## 研究課題

### 正規表達式

> Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the [`exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) and [`test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) methods of [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp), and with the [`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match), [`matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll), [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [`replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll), [`search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search), and [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) methods of [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

- 可用於搜索、驗證和替換。

- syntax:

#### 第一種使用 slash 包裹

```javascript
const re = /ab+c/;
```

#### 第二種使用[`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object

```javascript
const re = new RegExp("ab+c");
```

#### 其他示範例子

- `/e+/g` 匹配一個或多個 'e' 字元，例如 "street"。
- `/ea?/g` 中的 'a' 是可選的：搜尋 'e'，但 'a' 是可選的（不論在它之前有什麼）。
- `/re*/g` 匹配零個或多個 'r'，並且如果存在，也匹配 'e'。
- `/.at/g` 匹配任何字元後跟 'at'，除了換行字元。
- `/\./g` 用於匹配句點字元（.），需要使用反斜線進行轉義。
- `/\w/g` 匹配任何字母、數字或底線字元。
- `/\S/g` 匹配任何非空白字元。
- `/\w{4}/g` 匹配任意連續四個或更多的字母、數字或底線字元。
- `/\w{4,5}/g` 匹配介於四個和五個字元之間的字母、數字或底線字元。
- `/[fc]at/g` 匹配以 'f' 或 'c' 開頭且以 'at' 結尾的單詞。
- `/[a-zA-Z]at/g` 匹配所有介於字母 'a' 和字母 'z'（大小寫不限）之間的字元，後跟 'at'。
- `/(t|The){2,3}\./g` 匹配連續出現 2 到 3 次的 "t" 或 "The"，後跟一個句點（.）。
- `/(re){2,3}/g` 匹配連續出現 2 到 3 次的 "re"。
- `/^/` 匹配字串的開始位置。
- `/\.$/g` 匹配以句點（.）結尾的字串。
- `/(?<=t|T)he./g` 正向查找（lookbehind），匹配以 't' 或 'T' 開頭的 'he' 後跟任何字元。
- `/.(?!=at)/g` 負向查找（negative lookahead），匹配任何字元，但不能後跟 'at'
- 可操作正規表達式的網站：[https://regexr.com](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbTZBem9KX2N3X19mbF9OUDY2WGd0TDdFWUNQd3xBQ3Jtc0tsNmE0dFowc0N3UXc4Mk1tUnVzWkp3YWJwTEowSHhWcF9GR0J3Mk84QXk0enQwU016MmFtcnByaGs3YXl1NW1QdkoyeWdtT2tHWURMM09zWS1veFBZMFFKR3JsclZPc0U2R2VGdDkzcFhvdHNwLWlvaw&q=https%3A%2F%2Fregexr.com%2F&v=rhzKDrUiJVk)

### trim()

> **`trim()`**  方法會移除字串起始及結尾處的空白字元。 本文中的空白字元指所有空格字元（如：空格、欄標、無間斷空格等等）及換行字元。 (MDN)

## 操作過程

### step1 : 透過正規表達式排序

#### 正規表達式

- 正規表達式的邏輯：匹配以 "a "、"the " 或 "an " 這三個子字串中的任何一個作為開頭的部分。使用這個正規表達式將以這些詞開頭的字串進行替換或處理。
- 使用 `replace()` 方法將匹配到的冠詞替換成空字串，從而去除了這些冠詞。
- 使用 `trim()` 函式去除可能存在的前後空格，然後返回處理後的結果。

#### 英文字母比大小

- 比較兩個英文字母時，JavaScript 使用它們的 Unicode 編碼值來判斷它們的大小。如果一個字母的編碼值比另一個字母的編碼值小，則該字母被認為是在字母順序上位於另一個字母之前。這就是為什麼 "A" 比 "B" 小，"a" 比 "b" 小的原因

```javascript
const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, "").trim();
}

const sortedBands = bands.sort(function (a, b) {
  if (strip(a) > strip(b)) {
    return 1;
  } else {
    return -1;
  }
});

console.log(sortedBands);
```

![](https://i.imgur.com/RjgH6BQ.png)

### step2 : 轉換成 ternary operator 和 arrow function 的寫法

```javascript
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1));
```

### step3: 將資料生成 HTML 置入 ul 標籤內

```javascript
document.querySelector("#bands").innerHTML = sortedBands

  .map((band) => `<li>${band}</li>`)

  .join("");
```

## 參考資料

1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
2. https://www.youtube.com/watch?v=rhzKDrUiJVk&ab_channel=WebDevSimplified

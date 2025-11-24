# RWD 設計邏輯與斷點策略

## 📱 Tailwind 斷點定義

```
sm:  640px   (手機橫向)
md:  768px   (平板直向)
lg:  1024px  (平板橫向 / 筆電)
xl:  1280px  (桌機)
2xl: 1536px  (大螢幕桌機)
```

## 🎯 本專案採用的斷點策略

基於設計稿分析，我們使用以下斷點：

| 斷點 | 寬度範圍 | 目標裝置 | 主要調整 |
|------|---------|---------|---------|
| **手機** | < 640px | iPhone, Android | 單欄布局、堆疊元素、隱藏裝飾 |
| **sm** | 640px - 768px | 大手機橫向 | 開始允許兩欄卡片 |
| **md** | 768px - 1024px | iPad 直向 | 兩欄 Grid、適中 padding |
| **lg** | 1024px - 1280px | iPad 橫向、小筆電 | 導航顯示、完整布局 |
| **xl** | 1280px+ | 桌機 | 設計稿原始尺寸 |

---

## 🏗️ Section-by-Section RWD 策略

### 1. **Header Navigation**

#### 桌機 (lg+):
```tailwind
<!-- Logo -->
w-[361px] h-[24px]

<!-- Container -->
px-[115px] lg:px-[115px] xl:px-[153px]

<!-- Navigation -->
hidden lg:flex space-x-6 xl:space-x-8
```

#### 平板/手機 (< lg):
```tailwind
<!-- Hamburger Menu -->
lg:hidden flex (顯示漢堡選單)

<!-- Mobile Menu -->
hidden lg:hidden (下拉選單)
```

**核心 RWD Classes:**
- `hidden lg:flex` - 桌機顯示導航，手機隱藏
- `lg:hidden` - 手機顯示漢堡，桌機隱藏
- `px-4 sm:px-8 md:px-16 lg:px-[115px]` - 響應式 padding

---

### 2. **Hero Banner Section**

#### 問題診斷：
- ❌ 固定高度 `h-[880px]` 在手機過高
- ❌ Logo 定位 `right-[219px]` 會超出螢幕

#### 解決方案：

```tailwind
<!-- Container -->
<section class="
  w-full
  h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[880px]
  bg-cover bg-center bg-no-repeat
  relative flex items-center
">

<!-- Logo -->
<div class="
  absolute
  right-4 sm:right-8 md:right-16 lg:right-[219px]
  top-1/2 -translate-y-1/2
  z-10 flex flex-col items-center
  scale-75 sm:scale-90 md:scale-100
">
  <img src="..." class="w-[151px] h-[108px]">
</div>
```

**核心 RWD Classes:**
- `h-[60vh] lg:h-[880px]` - 手機用 viewport height，桌機用固定高度
- `right-4 lg:right-[219px]` - 響應式定位
- `scale-75 sm:scale-90 md:scale-100` - 元素縮放
- `hidden lg:flex` - 裝飾元素在手機隱藏

---

### 3. **品牌介紹 Section**

#### 問題診斷：
- ❌ 背景圖 `w-[calc(50%+100px)]` 破版
- ❌ Padding `px-[225px]` 過大
- ❌ 標題裝飾圖超出螢幕

#### 解決方案：

```tailwind
<!-- Background Layer -->
<div class="absolute top-0 left-0 w-full h-full flex flex-col lg:flex-row">
  <div class="
    hidden lg:block
    lg:w-[calc(50%+100px)]
    h-64 lg:h-full
    bg-cover bg-center
  "></div>
</div>

<!-- Content Container -->
<div class="
  relative
  max-w-[1920px] mx-auto
  px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[225px]
  py-12 sm:py-16 md:py-20 lg:py-[135px]
">

<!-- Title Decoration -->
<img src="..." class="
  absolute
  left-[calc(100%+20px)] md:left-[calc(100%+85px)]
  bottom-[-17px]
  h-[17px]
  hidden md:block
">
```

**核心 RWD Classes:**
- `px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[225px]` - 漸進式 padding
- `py-12 sm:py-16 md:py-20 lg:py-[135px]` - 響應式垂直間距
- `hidden lg:block` - 背景圖在手機隱藏
- `hidden md:block` - 裝飾圖在平板以上顯示
- `flex-col lg:flex-row` - 手機堆疊、桌機橫向

---

### 4. **服務項目 Section (Cards)**

#### 問題診斷：
- ❌ 固定寬度 `w-[385px]` 無法適應
- ❌ 缺少 `flex-wrap`

#### 解決方案：

```tailwind
<!-- Cards Container -->
<div class="
  w-full max-w-[1920px]
  flex flex-col md:flex-row flex-wrap
  justify-center items-center md:items-stretch
  gap-4 md:gap-[17px]
  px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[225px]
">

<!-- Card -->
<div class="
  group
  w-full sm:w-[calc(50%-8px)] lg:w-[385px]
  max-w-[385px]
  h-auto md:h-[387px]
  rounded-[9px]
  shadow-[0_2px_7px_rgba(0,0,0,0.08)]
  flex flex-col items-center text-center
  transition-colors duration-300
  overflow-hidden
  bg-card-bg hover:bg-white
">
```

**核心 RWD Classes:**
- `flex-col md:flex-row` - 手機堆疊、平板橫向
- `flex-wrap` - 允許換行
- `w-full sm:w-[calc(50%-8px)] lg:w-[385px]` - 手機全寬、平板兩欄、桌機固定寬
- `gap-4 md:gap-[17px]` - 響應式間距
- `max-w-[385px]` - 防止手機過寬

---

### 5. **婚紗禮服 Section**

#### 問題診斷：
- ❌ 圖片固定寬度不縮放
- ❌ 兩欄圖片無法堆疊

#### 解決方案：

```tailwind
<!-- Images Container -->
<div class="
  flex flex-col sm:flex-row
  gap-4
  mb-[17px]
  items-center
">
  <img src="..." class="
    w-full sm:w-[280px] md:w-[240px] lg:w-[293px]
    max-w-[320px] sm:max-w-none
    h-auto
    object-cover
  ">
  <img src="..." class="
    w-full sm:w-[280px] md:w-[240px] lg:w-[293px]
    max-w-[320px] sm:max-w-none
    h-auto
    object-cover
  ">
</div>
```

**核心 RWD Classes:**
- `flex-col sm:flex-row` - 手機堆疊、平板橫向
- `w-full sm:w-[280px] lg:w-[293px]` - 響應式寬度
- `max-w-[320px] sm:max-w-none` - 手機限制最大寬
- `h-auto` - 保持圖片比例

---

### 6. **婚禮實穿 Section (Complex Grid)**

#### 問題診斷：
- ❌ 固定高度和圖片尺寸
- ❌ 複雜 Grid 沒有手機版

#### 解決方案：

```tailwind
<!-- Section Container -->
<section class="
  relative
  h-auto lg:h-[1114px]
  py-12 lg:py-0
  overflow-hidden
">

<!-- Images Grid -->
<div class="
  grid
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-2 md:gap-[9px]
  mb-8 lg:mb-[51px]
  px-4 lg:px-0
">
  <!-- 左邊兩張 -->
  <img src="..." class="
    w-full lg:w-[377px]
    h-auto lg:h-[565px]
    object-cover
  ">
  <img src="..." class="
    w-full lg:w-[377px]
    h-auto lg:h-[565px]
    object-cover
  ">

  <!-- 右邊一上一下 (變成獨立 Grid Cell) -->
  <div class="
    col-span-1 sm:col-span-2 lg:col-span-1
    flex flex-col gap-2 md:gap-[9px]
  ">
    <img src="..." class="
      w-full lg:w-[417px]
      h-auto lg:h-[278px]
      object-cover
    ">
    <img src="..." class="
      w-full lg:w-[417px]
      h-auto lg:h-[278px]
      object-cover
    ">
  </div>
</div>
```

**核心 RWD Classes:**
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` - 響應式 Grid 欄數
- `col-span-1 sm:col-span-2 lg:col-span-1` - 響應式 Grid Span
- `h-auto lg:h-[565px]` - 手機自動高度、桌機固定
- `px-4 lg:px-0` - 手機加 padding 避免貼邊

---

### 7. **部落格卡片 Section**

與服務項目相同策略：

```tailwind
<!-- Cards Container -->
<div class="
  w-full max-w-[1920px]
  flex flex-col md:flex-row flex-wrap
  justify-center items-center md:items-stretch
  gap-4 md:gap-[17px]
  px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[225px]
">

<!-- Blog Card -->
<div class="
  group
  w-full sm:w-[calc(50%-8px)] lg:w-[385px]
  max-w-[385px]
  rounded-[9px]
  shadow-[0_2px_7px_rgba(0,0,0,0.08)]
  flex flex-col
  transition-colors duration-300
  overflow-hidden
  bg-card-bg hover:bg-white
">
```

---

### 8. **預約表單 Section**

#### 問題診斷：
- ❌ Padding `px-[240px]` 過大
- ❌ Grid 兩欄在手機無法堆疊

#### 解決方案：

```tailwind
<!-- Form Container -->
<div class="
  bg-[#F9F5F1]
  px-4 sm:px-8 md:px-16 lg:px-[120px] xl:px-[240px]
  py-8 md:py-[43px]
  rounded-b-[9px]
">

<!-- Form Grid -->
<div class="
  grid
  grid-cols-1 md:grid-cols-2
  gap-x-4 md:gap-x-[51px]
  gap-y-4 md:gap-y-[18px]
">
```

**核心 RWD Classes:**
- `px-4 sm:px-8 md:px-16 lg:px-[120px] xl:px-[240px]` - 漸進式 padding
- `grid-cols-1 md:grid-cols-2` - 手機單欄、平板雙欄
- `gap-x-4 md:gap-x-[51px]` - 響應式間距

---

### 9. **Footer**

#### 已有良好 RWD，微調即可：

```tailwind
<!-- Footer Grid -->
<div class="
  grid
  grid-cols-1 lg:grid-cols-3
  gap-8
  items-center
">

<!-- Left Column -->
<div class="
  text-white
  text-center lg:text-left
  lg:justify-self-start
">

<!-- Center Column -->
<div class="
  flex items-center justify-center
  lg:justify-self-center
">

<!-- Right Column -->
<div class="
  text-white
  text-center lg:text-right
  flex flex-col items-center lg:items-end
  lg:justify-self-end
">
```

**核心 RWD Classes:**
- `grid-cols-1 lg:grid-cols-3` - 手機堆疊、桌機三欄
- `text-center lg:text-left` - 響應式文字對齊
- `justify-self-start/center/end` - Grid 對齊

---

## 🎨 RWD 核心 Tailwind Classes 總結

### 1. **Container & Spacing**
```tailwind
<!-- Max Width -->
max-w-[1920px] mx-auto

<!-- Responsive Padding -->
px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[225px]
py-12 sm:py-16 md:py-20 lg:py-[135px]

<!-- Responsive Gap -->
gap-4 md:gap-[17px]
```

### 2. **Layout Direction**
```tailwind
<!-- Flex Direction -->
flex-col md:flex-row
flex-col-reverse lg:flex-row

<!-- Grid Columns -->
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

<!-- Grid Span -->
col-span-1 sm:col-span-2 lg:col-span-1
```

### 3. **Sizing**
```tailwind
<!-- Width -->
w-full sm:w-[calc(50%-8px)] lg:w-[385px]
max-w-[385px]

<!-- Height -->
h-auto lg:h-[565px]
h-[60vh] lg:h-[880px]
```

### 4. **Positioning**
```tailwind
<!-- Responsive Position -->
right-4 sm:right-8 lg:right-[219px]
left-4 sm:left-8 lg:left-[100px]

<!-- Absolute to Static -->
absolute lg:static
```

### 5. **Visibility**
```tailwind
<!-- Show/Hide -->
hidden lg:block
hidden lg:flex
lg:hidden

<!-- Scale -->
scale-75 sm:scale-90 md:scale-100
```

### 6. **Typography**
```tailwind
<!-- Font Size -->
text-xs sm:text-sm md:text-base lg:text-lg

<!-- Text Align -->
text-center lg:text-left
```

---

## ✅ RWD 檢查清單

實作完成後，請檢查以下項目：

- [ ] 所有 Section 在 < 640px 可正常顯示（無橫向滾動）
- [ ] 圖片在所有斷點正確縮放
- [ ] Padding 在手機上不會過大或過小
- [ ] Grid/Flex 在各斷點正確轉換
- [ ] 絕對定位元素在手機上不超出螢幕
- [ ] 裝飾性元素在需要時隱藏
- [ ] 表單在手機上可正常填寫
- [ ] 按鈕大小在手機上可輕鬆點擊 (至少 44x44px)
- [ ] 文字大小在手機上可閱讀 (至少 14px)
- [ ] Footer 在手機上正確堆疊

---

**下一步：根據此策略重構 HTML**

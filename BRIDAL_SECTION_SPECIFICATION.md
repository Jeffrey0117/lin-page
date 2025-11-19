# 婚紗禮服區塊 (Bridal Section) 完整規格文檔

## 文檔版本
- 版本：1.0
- 最後更新：2025-11-19
- 適用範圍：Lin haute Bridal 網頁設計 - 婚紗禮服展示區塊

---

## 目錄
1. [區塊概述](#區塊概述)
2. [色彩系統](#色彩系統)
3. [字體與排版](#字體與排版)
4. [區塊結構與佈局](#區塊結構與佈局)
5. [左側內容區](#左側內容區)
6. [右側圖片區](#右側圖片區)
7. [響應式設計](#響應式設計)
8. [HTML 結構](#html-結構)
9. [CSS 變數與主題](#css-變數與主題)
10. [交互與動畫](#交互與動畫)
11. [實裝建議](#實裝建議)

---

## 區塊概述

### 區塊定位
婚紗禮服區塊是首頁的核心展示區，用於展現品牌高級訂製婚紗禮服的優雅氣質。

### 區塊功能
- 展示品牌婚紗禮服的高級定位
- 引導用戶瀏覽更多禮服選項
- 通過圖片展示實際款式

### 區塊尺寸（基礎設計稿）
| 項目 | 尺寸 |
|------|------|
| 視口寬度 | 1920px |
| 區塊高度 | 約 600px |
| 背景圖 | bridal_bg.jpg |

---

## 色彩系統

### CSS 變數定義
```css
:root {
  /* 主要文字顏色 */
  --text-main-title: #5C4535;      /* 標題棕色 */
  --text-subtitle: #8E8174;         /* 副標題灰色 */

  /* 強調色 */
  --text-gold: #BA8A63;             /* 金色 - 首字/按鈕 */

  /* 輔助色 */
  --underline: #D6B499;             /* 底線色 */
  --btn-bg: #C29164;                /* 按鈕背景色 */
  --btn-text-hover: #FFFFFF;        /* 按鈕懸停文字色 */

  /* 背景色 */
  --bg-section: #FFFFFF;            /* 區塊背景 */
}
```

### 色彩應用
| 元素 | 色值 | 用途 |
|------|------|------|
| 標題 - 首字 | #BA8A63 (金色) | 強調第一個字「婚」 |
| 標題 - 其他字 | #5C4535 (棕色) | 標題「紗禮服」其他部分 |
| 英文標題 | #BA8A63 (金色) | "BRIDAL" 文字/圖片 |
| 副標題 | #8E8174 (灰色) | 副標題文案 |
| 按鈕文字 | #BA8A63 (金色) | 未懸停狀態 |
| 按鈕背景 | #C29164 (棕金色) | 懸停狀態背景 |
| 按鈕懸停文字 | #FFFFFF (白色) | 懸停狀態文字 |

---

## 字體與排版

### 字體堆棧
```css
字族：'Noto Sans Traditional Chinese', 'Noto Sans HK', sans-serif
英文字族：'Cormorant Garamond', serif
```

### 標題排版規格

#### 主標題「婚紗禮服」
| 項目 | 規格 |
|------|------|
| 字體 | Noto Sans Traditional Chinese / Noto Sans HK |
| 字重 | 400 (Regular) |
| 字號 | 48px |
| 行高 | 100% (48px) |
| 字母間距 | 0.15em (7.2px) |
| 顏色 | 混合色 (首字金色，其他字棕色) |
| 轉換 | 無 |

**構成說明：**
- 第一個字「婚」：48px, 金色 (#BA8A63)
- 其他字「紗禮服」：48px, 棕色 (#5C4535)

#### 英文標題「BRIDAL」
| 項目 | 規格 |
|------|------|
| 字體 | Cormorant Garamond |
| 字重 | 500 (Medium) |
| 字號 | 20px (或使用特殊字體圖片) |
| 顏色 | #BA8A63 (金色) |
| 轉換 | 大寫 (BRIDAL) |
| 位置 | 絕對位置 - 相對於標題右側 |

#### 副標題「高級訂製・遇見妳的命定白紗」
| 項目 | 規格 |
|------|------|
| 字體 | Noto Sans Traditional Chinese / Noto Sans HK |
| 字重 | 400 (Regular) |
| 字號 | 18px |
| 行高 | 150% (27px) |
| 字母間距 | 0.124em (2.2px) |
| 顏色 | #8E8174 (灰色) |
| 轉換 | 無 |

#### 按鈕文字「瀏覽更多 >」
| 項目 | 規格 |
|------|------|
| 字體 | Noto Sans Traditional Chinese / Noto Sans HK |
| 字重 | 400 (Regular) |
| 字號 | 16px |
| 行高 | 100% (16px) |
| 字母間距 | 0.10em (1.6px) |
| 顏色 | 預設 #BA8A63 (金色) |
| 顏色 - 懸停 | #FFFFFF (白色) |
| 轉換 | 無 |

---

## 區塊結構與佈局

### 整體佈局架構
```
┌─────────────────────────────────────────────────────────────┐
│  BRIDAL SECTION (婚紗禮服區塊)                               │
│  背景圖：bridal_bg.jpg                                        │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Container (容器)                                       │   │
│  │ Padding Left/Right: 225px / 1.1718 = 192px (原稿)    │   │
│  │ Padding Left/Right: 225px (實裝)                      │   │
│  │                                                        │   │
│  │  ┌─────────────────────┐  ┌──────────────────────┐  │   │
│  │  │   左側內容區         │  │    右側圖片區         │  │   │
│  │  │  (Left Content)     │  │  (Right Gallery)     │  │   │
│  │  │                     │  │                      │  │   │
│  │  │ - 標題              │  │ - 圖片 1             │  │   │
│  │  │ - 副標題            │  │ - 間距               │  │   │
│  │  │ - 按鈕              │  │ - 圖片 2             │  │   │
│  │  │                     │  │ - 箭頭控制           │  │   │
│  │  └─────────────────────┘  └──────────────────────┘  │   │
│  │                                                        │   │
│  │  間距：98px (原稿 115px / 1.1718)                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 容器規格
| 項目 | 規格 |
|------|------|
| 寬度 | 100% (最大寬度 1920px) |
| 高度 | auto / 最小 550px |
| 顯示 | flex |
| 排列方向 | row (水平並排) |
| 對齐 | align-items: center |
| 正當 | justify-content: space-between |
| 左右內邊距 | 225px |
| 背景 | bridal_bg.jpg (背景圖覆蓋) |
| 背景尺寸 | cover |
| 背景位置 | center |

### 兩側區塊間距
| 項目 | 規格 |
|------|------|
| 原稿距離 | 115px |
| 換算距離 | 115px / 1.1718 = 98px |
| 實裝間距 | 98px (gap 屬性) |

---

## 左側內容區

### 區塊容器
| 項目 | 規格 |
|------|------|
| 寬度 | 約 350-400px (彈性) |
| 高度 | auto |
| 顯示 | flex |
| 排列方向 | column |
| 對齐 | align-items: flex-start |

### 標題組「婚紗禮服」

#### 標題容器
| 項目 | 規格 |
|------|------|
| 寬度 | auto |
| 高度 | auto |
| 下邊距 | 24px |
| 顯示 | flex |
| 排列方向 | row |
| 對齐 | align-items: baseline |

#### 標題文字
```html
<h1 class="bridal-title">
  <span class="title-first-char">婚</span><span class="title-rest-chars">紗禮服</span>
</h1>
```

**首字「婚」**
- 字號：60px
- 顏色：#BA8A63 (金色)
- 字重：400

**其他字「紗禮服」**
- 字號：48px
- 顏色：#5C4535 (棕色)
- 字重：400

### 英文標題「BRIDAL」

#### 英文標題容器
| 項目 | 規格 |
|------|------|
| 位置 | 相對於標題下方 |
| 寬度 | 約 120px |
| 高度 | auto |
| 下邊距 | 32px |
| 顯示 | block 或 inline-block |

#### 英文文字規格
| 項目 | 規格 |
|------|------|
| 字體 | Cormorant Garamond, serif |
| 字重 | 500 (Medium) |
| 字號 | 28px |
| 顏色 | #BA8A63 (金色) |
| 字母間距 | 0.15em |
| 轉換 | uppercase |

**實裝選項：**
1. 文字版本：直接輸入 "BRIDAL" 文字
2. 圖片版本：使用 bridal_text.png 或類似資源

### 副標題「高級訂製・遇見妳的命定白紗」

#### 副標題容器
| 項目 | 規格 |
|------|------|
| 寬度 | 100% (最大 350px) |
| 高度 | auto |
| 下邊距 | 40px |
| 行數 | 最多 2 行 |

#### 副標題文字規格
| 項目 | 規格 |
|------|------|
| 字體 | Noto Sans Traditional Chinese, Noto Sans HK, sans-serif |
| 字重 | 400 (Regular) |
| 字號 | 18px |
| 行高 | 150% (27px) |
| 字母間距 | 0.124em (2.2px) |
| 顏色 | #8E8174 (灰色) |
| 對齐 | left |

**文案：** 「高級訂製・遇見妳的命定白紗」

### 按鈕「瀏覽更多 >」

#### 按鈕容器
| 項目 | 規格 |
|------|------|
| 寬度 | 160px |
| 高度 | 44px |
| 類型 | <a> 標籤 (連結) |
| 顯示 | inline-flex |
| 對齐 | align-items: center, justify-content: center |
| 邊框 | 1px solid #BA8A63 |
| 邊框圓角 | 4px |
| 背景 | 初始透明，懸停時 #C29164 |
| 過渡 | 0.3s ease |

#### 按鈕文字規格
| 項目 | 規格 |
|------|------|
| 文字 | 瀏覽更多 > |
| 字號 | 15px |
| 字重 | 400 |
| 顏色 | #BA8A63 (初始) |
| 顏色 - 懸停 | #FFFFFF (白色) |
| 字母間距 | 0.10em |
| 游標 | pointer |

#### 按鈕狀態

**預設狀態：**
- 背景：transparent
- 文字色：#BA8A63
- 邊框色：#BA8A63

**懸停狀態 (Hover)：**
- 背景：#C29164
- 文字色：#FFFFFF
- 邊框色：#C29164
- 轉換時間：0.3s ease

---

## 右側圖片區

### 圖片容器
| 項目 | 規格 |
|------|------|
| 寬度 | 600px (彈性) |
| 高度 | auto |
| 顯示 | flex |
| 排列方向 | column |
| 對齐 | align-items: center |

### 圖片網格

#### 網格容器
| 項目 | 規格 |
|------|------|
| 顯示 | flex |
| 排列方向 | row |
| 對齐 | align-items: flex-start |
| 間距 | 9px (原稿 10px / 1.1718) |
| 寬度 | auto |
| 下邊距 | 20px |

### 圖片規格

#### 單張圖片尺寸
| 項目 | 規格 |
|------|------|
| 原稿寬度 | 343px |
| 原稿高度 | 515px |
| 換算寬度 | 343px / 1.1718 = 293px |
| 換算高度 | 515px / 1.1718 = 440px |
| 實裝寬度 | 293px |
| 實裝高度 | 440px |
| 邊框圓角 | 4px |
| 物件填充 | cover |
| 陰影 | 0 2px 8px rgba(0, 0, 0, 0.12) |

#### 圖片對說明
| 位置 | 圖片名稱 | 說明 |
|------|---------|------|
| 左側圖片 | dress_01.png | 婚紗款式示意圖 1 |
| 右側圖片 | dress_02.png | 婚紗款式示意圖 2 |

### 圖片間距
| 項目 | 規格 |
|------|------|
| 原稿間距 | 10px |
| 換算間距 | 10px / 1.1718 = 8.5px |
| 實裝間距 | 9px (gap 屬性) |

### 控制箭頭區

#### 箭頭容器
| 項目 | 規格 |
|------|------|
| 顯示 | flex |
| 間距 | 16px |
| 對齐 | justify-content: center |
| 上邊距 | 20px |

#### 左箭頭
| 項目 | 規格 |
|------|------|
| 類型 | <button> |
| 寬度 | 40px |
| 高度 | 40px |
| 邊框 | 1px solid #8E8174 |
| 背景 | transparent |
| 邊框圓角 | 50% (圓形) |
| 圖標 | ‹ 或 ← (左箭頭) |
| 圖標色 | #8E8174 |
| 游標 | pointer |
| 懸停背景 | #BA8A63 |
| 懸停圖標色 | #FFFFFF |

#### 右箭頭
| 項目 | 規格 |
|------|------|
| 類型 | <button> |
| 寬度 | 40px |
| 高度 | 40px |
| 邊框 | 1px solid #8E8174 |
| 背景 | transparent |
| 邊框圓角 | 50% (圓形) |
| 圖標 | › 或 → (右箭頭) |
| 圖標色 | #8E8174 |
| 游標 | pointer |
| 懸停背景 | #BA8A63 |
| 懸停圖標色 | #FFFFFF |

#### 箭頭懸停效果
```css
.gallery-nav button:hover {
  background-color: #BA8A63;
  color: #FFFFFF;
  transition: all 0.3s ease;
}
```

---

## 響應式設計

### 斷點設定

#### 平板電腦 (Tablet) - 768px 到 1024px
| 項目 | 規格 |
|------|------|
| 容器內邊距 | 60px (左右) |
| 區塊間距 | 40px |
| 標題字號 | 36px / 24px (首字/其他) |
| 副標題字號 | 16px |
| 圖片寬度 | 240px |
| 圖片高度 | 360px |
| 排列方式 | column (垂直堆疊) |

#### 行動裝置 (Mobile) - 小於 768px
| 項目 | 規格 |
|------|------|
| 容器內邊距 | 20px (左右) |
| 區塊間距 | 30px |
| 標題字號 | 28px / 18px (首字/其他) |
| 副標題字號 | 14px |
| 圖片寬度 | 100% (最大 200px) |
| 圖片高度 | auto (保持比例) |
| 排列方式 | column (垂直堆疊) |
| 英文標題 | 隱藏或縮小 |

### 佈局轉換點

**1920px 及以上 (桌面)：**
- 左側內容區 + 右側圖片區 水平並排
- 全寬顯示

**1024px 到 1920px (大平板)：**
- 左側內容區 + 右側圖片區 水平並排
- 容器內邊距逐漸減少

**768px 到 1024px (平板)：**
- 左側內容區 + 右側圖片區 改為垂直堆疊
- 全寬設計

**小於 768px (行動裝置)：**
- 全部內容垂直堆疊
- 圖片寬度 100%
- 字號縮小以適應屏幕

---

## HTML 結構

### 語義 HTML 架構

```html
<section class="bridal-section" id="bridal">
  <!-- 背景層 -->
  <div class="bridal-bg"></div>

  <!-- 內容容器 -->
  <div class="bridal-container">

    <!-- 左側內容區 -->
    <div class="bridal-content-left">

      <!-- 標題組 -->
      <div class="bridal-title-group">
        <h1 class="bridal-title">
          <span class="title-first-char">婚</span><span class="title-rest-chars">紗禮服</span>
        </h1>

        <!-- 英文標題 -->
        <div class="bridal-title-english">
          <img src="path/to/bridal-text.png" alt="BRIDAL" />
          <!-- 或文字版本：<p>BRIDAL</p> -->
        </div>
      </div>

      <!-- 副標題 -->
      <p class="bridal-subtitle">高級訂製・遇見妳的命定白紗</p>

      <!-- 按鈕 -->
      <a href="/bridal" class="bridal-button">
        瀏覽更多 <span class="button-arrow">></span>
      </a>

    </div>

    <!-- 右側圖片區 -->
    <div class="bridal-gallery">

      <!-- 圖片容器 -->
      <div class="gallery-images">
        <img src="path/to/dress_01.png" alt="婚紗款式 1" class="gallery-image" />
        <img src="path/to/dress_02.png" alt="婚紗款式 2" class="gallery-image" />
      </div>

      <!-- 控制箭頭 -->
      <div class="gallery-nav">
        <button class="gallery-nav-btn prev" aria-label="上一張">
          <i class="icon-chevron-left"></i>
        </button>
        <button class="gallery-nav-btn next" aria-label="下一張">
          <i class="icon-chevron-right"></i>
        </button>
      </div>

    </div>

  </div>

</section>
```

### 標籤與屬性說明

| 標籤 | 用途 | 屬性 |
|------|------|------|
| `<section>` | 區塊容器 | class, id |
| `<div class="bridal-bg">` | 背景圖層 | 背景圖應用 |
| `<h1 class="bridal-title">` | 主標題 | 語義正確性 |
| `<span class="title-first-char">` | 首字強調 | 用於區分顏色 |
| `<a class="bridal-button">` | 行動按鈕 | href 連結目標 |
| `<img class="gallery-image">` | 產品圖片 | src, alt 屬性必填 |
| `<button class="gallery-nav-btn">` | 導航按鈕 | aria-label 無障礙 |

---

## CSS 變數與主題

### 完整 CSS 變數清單

```css
:root {
  /* ===== 文字顏色 ===== */
  --text-main-title: #5C4535;        /* 主標題 */
  --text-subtitle: #8E8174;          /* 副標題 */
  --text-gold: #BA8A63;              /* 強調金色 */

  /* ===== 背景顏色 ===== */
  --bg-section: #FFFFFF;             /* 區塊背景 */

  /* ===== 邊框與線條 ===== */
  --underline: #D6B499;              /* 裝飾線 */
  --border-light: #D6B499;           /* 淡邊框 */

  /* ===== 按鈕顏色 ===== */
  --btn-bg: #C29164;                 /* 按鈕背景 */
  --btn-text: #BA8A63;               /* 按鈕文字 */
  --btn-text-hover: #FFFFFF;         /* 按鈕懸停文字 */

  /* ===== 其他 ===== */
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.12);
  --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
  --transition-normal: 0.3s ease;
}
```

### 深色主題變數 (可選)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-main-title: #E8D5C4;
    --text-subtitle: #B8A89F;
    --text-gold: #D9A863;
    --bg-section: #1A1410;
  }
}
```

---

## 交互與動畫

### 1. 按鈕懸停效果

```css
.bridal-button {
  transition: all 0.3s ease;
  border: 1px solid var(--text-gold);
  background-color: transparent;
  color: var(--text-gold);
}

.bridal-button:hover {
  background-color: var(--btn-bg);
  color: var(--btn-text-hover);
  border-color: var(--btn-bg);
  box-shadow: 0 4px 12px rgba(194, 145, 100, 0.3);
}

.bridal-button:active {
  transform: scale(0.98);
}
```

### 2. 箭頭按鈕懸停效果

```css
.gallery-nav-btn {
  transition: all 0.3s ease;
  background-color: transparent;
  border: 1px solid var(--text-subtitle);
  color: var(--text-subtitle);
}

.gallery-nav-btn:hover {
  background-color: var(--text-gold);
  color: var(--btn-text-hover);
  border-color: var(--text-gold);
  transform: scale(1.05);
}
```

### 3. 圖片淡入效果

```css
.gallery-image {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 4. 整體區塊進入動畫 (可選)

```css
.bridal-section {
  animation: sectionFadeIn 0.8s ease-out 0.2s both;
}

@keyframes sectionFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 5. JavaScript 交互 (圖片輪播)

```javascript
// 圖片輪播邏輯
const images = ['dress_01.png', 'dress_02.png', 'dress_03.png', ...];
let currentIndex = 0;

document.querySelector('.gallery-nav-btn.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateGallery();
});

document.querySelector('.gallery-nav-btn.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateGallery();
});

function updateGallery() {
  const leftImg = document.querySelectorAll('.gallery-image')[0];
  const rightImg = document.querySelectorAll('.gallery-image')[1];

  leftImg.src = images[currentIndex];
  rightImg.src = images[(currentIndex + 1) % images.length];

  // 淡入淡出效果
  leftImg.style.opacity = '0';
  rightImg.style.opacity = '0';

  setTimeout(() => {
    leftImg.style.opacity = '1';
    rightImg.style.opacity = '1';
  }, 50);
}
```

---

## 實裝建議

### 1. 背景圖片優化
- 使用 WebP 格式備選方案
- 為背景圖片添加 srcset 以支援高解析度屏幕
- 考慮使用 CSS background-image 與 background-attachment: fixed 製造視差效果

```css
.bridal-bg {
  background-image: url('bridal_bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* 視差效果 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bridal-container {
  position: relative;
  z-index: 1;
}
```

### 2. 無障礙設計 (A11Y)

```html
<!-- 按鈕無障礙 -->
<a href="/bridal" class="bridal-button" aria-label="瀏覽更多婚紗禮服">
  瀏覽更多 <span class="button-arrow" aria-hidden="true">></span>
</a>

<!-- 圖片替代文本 -->
<img src="dress_01.png" alt="婚紗款式 1 - 搭配鑲鑽細節的蕾絲裝飾" />

<!-- 控制按鈕無障礙 -->
<button class="gallery-nav-btn prev" aria-label="上一張圖片">
  <i class="icon-chevron-left" aria-hidden="true"></i>
</button>
```

### 3. 效能優化

```css
/* 減少重排 */
.bridal-container {
  will-change: contents;
}

/* 圖片優化 */
.gallery-image {
  aspect-ratio: 293 / 440;
  object-fit: cover;
  loading: lazy; /* 原生延遲載入 */
}

/* 避免重新繪製 */
.bridal-button:hover {
  transform: translateZ(0); /* GPU 加速 */
}
```

### 4. 浏覽器相容性

| 功能 | 最低版本 | 備選方案 |
|------|--------|--------|
| Flexbox | IE 11+ | 使用 @supports 查詢 |
| CSS Grid | Chrome 57+ | 降級為 Flexbox |
| aspect-ratio | Safari 15+ | 使用 padding-bottom 技巧 |
| loading="lazy" | Chrome 76+ | 使用 Intersection Observer API |
| CSS 變數 | IE 不支持 | 使用後處理器轉換 |

### 5. 效能指標目標

| 指標 | 目標值 |
|------|-------|
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| 圖片載入時間 | < 1.5s (4G) |

---

## 檔案與資源清單

### 所需圖片資源

| 檔案名稱 | 尺寸 | 格式 | 用途 |
|---------|------|------|------|
| bridal_bg.jpg | 1920x600px | JPG | 區塊背景 |
| bridal_text.png | 120x40px | PNG | 英文標題 "BRIDAL" |
| dress_01.png | 293x440px | PNG | 禮服圖片 1 |
| dress_02.png | 293x440px | PNG | 禮服圖片 2 |
| dress_03.png | 293x440px | PNG | 禮服圖片 3 (可選輪播) |

### 依賴資源

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap" rel="stylesheet">

<!-- Font Awesome (圖標) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
```

---

## 常見問題與解答

### Q1: 英文「BRIDAL」應該用圖片還是文字？
**A:** 建議優先使用文字版本以提升 SEO 和無障礙性。若設計要求特殊字體效果，才使用圖片。

### Q2: 如何實現圖片輪播功能？
**A:** 提供了基本的 JavaScript 邏輯。可使用 Swiper.js 或 Slick 等第三方庫以獲得更豐富的功能。

### Q3: 背景圖片在行動裝置上如何處理？
**A:** 建議為不同寬度提供不同尺寸的背景圖片，使用 CSS media queries 或 picture 元素。

### Q4: 按鈕連結應該連到哪裡？
**A:** 根據您的網站結構修改 href 屬性，建議連結到婚紗禮服展示頁面或產品列表頁面。

### Q5: 如何保證在深色模式下的可見性？
**A:** 使用 prefers-color-scheme 媒體查詢調整顏色，見本文檔 CSS 變數章節。

---

## 版本記錄

| 版本 | 日期 | 變更內容 |
|------|------|---------|
| 1.0 | 2025-11-19 | 首版發佈 - 完整規格文檔 |

---

## 聯繫與支援

如有任何問題或需要進一步的技術支援，請聯繫設計或開發團隊。

**最後更新：** 2025-11-19
**責任部門：** Web Design & Development Team
**狀態：** 待核准與實裝

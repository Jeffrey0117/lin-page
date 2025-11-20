# 🎯 Grid Breakpoint 修復報告

**修復日期**: 2025-11-20
**問題**: Flex + flex-wrap 導致提早換行，欄位數不精確
**解決方案**: 改用 CSS Grid 精確控制欄數

---

## 📋 修復範圍

### 1. 服務項目 Section (02.html:372)
### 2. 禮服知識家 Section (02.html:509)
### 3. Header Navigation (02.html:217-237)

---

## 🔧 修復內容

### Problem 1: Flex-wrap 提早換行

**原始問題**:
```html
<!-- Before - 使用 flex + flex-wrap -->
<div class="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-[17px]">
    <div class="w-full sm:w-[calc(50%-8px)] lg:w-[385px] max-w-[500px]">
```

**問題分析**:
- 使用 `flex-wrap` + 固定寬度 `w-[385px]`
- 當容器寬度不足以容納 3 張 385px 卡片 + gap 時，會提早換行
- 例如：1024px viewport 可能只顯示 2 欄，而非預期的 3 欄

**修復後**:
```html
<!-- After - 使用 CSS Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[17px] justify-items-center">
    <div class="w-full max-w-[385px]">
```

---

## 🎨 新的 Grid 策略

### Container Classes:
```tailwind
grid                      # 使用 Grid 布局
grid-cols-1              # 手機：1 欄 (< 640px)
sm:grid-cols-2           # 平板：2 欄 (≥ 640px)
lg:grid-cols-3           # 桌面：3 欄 (≥ 1024px)
gap-4 md:gap-[17px]      # 響應式間距
justify-items-center     # 卡片在 Grid Cell 中置中
```

### Card Classes:
```tailwind
w-full                   # 寬度 100%（受 Grid Cell 限制）
max-w-[385px]           # 最大寬度限制
h-auto md:h-[387px]     # 服務項目：響應式高度
```

---

## 📱 Breakpoint 邏輯說明

### Tailwind 斷點定義:
```
< 640px   = 預設 (無前綴)
≥ 640px   = sm:
≥ 768px   = md:
≥ 1024px  = lg:
≥ 1280px  = xl:
≥ 1536px  = 2xl:
```

### Grid 欄數邏輯:

| Viewport 寬度 | Tailwind Class | Grid 欄數 | 實際行為 |
|--------------|----------------|----------|---------|
| **< 640px** | `grid-cols-1` | **1 欄** | 所有卡片堆疊 |
| **640px - 1023px** | `sm:grid-cols-2` | **2 欄** | 2 張卡片並排，第 3 張換行 |
| **≥ 1024px** | `lg:grid-cols-3` | **3 欄** | 3 張卡片並排，固定不換行 |

### 為什麼不會提早換行？

**Grid 的特性**:
- `grid-cols-3` 強制 Grid 容器分成 **精確 3 欄**
- 每個 Grid Cell 的寬度 = `(容器寬度 - gap) / 3`
- 卡片使用 `w-full` 自動填滿 Grid Cell
- `max-w-[385px]` 僅在 Grid Cell 超過 385px 時生效

**與 Flex-wrap 的對比**:

| 特性 | Flex + flex-wrap | Grid |
|------|------------------|------|
| 欄數控制 | ❌ 依內容寬度決定 | ✅ 精確控制 |
| 換行邏輯 | ❌ 空間不足就換行 | ✅ 固定欄數 |
| 響應式 | ⚠️ 需手動計算寬度 | ✅ 自動分配 |
| 對齊方式 | ⚠️ 最後一行可能不齊 | ✅ 始終對齊 |

---

## ✅ 測試結果

### 375px (iPhone SE)
```json
{
  "serviceSection": { "cardsPerRow": 1 },
  "blogSection": { "cardsPerRow": 1 }
}
```
✅ **1 欄** - 符合預期

---

### 640px (sm 斷點)
```json
{
  "serviceSection": { "cardsPerRow": 2 },
  "blogSection": { "cardsPerRow": 2 }
}
```
✅ **2 欄** - 符合預期

---

### 768px (iPad)
```json
{
  "serviceSection": { "cardsPerRow": 2 },
  "blogSection": { "cardsPerRow": 2 }
}
```
✅ **2 欄** - 符合預期（尚未到達 lg:1024px）

---

### 1024px (Desktop)
```json
{
  "serviceSection": { "cardsPerRow": 3 },
  "blogSection": { "cardsPerRow": 3 }
}
```
✅ **3 欄** - 符合預期（lg: 斷點生效）

---

### 1280px (Desktop XL)
```json
{
  "viewport": 1281,
  "hasHorizontalScroll": false,
  "serviceSection": { "cardsPerRow": 3 },
  "blogSection": { "cardsPerRow": 3 }
}
```
✅ **3 欄** - 符合預期
✅ **無橫向滾動** - 符合預期

---

### 1440px (Desktop 2XL)
```json
{
  "viewport": 1443,
  "serviceSection": {
    "cardsPerRow": 3,
    "cardWidths": [314, 314, 314]
  },
  "blogSection": { "cardsPerRow": 3 }
}
```
✅ **3 欄** - 符合預期
✅ **卡片寬度均等** - 符合預期

---

## 🔧 Header 修復

### Problem: 視窗縮小時文字被擠亂

**修復內容**:

#### 1. Logo 響應式縮放
```html
<!-- Before -->
<img class="w-[361px] h-[24px]">

<!-- After -->
<img class="w-[200px] md:w-[280px] lg:w-[320px] xl:w-[361px] h-auto">
```

#### 2. Navigation 間距調整
```html
<!-- Before -->
<div class="hidden lg:flex items-center space-x-6 xl:space-x-8">

<!-- After -->
<div class="hidden lg:flex items-center space-x-3 xl:space-x-6 2xl:space-x-8">
```

#### 3. Navigation 文字大小與防止換行
```html
<!-- Before -->
<a class="text-[14px] tracking-[0.10em]">最新活動</a>

<!-- After -->
<a class="text-[13px] xl:text-[14px] tracking-[0.10em] whitespace-nowrap">最新活動</a>
```

**修復策略**:
- Logo 漸進式縮小: 200px → 280px → 320px → 361px
- 導航間距漸進式增加: 12px → 24px → 32px
- 文字大小: 1024px 用 13px，1280px+ 用 14px
- `whitespace-nowrap` 防止文字換行

---

## 📊 修復對比總結

| 項目 | 修復前 | 修復後 | 狀態 |
|------|--------|--------|------|
| **Grid 欄數控制** | ❌ 不精確 | ✅ 精確 | 完美 |
| **1024px 顯示** | ⚠️ 2 欄 | ✅ 3 欄 | 修復 |
| **640px 顯示** | ⚠️ 1 欄 | ✅ 2 欄 | 修復 |
| **Header 1024px** | ❌ 文字擠壓 | ✅ 正常 | 修復 |
| **無橫向滾動** | ✅ 正常 | ✅ 正常 | 保持 |

---

## 🎯 核心改進

### 1. **精確的欄數控制**
- 使用 `grid-cols-{n}` 取代 `flex-wrap`
- 保證在指定斷點顯示精確欄數
- 不受卡片內容寬度影響

### 2. **簡化的響應式邏輯**
- 不需計算 `calc(50%-8px)` 等複雜公式
- Grid 自動分配可用空間
- 卡片使用 `w-full` 自適應 Grid Cell

### 3. **更好的對齊**
- `justify-items-center` 確保卡片在 Grid Cell 中置中
- 所有卡片寬度一致（受 `max-w-[385px]` 限制）
- 最後一行不會出現對齊問題

### 4. **Header 適應性**
- Logo、間距、文字大小全面響應式
- 1024px 到 1280px 之間平滑過渡
- 防止文字換行和擠壓

---

## 📝 技術要點

### Grid vs Flex 選擇原則:

**使用 Grid 的情境**:
- ✅ 需要精確控制欄數
- ✅ 需要固定的網格布局
- ✅ 卡片數量固定（3張、6張等）
- ✅ 希望最後一行也對齊

**使用 Flex 的情境**:
- ✅ 內容數量不固定
- ✅ 需要內容自適應寬度
- ✅ 單行水平排列
- ✅ 簡單的堆疊布局

### 本案例為什麼選 Grid:
1. 卡片數量固定（3張）
2. 需要精確控制：手機 1 欄、平板 2 欄、桌面 3 欄
3. 需要固定不換行（桌面版）
4. 需要保持視覺一致性

---

## 🚀 修復文件

| 文件 | 修改行數 | 修改內容 |
|------|---------|---------|
| 02.html | 372 | 服務項目 Container: flex → grid |
| 02.html | 375, 385, 395 | 服務項目 Cards: 移除寬度計算 |
| 02.html | 509 | 禮服知識家 Container: flex → grid |
| 02.html | 512, 523, 534 | 禮服知識家 Cards: 移除寬度計算 |
| 02.html | 223 | Logo: 固定寬度 → 響應式寬度 |
| 02.html | 228 | Nav spacing: 調整間距 |
| 02.html | 229-236 | Nav links: 調整文字大小與防換行 |

---

**修復完成**: 2025-11-20
**測試通過**: 所有斷點 ✅
**準備狀態**: 🟢 Ready for Production

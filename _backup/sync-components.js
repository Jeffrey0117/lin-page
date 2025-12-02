/**
 * sync-components.js
 * 同步 Header, Footer, 預約表單, CSS 從 index.html 到其他頁面
 *
 * 使用方式：node sync-components.js
 */

const fs = require('fs');
const path = require('path');

// 要處理的檔案
const TARGET_FILES = ['02.html', '03.html', '04.html', '05.html', '06.html', '07.html', '08.html', '09.html', '10.html', '11.html', '12.html', '13.html'];

// 有預約表單的檔案
const FILES_WITH_RESERVATION = ['02.html', '03.html', '04.html', '05.html', '06.html', '07.html', '08.html', '09.html', '13.html'];

// 區塊標記
const MARKERS = {
    header: {
        start: '<!-- Header Navigation -->',
        end: '</header>'
    },
    footer: {
        start: /<!-- Footer Section.*?-->/,
        end: '</html>' // 我們會替換 footer 到檔案結尾（包含 scripts）
    },
    reservation: {
        start: '<!-- 預約諮詢 Reservation Section -->',
        // 預約區塊結尾用下一個主要 section 或 footer 作為界限
    }
};

// 需要同步的 CSS 區塊
const CSS_BLOCKS = {
    fontSerifEng: '.font-serifEng { font-family: \'Cormorant Garamond\', serif; }',
    navLink: `/* Nav link hover effect */
        .nav-link {
            position: relative;
            z-index: 1;
        }
        .nav-link::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 40px;
            height: 36px;
            background-color: #F9F5F1;
            border-radius: 50%;
            z-index: -1;
            transition: transform 0.3s ease;
        }
        .nav-link:hover::before {
            transform: translate(-50%, -50%) scale(1);
        }`,
    customDropdown: `/* Custom Dropdown Styles */
        .custom-dropdown {
            position: relative;
            width: 100%;
            max-width: 330px;
        }

        .custom-dropdown-btn {
            width: 100%;
            height: 37px;
            padding: 0 30px 0 16px;
            background: #ffffff;
            border: none;
            border-bottom: 1px solid #D3B599;
            border-radius: 0;
            text-align: left;
            font-size: 14px;
            letter-spacing: 0.10em;
            color: #67534D;
            cursor: pointer;
            position: relative;
            transition: border-color 300ms;
        }

        .custom-dropdown-btn::after {
            content: '';
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            width: 12px;
            height: 8px;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.646484 1.29297L7.64648 8.29297L14.6465 1.29297' stroke='%23c09771'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: contain;
            transition: transform 200ms;
        }

        .custom-dropdown.open .custom-dropdown-btn::after {
            transform: translateY(-50%) rotate(180deg);
        }

        .custom-dropdown-btn:focus {
            outline: none;
            border-bottom-color: #C29164;
        }

        .custom-dropdown-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #D3B599;
            border-top: none;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            z-index: 100;
            transition: max-height 200ms, opacity 200ms;
        }

        .custom-dropdown.open .custom-dropdown-list {
            max-height: 200px;
            opacity: 1;
        }

        .custom-dropdown-item {
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 0.10em;
            color: #868686;
            cursor: pointer;
            transition: background-color 150ms, color 150ms;
        }

        .custom-dropdown-item:hover,
        .custom-dropdown-item.selected {
            background-color: #C09771;
            color: white;
        }`
};

/**
 * 從 index.html 提取 Header 區塊
 */
function extractHeader(content) {
    const startIdx = content.indexOf(MARKERS.header.start);
    const endIdx = content.indexOf(MARKERS.header.end, startIdx) + MARKERS.header.end.length;

    if (startIdx === -1 || endIdx === -1) {
        throw new Error('無法在 index.html 中找到 Header 區塊');
    }

    return content.substring(startIdx, endIdx);
}

/**
 * 從 index.html 提取 Footer 區塊（包含 copyright 和 scripts）
 */
function extractFooter(content) {
    const match = content.match(MARKERS.footer.start);
    if (!match) {
        throw new Error('無法在 index.html 中找到 Footer 區塊');
    }

    const startIdx = match.index;
    // Footer 包含到 </html> 之前的所有內容
    const endIdx = content.lastIndexOf('</body>');

    if (endIdx === -1) {
        throw new Error('無法找到 </body> 標籤');
    }

    return content.substring(startIdx, endIdx);
}

/**
 * 從 index.html 提取預約表單區塊
 */
function extractReservation(content) {
    const startIdx = content.indexOf(MARKERS.reservation.start);
    if (startIdx === -1) {
        throw new Error('無法在 index.html 中找到預約表單區塊');
    }

    // 找到預約區塊的結束位置（下一個 <!-- Footer 之前）
    const footerMatch = content.match(MARKERS.footer.start);
    if (!footerMatch) {
        throw new Error('無法找到 Footer 區塊作為預約表單結束標記');
    }

    const endIdx = footerMatch.index;

    return content.substring(startIdx, endIdx).trim() + '\n\n    ';
}

/**
 * 替換目標檔案中的 Header
 */
function replaceHeader(content, newHeader) {
    const startIdx = content.indexOf(MARKERS.header.start);
    if (startIdx === -1) {
        console.log('  ⚠️  找不到 Header 標記，跳過');
        return content;
    }

    const endIdx = content.indexOf(MARKERS.header.end, startIdx) + MARKERS.header.end.length;
    if (endIdx === -1) {
        console.log('  ⚠️  找不到 Header 結束標記，跳過');
        return content;
    }

    return content.substring(0, startIdx) + newHeader + content.substring(endIdx);
}

/**
 * 替換目標檔案中的 Footer（包含 scripts）
 */
function replaceFooter(content, newFooter) {
    const match = content.match(MARKERS.footer.start);
    if (!match) {
        console.log('  ⚠️  找不到 Footer 標記，跳過');
        return content;
    }

    const startIdx = match.index;
    const endIdx = content.lastIndexOf('</body>');

    if (endIdx === -1) {
        console.log('  ⚠️  找不到 </body> 標籤，跳過');
        return content;
    }

    return content.substring(0, startIdx) + newFooter + content.substring(endIdx);
}

/**
 * 替換目標檔案中的預約表單
 */
function replaceReservation(content, newReservation) {
    const startIdx = content.indexOf(MARKERS.reservation.start);
    if (startIdx === -1) {
        console.log('  ⚠️  找不到預約表單標記，跳過');
        return content;
    }

    // 找到下一個 Footer 作為結束位置
    const footerMatch = content.match(MARKERS.footer.start);
    if (!footerMatch) {
        console.log('  ⚠️  找不到 Footer 標記作為預約表單結束位置，跳過');
        return content;
    }

    const endIdx = footerMatch.index;

    return content.substring(0, startIdx) + newReservation + content.substring(endIdx);
}

/**
 * 更新 Google Fonts Cormorant Garamond 連結
 */
function updateGoogleFonts(content) {
    // 尋找現有的 Cormorant Garamond 連結並更新
    const oldPattern = /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Cormorant\+Garamond[^"]*"/g;
    const newLink = 'href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@200;500&display=swap"';

    if (oldPattern.test(content)) {
        content = content.replace(oldPattern, newLink);
        return { content, updated: true };
    }

    // 如果沒有，在其他 Google Fonts 連結後面加入
    const lastGoogleFontLink = content.lastIndexOf('fonts.googleapis.com');
    if (lastGoogleFontLink !== -1) {
        const insertPos = content.indexOf('>', lastGoogleFontLink) + 1;
        const newFontLink = `\n    <link ${newLink} rel="stylesheet">`;
        content = content.substring(0, insertPos) + newFontLink + content.substring(insertPos);
        return { content, added: true };
    }

    return { content, skipped: true };
}

/**
 * 確保 CSS 存在於 <style> 區塊中
 */
function ensureCSS(content, cssName, cssBlock) {
    // 檢查 CSS 是否已存在（用 CSS 定義格式來判斷，避免誤判 JS 代碼）
    const cssIdentifier = cssName === 'fontSerifEng' ? '.font-serifEng {' :
                         cssName === 'navLink' ? '.nav-link::before {' :
                         '.custom-dropdown-btn {';

    if (content.includes(cssIdentifier)) {
        return { content, exists: true };
    }

    // 在 </style> 前插入 CSS
    const styleEndIdx = content.indexOf('</style>');
    if (styleEndIdx === -1) {
        return { content, noStyle: true };
    }

    const insertCSS = '\n\n        ' + cssBlock + '\n    ';
    content = content.substring(0, styleEndIdx) + insertCSS + content.substring(styleEndIdx);

    return { content, added: true };
}

/**
 * 主程式
 */
function main() {
    console.log('🚀 開始同步元件...\n');

    // 讀取 index.html
    const indexPath = path.join(__dirname, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf-8');

    // 提取模板區塊
    console.log('📦 從 index.html 提取模板...');
    const headerTemplate = extractHeader(indexContent);
    const footerTemplate = extractFooter(indexContent);
    const reservationTemplate = extractReservation(indexContent);

    console.log(`  ✅ Header: ${headerTemplate.length} 字元`);
    console.log(`  ✅ Footer: ${footerTemplate.length} 字元`);
    console.log(`  ✅ Reservation: ${reservationTemplate.length} 字元\n`);

    // 處理每個目標檔案
    let updatedCount = 0;

    for (const filename of TARGET_FILES) {
        const filepath = path.join(__dirname, filename);

        if (!fs.existsSync(filepath)) {
            console.log(`⚠️  ${filename} 不存在，跳過`);
            continue;
        }

        console.log(`📝 處理 ${filename}...`);

        let content = fs.readFileSync(filepath, 'utf-8');
        const originalLength = content.length;

        // 1. 更新 Google Fonts
        const fontResult = updateGoogleFonts(content);
        content = fontResult.content;
        if (fontResult.updated) console.log('  ✅ Google Fonts 已更新');
        else if (fontResult.added) console.log('  ✅ Google Fonts 已加入');

        // 2. 確保 .font-serifEng CSS 存在
        const serifResult = ensureCSS(content, 'fontSerifEng', CSS_BLOCKS.fontSerifEng);
        content = serifResult.content;
        if (serifResult.added) console.log('  ✅ .font-serifEng CSS 已加入');
        else if (serifResult.exists) console.log('  ⏭️  .font-serifEng CSS 已存在');

        // 3. 確保 nav-link hover CSS 存在
        const navResult = ensureCSS(content, 'navLink', CSS_BLOCKS.navLink);
        content = navResult.content;
        if (navResult.added) console.log('  ✅ nav-link hover CSS 已加入');
        else if (navResult.exists) console.log('  ⏭️  nav-link hover CSS 已存在');

        // 4. 如果有預約表單，確保 dropdown CSS 存在
        if (FILES_WITH_RESERVATION.includes(filename)) {
            const dropdownResult = ensureCSS(content, 'customDropdown', CSS_BLOCKS.customDropdown);
            content = dropdownResult.content;
            if (dropdownResult.added) console.log('  ✅ custom-dropdown CSS 已加入');
            else if (dropdownResult.exists) console.log('  ⏭️  custom-dropdown CSS 已存在');
        }

        // 5. 替換 Header
        content = replaceHeader(content, headerTemplate);
        console.log('  ✅ Header 已替換');

        // 6. 替換預約表單（如果有）
        if (FILES_WITH_RESERVATION.includes(filename)) {
            content = replaceReservation(content, reservationTemplate);
            console.log('  ✅ Reservation 已替換');
        } else {
            console.log('  ⏭️  無預約表單，跳過');
        }

        // 7. 替換 Footer
        content = replaceFooter(content, footerTemplate);
        console.log('  ✅ Footer 已替換');

        // 寫回檔案
        fs.writeFileSync(filepath, content, 'utf-8');

        const newLength = content.length;
        const diff = newLength - originalLength;
        const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
        console.log(`  📊 檔案大小: ${originalLength} → ${newLength} (${diffStr})\n`);

        updatedCount++;
    }

    console.log(`\n✨ 完成！共更新 ${updatedCount} 個檔案`);
    console.log('\n💡 提示：請用瀏覽器檢查各頁面是否正常顯示');
}

// 執行
main();

/**
 * sync-components.js
 * 同步 Header, Footer, 預約表單 從 index.html 到其他頁面
 *
 * 使用方式：node sync-components.js
 */

const fs = require('fs');
const path = require('path');

// 要處理的檔案
const TARGET_FILES = ['02.html', '03.html', '04.html', '05.html', '06.html', '07.html', '08.html', '09.html', '10.html', '11.html', '12.html', '13.html'];

// 有預約表單的檔案
const FILES_WITH_RESERVATION = ['02.html', '03.html', '04.html', '05.html', '06.html', '07.html', '09.html', '13.html'];

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

        // 替換 Header
        content = replaceHeader(content, headerTemplate);
        console.log('  ✅ Header 已替換');

        // 替換預約表單（如果有）
        if (FILES_WITH_RESERVATION.includes(filename)) {
            content = replaceReservation(content, reservationTemplate);
            console.log('  ✅ Reservation 已替換');
        } else {
            console.log('  ⏭️  無預約表單，跳過');
        }

        // 替換 Footer
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

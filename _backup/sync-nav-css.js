/**
 * sync-nav-css.js
 * 為所有頁面補上 nav-link hover 效果 CSS
 */

const fs = require('fs');
const path = require('path');

const TARGET_FILES = ['02.html', '03.html', '04.html', '05.html', '06.html', '07.html', '08.html', '09.html', '10.html', '11.html', '12.html', '13.html'];

const NAV_CSS = `
        /* Nav link hover effect */
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
        }
`;

function main() {
    console.log('🎨 為所有頁面添加 nav-link CSS...\n');

    for (const filename of TARGET_FILES) {
        const filepath = path.join(__dirname, filename);

        if (!fs.existsSync(filepath)) {
            console.log(`⚠️  ${filename} 不存在，跳過`);
            continue;
        }

        let content = fs.readFileSync(filepath, 'utf-8');

        // 檢查是否已有 nav-link CSS
        if (content.includes('.nav-link::before')) {
            console.log(`⏭️  ${filename} 已有 nav-link CSS，跳過`);
            continue;
        }

        // 找到 </style> 標籤，在其前面插入 CSS
        const styleEndIdx = content.indexOf('</style>');
        if (styleEndIdx === -1) {
            // 如果沒有 </style>，找 </head> 並創建 style 區塊
            const headEndIdx = content.indexOf('</head>');
            if (headEndIdx === -1) {
                console.log(`⚠️  ${filename} 找不到 </head>，跳過`);
                continue;
            }
            const styleBlock = `    <style>${NAV_CSS}    </style>\n`;
            content = content.substring(0, headEndIdx) + styleBlock + content.substring(headEndIdx);
        } else {
            // 在 </style> 前插入 CSS
            content = content.substring(0, styleEndIdx) + NAV_CSS + content.substring(styleEndIdx);
        }

        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`✅ ${filename} 已添加 nav-link CSS`);
    }

    console.log('\n✨ 完成！');
}

main();

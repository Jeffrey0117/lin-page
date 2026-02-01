/**
 * 浮動按鈕組件
 * 包含：預約按鈕、客服按鈕（展開 IG/FB/LINE）、回到頂部
 *
 * 使用方式：在頁面底部引入此檔案
 * <script src="js/floating-buttons.js"></script>
 */

(function() {
    'use strict';

    // 設定（之後要改連結在這裡改）
    var CONFIG = {
        reserveLink: '#reservation',
        igLink: '#',
        fbLink: '#',
        lineLink: '#'
    };

    // CSS 樣式
    var styles = '\
        .service-list {\
            display: flex;\
            flex-direction: column;\
            align-items: center;\
            max-height: 0;\
            overflow: hidden;\
            opacity: 0;\
            transition: all 0.3s ease-out;\
        }\
        .service-list.visible {\
            max-height: 500px;\
            opacity: 1;\
        }\
        .service-list.visible > a {\
            animation: slideInBtn 0.3s ease-out forwards;\
        }\
        .service-list.visible > a:nth-child(1) { animation-delay: 0s; }\
        .service-list.visible > a:nth-child(2) { animation-delay: 0.05s; }\
        .service-list.visible > a:nth-child(3) { animation-delay: 0.1s; }\
        @keyframes slideInBtn {\
            from { opacity: 0; transform: translateY(-10px); }\
            to { opacity: 1; transform: translateY(0); }\
        }\
        .got_to_top:not(.scrolled_up) {\
            height: 0;\
            opacity: 0;\
            visibility: hidden;\
            margin-top: 0;\
        }\
        .fixed-buttons .reserve-btn,\
        .fixed-buttons .service-btn,\
        .fixed-buttons .got_to_top,\
        .fixed-buttons .service-list a {\
            min-width: 45px;\
            min-height: 45px;\
        }\
    ';

    // HTML 模板
    var template = '\
        <div class="fixed-buttons flex items-center flex-col fixed z-50 md:right-[4rem] right-[2rem] md:bottom-[4rem] bottom-[2rem]">\
            <a href="' + CONFIG.reserveLink + '"\
                class="reserve-btn group size-[4.5rem] bg-[#C09771] hover:bg-[#a8835f] transition-all duration-300 flex items-center justify-center rounded-full border border-[#C09771] hover:border-[#a8835f]">\
                <span class="text-white text-[1.2rem] font-bold">\u9810\u7D04</span>\
            </a>\
            <button id="service-toggle-btn"\
                class="service-btn group md:mt-[1.5rem] mt-[0.8rem] size-[4.5rem] bg-black hover:bg-[#C09771] transition-all duration-300 flex items-center justify-center rounded-full border border-black hover:border-[#C09771] cursor-pointer"\
                aria-expanded="false" aria-label="\u5BA2\u670D">\
                <span class="text-white text-[1.2rem] font-bold">\u5BA2\u670D</span>\
            </button>\
            <div id="service-list" class="service-list">\
                <a href="' + CONFIG.igLink + '" target="_blank"\
                    class="group md:mt-[1.5rem] mt-[0.8rem] size-[4.5rem] bg-black hover:bg-[#C09771] transition-all duration-300 flex items-center justify-center rounded-full border border-black hover:border-[#C09771]">\
                    <svg class="w-[2.3rem]" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <path d="M11.3901 5.54706C8.15864 5.54706 5.55214 8.15356 5.55214 11.385C5.55214 14.6165 8.15864 17.223 11.3901 17.223C14.6215 17.223 17.228 14.6165 17.228 11.385C17.228 8.15356 14.6215 5.54706 11.3901 5.54706ZM11.3901 15.1804C9.30184 15.1804 7.59466 13.4783 7.59466 11.385C7.59466 9.29168 9.29676 7.58958 11.3901 7.58958C13.4834 7.58958 15.1855 9.29168 15.1855 11.385C15.1855 13.4783 13.4783 15.1804 11.3901 15.1804ZM18.8285 5.30826C18.8285 6.06531 18.2188 6.66994 17.4668 6.66994C16.7098 6.66994 16.1052 6.06023 16.1052 5.30826C16.1052 4.55629 16.7149 3.94658 17.4668 3.94658C18.2188 3.94658 18.8285 4.55629 18.8285 5.30826ZM22.6951 6.69026C22.6087 4.86622 22.1921 3.2505 20.8558 1.91931C19.5246 0.588113 17.9089 0.17148 16.0848 0.080024C14.2049 -0.0266747 8.57019 -0.0266747 6.69026 0.080024C4.8713 0.166399 3.25558 0.583032 1.91931 1.91423C0.583032 3.24542 0.17148 4.86114 0.080024 6.68518C-0.0266747 8.56511 -0.0266747 14.1998 0.080024 16.0798C0.166399 17.9038 0.583032 19.5195 1.91931 20.8507C3.25558 22.1819 4.86622 22.5985 6.69026 22.69C8.57019 22.7967 14.2049 22.7967 16.0848 22.69C17.9089 22.6036 19.5246 22.187 20.8558 20.8507C22.187 19.5195 22.6036 17.9038 22.6951 16.0798C22.8018 14.1998 22.8018 8.57019 22.6951 6.69026ZM20.2664 18.0969C19.8701 19.0927 19.1029 19.8599 18.1019 20.2613C16.6031 20.8558 13.0465 20.7186 11.3901 20.7186C9.73372 20.7186 6.17201 20.8507 4.67823 20.2613C3.68238 19.865 2.91516 19.0978 2.51377 18.0969C1.91931 16.598 2.05649 13.0414 2.05649 11.385C2.05649 9.72864 1.92439 6.16693 2.51377 4.67315C2.91008 3.6773 3.67729 2.91008 4.67823 2.50869C6.17709 1.91423 9.73372 2.05141 11.3901 2.05141C13.0465 2.05141 16.6082 1.91931 18.1019 2.50869C19.0978 2.905 19.865 3.67221 20.2664 4.67315C20.8609 6.17201 20.7237 9.72864 20.7237 11.385C20.7237 13.0414 20.8609 16.6031 20.2664 18.0969Z" class="fill-white transition-colors duration-300" />\
                    </svg>\
                </a>\
                <a href="' + CONFIG.fbLink + '" target="_blank"\
                    class="group md:mt-[1.5rem] mt-[0.8rem] size-[4.5rem] bg-black hover:bg-[#C09771] transition-all duration-300 flex items-center justify-center rounded-full border border-black hover:border-[#C09771]">\
                    <svg class="w-[1.2rem]" width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <path d="M10.9921 12.3541L11.6021 8.37933H7.78822V5.79999C7.78822 4.71257 8.32099 3.65261 10.0291 3.65261H11.763V0.26853C11.763 0.26853 10.1895 0 8.68518 0C5.54433 0 3.49132 1.90373 3.49132 5.35001V8.37933H0V12.3541H3.49132V21.9628H7.78822V12.3541H10.9921Z" class="fill-white transition-colors duration-300" />\
                    </svg>\
                </a>\
                <a href="' + CONFIG.lineLink + '" target="_blank"\
                    class="group md:mt-[1.5rem] mt-[0.8rem] size-[4.5rem] bg-black hover:bg-[#C09771] transition-all duration-300 flex items-center justify-center rounded-full border border-black hover:border-[#C09771]">\
                    <svg class="w-[2.8rem]" width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <path d="M11.7092 22.8359C13.3466 23.1929 13.1588 23.8007 12.7908 26.0341C12.7307 26.3912 12.5054 27.4319 14 26.8014C15.4946 26.1709 22.059 22.0002 25.0032 18.5817C27.0311 16.3255 28 14.0388 28 11.5091V11.4939C28 5.1582 21.7135 0 14 0C6.28648 0 0 5.1582 0 11.4939C0 17.1687 4.97961 21.9319 11.7092 22.8359ZM19.1373 8.70589C19.1373 8.54636 19.2725 8.42481 19.4152 8.42481H23.3358C23.4861 8.42481 23.6062 8.56155 23.6137 8.70589V9.69347C23.6137 9.85301 23.4936 9.97455 23.3358 9.97455H20.6695V11.0153H23.3358C23.4936 11.0153 23.6137 11.1369 23.6137 11.2964V12.2916C23.6137 12.4511 23.4936 12.5726 23.3358 12.5726H20.6695V13.6058H23.3358C23.4936 13.6058 23.6137 13.7274 23.6137 13.8869V14.8821C23.6137 15.0416 23.4936 15.1631 23.3358 15.1631H19.4152C19.2575 15.1631 19.1373 15.0264 19.1373 14.8821V8.70589ZM12.3777 8.71349C12.3777 8.55396 12.4979 8.43241 12.6556 8.43241H13.6245C13.7071 8.43241 13.8047 8.47799 13.8498 8.55396L16.6513 12.3751V8.71349C16.6513 8.55396 16.7715 8.43241 16.9292 8.43241H17.9056C18.0633 8.42481 18.191 8.55396 18.191 8.6983V8.70589V14.8821C18.191 15.0416 18.0708 15.1631 17.9131 15.1631H16.9367C16.8391 15.1631 16.7564 15.11 16.7114 15.0492L13.9099 11.228V14.8897C13.9099 15.0492 13.7897 15.1707 13.632 15.1707H12.6556C12.4979 15.1707 12.3777 15.0492 12.3777 14.8897V8.71349ZM9.89914 8.70589C9.89914 8.54636 10.0193 8.42481 10.177 8.42481H11.1534C11.3112 8.42481 11.4313 8.56155 11.4313 8.70589V14.8821C11.4313 15.0416 11.3112 15.1631 11.1534 15.1631H10.177C10.0193 15.1631 9.89914 15.0416 9.89914 14.8821V8.70589ZM4.58906 8.70589C4.58906 8.54636 4.70923 8.42481 4.86695 8.42481H5.84335C6.00107 8.42481 6.12124 8.54636 6.12124 8.70589V13.5982H8.78755C8.93026 13.5982 9.05043 13.735 9.05043 13.8793V14.8669C9.05043 15.0264 8.93026 15.148 8.77253 15.148H4.85193C4.77682 15.148 4.71674 15.1176 4.66416 15.072C4.61159 15.0188 4.58906 14.958 4.58906 14.8821V8.70589Z" class="fill-white transition-colors duration-300" />\
                    </svg>\
                </a>\
            </div>\
            <button class="group md:mt-[1.5rem] mt-[0.8rem] got_to_top overflow-hidden cursor-pointer size-[4.5rem] bg-white hover:bg-[#C09771] transition-all duration-300 flex items-center justify-center rounded-full border border-[#C09771]">\
                <svg class="w-[1.6rem]" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M15 7L8 1L0.999999 7" stroke="#C09771" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-[#C09771] group-hover:stroke-white transition-colors duration-300" />\
                </svg>\
            </button>\
        </div>\
    ';

    function init() {
        var styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);

        document.body.insertAdjacentHTML('beforeend', template);

        bindEvents();
    }

    function bindEvents() {
        var toggleBtn = document.getElementById('service-toggle-btn');
        var serviceList = document.getElementById('service-list');
        var fixedButtons = document.querySelector('.fixed-buttons');
        var goToTop = document.querySelector('.fixed-buttons .got_to_top');

        if (toggleBtn && serviceList) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var isVisible = serviceList.classList.contains('visible');
                if (isVisible) {
                    serviceList.classList.remove('visible');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                } else {
                    serviceList.classList.add('visible');
                    toggleBtn.setAttribute('aria-expanded', 'true');
                }
            });

            document.addEventListener('click', function(e) {
                if (fixedButtons && !fixedButtons.contains(e.target) && serviceList.classList.contains('visible')) {
                    serviceList.classList.remove('visible');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        if (goToTop) {
            goToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            function checkScroll() {
                if (window.scrollY > 200) {
                    goToTop.classList.add('scrolled_up');
                } else {
                    goToTop.classList.remove('scrolled_up');
                }
            }

            window.addEventListener('scroll', checkScroll);
            checkScroll();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

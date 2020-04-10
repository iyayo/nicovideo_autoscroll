let old_title = " ";

function scroll(tag) {
    let offset, header_size, top;
    offset = $(tag).offset();
    // "px"という文字を除去して数字のみにする
    header_size = $("#siteHeaderInner").css("height").slice(0, -2);
    top = offset.top;

    $(window).scrollTop(top - header_size);
}

function sync() {
    // setIntervalで定義する間隔
    const interval = 1000;
    const jsInitCheckTimer = setInterval(jsLoaded, interval);
    // ページ移動時、null以外で異なる動画タイトルが見つかるまでループする
    function jsLoaded() {
        // 動画タイトルでサイトが切り替わったかを識別する
        let target = document.querySelector('.VideoTitle').textContent;
        if (target != null && target != old_title) {
            clearInterval(jsInitCheckTimer);
            old_title = target;
            getLocalStorageOption().then(function (value) {
                scroll(value);
            });
        }
    }
}


function getLocalStorageOption() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(['nvas_tag'], function (value) {
            if (value.nvas_tag !== undefined){
                resolve(value.nvas_tag);
            } else {
                resolve(".TagContainer");
            }
        });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == "access") {
        sendResponse({ farewell: "goodbye" });
        sync();
    } else if (request.message == "click") {
        sendResponse({ farewell: "goodbye" });
        getLocalStorageOption().then(function (value) {
            scroll(value);
        });
    }
});

$(window).on('load', function () {
    getLocalStorageOption().then(function (value) {
        scroll(value);
    });
});
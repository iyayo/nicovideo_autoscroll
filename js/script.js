let old_title = " ";

window.onload = function () {
    getLocalStorageOption()
    .then((value) => {
        windowScroll(value);
    })
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "access") {
        scanVideoTitle()
        .then(() => {
            return getLocalStorageOption();
        })
        .then((value) => {
            windowScroll(value);
        })
        .catch((error) => {
            console.log(error);
        });
    } else if (request.message == "click") {
       getLocalStorageOption()
       .then((value) => {
           windowScroll(value);
       });
    }
    return true
});

function scanVideoTitle() {
    return new Promise ((resolve, reject) => {
        const jsInitCheckTimer = setInterval(jsLoaded, 1000);
        function jsLoaded() {
            let target = document.querySelector('.VideoTitle');
            if (target != null && target.textContent != old_title) {
                clearInterval(jsInitCheckTimer);
                old_title = target;
                resolve();
            }
        }
    });
}

function getLocalStorageOption() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['nvas_tag'], (value) => {
            if (value.nvas_tag !== undefined) {
                resolve(value.nvas_tag);
            } else {
                resolve(".TagContainer");
            }
        });
    });
}

function windowScroll(tag) {
    let rect = document.querySelector(tag).getBoundingClientRect(),
        header = document.querySelector('#CommonHeader'),
        header_size = window.getComputedStyle(header, null).getPropertyValue('height').slice(0, -2),
        position = rect.top - header_size;

    window.scrollBy(0, position);
}
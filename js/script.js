let old_title = " ";

window.onload = function () {
    getLocalStorageOption()
    .then((value) => {
        windowScroll(value.nvas_tag, value.nvas_header);
    })
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "access") {
        scanVideoTitle()
        .then(() => {
            return getLocalStorageOption();
        })
        .then((value) => {
            windowScroll(value.nvas_tag, value.nvas_header);
        })
        .catch((error) => {
            console.log(error);
        });
    } else if (request.message == "click") {
       getLocalStorageOption()
       .then((value) => {
           windowScroll(value.nvas_tag, value.nvas_header);
       });
    }
    return true;
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
        chrome.storage.local.get(['nvas_tag', 'nvas_header'], (value) => {
            if (value.nvas_tag !== undefined) {
                resolve(value);
            } else {
                resolve({'nvas_tag': '.TagContainer', 'nvas_header': true});
            }
        });
    });
}

function windowScroll(tag, header_option) {
    let rect = document.querySelector(tag).getBoundingClientRect();
    let position = rect.top;
    if (header_option == true){
        let header = document.querySelector('#CommonHeader');
        let header_size = window.getComputedStyle(header, null).getPropertyValue('height').slice(0, -2);
        position = rect.top - header_size;
    }

    window.scrollBy(0, position);
}
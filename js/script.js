window.onload = function () {
    getLocalStorageOption()
        .then((storage) => {
            windowScroll(storage.nvas_tag, storage.nvas_header);
            return storage;
        })
        .then((storage) => {
            const observer = new MutationObserver(() => {
                windowScroll(storage.nvas_tag, storage.nvas_header);
            });

            let target = document.querySelector("title");
            const config = { childList: true, characterData: true };
            observer.observe(target, config);
        });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "click") {
        sendResponse({message: "goodbye"});
        getLocalStorageOption()
            .then((storage) => {
                windowScroll(storage.nvas_tag, storage.nvas_header);
            });
    }
});

function getLocalStorageOption() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["nvas_tag", "nvas_header"], (storage) => {
            if (storage.nvas_tag !== undefined) {
                resolve(storage);
            } else {
                resolve({ "nvas_tag": ".TagContainer", "nvas_header": true });
            }
        });
    });
}

function windowScroll(tag, header_option) {
    let rect = document.querySelector(tag).getBoundingClientRect();
    let position = rect.top;
    if (header_option == true) {
        let header = document.querySelector("#CommonHeader");
        let header_size = window.getComputedStyle(header, null).getPropertyValue("height").slice(0, -2);
        position = rect.top - header_size;
    }

    window.scrollBy(0, position);
}
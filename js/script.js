let tag = ".TagContainer";

chrome.storage.local.get(["nvas_tag"], (result) => {
    if (result.nvas_tag !== undefined) {
        tag = result.nvas_tag;
    }
});

chrome.storage.local.onChanged.addListener(result => {
    if (result.nvas_tag){
        tag = result.nvas_tag.newValue;
    }
});

windowScroll(tag);
const observer = new MutationObserver(() => {
    windowScroll(tag);
});

let target = document.querySelector("title");
const config = { childList: true, characterData: true };
observer.observe(target, config);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "click") {
        windowScroll(tag);
        sendResponse({ message: "goodbye" });
    }
});

function windowScroll(tag) {
    let rect = document.querySelector(tag).getBoundingClientRect();
    let position = rect.top;
    if (allCookies = document.cookie.split(';').some((item) => item.includes("common-header-fixed-disabled=1"))) {
    } else {
        let header = document.querySelector("#CommonHeader");
        let header_size = window.getComputedStyle(header, null).getPropertyValue("height").slice(0, -2);
        position = rect.top - header_size;
    }

    window.scrollBy(0, position);
}
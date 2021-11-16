let tag = ".TagContainer";

chrome.storage.local.get(["nvas_tag"], (result) => {
    if (result.nvas_tag !== undefined) {
        tag = result.nvas_tag;
    }

    windowScroll(tag);
});

chrome.storage.local.onChanged.addListener(result => {
    if (result.nvas_tag){
        tag = result.nvas_tag.newValue;
    }
});

const observer = new MutationObserver(() => {
    windowScroll(tag);
});

let target = document.querySelector("title");
const config = { childList: true, characterData: true };
observer.observe(target, config);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "click") {
        windowScroll(tag);
    }
});

function windowScroll(tag) {
    const interval = setInterval(() => {
        const element = document.querySelector(tag);

        if (element === null) return;

        element.scrollIntoView(true);

        if (!(document.cookie.split(';').some((item) => item.includes("common-header-fixed-disabled=1")))) {
            const header = document.querySelector("#CommonHeader");

            window.scrollBy(0, -header.clientHeight);
        };
        
        clearInterval(interval);
    }, 500);
}
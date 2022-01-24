let tag = ".TagContainer";

const observer = new MutationObserver(() => windowScroll(tag));
const target = document.querySelector("title");
const config = { childList: true };

observer.observe(target, config);

chrome.storage.local.get(["nvas_tag"], result => {
    if (result.nvas_tag !== undefined) tag = result.nvas_tag;

    windowScroll(tag);
});

chrome.storage.local.onChanged.addListener(result => {
    if (result.nvas_tag) tag = result.nvas_tag.newValue;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "click") windowScroll(tag);
});

function windowScroll(tag) {
    const interval = setInterval(() => {
        const element = document.querySelector(tag);

        if (element === null) return;

        element.scrollIntoView(true);

        if (!(document.cookie.split(';').some((item) => item.includes("common-header-fixed-disabled=1")))) {
            const header = document.querySelector(".common-header-cdesjj");

            window.scrollBy(0, -header.clientHeight);
        };

        clearInterval(interval);
    }, 500);
}
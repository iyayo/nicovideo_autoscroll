const regex = /https:\/\/www\.nicovideo\.jp\/watch\/.*/;

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId !== 0) {
        return;
    }

    if (details.url.match(regex)) {
        chrome.tabs.sendMessage(details.tabId, { message: "access" }, (response) => {});
    }
});

chrome.browserAction.onClicked.addListener((tab) => {
    if (tab.url.match(regex)) {
        chrome.tabs.sendMessage(tab.id, { message: "click" }, (response) => {});
    }
});
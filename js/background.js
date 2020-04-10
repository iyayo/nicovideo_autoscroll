const regex = /https:\/\/www\.nicovideo\.jp\/watch\/.*/;

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    if (details.frameId !== 0) {
        return;
    }

    if (details.url.match(regex)) {
        chrome.tabs.sendMessage(details.tabId, { message: "access" }, function (response) {
            console.log(response.farewell);
        });
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab.url.match(regex)) {
        chrome.tabs.sendMessage(tab.id, { message: "click" }, function (response) {
            console.log(response.farewell);
        });
    }
});
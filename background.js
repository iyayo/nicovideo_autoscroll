chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll()
    chrome.contextMenus.create({
        id: "scroll",
        title: "スクロール",
        documentUrlPatterns: ["https://www.nicovideo.jp/watch/*"]
    })
});

chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tab => {
        chrome.tabs.sendMessage(tab[0].id, {message: "click"});
    });
});

chrome.action.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id, {message: "click"});
});
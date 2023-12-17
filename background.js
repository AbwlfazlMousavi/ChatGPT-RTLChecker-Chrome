chrome.action.onClicked.addListener((tab) => {
    if(tab.url.includes("chat.openai.com")) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['content.js']
        });
    }
});

// List of domains classified as productive or unproductive
const productiveSites = [
  'github.com', 'stackoverflow.com', 'leetcode.com', 'codepen.io', 'developer.mozilla.org'
];

const unproductiveSites = [
  'facebook.com', 'youtube.com', 'instagram.com', 'twitter.com', 'reddit.com'
];

let activeTabId = null;
let activeDomain = null;
let lastActiveTime = Date.now();

const timeSpentPerDomain = {};

// Utility to extract domain from URL
function getDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return null;
  }
}

// Called when tab or window changes
async function handleActiveTabChange(tabId) {
  const now = Date.now();

  // Save time spent on previous domain
  if (activeDomain) {
    const diff = now - lastActiveTime;
    if (!timeSpentPerDomain[activeDomain]) timeSpentPerDomain[activeDomain] = 0;
    timeSpentPerDomain[activeDomain] += diff;
  }

  lastActiveTime = now;

  // Update activeTabId and activeDomain
  activeTabId = tabId;
  try {
    const tab = await chrome.tabs.get(tabId);
    activeDomain = getDomain(tab.url);
  } catch {
    activeDomain = null;
  }
}

// Listen to tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await handleActiveTabChange(activeInfo.tabId);
});

// Listen to window focus changes
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // User unfocused Chrome window
    if (activeDomain) {
      const now = Date.now();
      const diff = now - lastActiveTime;
      if (!timeSpentPerDomain[activeDomain]) timeSpentPerDomain[activeDomain] = 0;
      timeSpentPerDomain[activeDomain] += diff;
    }
    activeDomain = null;
    activeTabId = null;
  } else {
    const [tab] = await chrome.tabs.query({ active: true, windowId });
    if (tab) {
      await handleActiveTabChange(tab.id);
    }
  }
});

// Save data periodically to storage
setInterval(() => {
  chrome.storage.local.set({ timeSpentPerDomain });
}, 10 * 1000);

// Initialize on startup
chrome.runtime.onStartup.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    await handleActiveTabChange(tab.id);
  }
});

// Respond to popup requests for data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getData') {
    chrome.storage.local.get(['timeSpentPerDomain'], (result) => {
      sendResponse({ data: result.timeSpentPerDomain || {} });
    });
    return true; // async response
  }
});

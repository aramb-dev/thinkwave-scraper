// Initialize default value
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('assignments', (data) => {
    if (!data.assignments) {
      chrome.storage.local.set({ assignments: [] });
    }
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "assignments_updated") {
    // Update the badge with the number of assignments
    updateBadge();
  }
});

// Update the badge with the number of upcoming assignments
function updateBadge() {
  chrome.storage.local.get('assignments', ({ assignments }) => {
    if (!assignments || assignments.length === 0) {
      chrome.action.setBadgeText({ text: "" });
      return;
    }

    // Count upcoming assignments
    const now = new Date();
    const upcoming = assignments.filter(a => {
      if (!a.dateObj) return false;
      const dueDate = new Date(a.dateObj);
      return dueDate >= now;
    });

    chrome.action.setBadgeText({ text: upcoming.length.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
  });
}

// Update the badge whenever the extension is activated
chrome.action.onClicked.addListener(() => {
  updateBadge();
});

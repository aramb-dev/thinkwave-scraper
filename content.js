console.log("ThinkWave Tracker content script running...");

function parseDueDate(rawDate) {
  try {
    // Expected format: "20 May 2025"
    const [day, monthStr, year] = rawDate.split(" ");
    const monthMap = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const month = monthMap[monthStr];
    if (month === undefined) return null;
    return new Date(parseInt(year), month, parseInt(day));
  } catch {
    return null;
  }
}

const assignments = [];
document.querySelectorAll("div.collapse-head.clearfix").forEach(block => {
  const name = block.querySelector("b")?.innerText.trim() || "No Title";
  const rawDate = [...block.querySelectorAll("b")].find(b => /\d{1,2} \w{3,4} \d{4}/.test(b.innerText))?.innerText.trim();
  const dueDate = rawDate || "No Date";
  const className = block.querySelector(".txt-gray")?.innerText.trim() || "Unknown Class";

  const dateObj = rawDate ? parseDueDate(rawDate) : null;
  assignments.push({ name, dueDate, className, dateObj });
});

console.log("Extracted assignments:", assignments);
chrome.storage.local.set({ assignments });

// Notify the background script that we've updated assignments
chrome.runtime.sendMessage({ action: "assignments_updated", count: assignments.length });

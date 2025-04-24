const assignments = [];
document.querySelectorAll("div.collapse-head.clearfix").forEach(block => {
  const name = block.querySelector("b")?.innerText.trim() || "No Title";
  const dueDate = [...block.querySelectorAll("b")].find(b => /\d{1,2} \w{3} \d{4}/.test(b.innerText))?.innerText.trim() || "No Date";
  const className = block.querySelector(".txt-gray")?.innerText.trim() || "Unknown Class";

  assignments.push({ name, dueDate, className });
});

chrome.storage.local.set({ assignments });

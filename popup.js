document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("assignments", ({ assignments }) => {
      const container = document.getElementById("assignment-list");
      if (!assignments || assignments.length === 0) {
        container.innerText = "No assignments found.";
        return;
      }
      container.innerHTML = assignments.map(a => `
        <div class="assignment">
          <strong>${a.name}</strong><br>
          <em>${a.className}</em><br>
          Due: ${a.dueDate}
        </div>`
      ).join('');
    });
  });

function renderAssignments(assignments, filter) {
  const container = document.getElementById("assignment-list");
  const now = new Date();
  let filtered = assignments;

  // Convert date strings back to Date objects
  filtered.forEach(a => {
    if (a.dateObj) {
      a.dateObj = new Date(a.dateObj);
    }
  });

  if (filter === "upcoming") {
    filtered = assignments.filter(a => a.dateObj && a.dateObj >= now);
  }

  if (!filtered.length) {
    container.innerText = "No assignments to display.";
    return;
  }

  // Sort assignments by due date (closest first)
  filtered.sort((a, b) => {
    if (!a.dateObj) return 1;
    if (!b.dateObj) return -1;
    return a.dateObj - b.dateObj;
  });

  container.innerHTML = filtered.map(a => `
    <div class="assignment">
      <strong>${a.name}</strong><br>
      <em>${a.className}</em><br>
      Due: ${a.dueDate}
    </div>`).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("filter");
  chrome.storage.local.get("assignments", ({ assignments }) => {
    if (!assignments || assignments.length === 0) {
      document.getElementById("assignment-list").innerText = "No assignments found.";
      return;
    }
    renderAssignments(assignments, filterSelect.value);
    filterSelect.addEventListener("change", () => renderAssignments(assignments, filterSelect.value));
  });
});

let members = JSON.parse(localStorage.getItem("members") || "[]");

function save() {
  localStorage.setItem("members", JSON.stringify(members));
}

function render() {
  const container = document.getElementById("members");
  container.innerHTML = "";

  members.forEach((m, index) => {
    const div = document.createElement("div");
    div.className = "member";

    div.innerHTML = `
      <span>${m.name}</span>
      <span class="count">${m.count}</span>
      <button onclick="vote(${index})">+1</button>
      <button class="edit-btn" onclick="editMember(${index})">✎</button>
      <button class="delete-btn" onclick="deleteMember(${index})">🗑</button>
    `;

    container.appendChild(div);
  });
}

function vote(index) {
  members[index].count++;
  tapFeedback();
  save();
  render();
}

function addMember() {
  const name = prompt("Name?");
  if (!name) return;

  members.push({
    name: name.trim(),
    count: 0
  });

  save();
  render();
}

function editMember(index) {
  const current = members[index];
  const newName = prompt("Neuer Name:", current.name);
  if (!newName) return;

  members[index].name = newName.trim();
  save();
  render();
}

function deleteMember(index) {
  if (!confirm("Mitglied wirklich löschen?")) return;

  members.splice(index, 1);
  save();
  render();
}

function resetVotes() {
  if (!confirm("Alle Zähler wirklich auf 0 setzen?")) return;

  members.forEach(m => m.count = 0);
  save();
  render();
}

// Mini-Vibration beim Tippen (iPhone + Android)
function tapFeedback() {
  if (navigator.vibrate) navigator.vibrate(15);
}

render();
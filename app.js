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
      <span><b>${m.short}</b> – ${m.name}</span>
      <span>${m.count}</span>
      <button onclick="vote(${index})">+1</button>
    `;

    container.appendChild(div);
  });
}

function vote(index) {
  members[index].count++;
  save();
  render();
}

function addMember() {
  const name = prompt("Name des Mitglieds?");
  if (!name) return;

  const short = prompt("Kürzel?");
  if (!short) return;

  members.push({
    name,
    short: short.toUpperCase(),
    count: 0
  });

  save();
  render();
}

function resetVotes() {
  members.forEach(m => m.count = 0);
  save();
  render();
}

render();
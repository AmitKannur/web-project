async function loginAdmin() {
  let username = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  let res = await fetch("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  let data = await res.json();

  if (data.success) {
    alert("Login Successful");
    window.location.href = "admin.html";
  } else alert("Invalid Login");
}

async function addCandidate() {
  let name = document.getElementById("cname").value;
  let dept = document.getElementById("dept").value;

  let res = await fetch("/admin/addCandidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, dept })
  });

  let data = await res.json();

  if (data.success) alert("Candidate Added");
}

async function loadCandidates() {
  let res = await fetch("/candidates");
  let list = await res.json();

  let box = document.getElementById("candidateList");
  box.innerHTML = "";

  list.forEach(c => {
    box.innerHTML += `
      <div class="container">
        <h3>${c.name}</h3>
        <p>${c.dept}</p>
        <button onclick="vote('${c.name}')">Vote</button>
      </div>
    `;
  });
}

async function vote(name) {
  let res = await fetch("/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidate: name })
  });

  let data = await res.json();
  if (data.success) alert("Vote Submitted");
}

async function loadResults() {
  let res = await fetch("/results");
  let results = await res.json();

  let box = document.getElementById("results");

  box.innerHTML = "";
  for (let c in results) {
    box.innerHTML += `<h3>${c}: ${results[c]} votes</h3>`;
  }
}

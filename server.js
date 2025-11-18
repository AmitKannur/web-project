import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DATA_FILE = "./data.json";

// Load JSON data
function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save JSON data
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ---------------- ADMIN LOGIN ----------------
app.post("/admin/login", (req, res) => {
  const data = loadData();
  const { username, password } = req.body;

  if (username === data.admin.username && password === data.admin.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ---------------- ADD ELECTION ----------------
app.post("/admin/addElection", (req, res) => {
  const data = loadData();
  const { title, start, end } = req.body;

  if (!data.elections) data.elections = [];

  data.elections.push({ title, start, end });
  saveData(data);

  res.json({ success: true });
});

// ---------------- GET ELECTIONS ----------------
app.get("/elections", (req, res) => {
  const data = loadData();
  res.json(data.elections || []);
});

// ---------------- ADD CANDIDATE ----------------
app.post("/admin/addCandidate", (req, res) => {
  const data = loadData();
  const { name, dept, election } = req.body;

  data.candidates.push({ name, dept, election });
  saveData(data);

  res.json({ success: true });
});

// ---------------- GET CANDIDATES ----------------
app.get("/candidates", (req, res) => {
  const data = loadData();
  res.json(data.candidates);
});

// ---------------- CAST VOTE ----------------
app.post("/vote", (req, res) => {
  const data = loadData();
  const { candidate } = req.body;

  if (!data.votes[candidate]) data.votes[candidate] = 0;
  data.votes[candidate]++;

  saveData(data);
  res.json({ success: true });
});

// ---------------- GET RESULTS ----------------
app.get("/results", (req, res) => {
  const data = loadData();
  res.json(data.votes);
});

// ---------------- START SERVER ----------------
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

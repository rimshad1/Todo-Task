const db = require("../config/db");

const getTasks = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM task WHERE completed = 0 ORDER BY id DESC LIMIT 5"
    );
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    await db.query(
      "INSERT INTO task (title, description, completed) VALUES (?, ?, 0)",
      [title, description]
    );
    res.status(200).json({ success: true, message: "Task added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const markDone = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE task SET completed = 1 WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Task marked complete" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getTasks, addTask, markDone };

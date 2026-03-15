const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* --------------------------
   Root Route
---------------------------*/

app.get("/", (req, res) => {
  res.send("Student Management System API Running");
});


/* --------------------------
   Admin Login
---------------------------*/

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {

    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }

  });

});


/* --------------------------
   Get Students (Search + Pagination + Sorting)
---------------------------*/

app.get("/students", (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";
  const sort = req.query.sort || "id";

  const offset = (page - 1) * limit;

  const sql = `
  SELECT * FROM students
  WHERE name LIKE ? OR email LIKE ? OR course LIKE ?
  ORDER BY ${sort} ASC
  LIMIT ? OFFSET ?
  `;

  db.query(
    sql,
    [`%${search}%`, `%${search}%`, `%${search}%`, limit, offset],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json(result);

    }
  );

});


/* --------------------------
   Add Student
---------------------------*/

app.post("/students", (req, res) => {

  const { name, email, phone, course } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and Email are required"
    });
  }

  const sql =
    "INSERT INTO students (name,email,phone,course) VALUES (?,?,?,?)";

  db.query(sql, [name, email, phone, course], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Insert failed" });
    }

    res.json({
      message: "Student Added Successfully"
    });

  });

});


/* --------------------------
   Update Student
---------------------------*/

app.put("/students/:id", (req, res) => {

  const id = req.params.id;
  const { name, email, phone, course } = req.body;

  const sql =
    "UPDATE students SET name=?, email=?, phone=?, course=? WHERE id=?";

  db.query(sql, [name, email, phone, course, id], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Update failed" });
    }

    res.json({
      message: "Student Updated Successfully"
    });

  });

});


/* --------------------------
   Delete Student
---------------------------*/

app.delete("/students/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM students WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Delete failed" });
    }

    res.json({
      message: "Student Deleted Successfully"
    });

  });

});


/* --------------------------
   Start Server
---------------------------*/

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
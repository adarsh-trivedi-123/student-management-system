const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Student Management System API Running");
});

// Get all students
app.get("/students", (req, res) => {

  db.query("SELECT * FROM students", (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }

  });

});

// Add student
app.post("/students", (req, res) => {

  const { name, email, phone, course } = req.body;

  const sql = "INSERT INTO students (name,email,phone,course) VALUES (?,?,?,?)";

  db.query(sql, [name, email, phone, course], (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Student Added Successfully" });
    }

  });

});

// Update student
app.put("/students/:id", (req, res) => {

  const id = req.params.id;
  const { name, email, phone, course } = req.body;

  const sql = "UPDATE students SET name=?, email=?, phone=?, course=? WHERE id=?";

  db.query(sql, [name, email, phone, course, id], (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Student Updated Successfully" });
    }

  });

});

// Delete student
app.delete("/students/:id", (req, res) => {

  const id = req.params.id;

  db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {

    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Student Deleted Successfully" });
    }

  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
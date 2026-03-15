const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",   // apna MySQL password
  database: "student_management"
});

// Connect database
db.connect((err) => {

  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }

  console.log("✅ Connected to MySQL database");

});

module.exports = db;
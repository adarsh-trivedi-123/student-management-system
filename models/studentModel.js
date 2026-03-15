const db = require("../config/db");

exports.getStudents = (callback) => {

db.query("SELECT * FROM students", callback);

};

exports.addStudent = (data, callback) => {

const sql = "INSERT INTO students (name,email,phone,course) VALUES (?,?,?,?)";

db.query(sql,[data.name,data.email,data.phone,data.course],callback);

};

exports.updateStudent = (id,data,callback) => {

const sql = "UPDATE students SET name=?,email=?,phone=?,course=? WHERE id=?";

db.query(sql,[data.name,data.email,data.phone,data.course,id],callback);

};

exports.deleteStudent = (id,callback) => {

db.query("DELETE FROM students WHERE id=?",[id],callback);

};
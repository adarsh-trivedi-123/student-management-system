let editId = null;

// Load students
async function loadStudents(){

const res = await fetch("/students");
const students = await res.json();

const table = document.getElementById("studentTable");

table.innerHTML = "";

students.forEach(student => {

table.innerHTML += `
<tr>

<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.email}</td>
<td>${student.phone}</td>
<td>${student.course}</td>

<td>

<button class="btn btn-warning btn-sm"
onclick="editStudent(${student.id},'${student.name}','${student.email}','${student.phone}','${student.course}')">

Edit

</button>

<button class="btn btn-danger btn-sm"
onclick="deleteStudent(${student.id})">

Delete

</button>

</td>

</tr>
`;

});
}
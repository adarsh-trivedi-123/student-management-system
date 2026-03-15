const studentModel = require("../models/studentModel");

exports.getStudents = (req,res)=>{

studentModel.getStudents((err,result)=>{

if(err) return res.status(500).send(err);

res.json(result);

});

};

exports.addStudent = (req,res)=>{

studentModel.addStudent(req.body,(err,result)=>{

if(err) return res.status(500).send(err);

res.json({message:"Student Added Successfully"});

});

};

exports.updateStudent = (req,res)=>{

const id = req.params.id;

studentModel.updateStudent(id,req.body,(err,result)=>{

if(err) return res.status(500).send(err);

res.json({message:"Student Updated Successfully"});

});

};

exports.deleteStudent = (req,res)=>{

const id = req.params.id;

studentModel.deleteStudent(id,(err,result)=>{

if(err) return res.status(500).send(err);

res.json({message:"Student Deleted Successfully"});

});

};
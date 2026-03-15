const db = require("../db");

exports.login = (req,res)=>{

const {username,password} = req.body;

const sql = "SELECT * FROM admin WHERE username=? AND password=?";

db.query(sql,[username,password],(err,result)=>{

if(err){
return res.status(500).send(err);
}

if(result.length > 0){
res.json({message:"Login successful"});
}else{
res.status(401).json({message:"Invalid credentials"});
}

});

};
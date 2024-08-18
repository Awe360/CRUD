const express=require('express')
const app=express()
const mysql=require('mysql')
const cors=require('cors')
app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'7012',
    database:'crud'

})
db.connect((err)=>{if(err){console.log("error while connecting with the database")
    console.log(err)
    return
}
console.log("database connected successfully")})
app.get('/',(req,res)=>{
    const sql='select * from student'
    db.query(sql,(err,data)=>{if(err){console.log(err),console.log("Error occured");return
}
res.send(data)})
})
app.post('/createStudent',(req,res)=>{
    const [Name,Email]=[req.body.Name,req.body.Email]
    const sql="insert into student(Name,Email)  values(?,?)"
    db.query(sql,[Name,Email],(err,data)=>{
        if(err){res.json(err);return}
        res.json("success")
    })
})
app.put('/UpdateStudent/:id',(req,res)=>{
    const id=req.params.id
    const [Name,Email]=[req.body.Name,req.body.Email]
    const sql="update student set Name=?,Email=? where ID=?"
    db.query(sql,[Name,Email,id],(err,data)=>{
        if(err){res.json(err);return}
        res.json("success")
    })
})
app.get('/UpdateStudent/:id',(req,res)=>{
    const id=req.params.id;
    const sql='select Name,Email from student where ID=?'
    db.query(sql,id,(err,data)=>{if(err){console.log(err);return}
 res.send(data[0])})
})
    

app.delete('/DeleteStudent/:id',(req,res)=>{
    const id=req.params.id
    const sql="delete from student where ID=?"
    db.query(sql,[id],(err,data)=>{
        if(err){res.json(err);return}
        res.json("success")
    })
})


app.listen(3002,()=>{console.log})

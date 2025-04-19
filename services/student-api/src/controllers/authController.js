import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';


const app = express();
app.use(express.json());



export const login=async (req, res) => {

    const {reg_no, password} = req.body;
console.log(req.body);
    if(!reg_no || !password){
        return res.status(401).json({error:"Username or password"});
    }
    const query = `SELECT * FROM student.students WHERE reg_no = $1 AND password_hash = $2`;
    const values = [reg_no, password];

    const result= await db.query(query,values);


    if(result.rows<=0){
        res.status(401).json({error:"Invalid credentials"});
    }else{
        const token =jwt.sign({reg_no, password}, process.env.JWT_SECRET);
        res.status(200).json({token});
    }


}

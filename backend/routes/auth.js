const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRET='Secret@pass$'
const fetchuser=require('../middleware/fetchuser')
router.post('/createuser', [
    body('name').notEmpty().isLength({ min: 3 }),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 5 })
], async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array() });
    }
    try {
        let user = await User.findOne({email: req.body.email });
        if (user) {
            return res.status(400).json({success,error: "User Already Exists" })
        }
        const salt=await bcrypt.genSalt(10)
        secPass=await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        success=true
        const about={
            name:user.name,
            email:user.email
        }
        res.json({success,authToken,about})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

router.post('/login', [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 5 })
], async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array() });
    }
const {email,password}=req.body
try{
    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({success,error:"Enter correct credentials"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password)
    if(!passwordCompare){
        return res.status(400).json({success,error:"Enter correct credentials"})
    }
    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET)
    success=true
    const about={
        name:user.name,
        email:user.email
    }
    res.json({success,authToken,about})

}catch(error){
    console.error(error.message);
        res.status(500).send("Internal Server Error")
}
})

router.post('/getuser',fetchuser, async (req, res) => {
try{
    userId=req.user.id
    const user=await User.findById(userId).select("-password")
    res.send(user)
}
catch(error){
    console.error(error.message);
        res.status(500).send("Internal Server Error")
}
})
module.exports = router
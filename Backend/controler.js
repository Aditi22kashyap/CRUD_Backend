const express = require('express');
const { users } = require('./UserSchema');
const {records} = require('./RecordSchema');
const usercontrol = express.Router();
// get all records end point
usercontrol.get('/allrecord',async (req,res)=>{
     try {
        const allrecord = await records.find();
       res.send({
        res:"success",
        data:allrecord
       });
     } catch (error) {
        console.log(error);
        res.send({
            res:"somthing went wrong",
            error:"Internal server Error"
        },501); 
     }
});
// create new record end point
usercontrol.post('/createrecord',async(req,res)=>{
    try {
        const record = req.body;
        const createuser = await records.create(record);
        res.send({
            res:"succsess",
            data:record
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error:error,
            res:"intenal server error"
        })
    }
})
// delete a record end point
usercontrol.delete('/delete/:id',async (req,res)=>{
    try {
       const id = req.params.id; 
       await records.findByIdAndDelete(id);
       res.send({
        res: "record deleted successfully",
       })
    } catch (error) {
        console.log(error);
        res.send({
            res:"somthing went wrong",
            error:"Internal server Error"
        },501); 
    }
})
// delete multiple record by ids end point
usercontrol.delete('/deletemultiple',async (req,res)=>{
    try {
        let selected = req.body.selected;
        await records.deleteMany({ _id: { $in: selected }});
       res.send({
        res: "deleted successfully",
       })
    } catch (error) {
        console.log(error);
        res.send({
            res:"somthing went wrong",
            error:"Internal server Error"
        },501); 
    }
})
// update record by id end point
usercontrol.put('/update/:id',async(req,res)=>{
     try {
        const id = req.params.id;
        const body = req.body;
        console.log(body);
        await records.findByIdAndUpdate(id,body);
        res.send({
            res:"database updated",
        });
     } catch (error) {
        console.log(error);
        res.status(500).send({
            res:"Somthing went wrong"
        })
     }
})
// Get records by status end point
usercontrol.get('/records/:status',async(req,res)=>{
    try {
      const status = req.params.status;
      const records = await records.find({status});
      res.send({
        res:"success",
        data:records
      }) ; 
    } catch (error) {
      console.log(error);  
    }
})
// check user details and login end point
usercontrol.post('/login',async(req,res)=>{
    try {
        const userdata = req.body;
      const user = await users.findOne({email:userdata.email});
      if(user&&user.password===userdata.password){
        res.send({
            res:"success",
            data:user
          }) ;
      }else{
        res.send({
            res:"error",
            massage:"No user found"
          }) ;
      } 
    } catch (error) {
      console.log(error);  
    }
})
// create user and signup end point
usercontrol.post('/signup',async(req,res)=>{
    try {
        const user = req.body;
        const createuser = await users.create(user);
        res.send({
            res:"succsess",
            data:createuser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error:error,
            res:"intenal server error"
        })
    }
})

module.exports = {
    usercontrol
}
const ListTD = require('../model/listModel')
const User = require('../model/userModel');
  const ListTDController = {
    //get list todo
    getAllList : async(req,res) =>{
        try {
           
            const todo = await ListTD.find({ owner: req.user.id });
            res.status(200).json(todo);
            
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // create todo

    createList : async(req,res)=>{
       try {
        const newToDo = await new ListTD({
           
            title: req.body.title,
            owner: req.user.id
            
        });
        const todolist = await newToDo.save();
        res.status(200).json(todolist);
       } catch (error) {
        res.status(500).json("Create thất bại")
       }

    },

    //delete todo

    deleteList : async(req,res)=>{
        try {
            const todo = await ListTD.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete thành công");
            
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // update todo

    updateList : async(req,res) => {
        try {
            const updateToDo = await ListTD.findByIdAndUpdate(req.params.id,
                {$set : req.body},
                {new:true}
            );
            res.status(200).json("Update thành công")
    
        } catch (error) {
            res.status(500).json(error);
        }
    }
  }
  module.exports = ListTDController;
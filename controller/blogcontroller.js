const { error } = require("node:console");
const {todo}= require("../data/data.js");
const { title } = require("node:process");

const FetchAlltodo=(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            data:todo,
            message:`data fetched successfully!!!`
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message
        })

    }
}

// getsingle

const GetSingle=(req,res)=>{
    try{
        let todoId=parseInt(req.params.id);
        let todo=todo.find(t=>t.id===todoId);
        if(!todo){
            return res.status(404).json({
                success:false,
            message:`todo not found with ${todoId}`,
            
            })
        }
        res.status(200).json({
            success:true,
            body:todo,
            message:`todo data fetched with id ${todoId}`

        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:`something went wrong`,
            error:err.message

        })
        
    }
}


// create
const createData=(req,res)=>{
    try{

        let body= req.body;
        if(!body.title||
            !body.description||
            !body.author
        ){
            return res.status(400).json({
                success:false,
                message:"please provide all data"
            });
        }
        let newdata={
            title:body.title,
            description:body,
            author:body.author,
            id:Date.now()
        }
        todo.push(newdata);
        res.status(201).json({
            success:true,
            body:newdata,

        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message

        })
    }
}


// update
const updtaeTodo=(req,res)=>{
    try{
        let todoId=req.params.id;
        let index= todo.findIndex(t=>t.id===todoId);
        if(index===-1){
            return res.status(404).json({
                success:false,
            message:`todo not found with ${todoId}`,
            
            })
        }
        let updata={
            ...todo[index],
            ...req.body,
            id:todo[index].id
        }
        todo[index]=updata;
        res.status(200).json({
            success:true,
            data:updata
        });
    }catch{
        res.status(500).json({
            success:false,
            message:"server error",
            error:err.message
        })

    }
}


// delete
const deletedata=(req,res)=>{
    try{
        let id=req.params.id;
        let index= todo.findIndex(t=>t.id===id)
        if(index===-1){
            return res.status(404).json({
                success:false,
                message:`todo not found with id${id}`
            })
        }
        todo.splice(index,1);
         res.status(200).json({
            success:true,
            message:`data removed`
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:"server error",
            error:err.message
        })
    }
}

module.exports={
    FetchAlltodo,
    GetSingle,
    createData,
    updtaeTodo
}

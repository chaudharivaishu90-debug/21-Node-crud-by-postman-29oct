const express= require("express");
const router=express.Router();
const controller= require("../controller/blogcontroller");
 
router.get("/",controller.FetchAlltodo);
router.get("/:id",controller.GetSingle);
router.post("/",controller.createData)
router.patch("/:id",controller.updtaeTodo);
router.delete("/:id",controller.updtaeTodo);




module.exports=router;
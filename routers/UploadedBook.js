const router=require("express").Router()
const UploadController=require("../controller/UploadedBook")
const authorize=require("../middleware/authorization")
router.get("/",UploadController.getOwnerUploadedBook)
router.get("/getAll",UploadController.getAllUploadedBook)
router.put('/update/:id',UploadController.UpdateUploadedBook); 

router.delete('/delete/:id',UploadController.DeleteUploadedBook); 
module.exports=router
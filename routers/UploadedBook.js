const router=require("express").Router()
const UploadController=require("../controller/UploadedBook")
const authorize=require("../middleware/authorization")
router.get("/",UploadController.getOwnerUploadedBook)
router.get("/getAll",UploadController.getAllUploadedBook)
router.put('/update/:bookId',UploadController.UpdateUploadedBook); 

router.delete('/delete/:book_number', authorize,UploadController.DeleteUploadedBook); 
module.exports=router
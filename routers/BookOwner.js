const router=require('express').Router()
const BookOwnerController=require("../controller/BookOwner")
router.get("/getAll",BookOwnerController.getBookOwner)
router.put("/approve/:id",BookOwnerController.approveUser)

module.exports=router
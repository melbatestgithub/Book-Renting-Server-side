const router=require('express').Router()
const BookOwnerController=require("../controller/BookOwner")
router.get("/getAll",BookOwnerController.getBookOwner)
router.put("/approve/:id",BookOwnerController.approveUser)
router.delete('/delete/:id',BookOwnerController.deleteUser)
router.get('/get',BookOwnerController.filterBookOwner)

module.exports=router
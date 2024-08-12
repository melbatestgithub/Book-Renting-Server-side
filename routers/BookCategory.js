const router=require("express").Router()
const bookCategoryController=require("../controller/Category")

router.post("/create",bookCategoryController.addCategory)
router.get("/get",bookCategoryController.getCategory)
module.exports=router
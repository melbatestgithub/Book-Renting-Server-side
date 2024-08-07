const router=require("express").Router()
const userController=require("../controller/User")
router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)


module.exports=router
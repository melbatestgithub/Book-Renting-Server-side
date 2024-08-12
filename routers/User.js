const router=require("express").Router()
const userController=require("../controller/User")
router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.put("/update/:id",userController.updateUser)
router.get("/getUsers",userController.getAllUser)


module.exports=router
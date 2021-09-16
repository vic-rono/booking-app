const express = require('express')
const router = express.Router()
const { userRegister, userLogin, getAllUsers }  = require('../controllers/userController');

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/getallusers" , getAllUsers )

module.exports = router;

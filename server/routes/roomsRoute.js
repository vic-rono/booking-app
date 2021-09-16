const express = require("express")
const router = express.Router();

const { getAllRooms, getRoomById, addRoom } = require('../controllers/roomController');


router.get("/getallrooms" , getAllRooms)
router.post("/getroombyid", getRoomById )
router.post("/addroom", addRoom)

module.exports = router
const express = require("express")
const router = express.Router();
const { book, getBookings, cancelBookings, getAllBookings } = require('../controllers/bookingController');


router.post("/bookroom", book)
router.post("/getbookingsbyuserid", getBookings)
router.post("/cancelbooking" , cancelBookings)
router.get ("/getallbookings" , getAllBookings)

module.exports = router
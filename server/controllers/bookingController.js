const express = require("express");

const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.book = async (req, res) => {
  const { room, userid, fromDate, toDate, totalamount, totalDays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      try {
        const newBooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromDate: moment(fromDate).format("DD-MM-YYYY"),
          toDate: moment(toDate).format("DD-MM-YYYY"),
          totalamount,
          totalDays,
          transactionId: "",
        });

        const booking = await newBooking.save();

        const roomSet = await Room.findOne({ _id: room._id });

        roomSet.currentbookings.push({
          bookingid: booking._id,
          fromDate: moment(fromDate).format("DD-MM-YYYY"),
          toDate: moment(toDate).format("DD-MM-YYYY"),
          userid: userid,
          status: booking.status,
        });

        await roomSet.save();

        res.send("Registered Successfully");
      } catch (err) {
        return res.status(400).json({ message: err });
      }
    }

    res.status(200).send("Payment Successful");
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.getBookings = async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid: userid });
    return res.status(200).send(bookings);
  } catch (err) {
    return res.status(400).json({ error });
  }
};

exports.cancelBookings = async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingItem = await Booking.findOne({ _id: bookingid });
    bookingItem.status = "cancelled";
    await bookingItem.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;

    const delBook = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    room.currentbookings = delBook;

    await room.save();
    res.send("Cancelled Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send(bookings);
  } catch (error) {
    return res.status(400).json({ err });
  }
};

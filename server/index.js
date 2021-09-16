const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.json())
const roomsRoute = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoute')
const bookRoute = require('./routes/bookingsRoute')
dotenv.config({ path: "./config.env" });


mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful");
  });
  
  
  app.use('/api/rooms', roomsRoute)
  app.use('/api/users', userRoute)
  app.use('/api/booking',bookRoute)

app.listen(6000, () => {
  console.log("Server up tena sana up");
});

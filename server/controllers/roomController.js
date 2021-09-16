const Room = require("../models/room");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(400).json({ message: err });
  }
};



exports.getRoomById = async (req, res) => {

    const roomid = req.body.roomid
  try {
    const room = await Room.findOne({_id : roomid});
    return res.status(200).json(room)
  } catch (error) {
    return res.status(400).json({ message: err });
  }
};


exports.addRoom = async (req,res) =>{
  try{
  const roomAdd = new Room(req.body)
  await roomAdd.save()
  res.send('Room updated')
  }catch(error){
  return res.status(400).json({error})
  }
}
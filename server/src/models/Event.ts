import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  fatherName: { type: String, required: true },
  village: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  startTime: { type: Date },
  endTime: { type: Date },
  duration: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Event = mongoose.model("Event", eventSchema)

export default Event


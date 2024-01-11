import mongoose from "mongoose";

const fastingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    validate: /^[A-Za-z0-9 ]*$/,
  },
});

const Fasting = mongoose.model("Fasting", fastingSchema);

export default Fasting;

//

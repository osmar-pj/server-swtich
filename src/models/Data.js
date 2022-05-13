import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const dataSchema = new Schema(
  {
    nm: String,
    mac: String,
    sensor: {},
    topic: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

dataSchema.plugin(timezone)
export default model("Data", dataSchema);

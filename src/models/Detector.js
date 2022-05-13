import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const detectorSchema = new Schema(
  {
    name: String,
    ubication: String,
    code: String,
    sensors: []
  },
  {
    timestamps: true,
    versionKey: false
  }
);

detectorSchema.plugin(timezone)
export default model("Detector", detectorSchema);

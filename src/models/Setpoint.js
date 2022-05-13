import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const setpointSchema = new Schema(
  {
    sensor: String,
    setpoint: {
      type: Object
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

setpointSchema.plugin(timezone)
export default model("Setpoint", setpointSchema);

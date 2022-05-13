import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const eventSchema = new Schema(
  {
    mac: String,
    values: {
      type: Object
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

eventSchema.plugin(timezone)
export default model("Event", eventSchema);

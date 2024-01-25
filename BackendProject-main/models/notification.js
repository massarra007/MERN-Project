import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
    title: {
    type: String,
    required: false,
  },

  body: {
    type: String,
    required: false,
  },
  user: { type: mongoose.Schema.ObjectId, ref: "users" },
seen:{
    type:Boolean,
    required:false,
    default:"false"
}
});

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;

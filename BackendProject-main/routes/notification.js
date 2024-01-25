import express from "express";
import Notification from "../models/notification.js";

const router = express.Router();

router.get("/getid/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const notif = await Notification.find({ user: id, seen:false });
      res.status(200).send(notif);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.get("/getseen/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const notif = await Notification.find({ user: id, seen:true });
      res.status(200).send(notif);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post("/updatenotif/:id", async (req, res) => {
    const id = req.params.id;

     try{
const update=        await Notification.updateMany({ user: id }, {seen:true});
res.status(200).send(update);


     }catch (error) {
        res.status(400).send(error);
      }
});
  export default router;

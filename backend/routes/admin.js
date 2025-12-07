import express from "express";
import User from "../models/User.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", auth, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
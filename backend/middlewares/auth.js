import jwt from "jsonwebtoken";
import users from "../models/User.js";

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role; 
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }
  next();
};
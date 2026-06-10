import jwt from "jsonwebtoken";
import Blacklist from "../models/Blacklist.model.js";

export const authUser = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const blacklistedToken = await Blacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
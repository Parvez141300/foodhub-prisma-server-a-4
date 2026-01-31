import { RequestHandler } from "express";
import { userService } from "./user.service";

const getAllOrSearchUser:RequestHandler = async (req, res) => {
    try {
        const result = await userService.getAllOrSearchUserFromDB(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userController = {
    getAllOrSearchUser,
}
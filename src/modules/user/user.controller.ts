import { RequestHandler } from "express";
import { userService } from "./user.service";


const getAllProvider: RequestHandler = async (req, res) => {
    try {
        const result = await userService.getAllProviderFromDB();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllOrSearchUser: RequestHandler = async (req, res) => {
    try {
        const result = await userService.getAllOrSearchUserFromDB(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const updateUserStatus: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const payload = req.body;
        const result = await userService.updateUserStatusInDB({ userId: userId as string, payload });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userController = {
    getAllProvider,
    getAllOrSearchUser,
    updateUserStatus,
}
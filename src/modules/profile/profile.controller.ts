import { RequestHandler } from "express";
import { profileService } from "./profile.service";



const getUserProfile: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await profileService.getUserProfileFromDB(userId as string);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const updateOrInsertProfile: RequestHandler = async (req, res) => {
    try {
        const result = await profileService.updateOrInsertProfileInDB(req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const profileController = {
    getUserProfile,
    updateOrInsertProfile,
};
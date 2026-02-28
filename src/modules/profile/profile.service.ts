import { Profile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const getUserProfileFromDB = async (userId: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            profile: true,
        }
    });
    if (!result) {
        throw new Error("User not found");
    }
    else {
        return result;
    }
}

// {
//     "name": "Parvez Hossain Alif",
//     "email": "parvezhossain744471@gmail.com",
//     "phone": "01743063201",
//     "division": "Dhaka",
//     "district": "Dhaka",
//     "thana": "Tongi",
//     "area": "Ershad Nagar",
//     "street": "Ershad Nagar, Tongi, Gazipur City Corporation",
//     "postal_code": "1712",
//     "user_id": "5JQsuHRa3rwbeWHaannN8EJmSUd01uMH",
//     "image": ""
// }

type UpdateProfileType = {
    user_id: string;
    name: string;
    image?: string;
    email: string;

    phone: string;

    division: string;
    district: string;
    thana: string;
    area: string;
    street?: string;
    postal_code?: string;
}

const updateOrInsertProfileInDB = async (paylaod: UpdateProfileType) => {
    const { user_id, name, image='', email, phone, division, district, thana, area, street='', postal_code='' } = paylaod;

    const userData = await prisma.user.findUnique({
        where: {
            id: user_id,
        }
    });
    if (!userData) {
        return { message: "User not found" };
    }

    await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            name,
            email,
            phone,
            image
        }
    })

    const result = await prisma.profile.upsert({
        where: {
            user_id: user_id,
        },
        update: {
            phone,
            division,
            district,
            thana,
            area,
            street,
            postal_code
        },
        create: {
            user_id: user_id,
            phone,
            division,
            district,
            thana,
            area,
            street,
            postal_code
        }
    });

    return result;
}

export const profileService = {
    getUserProfileFromDB,
    updateOrInsertProfileInDB,
};
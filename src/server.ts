
import { envVars } from "./app/utils/env";
import { prisma } from "./app/lib/prisma";
import { app } from "./app";


const PORT= envVars.PORT || 5000;

const main = async () => {
    try {
        await prisma.$connect();
        console.log("connected to db successfully");
        app.listen(PORT, () => {
            console.log(`FoodHub Server is running on this port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
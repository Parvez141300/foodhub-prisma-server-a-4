import { app } from "./app";


const PORT= process.env.PORT || 5000;

const main = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`FoodHub Server is running on this port: ${PORT}`);
        });
    } catch (error) {
        
    }
}

main();
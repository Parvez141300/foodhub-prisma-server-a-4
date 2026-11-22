import { envVars } from "./app/utils/env";
import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import { mealRouter } from "./app/modules/meal/meal.route";
import { categoryRouter } from "./app/modules/category/category.route";
import { userRouter } from "./app/modules/user/user.route";
import { orderRouter } from "./app/modules/order/order.route";
import { reviewRouter } from "./app/modules/review/review.route";
import { profileRouter } from "./app/modules/profile/profile.route";
import { cuisineRouter } from "./app/modules/cuisine/cuisine.route";
import { dietaryRouter } from "./app/modules/dietery/dietery.route";
import { cartRouter } from "./app/modules/cart/cart.route";
import { wishListRouter } from "./app/modules/wishlist/wishlist.route";

export const app : Application = express();

// middlewares

app.use(cors({
  origin: envVars.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", mealRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", reviewRouter);
app.use("/api", profileRouter);
app.use("/api/admin", orderRouter);
app.use("/api/admin", categoryRouter);
app.use("/api/admin", cuisineRouter);
app.use("/api/admin", dietaryRouter);
app.use("/api", cartRouter);
app.use("/api", wishListRouter);

app.get('/', (req, res) => {
  res.send('FoodHub server is running');
});

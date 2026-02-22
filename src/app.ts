import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealRouter } from "./modules/meal/meal.route";
import { categoryRouter } from "./modules/category/category.route";
import { userRouter } from "./modules/user/user.route";
import { orderRouter } from "./modules/order/order.route";
import { reviewRouter } from "./modules/review/review.route";
import { profileRouter } from "./modules/profile/profile.route";
import { cuisineRouter } from "./modules/cuisine/cuisine.route";

export const app = express();

// middlewares

app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", mealRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", reviewRouter);
app.use("/api", profileRouter);
app.use("/api", cuisineRouter);

app.get('/', (req, res) => {
  res.send('FoodHub server is running');
});
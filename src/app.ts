import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealRouter } from "./modules/meal/meal.route";
import { categoryRouter } from "./modules/category/category.route";
import { userRouter } from "./modules/user/user.route";
import { orderRouter } from "./modules/order/order.route";

export const app = express();
app.all("/api/auth/*splat", toNodeHandler(auth));
// middlewares
app.use(express.json());
app.use(cors());

app.use("/api", mealRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);

app.get('/', (req, res) => {
  res.send('FoodHub server is running');
});
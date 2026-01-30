import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

export const app = express();
app.all("/api/auth/*", toNodeHandler(auth));
// middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('FoodHub server is running');
});
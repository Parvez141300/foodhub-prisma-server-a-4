import express from "express";
import cors from "cors";

export const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('FoodHub server is running');
});
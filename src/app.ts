import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoute } from "./app/modules/product/product.router";
import { OrderRoute } from "./app/modules/order/order.router";

// Assigning express to app
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Set routes
app.use("/api/products", ProductRoute);
app.use("/api/orders", OrderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my humble stationary shop");
});

export default app;

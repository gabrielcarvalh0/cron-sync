import express from "express";
import webhookOrdersRoute from "./routes/webhook.orders.route";

const app = express();

app.use(express.json());
app.use(webhookOrdersRoute);

export default app;

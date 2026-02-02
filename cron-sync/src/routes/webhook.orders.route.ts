import { Router, Request, Response } from "express";
import { fetchOrderById } from "../services/shoppub.orders.service";
import { processOrders } from "../services/orders.service";

const router = Router();

router.post("/webhook/orders", async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    // validação mínima
    if (!payload || payload.tipo !== "pedido" || !payload.id) {
      return res.status(400).json({ error: "Invalid webhook payload" });
    }

    const orderId = payload.id;

    // buscar pedido completo na Shoppub
    const fullOrder = await fetchOrderById(orderId);

    // processar (mapper + BigQuery)
    await processOrders([fullOrder]);

    // IMPORTANTE: responder 200 ou 201
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);

    // 500 força a Shoppub a tentar novamente
    return res.status(500).json({ status: "error" });
  }
});

export default router;

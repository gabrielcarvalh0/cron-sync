// src/services/orders.service.ts

import { mapShoppubOrder } from "../mappers/order.mapper";
import { mapOrderItems } from "../mappers/orderItems.mapper";
import { insertOrders } from "./bigquery.service";

export async function processOrders(rawOrders: any[]) {
  const orders: any[] = [];
  const items: any[] = [];

  for (const raw of rawOrders) {
    // pedido (1 linha)
    const order = mapShoppubOrder(raw);
    orders.push(order);

    // itens do pedido (N linhas)
    const orderItems = mapOrderItems(raw);
    items.push(...orderItems);
  }

  await insertOrders(orders, items);

  return {
    orders: orders.length,
    items: items.length,
  };
}

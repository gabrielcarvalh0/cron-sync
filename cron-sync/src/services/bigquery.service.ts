// src/services/bigquery.service.ts
import { BigQuery } from "@google-cloud/bigquery";

const bigquery = new BigQuery();
const DATASET = process.env.BQ_DATASET!;

export async function insertOrders(
  orders: any[],
  items: any[]
) {
  if (orders.length) {
    await bigquery
      .dataset(DATASET)
      .table("orders_staging")
      .insert(orders);
  }

  if (items.length) {
    await bigquery
      .dataset(DATASET)
      .table("order_items_staging")
      .insert(items);
  }
}

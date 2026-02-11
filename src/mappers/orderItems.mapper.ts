// src/mappers/orderItems.mapper.ts

export function mapOrderItems(order: any) {
  if (!order?.pedidoitem_set || !Array.isArray(order.pedidoitem_set)) {
    return [];
  }

  return order.pedidoitem_set.map((item: any) => {
    const quantity = Number(item.quantidade) || 0;
    const unitPrice = Number(item.valor_unitario_com_descontos) || 0;

    return {
      order_id: order.id.toString(),
      sku: item.produto_sku,
      product_name: item.produto_nome,
      quantity: Number(item.quantidade),
      unit_price: Number(item.valor_unitario_com_todos_descontos),

      total_value: quantity * unitPrice,
      ingestion_ts: new Date(),
    };
  });
}

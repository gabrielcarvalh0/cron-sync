type NormalizedOrder = {
  order_id: string;
  created_at: string;
  updated_at: string;
  status: string;
  status_code: number;
  payment_method: string | null;
  total_value: number;
  discount_value: number;
  net_value: number;
  shipping_value: number;
  items_quantity: number;
  customer_id: string | null;
  customer_email: string | null;
  city: string | null;
  state: string | null;
  has_nf: boolean;
};

type NormalizedOrderItem = {
  order_id: string;
  sku: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export function mapShoppubOrder(raw: any): {
  order: NormalizedOrder;
  items: NormalizedOrderItem[];
} {
  const createdAt =
    raw.data && raw.hora
      ? `${raw.data} ${raw.hora}`
      : raw.data ?? new Date().toISOString();

  const totalValue = Number(raw.valor_total ?? 0);
  const discountValue = Number(raw.valor_desconto_total_pedido ?? 0);

  const order: NormalizedOrder = {
    order_id: String(raw.id),
    created_at: createdAt,
    updated_at: raw.data_alteracao_status ?? new Date().toISOString(),
    status: raw.status_resumido ?? String(raw.status ?? "unknown"),
    status_code: Number(raw.status ?? 0),
    payment_method: raw.metodo_pagamento_forma ?? null,
    total_value: totalValue,
    discount_value: discountValue,
    net_value: totalValue - discountValue,
    shipping_value: Number(raw.custo_envio ?? 0),
    items_quantity: Number(raw.qtde_itens ?? 0),
    customer_id: raw.cliente_id ? String(raw.cliente_id) : null,
    customer_email: raw.email ?? null,
    city: raw.entrega_cidade ?? null,
    state: raw.entrega_estado ?? null,
    has_nf: Boolean(raw.nota_numero),
  };

  const items: NormalizedOrderItem[] =
    raw.pedidoitem_set?.map((item: any) => ({
      order_id: String(raw.id),
      sku: item.produto_sku ?? item.produto_codigo ?? "unknown",
      product_name: item.produto_nome ?? "unknown",
      quantity: Number(item.quantidade ?? 0),
      unit_price: Number(item.valor_unitario_com_todos_descontos ?? 0),
      total_price: Number(item.total ?? 0),
    })) ?? [];

  return { order, items };
}

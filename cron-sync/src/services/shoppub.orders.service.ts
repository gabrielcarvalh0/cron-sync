import { shoppubClient } from "../lib/shoppub.client";
type FetchOrdersParams = {
  page: number;
  per_page?: number;
  status_resumido?: number; // ex: 1 = pagos
};



export async function fetchOrderById(orderId: number | string) {
  try {
    const response = await shoppubClient.get(`/pedido/${orderId}`);

    if (!response.data) {
      throw new Error("Empty response from Shoppub");
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "[SHOPPUB] Error fetching order",
      orderId,
      error?.response?.data || error.message
    );

    throw error;
  }
}

export async function fetchOrders(params: FetchOrdersParams) {
  const response = await shoppubClient.get("/pedidos", {
    params: {
      page: params.page,
      status_resumido: params.status_resumido ?? 1, // default: pagos
    },
  });

  /**
   * Shoppub retorna:
   * {
   *   count,
   *   next,
   *   previous,
   *   results: [...]
   * }
   */
  return {
    results: response.data?.results ?? [],
    hasNext: !!response.data?.next,
  };
}
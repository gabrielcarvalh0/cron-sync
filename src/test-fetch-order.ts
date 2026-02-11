import "dotenv/config";
import { fetchOrderById } from "./services/shoppub.orders.service";

async function test() {
  const orderId = 3585; // use um pedido real

  const order = await fetchOrderById(orderId);

  console.log(JSON.stringify(order, null, 2));
}
test();

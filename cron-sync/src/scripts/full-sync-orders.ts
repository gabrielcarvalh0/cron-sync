import "dotenv/config";

import { fetchOrders } from "../services/shoppub.orders.service";
import { processOrders } from "../services/orders.service";

async function runFullSync() {
  console.log("🚀 Iniciando FULL SYNC de pedidos (Shoppub)");
  let page = 1;
  let total = 0;


  while (true) {
    console.log(`📦 Buscando pedidos - página ${page}`);

    const { results, hasNext } = await fetchOrders({
      page,
      status_resumido: 1, // pagos
    });

    if (!results.length) {
      console.log("✅ Nenhum pedido retornado.");
      break;
    }

    await processOrders(results);

    total += results.length;
    console.log(`✅ Processados ${results.length} pedidos (total: ${total})`);

    if (!hasNext) break;
    page++;
  }

  console.log(`🎉 FULL SYNC finalizado. Total: ${total}`);
  process.exit(0);
}

runFullSync().catch((err) => {
  console.error("❌ Erro no FULL SYNC:", err);
  process.exit(1);
});

/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const orderRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "OrderRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Order",
    "className": "OrderRepositoryAdapter",
    "portRef": "IOrderRepository",
    "tableRef": "cafe_flow_orders",
    "mdmReads": [],
    "notes": [
      "columns: order_id, daily_shift_id, order_type, status, created_at",
      "details JSONB: tableNumber, customerName, totalAmount, notes, registeredAt, confirmedAt, inPreparationAt, readyAt, servedAt, cancelledAt, cancellationReason, updatedAt, OrderItem[], OrderPayment[]",
      "embedded OrderItem and OrderPayment stored inside details JSONB",
      "map domain Order <-> row via ctx.data.moduleData only"
    ]
  }
} as const;

export default orderRepositoryAdapter;

export const pipeline = [
  {
    "id": "orderRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;

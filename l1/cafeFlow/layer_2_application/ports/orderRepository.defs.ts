/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.defs.ts" enhancement="_blank"/>

export const orderRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "OrderRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Order",
    "interfaceName": "IOrderRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "Order | null",
        "params": [
          "id: OrderId"
        ],
        "description": "Load an order by identity"
      },
      {
        "name": "list",
        "returns": "Order[]",
        "params": [
          "filter: OrderFilter"
        ],
        "description": "List orders matching domain filter"
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "aggregate: Order"
        ],
        "description": "Persist order aggregate with items and payments"
      },
      {
        "name": "findByDailyShiftId",
        "returns": "Order[]",
        "params": [
          "dailyShiftId: DailyShiftId"
        ],
        "description": "Find orders belonging to a daily shift"
      },
      {
        "name": "findOpenByTable",
        "returns": "Order | null",
        "params": [
          "tableRef: TableRef"
        ],
        "description": "Find open order for a table"
      },
      {
        "name": "findByStatus",
        "returns": "Order[]",
        "params": [
          "status: OrderStatus"
        ],
        "description": "Find orders by lifecycle status"
      }
    ]
  }
} as const;

export default orderRepositoryPort;

export const pipeline = [
  {
    "id": "orderRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;

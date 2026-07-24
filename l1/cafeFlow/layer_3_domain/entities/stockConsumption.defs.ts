/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.defs.ts" enhancement="_blank"/>

export const stockConsumptionDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "StockConsumption",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockConsumption",
    "title": "StockConsumption",
    "fields": [
      {
        "fieldId": "stockConsumptionId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único da baixa de estoque (chave primária)."
      },
      {
        "fieldId": "orderId",
        "type": "uuid",
        "required": true,
        "description": "Pedido que originou a baixa automática de estoque."
      },
      {
        "fieldId": "stockItemId",
        "type": "uuid",
        "required": true,
        "description": "Insumo (StockItem) debitado pela baixa."
      },
      {
        "fieldId": "quantity",
        "type": "number",
        "required": true,
        "description": "Quantidade do insumo debitada, na unidade de medida configurada no cadastro do insumo."
      },
      {
        "fieldId": "occurredAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora em que a baixa foi registrada."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Estado da baixa de estoque.",
        "enum": [
          "posted",
          "voided"
        ]
      },
      {
        "fieldId": "voidedAt",
        "type": "datetime",
        "required": false,
        "description": "Data e hora em que a baixa foi anulada (quando aplicável)."
      },
      {
        "fieldId": "voidReason",
        "type": "text",
        "required": false,
        "description": "Motivo/observação da anulação, usado para correções manuais feitas pelo gerente."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do registro."
      }
    ],
    "valueObjects": [],
    "invariants": [],
    "statusEnum": [
      "posted",
      "voided"
    ]
  }
} as const;

export default stockConsumptionDomainEntity;

export const pipeline = [
  {
    "id": "stockConsumption__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;

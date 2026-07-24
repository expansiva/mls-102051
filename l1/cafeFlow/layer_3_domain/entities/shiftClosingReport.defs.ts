/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.defs.ts" enhancement="_blank"/>

export const shiftClosingReportDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "ShiftClosingReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "ShiftClosingReport",
    "title": "ShiftClosingReport",
    "fields": [
      {
        "fieldId": "shiftClosingReportId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único do relatório de fechamento de turno."
      },
      {
        "fieldId": "dailyShiftId",
        "type": "uuid",
        "required": true,
        "description": "Identificador do turno diário encerrado que originou o relatório."
      },
      {
        "fieldId": "shiftDate",
        "type": "date",
        "required": true,
        "description": "Data de referência do turno encerrado."
      },
      {
        "fieldId": "totalSalesAmount",
        "type": "money",
        "required": true,
        "description": "Total de vendas do turno em moeda."
      },
      {
        "fieldId": "totalOrdersCount",
        "type": "number",
        "required": true,
        "description": "Quantidade total de pedidos realizados no turno."
      },
      {
        "fieldId": "totalItemsSold",
        "type": "number",
        "required": true,
        "description": "Quantidade total de itens vendidos no turno."
      },
      {
        "fieldId": "cashPaymentsAmount",
        "type": "money",
        "required": true,
        "description": "Valor total recebido em dinheiro durante o turno."
      },
      {
        "fieldId": "otherPaymentsAmount",
        "type": "money",
        "required": true,
        "description": "Valor total recebido via outras formas de pagamento básicas durante o turno."
      },
      {
        "fieldId": "topSellingItemsSummary",
        "type": "text",
        "required": false,
        "description": "Lista dos itens mais vendidos do turno para destaque no relatório."
      },
      {
        "fieldId": "lowStockSignalsCount",
        "type": "number",
        "required": true,
        "description": "Quantidade de itens de estoque que ficaram abaixo do nível mínimo durante o turno."
      },
      {
        "fieldId": "stockoutSignalsCount",
        "type": "number",
        "required": true,
        "description": "Quantidade de itens de estoque que sofreram ruptura (zerados) durante o turno."
      },
      {
        "fieldId": "closingNotes",
        "type": "text",
        "required": false,
        "description": "Observações e motivos registrados no fechamento do turno."
      },
      {
        "fieldId": "generatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora em que o relatório de fechamento foi gerado."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do registro."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização do registro."
      }
    ],
    "valueObjects": [],
    "invariants": [
      "dailyShiftId referenciado deve corresponder a um DailyShift existente e em estado 'closed'.",
      "totalSalesAmount deve ser igual a cashPaymentsAmount + otherPaymentsAmount.",
      "totalOrdersCount deve ser maior ou igual a zero.",
      "totalItemsSold deve ser maior ou igual a zero.",
      "lowStockSignalsCount deve ser maior ou igual a zero.",
      "stockoutSignalsCount deve ser maior ou igual a zero.",
      "totalSalesAmount, cashPaymentsAmount e otherPaymentsAmount devem ser maiores ou iguais a zero.",
      "generatedAt deve ser maior ou igual ao closedAt do DailyShift referenciado.",
      "updatedAt deve ser maior ou igual a createdAt.",
      "Não pode existir mais de um ShiftClosingReport para o mesmo dailyShiftId."
    ],
    "statusEnum": []
  }
} as const;

export default shiftClosingReportDomainEntity;

export const pipeline = [
  {
    "id": "shiftClosingReport__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.defs.ts",
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

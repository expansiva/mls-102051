/// <mls fileReference="_102051_/l4/cafeFlow/operations/viewShiftReport.defs.ts" enhancement="_blank"/>

export const operationViewShiftReport = {
  "operationId": "viewShiftReport",
  "title": "Consultar relatório de fechamento",
  "actors": [
    "gerente"
  ],
  "entity": "ShiftReport",
  "kind": "view",
  "reads": [
    "ShiftReport"
  ],
  "writes": [],
  "rulesApplied": [
    "shiftReportPreservedAfterReopen"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Consultar o relatório consolidado do turno encerrado com vendas, mais vendidos e cancelamentos",
    "steps": [
      "Abre o relatório do turno encerrado a partir do identificador do relatório",
      "Visualiza totais de vendas por tipo (mesa e takeout), quantidade de pedidos, cancelamentos e item mais vendido"
    ],
    "outcome": "Relatório de fechamento do turno disponível para consulta histórica"
  },
  "accessPattern": {
    "kind": "getById",
    "description": "Obtém o relatório de fechamento de turno pelo seu identificador para consulta",
    "entity": "ShiftReport",
    "keyField": "ShiftReport.shiftReportId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "ShiftReport.shiftReportId",
      "ShiftReport.shiftId",
      "ShiftReport.totalSalesDineIn",
      "ShiftReport.totalSalesTakeout",
      "ShiftReport.totalSales",
      "ShiftReport.totalOrders",
      "ShiftReport.totalCancellations",
      "ShiftReport.topSellingItemName",
      "ShiftReport.topSellingItemQuantity",
      "ShiftReport.generatedAt",
      "ShiftReport.preservedUntil",
      "ShiftReport.notes"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "shiftReportId",
        "type": "string",
        "required": true,
        "fieldRef": "ShiftReport.shiftReportId"
      },
      {
        "name": "shiftId",
        "type": "string",
        "required": true,
        "fieldRef": "ShiftReport.shiftId"
      },
      {
        "name": "totalSalesDineIn",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalSalesDineIn"
      },
      {
        "name": "totalSalesTakeout",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalSalesTakeout"
      },
      {
        "name": "totalSales",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalSales"
      },
      {
        "name": "totalOrders",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalOrders"
      },
      {
        "name": "totalCancellations",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalCancellations"
      },
      {
        "name": "topSellingItemName",
        "type": "string",
        "required": false,
        "fieldRef": "ShiftReport.topSellingItemName"
      },
      {
        "name": "topSellingItemQuantity",
        "type": "number",
        "required": false,
        "fieldRef": "ShiftReport.topSellingItemQuantity"
      },
      {
        "name": "generatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "ShiftReport.generatedAt"
      },
      {
        "name": "preservedUntil",
        "type": "string",
        "required": false,
        "fieldRef": "ShiftReport.preservedUntil"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "fieldRef": "ShiftReport.notes"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "shiftReportId",
      "fieldRef": "ShiftReport.shiftReportId",
      "required": true,
      "source": "routeParam",
      "description": "Identificador do relatório de fechamento de turno a ser consultado"
    }
  ],
  "contextResolution": [
    {
      "inputId": "shiftReportId",
      "targetRef": "ShiftReport.shiftReportId",
      "source": "routeParam",
      "originRef": "routeParam.shiftReportId",
      "description": "Identificador do relatório obtido do parâmetro de rota da tela de consulta do relatório de fechamento"
    }
  ],
  "acceptanceAssertions": [
    "O relatório de fechamento do turno fica disponível com total de vendas por tipo (mesa/takeout), item mais vendido e quantidade de cancelamentos",
    "O relatório preserva o histórico de vendas por tipo, mais vendidos e cancelamentos mesmo após o turno ser reaberto por contexto operacional",
    "Os totais exibidos correspondem aos dados consolidados no encerramento do turno identificado pelo shiftReportId informado"
  ],
  "pageId": "viewShiftReport",
  "commandName": "viewShiftReport",
  "bffName": "cafeFlow.viewShiftReport.viewShiftReport",
  "capability": {
    "capabilityId": "viewShiftReport",
    "title": "Consultar relatório de fechamento",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewShiftReport;

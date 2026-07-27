/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.defs.ts" enhancement="_blank"/>

export const dailyShiftDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "DailyShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "DailyShift",
    "title": "Turno Diário",
    "fields": [
      {
        "fieldId": "dailyShiftId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único do turno diário (chave primária)."
      },
      {
        "fieldId": "shiftDate",
        "type": "date",
        "required": true,
        "description": "Data operacional do turno (dia de calendário ao qual o turno pertence)."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Estado atual do turno: aberto (recebendo pedidos) ou fechado (pronto para relatório de fechamento).",
        "enum": [
          "open",
          "closed"
        ]
      },
      {
        "fieldId": "openedByUserId",
        "type": "uuid",
        "required": true,
        "description": "Identificador do operador (usuário) que abriu o turno."
      },
      {
        "fieldId": "closedByUserId",
        "type": "uuid",
        "required": false,
        "description": "Identificador do operador (usuário) que fechou o turno, quando aplicável."
      },
      {
        "fieldId": "openedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de abertura do turno."
      },
      {
        "fieldId": "closedAt",
        "type": "datetime",
        "required": false,
        "description": "Data e hora de fechamento do turno; preenchido quando o turno é encerrado."
      },
      {
        "fieldId": "totalOrders",
        "type": "number",
        "required": false,
        "description": "Total de pedidos registrados durante o turno."
      },
      {
        "fieldId": "totalSalesAmount",
        "type": "money",
        "required": false,
        "description": "Valor total vendido no turno, somando os pedidos confirmados."
      },
      {
        "fieldId": "totalItemsSold",
        "type": "number",
        "required": false,
        "description": "Quantidade total de itens vendidos no turno."
      },
      {
        "fieldId": "cashTotal",
        "type": "money",
        "required": false,
        "description": "Total recebido em dinheiro no turno, conforme fechamento básico."
      },
      {
        "fieldId": "otherPaymentsTotal",
        "type": "money",
        "required": false,
        "description": "Total recebido via outras formas de pagamento (cartão, Pix, etc.) no turno, conforme fechamento básico."
      },
      {
        "fieldId": "notes",
        "type": "text",
        "required": false,
        "description": "Observações livres registradas na abertura ou no fechamento do turno."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do registro do turno."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização do registro do turno."
      }
    ],
    "valueObjects": [],
    "statusEnum": [
      "open",
      "closed"
    ],
    "invariants": [
      "status transitions only open → closed; once closed, immutable (no reopen)",
      "closedByUserId and closedAt required iff status=closed; both must be absent when status=open",
      "when closed: closedAt >= openedAt",
      "updatedAt >= createdAt",
      "openedAt calendar date must equal shiftDate",
      "when closed: closedAt calendar date must equal shiftDate",
      "totalOrders, totalItemsSold >= 0 when present",
      "totalSalesAmount, cashTotal, otherPaymentsTotal >= 0 when present",
      "when closed with payment totals present: cashTotal + otherPaymentsTotal = totalSalesAmount",
      "when totalOrders=0 (or absent at open): totalSalesAmount and totalItemsSold must be 0 or absent",
      "only one DailyShift may be open per shiftDate (business uniqueness of open shift per day)"
    ]
  }
} as const;

export default dailyShiftDomainEntity;

export const pipeline = [
  {
    "id": "dailyShift__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.defs.ts",
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

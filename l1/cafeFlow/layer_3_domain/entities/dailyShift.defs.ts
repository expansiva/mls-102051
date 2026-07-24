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
    "title": "DailyShift",
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
    "invariants": [
      "Um turno deve sempre ter openedByUserId e openedAt definidos no momento da criação.",
      "closedByUserId e closedAt devem ser preenchidos em conjunto (ambos presentes ou ambos nulos).",
      "Quando status = 'open', closedAt e closedByUserId devem ser nulos.",
      "Quando status = 'closed', closedAt e closedByUserId devem estar preenchidos.",
      "closedAt, quando presente, deve ser maior ou igual a openedAt.",
      "totalSalesAmount, quando presente, deve ser igual à soma dos pedidos confirmados vinculados ao turno.",
      "cashTotal + otherPaymentsTotal, quando ambos presentes, deve ser igual a totalSalesAmount.",
      "totalOrders, totalItemsSold, totalSalesAmount, cashTotal e otherPaymentsTotal, quando presentes, devem ser maiores ou iguais a zero.",
      "updatedAt deve ser maior ou igual a createdAt.",
      "Não pode existir mais de um DailyShift aberto (status = 'open') para a mesma shiftDate simultaneamente."
    ],
    "statusEnum": [
      "open",
      "closed"
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

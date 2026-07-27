{
  "savedAt": "2026-07-24T23:26:11.291Z",
  "agentName": "agentCbDomainEntity",
  "stepId": 13,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitDomainEntities",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
              "entityId": "StockAdjustment",
              "fields": [
                {
                  "fieldId": "stockAdjustmentId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do ajuste manual de estoque."
                },
                {
                  "fieldId": "stockItemId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do insumo cujo saldo foi alterado."
                },
                {
                  "fieldId": "quantity",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade afetada pelo ajuste manual, em unidade de medida do insumo."
                },
                {
                  "fieldId": "direction",
                  "type": "string",
                  "required": true,
                  "description": "Direção do ajuste sobre o saldo (entrada, saída, acerto).",
                  "enum": [
                    "in",
                    "out",
                    "correction"
                  ]
                },
                {
                  "fieldId": "reason",
                  "type": "string",
                  "required": true,
                  "description": "Motivo do ajuste manual (contagem, perda, vencimento, divergência, outro).",
                  "enum": [
                    "count",
                    "loss",
                    "expiration",
                    "divergence",
                    "other"
                  ]
                },
                {
                  "fieldId": "managerUserId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do usuário gerente que autorizou o ajuste."
                },
                {
                  "fieldId": "shiftId",
                  "type": "uuid",
                  "required": false,
                  "description": "Identificador do turno ao qual o ajuste está vinculado."
                },
                {
                  "fieldId": "resultingBalance",
                  "type": "number",
                  "required": true,
                  "description": "Saldo do insumo após a aplicação do ajuste, para auditoria."
                },
                {
                  "fieldId": "notes",
                  "type": "text",
                  "required": false,
                  "description": "Observação livre do gerente descrevendo a divergência ou contexto do ajuste."
                },
                {
                  "fieldId": "status",
                  "type": "string",
                  "required": true,
                  "description": "Estado do ajuste (registrado ou anulado).",
                  "enum": [
                    "posted",
                    "voided"
                  ]
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora em que o ajuste foi registrado."
                },
                {
                  "fieldId": "voidedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora em que o ajuste foi anulado."
                },
                {
                  "fieldId": "voidedByUserId",
                  "type": "uuid",
                  "required": false,
                  "description": "Identificador do usuário que anulou o ajuste."
                },
                {
                  "fieldId": "compensatingAdjustmentId",
                  "type": "uuid",
                  "required": false,
                  "description": "Identificador do ajuste de compensação quando este registro foi anulado."
                }
              ],
              "title": "StockAdjustment",
              "statusEnum": [
                "posted",
                "voided"
              ],
              "invariants": [],
              "valueObjects": []
            }
          ]
        },
        "questions": [],
        "trace": [
          "No aggregate roots provided; processed 1 append-only event record StockAdjustment as immutable pure domain entity without valueObjects or extra invariants."
        ]
      }
    },
    "status": "completed",
    "stepId": 17,
    "interaction": null,
    "nextSteps": null
  }
}

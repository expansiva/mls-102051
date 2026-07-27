{
  "savedAt": "2026-07-24T23:26:13.094Z",
  "agentName": "agentCbDomainEntity",
  "stepId": 14,
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
          ]
        },
        "questions": [],
        "trace": [
          "Received empty aggregates array — no aggregate roots to emit.",
          "Received one append-only event record: StockConsumption (eventOwner=Order).",
          "Emitted StockConsumption as a pure domain entity with all 9 ontology fields, statusEnum [posted, voided], no invariants (append-only event), no valueObjects (no embedded members)."
        ]
      }
    },
    "status": "completed",
    "stepId": 18,
    "interaction": null,
    "nextSteps": null
  }
}

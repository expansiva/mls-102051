/// <mls fileReference="_102051_/l4/cafeFlow/ontology/Shift.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityShift = {
  "entityId": "Shift",
  "title": "Turno Diário",
  "description": "Contexto operacional do dia em uma unidade, com horário de abertura e encerramento, base para registrar pedidos, gerar relatório de fechamento e alimentar o dashboard.",
  "kind": "core",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do turno diário."
    },
    {
      "fieldId": "unitId",
      "type": "uuid",
      "required": true,
      "description": "Identificador da unidade (loja) à qual o turno pertence; garante a regra de um turno principal aberto por unidade por dia."
    },
    {
      "fieldId": "openedByUserId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do usuário (operador) responsável pela abertura do turno."
    },
    {
      "fieldId": "openedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o turno foi aberto."
    },
    {
      "fieldId": "closedByUserId",
      "type": "uuid",
      "required": false,
      "description": "Identificador do usuário (operador) responsável pelo encerramento do turno."
    },
    {
      "fieldId": "closedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o turno foi encerrado; preenchida quando o status passa para 'closed'."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Estado atual do turno: 'open' enquanto aceita pedidos no POS e 'closed' após o encerramento.",
      "enum": [
        "open",
        "closed"
      ]
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações operacionais registradas na abertura ou no encerramento do turno."
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
  "statusEnum": [
    "open",
    "closed"
  ],
  "lifecycleStates": [
    "open",
    "closed"
  ]
} as const;

export default cafeFlowEntityShift;

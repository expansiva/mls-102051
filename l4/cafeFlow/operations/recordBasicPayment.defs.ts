/// <mls fileReference="_102051_/l4/cafeFlow/operations/recordBasicPayment.defs.ts" enhancement="_blank"/>

export const operationRecordBasicPayment = {
  "operationId": "recordBasicPayment",
  "title": "Registrar pagamento básico",
  "actors": [
    "atendente"
  ],
  "entity": "OrderPayment",
  "kind": "create",
  "reads": [
    "Order",
    "OrderPayment"
  ],
  "writes": [
    "OrderPayment"
  ],
  "rulesApplied": [
    "shiftClosingRecordsBasicTotalsAndPayments"
  ],
  "story": {
    "actor": "Atendente",
    "goal": "Registrar o total e a forma de pagamento básica do pedido para o fechamento do turno",
    "steps": [
      "Seleciona o pedido em atendimento já totalizado",
      "Informa ou confirma o valor total do pedido",
      "Escolhe a forma de pagamento básica (dinheiro, pix, crédito, débito ou misto)",
      "Opcionalmente registra observações do fechamento",
      "Confirma o lançamento do pagamento básico"
    ],
    "outcome": "Pagamento básico fica associado ao pedido com status open, pronto para compor os totais do fechamento do turno"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de comando para lançar o total e a forma de pagamento básica vinculados ao pedido",
    "entity": "OrderPayment",
    "keyField": "OrderPayment.orderPaymentId",
    "pagination": "none",
    "selection": "none",
    "output": []
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "orderPaymentId",
        "type": "string",
        "required": true,
        "fieldRef": "OrderPayment.orderPaymentId"
      },
      {
        "name": "orderId",
        "type": "string",
        "required": true,
        "fieldRef": "OrderPayment.orderId"
      },
      {
        "name": "totalAmount",
        "type": "number",
        "required": true,
        "fieldRef": "OrderPayment.totalAmount"
      },
      {
        "name": "paymentMethod",
        "type": "string",
        "required": true,
        "fieldRef": "OrderPayment.paymentMethod"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "OrderPayment.status"
      },
      {
        "name": "paidAt",
        "type": "string",
        "required": false,
        "fieldRef": "OrderPayment.paidAt"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "fieldRef": "OrderPayment.notes"
      },
      {
        "name": "createdAt",
        "type": "string",
        "required": true,
        "fieldRef": "OrderPayment.createdAt"
      },
      {
        "name": "updatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "OrderPayment.updatedAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "orderId",
      "fieldRef": "OrderPayment.orderId",
      "required": true,
      "source": "selectedEntity",
      "description": "Pedido ao qual o pagamento básico será vinculado"
    },
    {
      "inputId": "totalAmount",
      "fieldRef": "OrderPayment.totalAmount",
      "required": true,
      "source": "userInput",
      "description": "Valor total do pedido no momento do lançamento do pagamento"
    },
    {
      "inputId": "paymentMethod",
      "fieldRef": "OrderPayment.paymentMethod",
      "required": true,
      "source": "userInput",
      "description": "Forma de pagamento básica utilizada (cash, pix, creditCard, debitCard ou mixed)"
    },
    {
      "inputId": "notes",
      "fieldRef": "OrderPayment.notes",
      "required": false,
      "source": "userInput",
      "description": "Observações livres do fechamento básico, sem conciliação avançada"
    },
    {
      "inputId": "orderPaymentId",
      "fieldRef": "OrderPayment.orderPaymentId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o registro de pagamento"
    },
    {
      "inputId": "status",
      "fieldRef": "OrderPayment.status",
      "required": true,
      "source": "systemDefault",
      "description": "Status inicial do pagamento básico ao ser registrado"
    },
    {
      "inputId": "paidAt",
      "fieldRef": "OrderPayment.paidAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora em que o pagamento básico foi registrado"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "OrderPayment.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp de criação do registro"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "OrderPayment.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp da última atualização do registro"
    }
  ],
  "contextResolution": [
    {
      "inputId": "orderId",
      "targetRef": "OrderPayment.orderId",
      "source": "selectedEntity",
      "originRef": "Order.orderId",
      "description": "Resolve o pedido atualmente selecionado no fluxo de atendimento para vincular o pagamento um-para-um"
    },
    {
      "inputId": "orderPaymentId",
      "targetRef": "OrderPayment.orderPaymentId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Gera um UUID único para o novo registro de pagamento básico"
    },
    {
      "inputId": "status",
      "targetRef": "OrderPayment.status",
      "source": "systemDefault",
      "originRef": "systemDefault.locale",
      "description": "Define o status inicial como open no momento do lançamento do pagamento básico"
    },
    {
      "inputId": "paidAt",
      "targetRef": "OrderPayment.paidAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Preenche paidAt com o instante atual do servidor no registro do pagamento"
    },
    {
      "inputId": "createdAt",
      "targetRef": "OrderPayment.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Preenche createdAt com o instante atual do servidor"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "OrderPayment.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Preenche updatedAt com o instante atual do servidor"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação existe um OrderPayment vinculado ao orderId informado com relacionamento um-para-um",
    "O OrderPayment criado possui status open",
    "O totalAmount e o paymentMethod informados pelo atendente são persistidos no OrderPayment",
    "O campo paidAt é preenchido com o instante do registro",
    "O pagamento básico fica disponível para compor os totais e formas de pagamento do fechamento do turno, sem conciliação financeira avançada",
    "paymentMethod aceito pertence ao conjunto cash, pix, creditCard, debitCard ou mixed"
  ],
  "pageId": "recordBasicPayment",
  "commandName": "recordBasicPayment",
  "bffName": "cafeFlow.recordBasicPayment.recordBasicPayment",
  "capability": {
    "capabilityId": "recordBasicPayment",
    "title": "Registrar pagamento básico",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationRecordBasicPayment;

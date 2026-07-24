/// <mls fileReference="_102051_/l4/cafeFlow/operations/openDailyShift.defs.ts" enhancement="_blank"/>

export const operationOpenDailyShift = {
  "operationId": "openDailyShift",
  "title": "Abrir turno diário",
  "actors": [
    "gerente"
  ],
  "entity": "DailyShift",
  "kind": "create",
  "reads": [
    "DailyShift"
  ],
  "writes": [
    "DailyShift"
  ],
  "rulesApplied": [
    "ordersRequireOpenDailyShift"
  ],
  "story": {
    "actor": "Gerente",
    "goal": "Iniciar o turno diário para agrupar pedidos, vendas e movimentos da operação do dia",
    "steps": [
      "Gerente solicita a abertura do turno diário",
      "Sistema valida que não há outro turno aberto",
      "Sistema cria o turno com status aberto, data operacional, responsável e horários de abertura",
      "Turno fica disponível para receber pedidos do dia"
    ],
    "outcome": "Turno diário aberto e pronto para vincular pedidos, vendas e movimentos de estoque"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de abertura do turno diário com data operacional e observações opcionais",
    "entity": "DailyShift",
    "keyField": "DailyShift.dailyShiftId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "DailyShift.dailyShiftId",
      "DailyShift.shiftDate",
      "DailyShift.status",
      "DailyShift.openedByUserId",
      "DailyShift.openedAt",
      "DailyShift.notes",
      "DailyShift.createdAt",
      "DailyShift.updatedAt"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "dailyShiftId",
        "type": "string",
        "required": true,
        "fieldRef": "DailyShift.dailyShiftId"
      },
      {
        "name": "shiftDate",
        "type": "string",
        "required": true,
        "fieldRef": "DailyShift.shiftDate"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "DailyShift.status"
      },
      {
        "name": "openedByUserId",
        "type": "string",
        "required": true,
        "fieldRef": "DailyShift.openedByUserId"
      },
      {
        "name": "openedAt",
        "type": "string",
        "required": true,
        "fieldRef": "DailyShift.openedAt"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "fieldRef": "DailyShift.notes"
      },
      {
        "name": "createdAt",
        "type": "string",
        "required": true,
        "fieldRef": "DailyShift.createdAt"
      },
      {
        "name": "updatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "DailyShift.updatedAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "shiftDate",
      "fieldRef": "DailyShift.shiftDate",
      "required": true,
      "source": "userInput",
      "description": "Data operacional do turno (dia de calendário)"
    },
    {
      "inputId": "notes",
      "fieldRef": "DailyShift.notes",
      "required": false,
      "source": "userInput",
      "description": "Observações livres registradas na abertura do turno"
    },
    {
      "inputId": "dailyShiftId",
      "fieldRef": "DailyShift.dailyShiftId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o novo turno"
    },
    {
      "inputId": "openedByUserId",
      "fieldRef": "DailyShift.openedByUserId",
      "required": true,
      "source": "actorSession",
      "description": "Identificador do gerente autenticado que abre o turno"
    },
    {
      "inputId": "status",
      "fieldRef": "DailyShift.status",
      "required": true,
      "source": "systemDefault",
      "description": "Status inicial do turno definido como aberto"
    },
    {
      "inputId": "openedAt",
      "fieldRef": "DailyShift.openedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora de abertura do turno"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "DailyShift.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora de criação do registro"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "DailyShift.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora da última atualização do registro"
    }
  ],
  "contextResolution": [
    {
      "inputId": "dailyShiftId",
      "targetRef": "DailyShift.dailyShiftId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Backend gera um UUID para o novo turno diário"
    },
    {
      "inputId": "openedByUserId",
      "targetRef": "DailyShift.openedByUserId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "Backend obtém o identificador do gerente autenticado na sessão"
    },
    {
      "inputId": "status",
      "targetRef": "DailyShift.status",
      "source": "systemDefault",
      "originRef": "systemDefault.locale",
      "description": "Backend define o status inicial como open na criação do turno"
    },
    {
      "inputId": "openedAt",
      "targetRef": "DailyShift.openedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Backend preenche openedAt com o timestamp atual do servidor"
    },
    {
      "inputId": "createdAt",
      "targetRef": "DailyShift.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Backend preenche createdAt com o timestamp atual do servidor"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "DailyShift.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Backend preenche updatedAt com o timestamp atual do servidor"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, existe um DailyShift com status open",
    "O turno criado possui shiftDate igual à data operacional informada",
    "O turno criado possui openedByUserId igual ao gerente autenticado",
    "O turno criado possui openedAt e createdAt preenchidos",
    "Não é permitido abrir um novo turno enquanto já existir outro DailyShift com status open",
    "Pedidos do dia só podem ser vinculados após a existência deste turno aberto"
  ],
  "pageId": "dailyShiftLifecycle",
  "commandName": "openDailyShift",
  "bffName": "cafeFlow.dailyShiftLifecycle.openDailyShift",
  "capability": {
    "capabilityId": "dailyShiftLifecycle",
    "title": "Ciclo do turno diário",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationOpenDailyShift;

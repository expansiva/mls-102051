/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/shiftWorkspace.defs.ts" enhancement="_blank"/>

export const shiftWorkspaceController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "shiftWorkspace",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "shiftWorkspace",
    "controllerName": "ShiftWorkspaceController",
    "ownerKind": "workspace",
    "workspaceId": "shiftWorkspace",
    "actors": [
      "gerente"
    ],
    "allowedScopes": [
      "cafeFlow:gerente"
    ],
    "handlers": [
      {
        "handlerName": "shiftWorkspaceOpenDailyShiftCmdHandler",
        "command": "openDailyShiftCmd",
        "bffId": "openDailyShiftCmd",
        "route": "cafeFlow.shiftWorkspace.openDailyShiftCmd",
        "kind": "command",
        "usecaseRef": "openDailyShift",
        "usecaseRefs": [
          "openDailyShift"
        ],
        "inputTypeName": "OpenDailyShiftInput",
        "inputContract": [
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
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "dailyShiftId",
              "operationId": "openDailyShift",
              "path": [
                "dailyShiftId"
              ],
              "fromItems": false
            },
            {
              "name": "shiftDate",
              "operationId": "openDailyShift",
              "path": [
                "shiftDate"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "openDailyShift",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "openedByUserId",
              "operationId": "openDailyShift",
              "path": [
                "openedByUserId"
              ],
              "fromItems": false
            },
            {
              "name": "openedAt",
              "operationId": "openDailyShift",
              "path": [
                "openedAt"
              ],
              "fromItems": false
            },
            {
              "name": "notes",
              "operationId": "openDailyShift",
              "path": [
                "notes"
              ],
              "fromItems": false
            },
            {
              "name": "createdAt",
              "operationId": "openDailyShift",
              "path": [
                "createdAt"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "shiftWorkspaceCloseDailyShiftCmdHandler",
        "command": "closeDailyShiftCmd",
        "bffId": "closeDailyShiftCmd",
        "route": "cafeFlow.shiftWorkspace.closeDailyShiftCmd",
        "kind": "command",
        "usecaseRef": "closeDailyShift",
        "usecaseRefs": [
          "closeDailyShift"
        ],
        "inputTypeName": "CloseDailyShiftInput",
        "inputContract": [
          {
            "inputId": "dailyShiftId",
            "fieldRef": "DailyShift.dailyShiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Identificador do turno diário aberto que será fechado"
          },
          {
            "inputId": "cashTotal",
            "fieldRef": "DailyShift.cashTotal",
            "required": false,
            "source": "userInput",
            "description": "Total em dinheiro conferido pelo gerente no fechamento básico"
          },
          {
            "inputId": "otherPaymentsTotal",
            "fieldRef": "DailyShift.otherPaymentsTotal",
            "required": false,
            "source": "userInput",
            "description": "Total em outras formas de pagamento conferido pelo gerente no fechamento básico"
          },
          {
            "inputId": "notes",
            "fieldRef": "DailyShift.notes",
            "required": false,
            "source": "userInput",
            "description": "Observações livres registradas no fechamento do turno"
          },
          {
            "inputId": "closedByUserId",
            "fieldRef": "DailyShift.closedByUserId",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente autenticado que confirma o fechamento"
          },
          {
            "inputId": "closedAt",
            "fieldRef": "DailyShift.closedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora em que o turno é encerrado"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "dailyShiftId",
              "operationId": "closeDailyShift",
              "path": [
                "dailyShiftId"
              ],
              "fromItems": false
            },
            {
              "name": "shiftDate",
              "operationId": "closeDailyShift",
              "path": [
                "shiftDate"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "closeDailyShift",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "closedByUserId",
              "operationId": "closeDailyShift",
              "path": [
                "closedByUserId"
              ],
              "fromItems": false
            },
            {
              "name": "closedAt",
              "operationId": "closeDailyShift",
              "path": [
                "closedAt"
              ],
              "fromItems": false
            },
            {
              "name": "totalOrders",
              "operationId": "closeDailyShift",
              "path": [
                "totalOrders"
              ],
              "fromItems": false
            },
            {
              "name": "totalSalesAmount",
              "operationId": "closeDailyShift",
              "path": [
                "totalSalesAmount"
              ],
              "fromItems": false
            },
            {
              "name": "totalItemsSold",
              "operationId": "closeDailyShift",
              "path": [
                "totalItemsSold"
              ],
              "fromItems": false
            },
            {
              "name": "cashTotal",
              "operationId": "closeDailyShift",
              "path": [
                "cashTotal"
              ],
              "fromItems": false
            },
            {
              "name": "otherPaymentsTotal",
              "operationId": "closeDailyShift",
              "path": [
                "otherPaymentsTotal"
              ],
              "fromItems": false
            },
            {
              "name": "shiftClosingReportId",
              "operationId": "closeDailyShift",
              "path": [
                "shiftClosingReportId"
              ],
              "fromItems": false
            },
            {
              "name": "generatedAt",
              "operationId": "closeDailyShift",
              "path": [
                "generatedAt"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "shiftWorkspaceGetShiftClosingReportHandler",
        "command": "getShiftClosingReport",
        "bffId": "getShiftClosingReport",
        "route": "cafeFlow.shiftWorkspace.getShiftClosingReport",
        "kind": "query",
        "usecaseRef": "viewShiftClosingReport",
        "usecaseRefs": [
          "viewShiftClosingReport"
        ],
        "inputTypeName": "ViewShiftClosingReportInput",
        "inputContract": [
          {
            "inputId": "shiftClosingReportId",
            "fieldRef": "ShiftClosingReport.shiftClosingReportId",
            "required": true,
            "source": "routeParam",
            "description": "Identificador do relatório de fechamento de turno a ser exibido"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "shiftClosingReportId",
              "operationId": "viewShiftClosingReport",
              "path": [
                "shiftClosingReportId"
              ],
              "fromItems": false
            },
            {
              "name": "dailyShiftId",
              "operationId": "viewShiftClosingReport",
              "path": [
                "dailyShiftId"
              ],
              "fromItems": false
            },
            {
              "name": "shiftDate",
              "operationId": "viewShiftClosingReport",
              "path": [
                "shiftDate"
              ],
              "fromItems": false
            },
            {
              "name": "totalSalesAmount",
              "operationId": "viewShiftClosingReport",
              "path": [
                "totalSalesAmount"
              ],
              "fromItems": false
            },
            {
              "name": "totalOrdersCount",
              "operationId": "viewShiftClosingReport",
              "path": [
                "totalOrdersCount"
              ],
              "fromItems": false
            },
            {
              "name": "totalItemsSold",
              "operationId": "viewShiftClosingReport",
              "path": [
                "totalItemsSold"
              ],
              "fromItems": false
            },
            {
              "name": "cashPaymentsAmount",
              "operationId": "viewShiftClosingReport",
              "path": [
                "cashPaymentsAmount"
              ],
              "fromItems": false
            },
            {
              "name": "otherPaymentsAmount",
              "operationId": "viewShiftClosingReport",
              "path": [
                "otherPaymentsAmount"
              ],
              "fromItems": false
            },
            {
              "name": "topSellingItemsSummary",
              "operationId": "viewShiftClosingReport",
              "path": [
                "topSellingItemsSummary"
              ],
              "fromItems": false
            },
            {
              "name": "lowStockSignalsCount",
              "operationId": "viewShiftClosingReport",
              "path": [
                "lowStockSignalsCount"
              ],
              "fromItems": false
            },
            {
              "name": "stockoutSignalsCount",
              "operationId": "viewShiftClosingReport",
              "path": [
                "stockoutSignalsCount"
              ],
              "fromItems": false
            },
            {
              "name": "closingNotes",
              "operationId": "viewShiftClosingReport",
              "path": [
                "closingNotes"
              ],
              "fromItems": false
            },
            {
              "name": "generatedAt",
              "operationId": "viewShiftClosingReport",
              "path": [
                "generatedAt"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.shiftWorkspace.openDailyShiftCmd",
        "handlerName": "shiftWorkspaceOpenDailyShiftCmdHandler"
      },
      {
        "key": "cafeFlow.shiftWorkspace.closeDailyShiftCmd",
        "handlerName": "shiftWorkspaceCloseDailyShiftCmdHandler"
      },
      {
        "key": "cafeFlow.shiftWorkspace.getShiftClosingReport",
        "handlerName": "shiftWorkspaceGetShiftClosingReportHandler"
      }
    ]
  }
} as const;

export default shiftWorkspaceController;

export const pipeline = [
  {
    "id": "shiftWorkspace__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/shiftWorkspace.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/shiftWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/openDailyShift.d.ts",
      "_102051_/l4/cafeFlow/contracts/shiftWorkspace.openDailyShiftCmd.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/closeDailyShift.d.ts",
      "_102051_/l4/cafeFlow/contracts/shiftWorkspace.closeDailyShiftCmd.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.d.ts",
      "_102051_/l4/cafeFlow/contracts/shiftWorkspace.getShiftClosingReport.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;

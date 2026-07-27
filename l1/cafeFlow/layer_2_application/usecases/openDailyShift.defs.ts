/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/openDailyShift.defs.ts" enhancement="_blank"/>

export const openDailyShiftUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "openDailyShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "openDailyShift",
    "ports": [
      "DailyShift"
    ],
    "functions": [
      {
        "functionName": "openDailyShift",
        "inputTypeName": "OpenDailyShiftInput",
        "outputTypeName": "OpenDailyShiftOutput",
        "input": [
          {
            "name": "shiftDate",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift",
            "fieldRef": "DailyShift.shiftDate"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "DailyShift",
            "fieldRef": "DailyShift.notes"
          }
        ],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "shiftDate",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "openedByUserId",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "openedAt",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "DailyShift"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          }
        ],
        "ports": [
          "DailyShift"
        ],
        "rulesApplied": [
          "ordersRequireOpenDailyShift"
        ],
        "transactional": true,
        "steps": [
          "Resolve openedByUserId from ctx.sessionContext.actorId (actorSession)",
          "Generate dailyShiftId via ctx.idGenerator and timestamps (openedAt, createdAt, updatedAt) via ctx.clock",
          "Set status to 'open' as systemDefault",
          "Load DailyShift port and list/find any DailyShift with status 'open'",
          "Apply ordersRequireOpenDailyShift inline: if an open DailyShift already exists, reject with validation error (rule id in details) — only one open shift allowed",
          "Build DailyShift aggregate with shiftDate, notes (optional), dailyShiftId, openedByUserId, status open, openedAt, createdAt, updatedAt",
          "Persist new DailyShift via port.create inside ctx.data transaction wrapper",
          "Return dailyShiftId, shiftDate, status, openedByUserId, openedAt, notes, createdAt, updatedAt"
        ],
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
        }
      }
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift"
    ],
    "mdmRefs": []
  }
} as const;

export default openDailyShiftUsecase;

export const pipeline = [
  {
    "id": "openDailyShift__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/openDailyShift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/openDailyShift.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;

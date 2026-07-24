/// <mls fileReference="_102051_/l5/cafeFlow/process.defs.ts" enhancement="_blank"/>

export const cafeFlowProcess = {
  "schemaVersion": "2026-06-25",
  "moduleName": "cafeFlow",
  "runs": [
    {
      "runId": "ns-1784731916935",
      "kind": "newSolution-behavior",
      "startedAt": "2026-07-22T14:51:56.933Z",
      "finishedAt": "2026-07-22T14:51:56.935Z",
      "sourceRefs": {
        "module": "l4/cafeFlow/module.defs.ts",
        "health": "l4/cafeFlow/trace/behavior-health-report.json",
        "journeys": "l4/cafeFlow/siteMap.defs.ts",
        "todoFrontend": "l5/cafeFlow/todoFrontend.defs.ts",
        "todoBackend": "l5/cafeFlow/todoBackend.defs.ts"
      },
      "handoffNotes": [
        "capability.multiowned: capability 'orderLifecycle' is owned by 2 workspaces (kitchenWorkspace, posWorkspace)"
      ],
      "nextSteps": [
        {
          "id": "stage2-experience",
          "kind": "workflowExperience",
          "title": "Generate frontend experience (@@changeFrontend)",
          "description": "Materialize l2 pages from the l4 behavior model.",
          "status": "pending"
        },
        {
          "id": "stage3-backend",
          "kind": "backendImplementation",
          "title": "Generate backend (@@changeBackend)",
          "description": "Materialize l1 hexagonal backend from the l4 behavior model.",
          "status": "pending"
        }
      ]
    }
  ]
} as const;

export default cafeFlowProcess;

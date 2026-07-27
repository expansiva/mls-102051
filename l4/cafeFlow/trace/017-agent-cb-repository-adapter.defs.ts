{
  "savedAt": "2026-07-25T23:27:40.743Z",
  "agentName": "agentCbRepositoryAdapter",
  "stepId": 17,
  "planning": {
    "planId": "cb-gen-adapter",
    "dependsOn": [
      "cb-gen-table"
    ],
    "executionMode": "sequential",
    "executionHost": "client"
  },
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitRepositoryAdapters",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
              "entityId": "DailyShift",
              "className": "DailyShiftRepositoryAdapter",
              "portRef": "IDailyShiftRepository",
              "tableRef": "cafe_flow_daily_shifts",
              "mdmReads": [],
              "notes": [
                "columns: daily_shift_id, status, opened_by_user_id, closed_by_user_id, created_at",
                "details JSONB: shiftDate, openedAt, closedAt, totalOrders, totalSalesAmount, totalItemsSold, cashTotal, otherPaymentsTotal, notes, updatedAt",
                "map domain DailyShift <-> row via ctx.data.moduleData only"
              ]
            },
            {
              "entityId": "Order",
              "className": "OrderRepositoryAdapter",
              "portRef": "IOrderRepository",
              "tableRef": "cafe_flow_orders",
              "mdmReads": [],
              "notes": [
                "columns: order_id, daily_shift_id, order_type, status, created_at",
                "details JSONB: tableNumber, customerName, totalAmount, notes, registeredAt, confirmedAt, inPreparationAt, readyAt, servedAt, cancelledAt, cancellationReason, updatedAt, OrderItem[], OrderPayment[]",
                "embedded OrderItem and OrderPayment stored inside details JSONB",
                "map domain Order <-> row via ctx.data.moduleData only"
              ]
            },
            {
              "entityId": "ShiftClosingReport",
              "className": "ShiftClosingReportRepositoryAdapter",
              "portRef": "IShiftClosingReportRepository",
              "tableRef": "cafe_flow_shift_closing_reports",
              "mdmReads": [],
              "notes": [
                "columns: shift_closing_report_id, daily_shift_id, created_at",
                "details JSONB: shiftDate, totalSalesAmount, totalOrdersCount, totalItemsSold, cashPaymentsAmount, otherPaymentsAmount, topSellingItemsSummary, lowStockSignalsCount, stockoutSignalsCount, closingNotes, generatedAt, updatedAt",
                "map domain ShiftClosingReport <-> row via ctx.data.moduleData only"
              ]
            },
            {
              "entityId": "AiPromotionSuggestion",
              "className": "AiPromotionSuggestionRepositoryAdapter",
              "portRef": "IAiPromotionSuggestionRepository",
              "tableRef": "cafe_flow_ai_promotion_suggestions",
              "mdmReads": [],
              "notes": [
                "columns: ai_promotion_suggestion_id, operational_dashboard_id, menu_item_id, menu_category_id, status, reviewed_by_user_id, created_at",
                "details JSONB: menuItemName, reason, salesLast7Days, salesToday, currentStockLevel, confidenceScore, suggestedDiscountPercent, reviewedAt, reviewNotes, generatedAt, expiresAt, updatedAt",
                "menu_item_id/menu_category_id are local FK-style ids on columns, not MDM index fields",
                "map domain AiPromotionSuggestion <-> row via ctx.data.moduleData only"
              ]
            },
            {
              "entityId": "AiSalesSummary",
              "className": "AiSalesSummaryRepositoryAdapter",
              "portRef": "IAiSalesSummaryRepository",
              "tableRef": "cafe_flow_ai_sales_summaries",
              "mdmReads": [],
              "notes": [
                "columns: ai_sales_summary_id, operational_dashboard_id, model_id, created_at",
                "details JSONB: summaryDate, periodStart, periodEnd, summaryText, promptTokens, completionTokens, generatedAt, updatedAt",
                "map domain AiSalesSummary <-> row via ctx.data.moduleData only"
              ]
            },
            {
              "entityId": "OperationalDashboard",
              "className": "OperationalDashboardRepositoryAdapter",
              "portRef": "IOperationalDashboardRepository",
              "tableRef": "cafe_flow_operational_dashboards",
              "mdmReads": [],
              "notes": [
                "columns: operational_dashboard_id, daily_shift_id, top_menu_item_id, created_at",
                "details JSONB: referenceDate, todaySalesTotal, todayOrdersCount, todayItemsSold, topMenuItemQuantity, topSellingItemsCount, lowStockItemsCount, outOfStockItemsCount, lowStockItemIds, hasLowStockAlert, lastComputedAt, updatedAt",
                "map domain OperationalDashboard <-> row via ctx.data.moduleData only"
              ]
            },
            {
              "entityId": "StockAdjustment",
              "className": "StockAdjustmentRepositoryAdapter",
              "portRef": "IStockAdjustmentRepository",
              "tableRef": "cafe_flow_stock_adjustments",
              "mdmReads": [],
              "notes": [
                "append-only event adapter: insert one row on append; no update/delete",
                "columns: stock_adjustment_id, stock_item_id, direction, reason, manager_user_id, shift_id, status, created_at, voided_by_user_id, compensating_adjustment_id",
                "details JSONB: quantity, resultingBalance, notes, voidedAt",
                "implements append + read finders via ctx.data.moduleData only"
              ]
            },
            {
              "entityId": "StockConsumption",
              "className": "StockConsumptionRepositoryAdapter",
              "portRef": "IStockConsumptionRepository",
              "tableRef": "cafe_flow_stock_consumptions",
              "mdmReads": [],
              "notes": [
                "append-only event adapter: insert one row on append; no update/delete",
                "columns: stock_consumption_id, order_id, stock_item_id, status, created_at",
                "details JSONB: quantity, occurredAt, voidedAt, voidReason",
                "implements append + read finders via ctx.data.moduleData only"
              ]
            }
          ]
        },
        "questions": [],
        "trace": [
          "produced 6 aggregate adapters + 2 append-only event adapters for cafeFlow",
          "column/details split per spec; embedded OrderItem/OrderPayment in Order.details JSONB",
          "no mdmRefs on any aggregate; ctx.data.moduleData only; no raw MDM primitives"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}

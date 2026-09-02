# 102051 · CafeFlow (client app)

Part of **collab.codes**.

`102051` is a **generated client application** (`projectType: "client"`,
~272 `.ts` files) — the café / snack bar POS.

> **CafeFlow** — *"…a operação de uma cafeteria ou lanchonete pequena: registro
> rápido de pedidos (mesa ou takeout), coordenação da cozinha via status,
> cardápio e estoque simples alinhados, turno diário com relatório de fechamento
> e dashboard operacional com apoio de IA para resumo de vendas e sugestões de
> promoção."*
> Business domain: food service POS and operations. Languages: pt-BR, en.
> Visual style: POS-first, high-contrast, touch-friendly, status-driven.

Core entities: Menu Item, Order, Daily Shift, Stock Item. The LLM feature
produces the day's sales summary and suggests what to promote based on the last
seven days.

## Layout

| layer | content |
|---|---|
| `l4/cafeFlow/` | the solution model |
| `l1/cafeFlow/` | generated backend |
| `l2/cafeFlow/web/` | generated frontend pages, plus `messagesAside.*` and `l2/layout/appHeader.ts` |
| `l3/cafeFlow/assets/` | static assets |
| `l5/cafeFlow/`, `l5/runtimeConfig.ts`, `l5/config.json` | process/todo defs and runtime config |
| `l2/trace/`, `l2/cafeFlow/trace/` | frontend materialize/verify traces |

Last activity: 2026-08-24.

## Careful

[`102050`](../mls-102050) also carries the name `cafeFlow` but is an empty
scaffold.

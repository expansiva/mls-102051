/// <mls fileReference="_102051_/l4/cafeFlow/actors.defs.ts" enhancement="_blank"/>

export const cafeFlowActors = {
  "moduleName": "cafeFlow",
  "actors": [
    {
      "actorId": "atendente",
      "title": "Atendente",
      "description": "Registra pedidos no PDV (mesa ou takeout), confirma o envio à cozinha, acompanha o status dos pedidos e marca como servidos/entregues os pedidos prontos.",
      "roleScope": "cafeFlow:atendente"
    },
    {
      "actorId": "cozinheiro",
      "title": "Cozinheiro",
      "description": "Recebe os pedidos confirmados na fila da cozinha, consulta itens e observações, e atualiza o status de preparo (recebido → em preparo → pronto).",
      "roleScope": "cafeFlow:cozinheiro"
    },
    {
      "actorId": "gerente",
      "title": "Gerente",
      "description": "Mantém cardápio e itens de estoque, ajusta manualmente o estoque, abre e fecha o turno diário, gera o relatório de fechamento e acompanha o dashboard operacional.",
      "roleScope": "cafeFlow:gerente"
    }
  ]
} as const;

export default cafeFlowActors;

# CafeFlow

Module: `cafeFlow`
Language: pt-BR

## Problem
Cafeterias e lanchonetes pequenas precisam de um fluxo simples e rápido para registrar pedidos (mesa ou takeout), coordenar a cozinha pelo status dos pedidos, manter cardápio e estoque alinhados e fechar o turno com visão clara de vendas e rupturas. Sem isso, o atendimento fica lento, a cozinha desorganizada e o controle de insumos impreciso.

## Presumed Actors
- Atendente (`atendente`): Registra pedidos no POS, acompanha status e atende mesas ou takeout.
- Cozinheiro (`cozinheiro`): Recebe pedidos na fila da cozinha e atualiza status de preparo.
- Gerente (`gerente`): Gerencia cardápio e estoque, acompanha dashboard e fecha o turno diário.

## Scope In
- Cadastro e manutenção de itens do cardápio (categoria, preço, vínculo com ingredientes em estoque)
- Registro rápido de pedidos (mesa ou takeout) com itens e status
- Fila/coordenação de cozinha via status do pedido
- Itens de estoque com indicação de estoque baixo
- Turno diário e relatório de fechamento de turno
- Dashboard operacional (vendas de hoje, itens mais vendidos, estoque baixo)
- Assistente IA para resumo de vendas do dia e sugestão de itens a promover com base nos últimos 7 dias

## Scope Out
- Integrações complexas com sistemas externos (delivery marketplaces, TEF/PDV fiscal avançado, ERP)
- Contabilidade avançada e fiscal completa
- Marketing automatizado e campanhas
- Gestão de múltiplas unidades como rede (além do contexto de negócio da plataforma)
- Recriar autenticação, RBAC, armazenamento de mídia, i18n ou runtime de mensagens da plataforma

## Open Questions
- [assumed] A UI deve nascer em pt-BR, en, ou ambos via i18n da plataforma? Default: pt-BR como idioma principal da experiência; en suportado pela i18n da plataforma quando necessário.
- [assumed] A baixa de estoque ocorre automaticamente ao concluir o pedido ou é manual no turno? Default: Baixa automática dos ingredientes vinculados ao concluir/servir o pedido, com ajuste manual permitido pelo gerente.
- [assumed] O módulo controla forma de pagamento e valores recebidos no pedido? Default: Registro simples de total do pedido e forma de pagamento básica no fechamento; sem conciliação financeira avançada.

## Assumptions
- O nome do módulo é cafeFlow (CafeFlow) conforme esclarecimento.
- Atores principais: atendentes, cozinheiros e gerentes.
- Foco em operação de uma unidade de cafeteria/lanchonete pequena.
- Pedidos têm canal mesa ou takeout e ciclo de status para coordenação da cozinha.
- Item do cardápio pode referenciar ingredientes de estoque para controle simples.
- Turno diário agrupa a operação do dia e habilita o relatório de fechamento.
- Assistente IA usa o proxy LLM da plataforma; não se recria infraestrutura de IA.
- Autenticação, permissões, multi-tenant, arquivos e i18n ficam a cargo da plataforma.
- Fora de escopo: integrações externas complexas, contabilidade avançada e marketing automatizado.


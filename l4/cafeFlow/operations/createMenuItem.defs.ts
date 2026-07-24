/// <mls fileReference="_102051_/l4/cafeFlow/operations/createMenuItem.defs.ts" enhancement="_blank"/>

export const operationCreateMenuItem = {
  "operationId": "createMenuItem",
  "title": "Criar item do cardápio",
  "actors": [
    "gerente"
  ],
  "entity": "MenuItem",
  "kind": "create",
  "reads": [
    "MenuCategory"
  ],
  "writes": [
    "MenuItem"
  ],
  "rulesApplied": [
    "menuItemNeedsCategoryAndPrice",
    "onlyActiveMenuItemsCanBeOrdered"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Cadastrar um novo item vendável no cardápio com categoria, preço e disponibilidade corretos",
    "steps": [
      "O gerente informa nome, categoria, preço e demais dados do item",
      "O sistema valida categoria e preço obrigatórios",
      "O sistema gera o identificador e grava o item com status inicial adequado",
      "O item fica disponível para vínculo de ingredientes e uso no PDV conforme o status"
    ],
    "outcome": "Item do cardápio salvo e pronto para manutenção e venda"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de criação de item do cardápio com categoria, preço, disponibilidade e metadados de exibição",
    "entity": "MenuItem",
    "keyField": "MenuItem.menuItemId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "MenuItem.menuItemId",
      "MenuItem.menuCategoryId",
      "MenuItem.name",
      "MenuItem.description",
      "MenuItem.price",
      "MenuItem.status",
      "MenuItem.imageUrl",
      "MenuItem.displayOrder",
      "MenuItem.requiresStockLink",
      "MenuItem.createdAt",
      "MenuItem.updatedAt"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "menuItemId",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.menuItemId"
      },
      {
        "name": "menuCategoryId",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.menuCategoryId"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.name"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "fieldRef": "MenuItem.description"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "fieldRef": "MenuItem.price"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.status"
      },
      {
        "name": "imageUrl",
        "type": "string",
        "required": false,
        "fieldRef": "MenuItem.imageUrl"
      },
      {
        "name": "displayOrder",
        "type": "number",
        "required": false,
        "fieldRef": "MenuItem.displayOrder"
      },
      {
        "name": "requiresStockLink",
        "type": "boolean",
        "required": true,
        "fieldRef": "MenuItem.requiresStockLink"
      },
      {
        "name": "createdAt",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.createdAt"
      },
      {
        "name": "updatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.updatedAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "menuCategoryId",
      "fieldRef": "MenuItem.menuCategoryId",
      "required": true,
      "source": "userInput",
      "description": "Categoria à qual o novo item do cardápio pertence"
    },
    {
      "inputId": "name",
      "fieldRef": "MenuItem.name",
      "required": true,
      "source": "userInput",
      "description": "Nome do item exibido no cardápio e no PDV"
    },
    {
      "inputId": "description",
      "fieldRef": "MenuItem.description",
      "required": false,
      "source": "userInput",
      "description": "Descrição curta opcional do item para o cliente"
    },
    {
      "inputId": "price",
      "fieldRef": "MenuItem.price",
      "required": true,
      "source": "userInput",
      "description": "Preço de venda atual do item no PDV"
    },
    {
      "inputId": "status",
      "fieldRef": "MenuItem.status",
      "required": false,
      "source": "userInput",
      "description": "Disponibilidade inicial do item (active ou paused); se omitido, assume active"
    },
    {
      "inputId": "imageUrl",
      "fieldRef": "MenuItem.imageUrl",
      "required": false,
      "source": "userInput",
      "description": "URL opcional da imagem do item no cardápio digital e no PDV"
    },
    {
      "inputId": "displayOrder",
      "fieldRef": "MenuItem.displayOrder",
      "required": false,
      "source": "userInput",
      "description": "Ordem de exibição opcional do item dentro da categoria"
    },
    {
      "inputId": "requiresStockLink",
      "fieldRef": "MenuItem.requiresStockLink",
      "required": true,
      "source": "userInput",
      "description": "Indica se o item exige vínculo com ingredientes para baixa automática de estoque"
    },
    {
      "inputId": "menuItemId",
      "fieldRef": "MenuItem.menuItemId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado automaticamente para o novo item"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "MenuItem.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora de criação preenchidas pelo sistema"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "MenuItem.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora da última atualização preenchidas pelo sistema na criação"
    }
  ],
  "contextResolution": [
    {
      "inputId": "menuItemId",
      "targetRef": "MenuItem.menuItemId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Backend gera um UUID para o novo item do cardápio"
    },
    {
      "inputId": "createdAt",
      "targetRef": "MenuItem.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Backend preenche createdAt com o timestamp atual da criação"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "MenuItem.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Backend preenche updatedAt com o mesmo timestamp da criação"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o MenuItem existe persistido com menuItemId gerado e createdAt/updatedAt preenchidos",
    "O item criado possui menuCategoryId e price obrigatórios conforme a regra menuItemNeedsCategoryAndPrice",
    "Se status não for informado, o item é gravado com status active e fica elegível para lançamento no PDV",
    "Se status for paused, o item não fica disponível para novos lançamentos no POS",
    "O item criado reflete name, description, imageUrl, displayOrder e requiresStockLink informados pelo gerente",
    "A categoria informada (menuCategoryId) deve referenciar uma MenuCategory existente"
  ],
  "pageId": "createMenuItem",
  "commandName": "createMenuItem",
  "bffName": "cafeFlow.createMenuItem.createMenuItem",
  "capability": {
    "capabilityId": "createMenuItem",
    "title": "Criar item do cardápio",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateMenuItem;

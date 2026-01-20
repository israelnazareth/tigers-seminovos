# Tigers Seminovos

Projeto desenvolvido como um site institucional para uma loja fictícia de veículos seminovos, construído com Next.js 16 e React 19.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js 18.17 ou superior
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone git@github.com:israelnazareth/tigers-seminovos.git
cd tigers-seminovos

# Instale as dependências
npm install
```

### Executando em Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build de Produção

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

### Testes

```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch (desenvolvimento)
npm run test:watch

# Rodar testes com relatório de cobertura
npm run test:coverage
```

## Estrutura do Projeto

```
app/
├── _components/          # Componentes reutilizáveis (pasta ignorada pelo roteamento)
│   ├── ContactModal/     # Modal de solicitação de cotação
│   ├── CreditAnalysis/   # Seção de análise de crédito
│   ├── DiscountModal/    # Modal flutuante de desconto
│   ├── Footer/           # Rodapé do site
│   ├── Header/           # Cabeçalho com navegação
│   ├── Icons/            # Ícones SVG reutilizáveis
│   ├── VehicleDetailModal/ # Modal de detalhes do veículo
│   └── WhatsAppButton/   # Botão flutuante do WhatsApp
├── catalogo/             # Página de catálogo de veículos
├── agende-sua-visita/    # Página de agendamento
├── layout.tsx            # Layout raiz da aplicação
├── page.tsx              # Página inicial (Home)
├── globals.css           # Estilos globais
└── page.module.css       # Estilos da página inicial
lib/
└── vehicles.ts           # Dados e tipos dos veículos
__tests__/
├── components/           # Testes dos componentes
├── pages/                # Testes das páginas
└── lib/                  # Testes da biblioteca de dados
```

## Decisões Técnicas

### Next.js App Router

Optei pelo App Router (em vez do Pages Router) por ser a abordagem mais recente e recomendada pelo Next.js, oferecendo:
- Server Components por padrão
- Layouts aninhados
- Metadata API para SEO
- Route Groups para organização

### Organização de Pastas

- **`_components/`**: Prefixo com underscore para que a pasta seja ignorada pelo sistema de rotas, mantendo os componentes organizados dentro de `app/`
- **Páginas em pastas próprias**: Cada página (como `catalogo/` e `agende-sua-visita/`) possui sua própria pasta com layout e estilos específicos
- **Cada componente em sua pasta**: Componente + CSS Module juntos facilitam a manutenção

### CSS Modules

Escolhi CSS Modules ao invés de Tailwind ou styled-components por:
- Zero runtime (CSS puro)
- Escopo local por padrão (sem conflitos de classes)
- Fácil manutenção e leitura
- Não requer configuração adicional

### Tipagem com TypeScript

Todo o projeto utiliza TypeScript para garantir type-safety, especialmente nos dados dos veículos (`lib/vehicles.ts`) e nas props dos componentes.

### Títulos Dinâmicos

Para definir títulos diferentes em cada página (ex: "Catálogo | Tigers Seminovos"), utilizei:
- Template no layout raiz: `title: { template: "%s | Tigers Seminovos" }`
- Layout específico em cada pasta de página exportando apenas o título

Essa abordagem foi necessária porque as páginas usam `"use client"` e não podem exportar `metadata` diretamente.

### Componentes Client vs Server

- **Client Components** (`"use client"`): Usados nas páginas com interatividade (filtros, modais, carrossel)
- **Server Components**: Layouts que exportam metadata

## Funcionalidades Implementadas

### Página Inicial
- Carrossel de banners com Swiper.js (autoplay, fade effect)
- Cards de categorias de veículos
- Seção de vídeo institucional
- Componente de análise de crédito

### Catálogo
- Listagem de veículos com paginação
- Filtros: marca, modelo, cor, blindagem, ano, carroceria
- Busca por texto
- Modal de solicitação de cotação ao clicar em "Solicitar"

### Agende sua Visita
- Formulário de agendamento
- Seleção de data e horário
- Integração visual com o restante do site

### Componentes Globais
- Header responsivo com navegação
- Footer com informações de contato
- Botão flutuante do WhatsApp
- Modal de desconto (minimizável)

## Testes

O projeto conta com uma suíte de testes abrangente usando Jest e React Testing Library.

### Cobertura de Testes

| Categoria | Arquivos | Testes |
|-----------|----------|--------|
| Páginas | 3 | ~56 |
| Componentes | 8 | ~96 |
| Biblioteca | 1 | ~20 |
| **Total** | **12** | **~172** |

### O que está sendo testado

- **Páginas**: Renderização, interatividade, navegação e validação de formulários
- **Componentes**: Props, estados, eventos e acessibilidade
- **Biblioteca de veículos**: Validação de dados, tipos e consistência

## Tecnologias Utilizadas

- **Next.js 16** - Framework React com SSR/SSG
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização com escopo local
- **Swiper.js** - Carrossel de imagens
- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes React
- **ESLint** - Linting e padronização de código

## Autor

Israel - Desenvolvedor Front-end

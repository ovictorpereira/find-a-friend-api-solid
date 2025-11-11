# 🐶🐱 FindAFriend API

Uma API REST robusta para conectar animais abandonados com pessoas que desejam adotá-los. Desenvolvida com foco nos princípios **SOLID**, **Clean Architecture** e **Test-Driven Development (TDD)**.

## 📋 Sobre o Projeto

O **FindAFriend** é uma plataforma que facilita a adoção de pets, conectando ONGs e organizações de proteção animal com pessoas interessadas em adotar. A API permite o cadastro de organizações, gestão de pets disponíveis para adoção e busca avançada por localização e características.

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente
- **[Prisma](https://www.prisma.io/)** - ORM moderno para banco de dados
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação de dados e schemas
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas
- **[@fastify/jwt](https://github.com/fastify/fastify-jwt)** - Autenticação JWT
- **[Docker](https://www.docker.com/)** - Containerização do banco de dados

## ✨ Funcionalidades

### 🏢 **Organizações (ONGs)**

- ✅ Cadastro de organizações
- ✅ Autenticação com JWT
- ✅ Perfil da organização
- ✅ Gestão de pets

### 🐾 **Pets**

- ✅ Cadastro de pets (vinculados à organização)
- ✅ Listagem por cidade (obrigatório)
- ✅ Filtros avançados (espécie, idade, porte, etc.)
- ✅ Visualização de detalhes do pet
- ✅ Upload de múltiplas fotos

### 🔍 **Busca e Filtros**

- ✅ Busca por cidade (obrigatória)
- ✅ Filtros opcionais: espécie, gênero, cor, idade, tamanho
- ✅ Filtros por nível de energia e independência
- ✅ Filtro por tamanho do ambiente necessário

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** e **SOLID**:

```
src/
├── 📁 use-cases/           # Regras de negócio
├── 📁 repositories/        # Camada de dados
│   ├── 📁 in-memory/      # Repositórios para testes
│   └── 📁 prisma/         # Implementação com Prisma
├── 📁 http/               # Camada de apresentação
│   ├── 📁 controllers/    # Controladores REST
│   └── 📁 middlewares/    # Middlewares (auth, etc.)
└── 📁 lib/                # Configurações e utilitários
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18+)
- Docker e Docker Compose
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/ovictorpereira/find-a-friend-api-solid.git
cd find-a-friend-api-solid
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
NODE_ENV=dev
DATABASE_URL="postgresql://docker:docker@localhost:5432/findafriend?schema=public"
JWT_SECRET="seu-jwt-secret-aqui"
```

### 4. Inicie o banco de dados

```bash
# Suba o container do PostgreSQL
docker-compose up -d

# Execute as migrações
npx prisma migrate dev

# (Opcional) Visualize o banco no Prisma Studio
npx prisma studio
```

### 5. Execute o projeto

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build e produção
npm run build
npm start
```

## 🧪 Testes

O projeto possui cobertura completa de testes unitários:

```bash
# Executar todos os testes
npm test


## 📊 Regras de Negócio

- ✅ **Cidade obrigatória**: Todo pet deve ser buscado por cidade
- ✅ **Organização validada**: Pets só podem ser cadastrados por ONGs autenticadas
- ✅ **Dados completos**: ONGs devem ter endereço e telefone obrigatórios
- ✅ **Segurança**: Senhas são hasheadas e dados sensíveis protegidos
- ✅ **Filtros opcionais**: Todos os filtros exceto cidade são opcionais


## 👨‍💻 Autor

Desenvolvido por **Victor Pereira** durante o curso de Node.js da Rocketseat.

---
```

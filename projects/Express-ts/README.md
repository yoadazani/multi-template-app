# Node.js Express Template API

This is a template for creating a Node.js Express API with TypeScript. It includes the following features:

- 🚀 **TypeScript** _ for type-safe development
- 🐳 **Docker** _ for containerization
- 📦 **Webpack** _ for bundling
- ✅ **Jest** _ for testing
- 🌐 **Supertest** _ for API testing
- 🎨 **Prettier** _ for code formatting
- 🔍 **ESLint** _ for linting
- 🗄️ **Prisma** _ for database access
- 🌐 A **config directory** _ for environment variables
- 🐶 **Husky** + **lint-staged** _ for pre-commit hooks

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```
2. Generate pirsma ORM:
   
   ```bash
   npm run prisma:generate
   ```
3. Migrate pirsma DB:
   
   ```bash
   npm run prisma:migrate
   ```
4. Build the project:

   ```bash
   npm run build
   ```
5. Run in development mode:
   
   ```bash
   npm run start:dev
   ```

6. Run in production mode:

   ```bash
   npm run start:prod
   ```

7. Run tests:

   ```bash
   npm run test
   ```

## Configuration

- Environment variables are stored in the `config` directory.
- Create a `.env` file based on `.env.example` and set your environment-specific values.

## Database

- **Prisma** is used for database access.
- Configure your database connection in `prisma/schema.prisma`.

## Linting and Formatting

- ESLint and Prettier are set up for consistent code style.


- Run linting:

  ```bash
  npm run lint:check
  
  npm run lint:fix
  ```
  
- Format code:

   ```bash
  npm run format
  ```
  

## Dockerization 🐳

- Run the Docker compose:

   ```bash
  docker compose up  
  ```
  
- Stop the Docker compose:

   ```bash
  docker compose down 
  ```


Feel free to customize and enhance this template according to your specific project needs! 🚀


   

   

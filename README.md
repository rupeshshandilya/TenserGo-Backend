#TenserGo-Backend

Assignment of TenserGo company.

## Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v22.3.0)
- npm or yarn

## Installation

This project is composed of multiple microservices. You must install dependencies for each microservice separately.

Navigate to each service directory and install the necessary packages:

```bash
cd api-gateway
npm install
cd ..

cd user
npm install
cd ..

cd feedback
npm install
cd ..
```

```bash
Configure .env of every service
```

```bash
cd user
npx prisma generate
cd ..

cd feedback
npx prisma generate
cd ..
```

```bash
cd api-gateway
npm run start
cd ..

cd user
npm run start
cd ..

cd feedback
npm run start
cd ..
```

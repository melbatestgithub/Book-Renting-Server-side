const { PrismaClient } = require('@prisma/client');
const express = require('express');
const userRouter=require("./routers/User")
const app = express();
const port = 8000;
const cors=require('cors')

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())
app.use("/auth",userRouter)
// Function to check database connection
const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

// Start the server after ensuring database connection
const startServer = async () => {
  await checkDatabaseConnection();
  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
};

// Disconnect Prisma client on exit
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

startServer();

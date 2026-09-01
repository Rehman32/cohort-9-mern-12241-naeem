require('dotenv').config();
const app = require('./app');
const { connectDB, sequelize } = require('./config/db');
require('./models'); // Import models and associations
const logger = require('./config/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  
  // Sync database schemas
  await sequelize.sync({ alter: true });
  logger.info('Database models synced successfully.');

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();

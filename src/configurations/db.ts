require('dotenv').config();
import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: 3306,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  }
});

export default db;
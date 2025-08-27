import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const postgres_sequelize = new Sequelize(
  process.env.POSTGRES_DB_NAME,
  process.env.POSTGRES_DB_USER,
  process.env.POSTGRES_DB_PASSWORD,
  {
    host: process.env.POSTGRES_DB_HOST,
    dialect: "postgres",
    timezone: "America/Sao_Paulo",
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
  }
);

export default postgres_sequelize;

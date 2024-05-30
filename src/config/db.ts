import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

// console.log("process.env", process.env);
// console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*.ts"],
  logging: false,
});
//?ssl=true agregando eso al final omito comprobacion SSL
// "test": "jest --detectOpenHandles"
export default db;

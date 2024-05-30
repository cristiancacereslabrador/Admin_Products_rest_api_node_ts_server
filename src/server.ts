import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

//**CONECTAR A BASE DE DATOS */
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(
    //   colors.blue.bold("Conexion exitosa a la base de datos PostgreSQL")
    // );
  } catch (error) {
    console.log(
      colors.red.bold("Hubo un error al conectar a la base de datos PostgreSQL")
    );
  }
}
connectDB();

//**INSTANCIA DE EXPRESS */
const server = express();
//**LEER DATOS DE FORMULARIOS */
server.use(express.json());
//**ROUTING */
server.use("/api/products", router);
//**ELIMINADO PARA LA DOC API */
// server.get("/api", (req, res) => {
//   res.json({ msg: "Desde API" });
// });
//**ELIMINADO PARA LA DOC API */

//? DOCS
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;

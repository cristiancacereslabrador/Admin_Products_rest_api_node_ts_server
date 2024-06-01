import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

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
//**PERMITIR CONEXIONES (CORS) */
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // console.log("origin", origin);
    if (origin === process.env.FRONTEND_URL) {
      //   console.log("permitir");
      callback(null, true);
    } else {
      //   console.log("denegar");
      callback(new Error("Error de CORS"));
    }
  },
};
server.use(cors(corsOptions));
//**LEER DATOS DE FORMULARIOS */
server.use(express.json());

server.use(morgan("dev"));
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

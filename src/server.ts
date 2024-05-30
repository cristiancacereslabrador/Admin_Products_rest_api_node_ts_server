import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from "colors";

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

server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});

export default server;

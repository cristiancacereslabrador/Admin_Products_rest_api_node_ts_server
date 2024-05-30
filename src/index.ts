import server from "./server";
import colors from "colors";

const port = process.env.PORT || 8187;
server.listen(port, () =>
  console.log(colors.cyan.bold(`REST API corriendo en el puerto ${port}`))
);

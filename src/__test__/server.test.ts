import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

//**ELIMINADO PARA LA DOC API */
// describe("GET /api", () => {
//   it("should send back a json response", async () => {
//     const res = await request(server).get("/api");

//     expect(res.status).toBe(200);
//     expect(res.headers["content-type"]).toMatch(/json/);
//     expect(res.body.msg).toBe("Desde API");

//     expect(res.status).not.toBe(404);
//     expect(res.body.msg).not.toBe("desde api");
//     // console.log(res.status);
//   });
// });
//**ELIMINADO PARA LA DOC API */

jest.mock("../config/db");

describe("connectDB", () => {
  it("Should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("Hubo un error al conectar a la base de datos PostgreSQL")
      );
    const consoleSpy = jest.spyOn(console, "log");
    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "Hubo un error al conectar a la base de datos PostgreSQL"
      )
    );
  });
});

/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
// };
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  maxWorkers: "50%", // Usa el 50% de los núcleos de CPU disponibles
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  // cache: false, // Desactiva la caché para evitar problemas de memoria
};

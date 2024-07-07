const { DataSource } = require("typeorm");
// import { User } from "./entity/User";
// import { Audio } from "./entity/Audio";
// import { Role } from "./entity/Role";
// import { CategoryAudio } from "./entity/CategoryAudio";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 8889,
  username: "root",
  password: "root",
  database: "xassaid",
  synchronize: true,
  logging: true,
  entities: ["./src/entity/*.js"],
  subscribers: [],
  migrations: [],
});

module.exports = {
  AppDataSource,
};

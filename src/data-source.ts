import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 8889,
  username: "root",
  password: "root",
  database: "xassaid",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

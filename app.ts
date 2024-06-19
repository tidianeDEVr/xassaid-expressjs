import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { User } from "./src/entity/User";
import { AppDataSource } from "./src/data-source";

// configures dotenv to work in your application
dotenv.config();
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.use(cors());

const PORT = process.env.PORT;

AppDataSource.initialize();

app.get("/", async (request: Request, response: Response) => {
  // const user = new User();
  // user.firstName = "Timber";
  // user.lastName = "Saw";
  // user.age = 25;
  // await user.save();
  response.render("pages/dashboard");
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });

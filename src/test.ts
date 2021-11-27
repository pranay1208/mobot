import scraper from "./scraper";
import dotenv from "dotenv";
dotenv.config();
import { ScrapeRequest } from "./interface";

export const m = async () => {
  const params: ScrapeRequest = {
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
    courses: ["https://moodle.hku.hk/course/view.php?id=88357"],
  };
  const response = await scraper(params);
  console.log(response);
};

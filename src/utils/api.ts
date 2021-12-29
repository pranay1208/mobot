import axios, { AxiosResponse } from "axios";
import NodeRSA from "node-rsa";
import { ScrapeBody, ScrapeResponse } from "../interfaces/apiInterface";
import { reduxStore } from "../redux";

// const API_URL = "http://10.0.2.2:8080";
const API_URL = "http://localhost:8080";

export const fetchRefreshedData = async (
  username: string,
  password: string
): Promise<ScrapeResponse[]> => {
  const courseList = reduxStore.getState().courses;
  const courses = courseList.map((c) => c.courseUrl).join(";");
  const body = {
    username,
    password,
    courses,
  };

  const response: AxiosResponse<ScrapeResponse[]> = await axios.post(
    `${API_URL}/scrape`,
    body
  );
  console.log("Received", response.data.length, "modules");
  return response.data;
};

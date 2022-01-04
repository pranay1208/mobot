import axios, { AxiosResponse } from "axios";
import NodeRSA from "node-rsa";
import { ScrapeResponse } from "../interfaces/apiInterface";
import { reduxStore } from "../redux";

const API_URL = "https://mobotapi.herokuapp.com";

export const getPublicKey = async (): Promise<string> => {
  const response: AxiosResponse<string> = await axios.get(`${API_URL}`);
  return response.data;
};

export const encryptPassword = async (pwd: string, publicKey: string) => {
  const PUB_KEY = new NodeRSA(publicKey);
  return PUB_KEY.encrypt(pwd, "base64");
};

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

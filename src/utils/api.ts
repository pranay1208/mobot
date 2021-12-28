import axios, { AxiosResponse } from "axios";
import NodeRSA from "node-rsa";
import { ScrapeBody, ScrapeResponse } from "../interfaces/apiInterface";
import { reduxStore } from "../redux";

// const API_URL = "http://10.0.2.2:8080";
const API_URL = "http://localhost:8080";

export const getPublicEncryptionKey = async (): Promise<string> => {
  const response: AxiosResponse<string> = await axios.get(API_URL);
  return response.data;
};

export const encryptCredentials = (
  publicKey: string
): { username: string; password: string } => {
  const PUBLIC_KEY = new NodeRSA(publicKey);
  const credentials = reduxStore.getState().credentials;
  const username = credentials.username;
  const rawPwd = credentials.password;
  if (rawPwd === "") {
    return { username, password: rawPwd };
  }
  // const encryptedPwd = PUBLIC_KEY.encrypt(rawPwd, "utf8");
  return { username, password: rawPwd };
};

export const fetchRefreshedData = async (
  username: string,
  password: string
): Promise<ScrapeResponse[]> => {
  const courseList = reduxStore.getState().courses;
  const courses = courseList.map((c) => c.courseUrl).join(";");
  const body: ScrapeBody = {
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

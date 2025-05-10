import axios from "axios";
import { AXIOS_AUTH } from "./config";

export const axiosAuth = axios.create(AXIOS_AUTH)

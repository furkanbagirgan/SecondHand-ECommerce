import axios from "axios";

export const baseURL = "https://bootcamp.akbolat.net";
export default axios.create({ baseURL });

export const axiosURL = {
	login: "/auth/local",
	register: "/auth/local/register",
};
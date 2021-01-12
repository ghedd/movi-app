import axios from "axios";
const API_KEY = "1f8de683";
const API = axios.create({
	baseURL: "https://www.omdbapi.com",
	responseType: "json",
	params: {
		apikey: API_KEY,
	},
});

export default API;

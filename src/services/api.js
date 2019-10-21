import axios from "axios";

const api = axios.create({
	baseURL: "https://acomapi.herokuapp.com"
});

export default api;

// utils/API.js

import axios from "axios";

export default axios.create({
    baseURL: "https://emoji-api.com/",
    responseType: "json"
});
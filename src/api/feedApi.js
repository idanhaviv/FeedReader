import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:8080/api/"
});

const getFeed = (searchTerm, setFeed) => {
  apiService
    .get(searchTerm)
    .then(res => setFeed(res.data))
    .catch(e => console.log("e: ", e));
};

export { getFeed };

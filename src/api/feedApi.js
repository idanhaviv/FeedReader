import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:8080/api/"
});

const getFeed = async searchTerm => {
  try {
    const res = await apiService.get(searchTerm);
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export { getFeed };

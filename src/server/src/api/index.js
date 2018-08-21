import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import axios from "axios";
import { parseString } from "xml2js";

const apiService = axios.create({
  baseURL: "https://medium.com/feed/"
});

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use("/facets", facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get("/:searchTerm", async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
      const response = await apiService.get(searchTerm);
      parseString(response.data, (err, res2) => {
        const feedItems = res2.rss.channel[0].item;
        const avatar = res2.rss.channel[0].image;
        res.json({ feedItems, avatar });
      });
    } catch (error) {
      console.log("error: ", error.message);
      throw error;
    }
  });

  return api;
};

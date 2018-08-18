import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React from "react";
import { compose, withState } from "recompose";
import "./App.css";
import FeedItem from "./components/FeedItem";

const apiService = axios.create({
  baseURL: "http://localhost:8080/api/"
});

const search = (searchTerm, setFeedItems) => {
  console.log("searchTerm: ", searchTerm);
  apiService
    .get(searchTerm)
    .then(res => setFeedItems(res.data))
    .catch(e => console.log("e: ", e));
};
const withSearchTerm = withState("searchTerm", "setSearchTerm", "@linabeau");
const withFeedItems = withState("feedItems", "setFeedItems", []);

const App = ({ searchTerm, setSearchTerm, feedItems, setFeedItems }) => (
  <div
    className="App"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <TextField
      id="name"
      label="Feed Name"
      className={"abc"}
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      margin="normal"
      InputLabelProps={{ required: true }}
    />
    <Button
      variant="contained"
      color="primary"
      className={"classes.button"}
      onClick={() => search(searchTerm, setFeedItems)}
    >
      Get Feed
    </Button>
    {feedItems.map((item, index) => (
      <FeedItem
        key={index}
        title={item.title[0]}
        content="some content"
        avatarSrc="./avatar.jpeg"
        image="./download.jpeg"
      />
    ))}
  </div>
);

const enhanced = compose(
  withSearchTerm,
  withFeedItems
);
export default enhanced(App);

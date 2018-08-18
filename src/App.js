import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React from "react";
import { compose, withState, withProps } from "recompose";
import "./App.css";
import FeedItem from "./components/FeedItem";
import { logProp } from "./dev_utils/utils";

const apiService = axios.create({
  baseURL: "http://localhost:8080/api/"
});

const search = (searchTerm, setFeed) => {
  console.log("searchTerm: ", searchTerm);
  apiService
    .get(searchTerm)
    .then(res => setFeed(res.data))
    .catch(e => console.log("e: ", e));
};
const withSearchTerm = withState("searchTerm", "setSearchTerm", "@idanhaviv");
const withFeed = withState("feed", "setFeed", []);
const createMarkup = htmlTexxt => {
  return { __html: htmlTexxt };
};

const extractPreviewImageSrc = (htmlText, defaultImageSrc) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(htmlText, "text/xml");
  const images = dom.getElementsByTagName("img");
  const imageSrc =
    images && images.length > 0
      ? images[0].getAttribute("src")
      : defaultImageSrc;
  return imageSrc;
};

const withAvatar = withProps(({ feed }) => {
  const avatar =
    feed.avatar && feed.avatar.length > 0
      ? feed.avatar[0].url[0]
      : "./avatar.jpeg";
  return { avatar };
});

const App = ({ searchTerm, setSearchTerm, feed, setFeed, avatar }) => (
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
      onClick={() => search(searchTerm, setFeed)}
    >
      Get Feed
    </Button>
    {feed &&
      feed.feedItems &&
      feed.feedItems.map((item, index) => (
        // <div
        //   key={index}
        //   dangerouslySetInnerHTML={createMarkup(item["content:encoded"])}
        // />
        <FeedItem
          key={index}
          // title={item.title[0]}
          content={item.title[0]}
          avatarSrc={avatar}
          image={extractPreviewImageSrc(
            item["content:encoded"],
            "./download.jpeg"
          )}
        />
      ))}
  </div>
);

const enhanced = compose(
  withSearchTerm,
  withFeed,
  withAvatar,
  logProp("avatar")
);
export default enhanced(App);

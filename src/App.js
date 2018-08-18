import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { compose, withProps, withState } from "recompose";
import "./App.css";
import FeedItem from "./components/FeedItem";
import { getFeed } from "./api/feedApi";
import {
  extractPreviewImageSrc,
  getPublishDate,
  extractContents
} from "./htmlUtils/parser";

const withSearchTerm = withState("searchTerm", "setSearchTerm", "@idanhaviv");
const withFeed = withState("feed", "setFeed", []);

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
      onClick={() => getFeed(searchTerm, setFeed)}
    >
      Get Feed
    </Button>
    {feed &&
      feed.feedItems &&
      feed.feedItems.map((item, index) => (
        <FeedItem
          key={index}
          title={item.title[0]}
          content={extractContents(item["content:encoded"])}
          avatarSrc={avatar}
          image={extractPreviewImageSrc(
            item["content:encoded"],
            "./download.jpeg"
          )}
          subHeader={getPublishDate(item)}
        />
      ))}
  </div>
);

const enhanced = compose(
  withSearchTerm,
  withFeed,
  withAvatar
  // logProp("feed")
);
export default enhanced(App);

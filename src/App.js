import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { compose, withProps, withState } from "recompose";
import "./App.css";
import { getFeed } from "./api/feedApi";
import Feed from "./components/Feed";

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
    <Feed feed={feed} avatar={avatar} />
  </div>
);

const enhanced = compose(
  withSearchTerm,
  withFeed,
  withAvatar
  // logProp("feed")
);
export default enhanced(App);

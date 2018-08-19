import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { compose, withProps, withState } from "recompose";
import "./App.css";
import { getFeed } from "./api/feedApi";
import Feed from "./components/Feed";
import { Provider, connect } from "react-redux";
import store from "./store/store";
import {
  setSearchInput,
  requestFeed,
  receiveFeed
} from "./store/actions/feedActions";

const mapStateToProps = state => {
  return { searchInput: state.searchInput, feed: state.currentFeed };
};

const mapDispatchToProps = {
  setSearchInput,
  requestFeed
};

const withAvatar = withProps(({ feed }) => {
  const avatar =
    feed && feed.avatar && feed.avatar.length > 0
      ? feed.avatar[0].url[0]
      : "./avatar.jpeg";
  return { avatar };
});

const App = ({ searchInput, setSearchInput, feed, avatar, requestFeed }) => (
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
      value={searchInput}
      onChange={e => setSearchInput(e.target.value)}
      margin="normal"
      InputLabelProps={{ required: true }}
    />
    <Button
      variant="contained"
      color="primary"
      className={"classes.button"}
      onClick={() => requestFeed(searchInput)}
    >
      Get Feed
    </Button>
    <Feed feed={feed} avatar={avatar} />
  </div>
);

const enhanced = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAvatar
  // logProp("feed")
);
export default enhanced(App);

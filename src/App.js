import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { compose, withProps, withState } from "recompose";
import "./App.css";
import { getFeed } from "./api/feedApi";
import Feed from "./components/Feed";
import { Provider, connect } from "react-redux";
import store from "./store/store";
import { setSearchInput } from "./store/actions/feedActions";

const mapStateToProps = state => {
  return { searchInput: state.searchInput };
};

const mapDispatchToProps = {
  setSearchInput
};

const withFeed = withState("feed", "setFeed", []);

const withAvatar = withProps(({ feed }) => {
  const avatar =
    feed.avatar && feed.avatar.length > 0
      ? feed.avatar[0].url[0]
      : "./avatar.jpeg";
  return { avatar };
});

const App = ({ searchInput, setSearchInput, feed, setFeed, avatar }) => (
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
      onClick={() => getFeed(searchInput, setFeed)}
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
  withFeed,
  withAvatar
  // logProp("feed")
);
export default enhanced(App);

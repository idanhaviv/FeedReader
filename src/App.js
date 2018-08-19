import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import "./App.css";
import Feed from "./components/Feed";
import { requestFeed, setSearchInput } from "./store/actions/feedActions";
import withLoader from "./components/withLoader";

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput,
    feed: state.currentFeed,
    feedRequestErrorMessage: state.feedRequestErrorMessage,
    isLoading: state.isLoading
  };
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

const App = ({
  searchInput,
  setSearchInput,
  feed,
  avatar,
  requestFeed,
  isLoading,
  feedRequestErrorMessage
}) => (
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

const LoadableApp = withLoader(App);
const enhanced = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAvatar
  // logProp("feed")
);
export default enhanced(LoadableApp);

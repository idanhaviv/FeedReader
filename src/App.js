import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import "./App.css";
import Feed from "./components/Feed";
import {
  requestFeed,
  setSearchInput,
  updateCurrentFeed
} from "./store/actions/feedActions";
import withLoader from "./components/withLoader";
import { logProp } from "./dev_utils/utils";

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput,
    feed: state.feed,
    feedRequestErrorMessage: state.feedRequestErrorMessage,
    isLoading: state.isLoading,
    requestedFeedName: state.requestedFeedName,
    currentFeedIsUpdated: state.currentFeedIsUpdated
  };
};

const mapDispatchToProps = {
  setSearchInput,
  requestFeed,
  updateCurrentFeed
};

const withAvatar = withProps(({ feed }) => {
  const avatar =
    feed && feed.avatar && feed.avatar.length > 0
      ? feed.avatar[0].url[0]
      : "./avatar.jpeg";
  return { avatar };
});

const UpdateFeedComponent = ({ shouldUpdate, updateFeedAction }) => {
  if (!shouldUpdate) return <div />;

  return (
    <Button
      variant="contained"
      color="primary"
      className={"classes.button"}
      onClick={updateFeedAction}
    >
      Update Feed
    </Button>
  );
};

const App = ({
  searchInput,
  setSearchInput,
  feed,
  avatar,
  requestFeed,
  currentFeedIsUpdated,
  updateCurrentFeed
}) => (
  <div
    className="App"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <UpdateFeedComponent
      shouldUpdate={!currentFeedIsUpdated}
      updateFeedAction={updateCurrentFeed}
    />
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

const withErrorPresenter = Component => ({
  feedRequestErrorMessage,
  ...otherProps
}) => (
  <div>
    {feedRequestErrorMessage && (
      <div className="error-message">{feedRequestErrorMessage}</div>
    )}
    <Component {...otherProps} />
  </div>
);
const enhanced = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAvatar,
  withLoader,
  withErrorPresenter
  // logProp("feed")
);
export default enhanced(App);

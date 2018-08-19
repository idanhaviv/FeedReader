import { getFeed } from "../../api/feedApi";

export const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
export const REQUESTING_FEED = "REQUESTING_FEED";
export const RECEIVE_FEED_SUCCESS = "RECEIVE_FEED_SUCCESS";
export const RECEIVE_FEED_FAILURE = "RECEIVE_FEED_FAILURE";

export const setSearchInput = input => ({
  type: SET_SEARCH_INPUT,
  searchInput: input
});

export const requestingFeed = feedName => ({ type: REQUESTING_FEED, feedName });
export const receiveFeedSuccess = feed => ({
  type: RECEIVE_FEED_SUCCESS,
  feed
});
export const receiveFeedFailure = error => ({
  type: RECEIVE_FEED_FAILURE,
  error
});

export const requestFeed = feedName => {
  console.log("feedName: ", feedName);

  return async dispatch => {
    console.log("dispatch: ", dispatch);

    dispatch(requestingFeed(feedName));
    try {
      const feed = await getFeed(feedName);
      console.log("feed: ", feed);
      dispatch(receiveFeedSuccess(feed));
    } catch (error) {
      dispatch(receiveFeedFailure(error.message));
    }
  };
};

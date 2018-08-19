import { getFeed } from "../../api/feedApi";

export const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
export const REQUESTING_FEED = "REQUESTING_FEED";
export const GET_CACHED_FEED = "GET_CACHED_FEED";
export const UPDATE_CURRENT_FEED = "UPDATE_CURRENT_FEED";
export const RECEIVE_FEED_SUCCESS = "RECEIVE_FEED_SUCCESS";
export const RECEIVE_FEED_FAILURE = "RECEIVE_FEED_FAILURE";

export const setSearchInput = input => ({
  type: SET_SEARCH_INPUT,
  searchInput: input
});

export const requestingFeed = feedName => ({
  type: REQUESTING_FEED,
  requestedFeedName: feedName
});

export const updateCurrentFeed = () => ({
  type: UPDATE_CURRENT_FEED
});

export const getCachedFeed = feedName => ({ type: GET_CACHED_FEED, feedName });

export const receiveFeedSuccess = (feed, feedName) => ({
  type: RECEIVE_FEED_SUCCESS,
  feed,
  feedName
});

export const receiveFeedFailure = error => ({
  type: RECEIVE_FEED_FAILURE,
  error
});

export const requestFeed = feedName => {
  return async dispatch => {
    dispatch(getCachedFeed(feedName));
    dispatch(requestingFeed(feedName));
    try {
      const feed = await getFeed(feedName);
      dispatch(receiveFeedSuccess(feed, feedName));
    } catch (error) {
      console.log("error1: ", error);
      dispatch(receiveFeedFailure(error.message));
    }
  };
};

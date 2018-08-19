import {
  SET_SEARCH_INPUT,
  REQUESTING_FEED,
  RECEIVE_FEED_SUCCESS,
  RECEIVE_FEED_FAILURE
} from "../actions/feedActions";

export default (
  state = {
    searchInput: "",
    feed: [],
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.searchInput };
    case REQUESTING_FEED:
      console.log("REQUESTING_FEED: ", REQUESTING_FEED);

      return { ...state, requestedFeedName: action.feedName, isLoading: true };
    case RECEIVE_FEED_SUCCESS:
      console.log("RECEIVE_FEED_SUCCESS: ", RECEIVE_FEED_SUCCESS);
      return { ...state, currentFeed: action.feed, isLoading: false };
    case RECEIVE_FEED_FAILURE:
      return {
        ...state,
        feedRequestErrorMessage: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

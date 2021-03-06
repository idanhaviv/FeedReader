import {
  SET_SEARCH_INPUT,
  REQUESTING_FEED,
  RECEIVE_FEED_SUCCESS,
  RECEIVE_FEED_FAILURE,
  GET_CACHED_FEED,
  UPDATE_CURRENT_FEED
} from "../actions/feedActions";

export default (
  state = {
    searchInput: "",
    feed: {},
    isLoading: false,
    currentFeedName: "",
    requestedFeedName: "",
    currentFeedIsUpdated: true,
    updatedFeed: {},
    feedRequestErrorMessage: ""
  },
  action
) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.searchInput };
    case GET_CACHED_FEED:
      return state[action.feedName]
        ? {
            ...state,
            currentFeedName: action.feedName,
            feed: state[action.feedName]
          }
        : state;
    case REQUESTING_FEED:
      return {
        ...state,
        requestedFeedName: action.requestedFeedName,
        isLoading: true
      };
    case UPDATE_CURRENT_FEED:
      const updatedFeed = state.updatedFeed;
      return {
        ...state,
        feed: updatedFeed,
        updatedFeed: [],
        currentFeedIsUpdated: true,
        isLoading: false
      };
    case RECEIVE_FEED_SUCCESS:
      const newState = { ...state };
      newState[action.feedName] = action.feed;
      if (state.currentFeedName === action.feedName) {
        // check if cached feed and returned feed are equal
        return {
          ...newState,
          isLoading: false,
          currentFeedIsUpdated: false,
          updatedFeed: action.feed
        };
      }
      return {
        ...newState,
        feed: action.feed,
        currentFeedName: action.feedName,
        requestedFeedName: "",
        isLoading: false,
        currentFeedIsUpdated: true
      };
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

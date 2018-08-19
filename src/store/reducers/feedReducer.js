import { SET_SEARCH_INPUT } from "../actions/feedActions";

export default (
  state = {
    searchInput: "",
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.searchInput };
    default:
      return state;
  }
};

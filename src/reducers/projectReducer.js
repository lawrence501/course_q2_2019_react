import { GET_PROJECTS, GET_SINGLE_PROJECT } from "../actions/types";

const initialState = {
  projects: [],
  project: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case GET_SINGLE_PROJECT:
      return {
        ...state,
        project: action.payload
      };
    default:
      return state;
  }
}

import {
  GET_BACKLOG,
  GET_PROJECT_TASKS,
  DELETE_TASK,
  GET_SINGLE_TASK
} from "../actions/types";

const initialState = {
  projectTasks: [],
  projectTask: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        projectTasks: action.payload
      };
    case GET_PROJECT_TASKS:
      return {
        ...state,
        projectTask: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter(
          task => task.projectSequence !== action.payload
        )
      };
    case GET_SINGLE_TASK:
      return {
        ...state,
        projectTask: action.payload
      };
    default:
      return state;
  }
}

import axios from "axios";
import { GET_ERRORS } from "./types";

const apiRoot = "/api/backlog";

export const addProjectTask = (
  backlogId,
  newTask,
  history
) => async dispatch => {
  try {
    await axios.post(`${apiRoot}/${backlogId}`, newTask);
    history.push(`/projectBoard/${backlogId}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

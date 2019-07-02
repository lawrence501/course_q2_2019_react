import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_SINGLE_TASK, DELETE_TASK } from "./types";

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

export const updateProjectTask = (
  backlogId,
  newTask,
  history
) => async dispatch => {
  try {
    await axios.patch(`${apiRoot}/${backlogId}`, newTask);
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

export const getBacklog = backlogId => async dispatch => {
  try {
    const res = await axios.get(`${apiRoot}/${backlogId}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getSingleTask = (backlogId, taskSequence) => async dispatch => {
  const res = await axios.get(`${apiRoot}/${backlogId}/${taskSequence}`);
  dispatch({
    type: GET_SINGLE_TASK,
    payload: res.data
  });
};

export const deleteTask = (backlogId, taskSequence) => async dispatch => {
  if (window.confirm("Are you sure you wish to delete this project task?")) {
    await axios.delete(`${apiRoot}/${backlogId}/${taskSequence}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskSequence
    });
  }
};

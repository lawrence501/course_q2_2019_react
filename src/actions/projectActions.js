import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_SINGLE_PROJECT,
  DELETE_PROJECT
} from "./types";

const apiRoot = "/api/project";

export const createProject = (project, history) => async dispatch => {
  try {
    await axios.post(apiRoot, project);
    history.push("/dashboard");
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

export const getProjects = () => async dispatch => {
  const res = await axios.get(`${apiRoot}/all`);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

export const getSingleProject = (
  projectIdentifier,
  history
) => async dispatch => {
  try {
    const res = await axios.get(`${apiRoot}/${projectIdentifier}`);
    dispatch({
      type: GET_SINGLE_PROJECT,
      payload: res.data
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const deleteProject = projectIdentifier => async dispatch => {
  if (
    window.confirm(
      "Are you sure you wish to delete the project and all related tasks?"
    )
  ) {
    await axios.delete(`${apiRoot}/${projectIdentifier}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: projectIdentifier
    });
  }
};

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTask } from "../../../actions/backlogActions";

class ProjectTask extends Component {
  onClickDelete = () => {
    const { projectIdentifier, projectSequence } = this.props.task;
    this.props.deleteTask(projectIdentifier, projectSequence);
  };

  render() {
    const { task } = this.props;

    let priorityString = "LOW";
    let priorityClass = "bg-info text-light";

    switch (task.priority) {
      case 1:
        priorityClass = "bg-danger text-light";
        priorityString = "HIGH";
        break;
      case 2:
        priorityClass = "bg-warning text-light";
        priorityString = "MEDIUM";
        break;
      default:
        break;
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {task.projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{task.summary}</h5>
          <p className="card-text text-truncate ">{task.acceptanceCriteria}</p>
          <Link
            to={`/updateProjectTask/${task.projectIdentifier}/${
              task.projectSequence
            }`}
          >
            View / Update
          </Link>
          <button
            onClick={this.onClickDelete.bind(this)}
            className="btn btn-danger ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTask }
)(ProjectTask);

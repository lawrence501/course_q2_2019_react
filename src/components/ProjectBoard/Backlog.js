import React, { Component } from "react";
import PropTypes from "prop-types";
import ProjectTask from "./ProjectTask/ProjectTask";

class Backlog extends Component {
  render() {
    const { projectTasks } = this.props;
    const tasks = projectTasks.map(projectTask => {
      return <ProjectTask key={projectTask.id} task={projectTask} />;
    });

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];
    tasks.forEach(task => {
      if (task.props.task.status === "TODO") {
        todoItems.push(task);
      } else if (task.props.task.status === "IN_PROGRESS") {
        inProgressItems.push(task);
      } else if (task.props.task.status === "DONE") {
        doneItems.push(task);
      }
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TODO</h3>
              </div>
            </div>
            {todoItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

Backlog.propTypes = {
  projectTasks: PropTypes.array.isRequired
};

export default Backlog;

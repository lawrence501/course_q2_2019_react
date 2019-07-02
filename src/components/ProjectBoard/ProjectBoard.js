import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };

    this.renderBoard = this.renderBoard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    const { projectIdentifier } = this.props.match.params;
    this.props.getBacklog(projectIdentifier);
  }

  renderBoard() {
    const { projectTasks } = this.props.backlog;
    const { errors } = this.state;

    if (projectTasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectNotFound}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            This project has no tasks.
          </div>
        );
      }
    }
    return <Backlog projectTasks={projectTasks} />;
  }

  render() {
    const { projectIdentifier } = this.props.match.params;
    return (
      <div className="container">
        <Link to={`/addProjectTask/${projectIdentifier}`}>
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {this.renderBoard()}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(ProjectBoard);

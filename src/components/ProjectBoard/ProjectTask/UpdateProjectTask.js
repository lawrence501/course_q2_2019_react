import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  updateProjectTask,
  getSingleTask
} from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);
    const { projectIdentifier, taskSequence } = this.props.match.params;
    this.state = {
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: 0,
      dueDate: "",
      projectIdentifier: projectIdentifier,
      projectSequence: taskSequence,
      id: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { projectIdentifier, taskSequence } = this.props.match.params;
    this.props.getSingleTask(projectIdentifier, taskSequence);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    const {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      id
    } = nextProps.backlog.projectTask;
    this.setState({
      summary: summary,
      acceptanceCriteria: acceptanceCriteria,
      status: status,
      priority: priority,
      dueDate: dueDate,
      id: id
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newTask = this.state;
    this.props.updateProjectTask(
      this.state.projectIdentifier,
      newTask,
      this.props.history
    );
  }

  render() {
    const { projectIdentifier, taskSequence } = this.props.match.params;
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${projectIdentifier}`}>
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">{taskSequence}</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  updateProjectTask: PropTypes.func.isRequired,
  getSingleTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  backlog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  backlog: state.backlog
});

export default connect(
  mapStateToProps,
  { updateProjectTask, getSingleTask }
)(UpdateProjectTask);

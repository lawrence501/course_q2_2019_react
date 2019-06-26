import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { project } = this.props;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {project.projects.map(function(projectItem, idx) {
                return (
                  <ProjectItem
                    key={idx}
                    projectIdentifier={projectItem.projectIdentifier}
                    projectName={projectItem.projectName}
                    description={projectItem.description}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  {
    getProjects
  }
)(Dashboard);

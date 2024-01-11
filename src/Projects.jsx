import React from "react";
import { ListGroup } from "react-bootstrap";

const Projects = ({ projects }) => {
  return (
    <ListGroup>
      {projects.map((project, index) => (
        <ListGroup.Item key={index}>{project}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Projects;

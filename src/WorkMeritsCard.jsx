import React from "react";
import { Card } from "react-bootstrap";

const WorkMeritsCard = ({ merits }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Work Experience</Card.Title>
        {Object.entries(merits).map(([key, value], index) => (
          <div key={index}>
            <strong>{key}</strong>
            <p>{value}</p>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default WorkMeritsCard;

import React from "react";
import { Card } from "react-bootstrap";

const WorkMeritsCard = ({ merits }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Work Experience</Card.Title>
        {Object.entries(merits).map(([key, value], index) => {
          const [years, description] = value.split(' | ');

          return (
            <div key={index}>
              <strong>{key}</strong>
              <div>{years}</div>
              <p>{description}</p>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default WorkMeritsCard;

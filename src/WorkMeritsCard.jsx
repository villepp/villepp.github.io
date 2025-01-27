import React from "react";
import { Card, Badge } from "react-bootstrap";

const WorkMeritsCard = ({ merits }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="mb-4">Work Experience</Card.Title>
        {merits.map((merit, index) => (
          <div key={index} className="mb-4">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="mb-1">{merit.company}</h5>
              <Badge bg="primary">{merit.type}</Badge>
            </div>
            <h6 className="text-muted mb-2">{merit.position}</h6>
            <div className="mb-2">
              {merit.periods.map((period, idx) => (
                <Badge key={idx} bg="secondary" className="me-2">
                  {period}
                </Badge>
              ))}
            </div>
            <ul className="list-unstyled">
              {merit.responsibilities.map((resp, idx) => (
                <li key={idx} className="mb-1">• {resp}</li>
              ))}
            </ul>
            {index < merits.length - 1 && <hr />}
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default WorkMeritsCard;
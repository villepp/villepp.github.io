import React from "react";
import { Card } from "react-bootstrap";

const BioCard = ({ bio }) => {
  return (
    <Card className="h-100">
      <Card.Body className="compact-card-body">
        <Card.Title className="mb-3">About Me</Card.Title>
        <Card.Text className="bio-text">{bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BioCard;
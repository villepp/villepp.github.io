import React from "react";
import { Card } from "react-bootstrap";

const BioCard = ({ bio }) => {
  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Body className="d-flex flex-column">
        <Card.Title>Bio</Card.Title>
        <Card.Text className="flex-grow-1">{bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BioCard;

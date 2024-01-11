import React from "react";
import { Card } from "react-bootstrap";

const ProfileCard = ({ imageUrl }) => {
  return (
    <Card className="border-0">
      <Card.Img variant="top" src={imageUrl} className="img-responsive w-100" />
    </Card>
  );
};

export default ProfileCard;

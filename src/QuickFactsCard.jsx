import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const QuickFactsCard = ({ facts }) => (
  <Card>
    <Card.Body>
      <Card.Title>Quick Info</Card.Title>
      {Object.entries(facts).map(([key, value]) => {
        if (key === "Links" && typeof value === "object") {
          return (
            <p key={key}>
              <strong>{key}:</strong>{" "}
              {Object.entries(value).map(([site, url], index, array) => (
                <span key={site}>
                  <a href={url} target="_blank" rel="noopener noreferrer">{site}</a>
                  {' '} {/* Space before the icon */}
                  {site === "LinkedIn" && <FontAwesomeIcon icon={faLinkedin} />} {/* LinkedIn Icon */}
                  {site === "GitHub" && <FontAwesomeIcon icon={faGithub} />} {/* GitHub Icon */}
                  {index < array.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          );
        } else {
          return (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          );
        }
      })}
    </Card.Body>
  </Card>
);

export default QuickFactsCard;

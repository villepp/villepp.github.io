import React from "react";
import { Card, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLinkedin, 
  faGithub 
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const QuickFactsCard = ({ facts }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'linkedin':
        return faLinkedin;
      case 'github':
        return faGithub;
      case 'globe':
        return faGlobe;
      default:
        return null;
    }
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="mb-4">Quick Info</Card.Title>
        
        <div className="mb-3">
          <h6>Personal</h6>
          <p className="mb-1">{facts.name}</p>
          <p className="mb-1">{facts.age} years old</p>
          <p className="mb-1">{facts.education}</p>
        </div>

        <div className="mb-3">
          <h6>Languages</h6>
          {facts.languages.map((lang, index) => (
            <Badge 
              key={index} 
              bg="info" 
              className="me-2 mb-2"
              title={lang.level}
            >
              {lang.language}
            </Badge>
          ))}
        </div>

        <div className="mb-3">
          <h6>Technologies</h6>
          {facts.technologies.map((tech, index) => (
            <Badge 
              key={index} 
              bg="secondary" 
              className="me-2 mb-2"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mb-3">
          <h6>Connect</h6>
          <div className="d-flex flex-wrap gap-3">
            {facts.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <FontAwesomeIcon 
                  icon={getIcon(link.icon)} 
                  className="me-2"
                />
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-2">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            {facts.email}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuickFactsCard;
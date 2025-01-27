import React, { useState } from "react";
import { Card, Badge, Collapse } from "react-bootstrap";

const SkillsCard = ({ skills }) => {
  const [expandedSkill, setExpandedSkill] = useState(null);

  const toggleSkill = (skillName) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="mb-4">Technical Skills</Card.Title>
        {skills.map((skill, index) => (
          <div key={index} className="mb-4">
            <div 
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              onClick={() => toggleSkill(skill.name)}
              style={{ cursor: 'pointer' }}
            >
              <h5 className="mb-0">{skill.name}</h5>
              <span className="text-warning">{renderStars(skill.rating)}</span>
            </div>
            
            <div className="mb-2">
              {skill.technologies.map((tech, idx) => (
                <Badge key={idx} bg="secondary" className="me-2 mb-2">
                  {tech}
                </Badge>
              ))}
            </div>

            <Collapse in={expandedSkill === skill.name}>
              <div>
                {skill.achievements.map((achievement, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>{achievement.title}</span>
                      {achievement.grade && (
                        <Badge bg="success">Grade: {achievement.grade}</Badge>
                      )}
                      {achievement.date && (
                        <Badge bg="info">{achievement.date}</Badge>
                      )}
                    </div>
                    {achievement.description && (
                      <small className="text-muted">{achievement.description}</small>
                    )}
                  </div>
                ))}
              </div>
            </Collapse>
            {index < skills.length - 1 && <hr />}
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default SkillsCard;
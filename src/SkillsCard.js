import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./SkillsCard.css";

function SkillsCard({ skills }) {
  const [visibleProjects, setVisibleProjects] = useState({});

  const handleToggleProjects = (skillName) => {
    setVisibleProjects({
      ...visibleProjects,
      [skillName]: !visibleProjects[skillName],
    });
  };

  const filledStar = "⭐";
  const hollowStar = "☆";
  const downArrow = "▼";
  const upArrow = "▲";

  return (
    <Card>
      <Card.Body>
        <Card.Title>Skills</Card.Title>
        {skills.map((skill, index) => {
          const starsDisplay = [];
          for (let i = 0; i < 5; i++) {
            starsDisplay.push(
              <span
                key={i}
                className="interactive-stars"
                onClick={() => handleToggleProjects(skill.name)}
              >
                {i < skill.rating ? filledStar : hollowStar}
              </span>
            );
          }

          const arrow = visibleProjects[skill.name] ? upArrow : downArrow;

          return (
            <div key={index} className="skill-section">
              <Card.Subtitle
                className="interactive-element"
                onClick={() => handleToggleProjects(skill.name)}
              >
                {skill.name} <span className="arrow-icon">{arrow}</span>
              </Card.Subtitle>
              <div
                className="stars-container"
                onClick={() => handleToggleProjects(skill.name)}
              >
                {starsDisplay}
              </div>
              {visibleProjects[skill.name] && skill.projects && (
                <ul>
                  {skill.projects.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default SkillsCard;

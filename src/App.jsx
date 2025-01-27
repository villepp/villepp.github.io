import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import BioCard from "./BioCard";
import SkillsCard from "./SkillsCard";
import WorkMeritsCard from "./WorkMeritsCard";
import QuickFactsCard from "./QuickFactsCard";
import AnimatedBackground from "./AnimatedBackground";
import cvData from "./cvData.json";
import "./styles.css";

function App() {
  const { bio, quickFacts, skills, workExperience } = cvData;

  return (
    <>
      <AnimatedBackground />
      <header className="header-section">
        <Container>
          <h1 className="profile-title">Ville Pitkänen</h1>
          <p className="profile-subtitle">Information Technology Student & Developer</p>
        </Container>
      </header>
      
      <Container>
        <Row className="row-equal-height">
          <Col xs={12} lg={4} className="mb-4">
            <QuickFactsCard facts={quickFacts} />
          </Col>
          <Col xs={12} lg={8}>
            <Row>
              <Col xs={12} className="mb-4">
                <BioCard bio={bio} />
              </Col>
              <Col xs={12} md={6} className="mb-4">
                <SkillsCard skills={skills} />
              </Col>
              <Col xs={12} md={6} className="mb-4">
                <WorkMeritsCard merits={workExperience} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import BioCard from "./BioCard";
import SkillsCard from "./SkillsCard";
import WorkMeritsCard from "./WorkMeritsCard";
import cvData from "./cvData.json";
import QuickFactsCard from "./QuickFactsCard";
import "./styles.css";

function App() {
  const { imageUrl, bio, quickFacts, skills, workMerits } = cvData;

  const profileImageUrl = imageUrl.startsWith("ProfilePic")
    ? "/pfp.jpg"
    : imageUrl;

  return (
    <>
      {/* <header className="app-header">
          <h1>Ville's CV website</h1>
      </header> */}
      <Container className="py-3">
        <Row>
          <Col xs={12} md={6} lg={4} className="custom-card">
            <ProfileCard imageUrl={profileImageUrl} />
          </Col>
          <Col xs={12} md={6} lg={4} className="custom-card">
            <BioCard bio={bio} />
          </Col>
          <Col xs={12} md={6} lg={4} className="custom-card">
            <QuickFactsCard facts={quickFacts} />
          </Col>
        </Row>
        <Row className="row-equal-height">
          <Col xs={12} md={6} className="custom-card">
            <SkillsCard skills={skills} />
          </Col>
          <Col xs={12} md={6} className="custom-card">
            <WorkMeritsCard merits={workMerits} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

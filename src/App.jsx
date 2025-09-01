import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const links = [
    { name: "Email", href: "mailto:pitkanenville@proton.me" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ville-p-10456719b/" },
    { name: "GitHub", href: "https://github.com/villepp" }
  ];

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <div className="layout">
        {/* Left side - Main info */}
        <section className="main-section">
          <div className="content">
            <h1 className="name">
              Ville Pitkänen<span className="cursor">_</span>
            </h1>

            <p className="title">
              Information Technology Student · Developer
            </p>

            <div className="links">
              {links.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="link"
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* ASCII art decoration */}
          <div className="ascii-decoration">
            <pre>{`
  ◢◤◢◤◢◤
  ◤◢◤◢◤◢
  ◢◤◢◤◢◤
            `}</pre>
          </div>
        </section>

        {/* Right side - Minimal pattern */}
        <aside className="pattern-section">
          <div className="pattern"></div>
        </aside>
      </div>
    </div>
  );
}

export default App;
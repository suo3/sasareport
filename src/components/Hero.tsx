import React from 'react';
import { Code, Globe } from 'lucide-react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="hero section-padding">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="hero-intro">
            I am Samuel
          </div>

          <h1 className="hero-title">
            Software Developer <br /> & UI/UX Designer
          </h1>

          <p className="hero-description">
            Blending thoughtful UI design with clean, responsive development to create scalable digital platforms that look great and perform flawlessly.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn btn-primary">
              Download CV
            </a>
          </div>

          <div className="hero-socials">
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <Globe size={20} />
            </a>
            <a href="#" aria-label="GitHub" className="social-icon">
              <Code size={20} />
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper animate-fade-in">
          <img src="/avatar.png" alt="Developer Avatar" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

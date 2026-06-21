import React from 'react';
import { Code, Globe, Share2 } from 'lucide-react';
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
            {/* <a  href="#" className="btn btn-primary">
              Download CV
            </a> */}
            <div className="hero-social-links mono">
              <a href="#" className="hero-social-btn">
                <Code size={18} />
                <span>GITHUB</span>
              </a>
              <a href="#" className="hero-social-btn">
                <Globe size={18} />
                <span>LINKEDIN</span>
              </a>
              <a href="#" className="hero-social-btn">
                <Share2 size={18} />
                <span>X / TWITTER</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper animate-fade-in">
          <img src="/avatar.png" alt="Developer Avatar" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">

        {/* Logo left */}
        <div className="nav-brand">
          <a href="#home" className="brand-logo" style={{ textDecoration: 'none' }}>
            <span className="brand-initials">SOA</span>
          </a>
        </div>

        {/* Center Pill Navigation */}
        <div className="nav-pill">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#stack" className="nav-link">Stack</a>
        </div>

        {/* CTA Right */}
        <div className="nav-cta">
          <a href="#contact" className="btn btn-secondary nav-btn">Let's Talk</a>
        </div>

      </div>
    </nav>
  );
};

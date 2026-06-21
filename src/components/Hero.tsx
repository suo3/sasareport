import React, { useState, useEffect } from 'react';
import { Code, Globe, Share2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Hero.css';

export const Hero: React.FC = () => {
  const [settings, setSettings] = useState({
    hero_intro: 'Hello, I am Samuel',
    hero_title: 'Software Developer <br /> & Designer',
    hero_description: 'Blending thoughtful UI design with clean, responsive development to create scalable digital platforms that look great and perform flawlessly.'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('sasareport_settings').select('*');
      if (data) {
        const newSettings = { ...settings };
        data.forEach((row) => {
          if (row.key in newSettings) {
            newSettings[row.key as keyof typeof settings] = row.value;
          }
        });
        setSettings(newSettings);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section id="home" className="hero section-padding">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="hero-intro">
            {settings.hero_intro}
          </div>

          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: settings.hero_title }}></h1>

          <p className="hero-description">
            {settings.hero_description}
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

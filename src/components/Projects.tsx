import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Code, ExternalLink } from 'lucide-react';
import './Projects.css';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  year: string;
  status: string;
  tags: string[];
  demo_url: string | null;
  source_url: string | null;
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('sasareport_projects')
          .select('*')
          .order('year', { ascending: false });
        
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Projects</h2>
          <div className="section-subtitle">Active & In-Flight Digital Platforms</div>
          
          <div className="filter-tabs mono">
            {['ALL', 'ACTIVE', 'BETA'].map((tab) => (
              <span 
                key={tab} 
                className={`tab ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loader mono">FETCHING LOGS...</div>
        ) : (
          <div className="projects-grid">
            {projects
              .filter((project) => filter === 'ALL' || project.status.toUpperCase() === filter)
              .map((project) => (
              <div key={project.id} className="glass-card project-card">
                <div className="project-image-container">
                  <div className={`status-badge mono ${project.status.toLowerCase()}`}>
                    STATUS: {project.status}
                  </div>
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="project-image" />
                  ) : (
                    <div className="placeholder-image">
                      <div className="grid-overlay"></div>
                    </div>
                  )}
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-year mono">{project.year}</span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tags mono">
                    {project.tags?.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="project-links mono">
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="link">
                        <ExternalLink size={14} /> DEMO
                      </a>
                    )}
                    {project.source_url && (
                      <a href={project.source_url} target="_blank" rel="noopener noreferrer" className="link">
                        <Code size={14} /> SOURCE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

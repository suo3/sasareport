import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Terminal, Layout, Server, Database } from 'lucide-react';
import './TechStack.css';

interface Skill {
  id: string;
  category: string;
  name: string;
  proficiency_level: string;
  color: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toUpperCase()) {
    case 'LANGUAGES': return <Terminal size={16} />;
    case 'FRONTEND': return <Layout size={16} />;
    case 'INFRASTRUCTURE': return <Server size={16} />;
    case 'STORAGE': return <Database size={16} />;
    default: return <Terminal size={16} />;
  }
};

export const TechStack: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('sasareport_skills')
          .select('*');
        
        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = ['LANGUAGES', 'FRONTEND', 'INFRASTRUCTURE', 'STORAGE'];

  return (
    <section id="stack" className="tech-stack section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Skills</h2>
          <div className="section-subtitle">
            Crafting seamless UI/UX and clean code.
          </div>
        </div>

        {loading ? (
          <div className="loader mono">SCANNING STACK...</div>
        ) : (
          <div className="stack-grid">
            {categories.map((category) => (
              groupedSkills[category] && (
                <div key={category} className="glass-card stack-card">
                  <div className="stack-card-header mono">
                    {getCategoryIcon(category)}
                    <span>{category}</span>
                  </div>
                  
                  <div className="skill-list mono">
                    {groupedSkills[category].map((skill) => (
                      <div key={skill.id} className="skill-pill">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

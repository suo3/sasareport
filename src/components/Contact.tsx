import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { AtSign, Code, Globe, Share2 } from 'lucide-react';
import './Contact.css';

export const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    
    setStatus('SENDING');
    
    try {
      const { error } = await supabase
        .from('sasareport_messages')
        .insert([{ email, message }]);
        
      if (error) throw error;
      
      setStatus('SUCCESS');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setStatus('IDLE'), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="section-header text-center">
          <div className="status-badge active mono" style={{ position: 'relative', display: 'inline-block', top: '0', right: '0', marginBottom: '2rem' }}>
            <span className="status-dot"></span> CURRENTLY AVAILABLE FOR COLLABORATION
          </div>
          
          <h2 className="section-title">Let's Talk</h2>
          <div className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 3rem auto', textTransform: 'none', color: 'var(--text-secondary)' }}>
            I am actively seeking projects that challenge the boundaries of distributed systems and high-scale performance. If you have a mission-critical system to build, let's open a connection.
          </div>
        </div>

        <div className="contact-terminal glass-card">
          <form onSubmit={handleSubmit} className="terminal-form mono">
            <div className="form-header">
              <span className="prompt">DIRECT TERMINAL:</span>
            </div>
            
            <div className="form-group">
              <span className="prompt">$</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@engineer.core.io" 
                className="terminal-input"
                required
                disabled={status === 'SENDING'}
              />
              <AtSign size={18} className="input-icon" />
            </div>

            <div className="form-group msg-group">
              <span className="prompt">$</span>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Initialize message payload..." 
                className="terminal-input"
                rows={4}
                required
                disabled={status === 'SENDING'}
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={status === 'SENDING'}>
                {status === 'SENDING' ? 'TRANSMITTING...' : status === 'SUCCESS' ? 'PAYLOAD DELIVERED' : status === 'ERROR' ? 'TRANSMISSION FAILED' : 'EXECUTE SEND'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="social-links mono">
          <a href="#" className="social-btn">
            <Code size={20} />
            <span>GITHUB</span>
          </a>
          <a href="#" className="social-btn">
            <Globe size={20} />
            <span>LINKEDIN</span>
          </a>
          <a href="#" className="social-btn">
            <Share2 size={20} />
            <span>X / TWITTER</span>
          </a>
        </div>
      </div>
    </section>
  );
};

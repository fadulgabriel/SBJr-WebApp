import React, { useState } from 'react';
import logo from '../assets/logo.png';

const SocialLink = ({ href, handle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: isHovered ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
        borderRadius: '9999px',
        padding: '0.5rem 1rem',
        textDecoration: 'none',
        color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.60)',
        fontFamily: '"Noir Pro", sans-serif',
        fontWeight: 700,
        fontSize: '0.78rem',
        transition: 'all 0.2s ease',
      }}
    >
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
      {handle}
    </a>
  );
};

const Footer = () => {
  return (
    <footer style={{
      background: '#080808',
      padding: '2.5rem 1.5rem 3rem 1.5rem',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
      {/* BLOCO 1 — Logo */}
      <img src={logo} alt="SBJr. Logo" style={{ width: '80px', opacity: 0.7 }} />

      {/* BLOCO 2 — Redes sociais */}
      <div>
        <div style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.20)',
          fontSize: '0.68rem',
          marginBottom: '0.75rem'
        }}>
          Siga o evento
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          <SocialLink href="https://instagram.com/concentrodf" handle="concentrodf" />
          <SocialLink href="https://instagram.com/sabadojr26" handle="sabadojr26" />
        </div>
      </div>

      {/* BLOCO 3 — Créditos */}
      <div>
        <div style={{
          width: '40px',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          margin: '0 auto'
        }} />
        
        <div style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.18)',
          fontSize: '0.72rem',
          marginTop: '1rem'
        }}>
          Sábado Júnior 2026 · Concentro DF
        </div>
      </div>
    </footer>
  );
};

export default Footer;

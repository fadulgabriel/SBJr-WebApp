import React from 'react';
import logo from '../assets/logo.png';
import esfera from '../assets/esfera.png';
import el8 from '../assets/elementos/el8.png';

const Hero = () => {
  return (
    <header
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '3rem 1.5rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #704595 0%, #f6538c 100%)',
      }}
    >

      {/* ── Esfera — topo esquerdo ── */}
      <img src={esfera} aria-hidden="true" style={{
        position: 'absolute', top: '-4rem', left: '-3rem',
        width: '310px', opacity: 0.62,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }} />

      {/* ── Radar — baixo direito ── */}
      <img src={el8} aria-hidden="true" style={{
        position: 'absolute', bottom: '-3rem', right: '-3rem',
        width: '310px', opacity: 0.95,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }} />

      {/* ── Bloco central — poster ── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0rem',
      }}>

        {/* Logo */}
        <img
          src={logo}
          alt="SBJr."
          style={{ width: '260px', marginBottom: '2.5rem' }}
        />

        {/* H1 */}
        <h1 style={{
          fontFamily: "'Strelka', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.8rem, 13vw, 5.5rem)',
          lineHeight: 1.0,
          textTransform: 'uppercase',
          color: '#ffffff',
          margin: '0 0 0.6rem 0',
          textAlign: 'left',
          alignSelf: 'flex-start',
        }}>
          Sábado Júnior 26
        </h1>

        {/* Slogan */}
        <p style={{
          fontFamily: "'Noir Pro', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(1rem, 4vw, 1.2rem)',
          color: 'rgba(255,255,255,0.85)',
          margin: '0 0 2rem 0',
          alignSelf: 'flex-start',
        }}>
          Cresça ou fique para trás.
        </p>

        {/* Botão */}
        <button onClick={() => console.log('quiz')} style={{
          alignSelf: 'flex-start',
          fontFamily: "'Noir Pro', sans-serif",
          fontWeight: 700,
          fontSize: '1rem',
          background: '#54ff00',
          color: '#1a0a2e',
          border: 'none',
          borderRadius: '9999px',
          height: '52px',
          padding: '0 2rem',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}>
          Descubra sua Trilha →
        </button>

      </div>

    </header>
  );
};

export default Hero;
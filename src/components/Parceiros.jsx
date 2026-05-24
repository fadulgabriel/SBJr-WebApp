import React from 'react';
import esfera from '../assets/esfera.png';
import el8 from '../assets/elementos/el8.png';
import el1 from '../assets/elementos/el1.png';

const PARCEIROS = [
  { id: 1, nome: 'BMAI', categoria: 'Patrocinador Master' },
  { id: 2, nome: 'PWR Coffee', categoria: 'Patrocinador' },
  { id: 3, nome: 'EloGroup', categoria: 'Patrocinador' },
  { id: 4, nome: 'Stoic Capital', categoria: 'Apoiador' },
  { id: 5, nome: 'R2', categoria: 'Apoiador' },
  { id: 6, nome: 'Concentro', categoria: 'Realização' },
];

const ParceiroCard = ({ parceiro, index }) => {
  const images = [esfera, el8, el1];
  const logoSrc = images[index % 3];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '0.6rem 1rem',
      marginRight: '0.75rem',
      flexShrink: 0,
      whiteSpace: 'nowrap'
    }}>
      <img 
        src={logoSrc} 
        alt="" 
        style={{
          width: '28px',
          height: '28px',
          objectFit: 'contain',
          opacity: 0.6,
          borderRadius: '4px'
        }} 
      />
      <div>
        <div style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 700,
          color: 'white',
          fontSize: '0.82rem'
        }}>
          {parceiro.nome}
        </div>
        <div style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.30)',
          fontSize: '0.68rem',
          marginTop: '1px'
        }}>
          {parceiro.categoria}
        </div>
      </div>
    </div>
  );
};

const Parceiros = () => {
  // Array duplicado para criar o efeito infinito sem cortes
  const loopParceiros = [...PARCEIROS, ...PARCEIROS];

  return (
    <section id="parceiros" style={{ background: '#0d0d0d', padding: '3rem 0 4rem 0' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}} />

      <div style={{
        height: '1px',
        margin: '0 1.5rem 3rem',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)'
      }} />

      <div style={{ textAlign: 'center', padding: '0 1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{
          fontFamily: 'Strelka',
          fontWeight: 800,
          color: 'white',
          fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
          marginBottom: '0.4rem',
          marginTop: 0
        }}>
          Parceiros
        </h2>
        <p style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.85rem',
          margin: 0
        }}>
          Obrigado a quem torna o SBJr. possível
        </p>
      </div>

      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Trilho 1 (Esquerda) */}
        <div 
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'scrollLeft 18s linear infinite'
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {loopParceiros.map((p, idx) => (
            <ParceiroCard key={`t1-${idx}`} parceiro={p} index={idx} />
          ))}
        </div>

        {/* Trilho 2 (Direita) */}
        <div 
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'scrollRight 22s linear infinite'
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {/* Reversão apenas visual do array para diferenciar a linha inferior */}
          {[...loopParceiros].reverse().map((p, idx) => (
            <ParceiroCard key={`t2-${idx}`} parceiro={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Parceiros;

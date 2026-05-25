import React, { useState, useEffect, useRef } from 'react';

const STANDS = [
  {
    id: 3,
    titulo: 'Diagnóstico Comercial da sua EJ',
    empresa: 'Takeshi',
    descricao: 'Venha descobrir como está a saúde comercial da sua EJ com nossos especialistas.',
    contato: '(61) 99999-0001',
    horario: '14:00 – 17:00',
  },
  {
    id: 2,
    titulo: 'Otimizando Processos com IA',
    empresa: 'Empresa Beta',
    descricao: 'Demonstração ao vivo de ferramentas de IA aplicadas à gestão de EJs.',
    contato: '(61) 99999-0002',
    horario: '14:00 – 17:00',
  },
  {
    id: 4,
    titulo: 'Analise seu Currículo Aqui',
    empresa: 'Empresa Gamma',
    descricao: 'Consultores especializados analisam seu currículo e dão feedback na hora.',
    contato: '(61) 99999-0003',
    horario: '14:00 – 17:00',
  },
  {
    id: 1,
    titulo: 'Inovação e Empreendedorismo',
    empresa: 'Sebrae DF',
    descricao: 'Ativação interativa sobre inovação e empreendedorismo para estudantes universitários.',
    contato: '(61) 99999-0004',
    horario: '14:00 – 17:00',
  },
];

const StandCard = ({ stand, index, isOpen, onToggle }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const delay = index * 80;

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: isOpen ? '3px solid #f6538c' : '3px solid #704595',
        borderRadius: '20px',
        padding: '1.25rem',
        width: '100%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms, border-color 0.3s ease`,
      }}
    >
      <svg 
        viewBox="0 0 80 120" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          right: '-1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0,
          width: '80px'
        }}
      >
        <rect width="80" height="120" rx="12" fill="#704595"/>
        <rect x="10" y="10" width="60" height="100" rx="8" fill="none" stroke="#704595" strokeWidth="2"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(112,69,149,0.20)',
          color: '#9b6fc4',
          fontSize: '0.65rem',
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 700,
          textTransform: 'uppercase',
          padding: '2px 10px',
          borderRadius: '9999px',
          marginBottom: '0.6rem'
        }}>
          STAND
        </div>

        <h4 style={{
          fontFamily: 'Strelka',
          fontWeight: 800,
          color: 'white',
          fontSize: 'clamp(1rem, 3.8vw, 1.15rem)',
          lineHeight: 1.25,
          marginBottom: '0.3rem',
          marginTop: 0,
          whiteSpace: 'normal',
          overflow: 'visible',
          WebkitLineClamp: 'unset'
        }}>
          {stand.titulo}
        </h4>

        <p style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.50)',
          fontSize: '0.8rem',
          margin: 0
        }}>
          {stand.empresa}
        </p>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          margin: '0.75rem 0'
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.75rem'
          }}>
            🕐 {stand.horario}
          </span>

          <button 
            onClick={onToggle}
            style={{
              fontFamily: '"Noir Pro", sans-serif',
              fontWeight: 700,
              color: '#704595',
              background: 'transparent',
              border: 'none',
              fontSize: '0.8rem',
              cursor: 'pointer',
              padding: '0.75rem 0',
              marginTop: '0.5rem'
            }}
          >
            {isOpen ? 'Ver menos ↑' : 'Saiba mais ↓'}
          </button>
        </div>

        <div style={{
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, opacity 0.35s ease'
        }}>
          <p style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.60)',
            fontSize: '0.85rem',
            marginTop: '1rem',
            marginBottom: 0
          }}>
            {stand.descricao}
          </p>

          <p style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.75rem',
            marginTop: '0.75rem',
            marginBottom: '0.2rem'
          }}>
            Entre em contato:
          </p>
          <a 
            href={`tel:${stand.contato.replace(/\D/g, '')}`} 
            style={{
              fontFamily: '"Noir Pro", sans-serif',
              fontWeight: 700,
              color: '#9b6fc4',
              fontSize: '0.95rem',
              textDecoration: 'none'
            }}
          >
            {stand.contato}
          </a>
        </div>
      </div>
    </div>
  );
};

const Stands = () => {
  const [openCardId, setOpenCardId] = useState(null);

  const handleToggle = (id) => {
    setOpenCardId(prev => prev === id ? null : id);
  };

  return (
    <section id="stands" style={{ background: '#111111', padding: '3rem 0 4rem 0' }}>
      <h2 style={{
        fontFamily: 'Strelka',
        fontWeight: 800,
        color: 'white',
        fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
        padding: '0 1.5rem',
        marginBottom: '2rem'
      }}>
        Stands
      </h2>
      <p style={{
        fontFamily: '"Noir Pro", sans-serif',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.40)',
        fontSize: '0.8rem',
        padding: '0 1.5rem',
        marginTop: '-1.5rem',
        marginBottom: '2rem'
      }}>
        14:00 – 17:00 • Área de Exposição
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 1.5rem' }}>
        {STANDS.map((stand, index) => (
          <StandCard 
            key={stand.id} 
            stand={stand} 
            index={index} 
            isOpen={openCardId === stand.id}
            onToggle={() => handleToggle(stand.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Stands;

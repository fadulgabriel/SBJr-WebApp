import React, { useState, useEffect, useRef } from 'react';

const STANDS = [
  {
    id: 2,
    titulo: 'Diagnóstico Comercial da sua EJ',
    empresa: 'Omotenashi Consultoria',
    descricao: 'Faça um diagnóstico comercial da sua EJ!',
    contato: '(61) 99932-0703',
    horario: '',
  },
  {
    id: 1,
    titulo: 'Otimize seus Processos com IA',
    empresa: 'BMAI',
    descricao: 'Demonstração ao vivo de ferramentas de IA aplicadas à EJs.',
    contato: '(61) 98153-1419',
    horario: '',
  },
  {
    id: 4,
    titulo: 'Transforme seu Currículo em Oportunidades',
    empresa: 'Multi Carreira',
    descricao: 'Descubra como demonstrar seu potencial para empresas e aumentar suas chances de sucesso no mercado de trabalho.',
    contato: '(61) 98237-3734',
    horario: '',
  },
   {
    id: 6,
    titulo: 'Conheça uma das maiores consultorias do país!',
    empresa: 'EloGroup',
    descricao: 'Converse com quem já foi de EJ e hoje é especialista em consultoria na EloGroup.',
    contato: '',
    horario: '',
  },
  {
    id: 3,
    titulo: 'Conheca o Peso do Protagonismo Estudantil',
    empresa: 'SEBRAE',
    descricao: 'Ativação interativa sobre sonhos e empreendedorismo estudantil.',
    contato: '',
    horario: '',
  },
  {
    id: 5,
    titulo: 'Conheca o Sistema Operacional NEXUS',
    empresa: 'DataSynq',
    descricao: 'Sistema operacional que integra CRM, gestão e inteligência de dados.',
    contato: '(61) 98237-3734',
    horario: '',
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
            {stand.empresa && <span> {stand.empresa}</span>}
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

          {stand.contato && (
            <div style={{ marginTop: '0.75rem' }}>
              <p style={{
                fontFamily: '"Noir Pro", sans-serif',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.75rem',
                marginBottom: '0.25rem',
              }}>
                Entre em contato:
              </p>
              <a href={`tel:${stand.contato}`} style={{
                fontFamily: '"Noir Pro", sans-serif',
                fontWeight: 700,
                color: '#9b6fc4',
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}>
                {stand.contato}
              </a>
            </div>
          )}
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
        15:20 – 16:20 • Corredor de Stands
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

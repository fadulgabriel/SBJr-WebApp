import React, { useEffect, useRef, useState } from 'react';

const CASES = [
  {
    id: 1,
    grupo: 'Grupo Level Up',
    subtitulo: 'Crescimento comercial exponencial!',
    descricao: 'Cases de empresas juniores que alcançaram resultados extraordinários em vendas e expansão de mercado durante o último ciclo.',
    cor: '#54ff00',
    premio: '3 mentorias personalizadas comercial + acesso à plataforma de aulas',
    ejs: [
      { nome: 'ESTAT', link: '#' },
      { nome: 'AD&M', link: '#' },
      { nome: 'Grupo Gestão', link: '#' },
      { nome: 'Advocatta', link: '#' },
    ],
  },
  {
    id: 2,
    grupo: 'Stoic Capital',
    subtitulo: 'Gestão financeira e tomada de decisão sob pressão.',
    descricao: 'Como EJs estruturaram sua gestão financeira, captaram recursos e tomaram decisões estratégicas em cenários de alta incerteza.',
    cor: '#f6538c',
    premio: 'Mentoria presencial na Stoic com principais heads da empresa',
    ejs: [
      { nome: 'Athena', link: '#' },
      { nome: 'Pixels', link: '#' },
      { nome: 'VExpenses Jr', link: '#' },
    ],
  },
  {
    id: 3,
    grupo: 'R2',
    subtitulo: 'Inovação e tecnologia aplicada ao movimento.',
    descricao: 'Projetos que usaram tecnologia e metodologias inovadoras para transformar a entrega de valor das empresas juniores.',
    cor: '#704595',
    premio: 'Visita presencial à sede da R2 para aprender sobre comunicação e marketing',
    ejs: [
      { nome: 'Struct', link: '#' },
      { nome: 'Calculo Jr', link: '#' },
      { nome: 'Mercúrio', link: '#' },
      { nome: 'Raízes', link: '#' },
    ],
  },
];

const EMBAIXADORAS = [
  {
    posicao: 1,
    premio: 'Automação da BMAI à sua EJ',
    icone: '🥇',
    corMedal: '#FFD700',
  },
  {
    posicao: 2,
    premio: 'Mentoria com Carol',
    icone: '🥈',
    corMedal: '#C0C0C0',
  },
  {
    posicao: 3,
    premio: 'Mentoria com EloGroup',
    icone: '🥉',
    corMedal: '#CD7F32',
  },
];

const CONSELHEIRO = {
  premio: '2 kits de café da PWR Coffee ☕',
};

const CaseCard = ({ caseData, index }) => {
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

  const delay = index * 120;

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '1.75rem 1.5rem 1.5rem 1.5rem',
        borderTop: `3px solid #fc3d0d`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(24px)' : 'translateY(24px)', // Start state for SSR/before JS
        ...isVisible && { transform: 'translateY(0)' },
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontFamily: 'Strelka',
          fontWeight: 800,
          color: 'white',
          fontSize: 'clamp(1.3rem, 5vw, 1.6rem)',
          marginBottom: '0.25rem',
          marginTop: 0
        }}>
          Case {caseData.grupo}
        </h3>

        <p style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.55)',
          fontSize: '0.82rem',
          lineHeight: 1.5,
          marginBottom: '1.25rem',
          marginTop: 0
        }}>
          {caseData.descricao}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          background: 'rgba(252, 61, 13, 0.08)',
          border: '1px solid rgba(252, 61, 13, 0.15)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          marginBottom: '1.25rem',
        }}>
          <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>🏆</span>
          <p style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.4,
            margin: 0,
          }}>
            {caseData.premio}
          </p>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          marginBottom: '1rem'
        }} />

        <div>
          <div style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.30)',
            fontSize: '0.72rem',
            marginBottom: '0.75rem'
          }}>
            EJs participantes
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {caseData.ejs.map((ej, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span style={{
                  fontFamily: '"Noir Pro", sans-serif',
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '0.9rem'
                }}>
                  {ej.nome}
                </span>

                <a 
                  href={ej.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontSize: '0.72rem',
                    fontFamily: '"Noir Pro", sans-serif',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.70)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Ver case
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmbaixadoraCard = ({ embaixadora }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '1rem 1.25rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        flexShrink: 0
      }}>
        <span style={{ fontSize: '1.75rem' }}>{embaixadora.icone}</span>
        <span style={{
          fontFamily: 'Strelka',
          fontWeight: 800,
          color: embaixadora.corMedal,
          fontSize: '0.85rem'
        }}>
          {embaixadora.posicao}º
        </span>
      </div>

      <div style={{
        width: '1px',
        height: '40px',
        background: 'rgba(255,255,255,0.08)',
        flexShrink: 0
      }} />

      <div style={{ flex: 1, zIndex: 1 }}>
        <div style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.25)',
          fontSize: '0.65rem',
          marginBottom: '0.3rem'
        }}>
          EJ Embaixadora
        </div>

        <div style={{
          fontFamily: 'Strelka',
          fontWeight: 800,
          color: 'white',
          fontSize: '1rem',
          filter: 'blur(6px)',
          userSelect: 'none'
        }}>
          ??? ??? ???
        </div>

        <div style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          fontSize: '0.78rem',
          color: `${embaixadora.corMedal}CC`, // ~80% opacity
          marginTop: '0.35rem'
        }}>
          {embaixadora.premio}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${embaixadora.corMedal} 0%, transparent 70%)`,
        opacity: 0.06,
        pointerEvents: 'none',
        zIndex: 0
      }} />
    </div>
  );
};

const Palco = () => {
  return (
    <section id="palco" style={{
      background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)',
      padding: '0 0 5rem 0'
    }}>
      <div style={{
        height: '2px',
        background: 'linear-gradient(to right, transparent, #fc3d0d, transparent)',
        marginBottom: '3rem'
      }} />

      <h2 style={{
        fontFamily: 'Strelka',
        fontWeight: 800,
        color: 'white',
        fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
        padding: '0 1.5rem',
        marginBottom: '0.5rem',
        marginTop: 0
      }}>
        Palco
      </h2>
      
      <p style={{
        fontFamily: '"Noir Pro", sans-serif',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.40)',
        fontSize: '0.85rem',
        padding: '0 1.5rem',
        marginTop: 0,
        marginBottom: '3rem'
      }}>
        Cases em competição
      </p>

      {/* BLOCO 1 - CASES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0 1.5rem' }}>
        {CASES.map((c, index) => (
          <CaseCard key={c.id} caseData={c} index={index} />
        ))}
      </div>

      {/* BLOCO 2 - EMBAIXADORAS */}
      <div style={{
        margin: '3.5rem 1.5rem 0',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)'
      }} />

      <h2 style={{
        fontFamily: 'Strelka',
        fontWeight: 800,
        color: 'white',
        fontSize: 'clamp(1.4rem, 5vw, 2rem)',
        padding: '0 1.5rem',
        marginTop: '2.5rem',
        marginBottom: '0.5rem'
      }}>
        EJs Embaixadoras
      </h2>
      
      <p style={{
        fontFamily: '"Noir Pro", sans-serif',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.35)',
        fontSize: '0.85rem',
        padding: '0 1.5rem',
        marginTop: 0,
        marginBottom: '2rem'
      }}>
        Quem será a grande vencedora?
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 1.5rem' }}>
        {EMBAIXADORAS.map(emb => (
          <EmbaixadoraCard key={emb.posicao} embaixadora={emb} />
        ))}
      </div>

      {/* BLOCO 3 - CONSELHEIRO EMBAIXADOR */}
      <div style={{
        margin: '2.5rem 1.5rem 0',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)'
      }} />

      <h2 style={{
        fontFamily: 'Strelka',
        fontWeight: 800,
        color: 'white',
        fontSize: 'clamp(1.4rem, 5vw, 2rem)',
        padding: '0 1.5rem',
        marginTop: '2.5rem',
        marginBottom: '0.5rem'
      }}>
        Conselheiro Embaixador
      </h2>
      
      <p style={{
        fontFamily: '"Noir Pro", sans-serif',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.35)',
        fontSize: '0.85rem',
        padding: '0 1.5rem',
        marginTop: 0,
        marginBottom: '2rem'
      }}>
        O grande destaque será revelado no evento
      </p>

      <div style={{ padding: '0 1.5rem' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <svg 
            viewBox="0 0 80 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '80px', height: '80px', marginBottom: '1.25rem' }}
          >
            <circle cx="40" cy="28" r="16" fill="rgba(255,255,255,0.08)"/>
            <path d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30" fill="rgba(255,255,255,0.08)"/>
          </svg>

          <div style={{
            fontFamily: 'Strelka',
            fontWeight: 800,
            color: 'white',
            fontSize: '1.25rem',
            filter: 'blur(7px)',
            userSelect: 'none',
            marginBottom: '0.5rem'
          }}>
            ??? ??? ???
          </div>

          <div style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.7rem',
            marginBottom: '1.25rem'
          }}>
            Conselheiro Embaixador
          </div>

          <div style={{
            width: '40px',
            height: '1px',
            background: 'rgba(255,255,255,0.10)',
            margin: '0 auto 1.25rem auto'
          }} />

          <div style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.68rem',
            marginBottom: '0.35rem'
          }}>
            🏆 Prêmio
          </div>

          <div style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.65)'
          }}>
            {CONSELHEIRO.premio}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Palco;

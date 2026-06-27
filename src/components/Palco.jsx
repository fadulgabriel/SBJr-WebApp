import React, { useEffect, useRef, useState } from 'react';

const CASES = [
  {
    id: 1,
    grupo: '- Grupo Level Up',
    subtitulo: 'Crescimento comercial exponencial!',
    descricao: 'Cases de empresas juniores demonstrando como irão alcancar seu objetivo anual de crescimento comercial e expansão para novos mercados.',
    cor: '#54ff00',
    premio: 'Mentorias comerciais personalizadas + Acesso à plataforma de aulas',
    ejs: [
      { nome: 'Capital', link: 'https://drive.google.com/file/d/1cK1McAJMPZNxIAs2jaYbrp3dlRcorM_3/view?usp=sharing' },
      { nome: 'Concreta', link: 'https://drive.google.com/file/d/1_kF3OXfIZ6zXOeTiRMZHQXLoynv-R5Ng/view?usp=sharing' },
    ],
  }
];

const EMBAIXADORAS = [
  {
    posicao: 1,
    premio: 'Mentoria personalizada com a Ricco + Intensivão sobre IA com a BMAI',
    icone: '',
    corMedal: '#FFD700',
  },
  {
    posicao: 2,
    premio: 'Mentoria personalizada com a IZE + Mentoria Comercial com a Omotenashi',
    icone: '',
    corMedal: '#C0C0C0',
  },
  {
    posicao: 3,
    premio: 'Mentoria personalizada com a EloGroup',
    icone: '',
    corMedal: '#CD7F32',
  },
  {
    posicao: 4,
    premio: 'Treinamento personalizado com a Atuar',
    icone: '',
    corMedal: '#7B9EA8',
  },
  {
    posicao: 5,
    premio: 'Sistema Operacional na EJ com a DataSynq',
    icone: '',
    corMedal: '#8B8B8B',
  },
];

const CONSELHEIRO = {
  premio: 'Treinamento personalizado da Verbalize',
};

const PREMIOS = [
  { premio: 'Sistema Operacional NEXUS implementado na EJ', parceiro: 'DataSynq' },
  { premio: 'Intensivão sobre Uso de IA na EJ', parceiro: 'BMAI' },
  { premio: 'Mentoria personalizada para a EJ', parceiro: 'Ricco Burger' },
  { premio: 'Treinamentos personalizados para a EJ', parceiro: 'Atuar' },
  { premio: 'Mentoria personalizada para a EJ', parceiro: 'IZE' },
];

const CATEGORIAS = [
  { nome: 'Quem Cresce não Espera', descricao: 'EJs no Farol verde de faturamento até Junho.', icone: '📈' },
  { nome: 'Turbulência não Derruba Avião', descricao: 'EJs com 5 meses no Farol vermelho e Farol verde em Junho.', icone: '✈️' },
  { nome: 'Coragem de ser Ousado', descricao: 'EJs com Farol verde de faturamento até Agosto.', icone: '🎯' },
  { nome: 'Crescimento Compartilhado', descricao: 'EJs com Farol verde de faturamento colaborativo até Junho.', icone: '🤝' },
];

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
        borderTop: '3px solid #704595',
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
          fontSize: 'clamp(1.1rem, 4.5vw, 1.4rem)',
          marginBottom: '0.25rem',
          marginTop: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
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
          background: 'rgba(112, 69, 149, 0.08)',
          border: '1px solid rgba(112, 69, 149, 0.15)',
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
            EJs finalistas
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
        background: 'linear-gradient(to right, transparent, rgba(112, 69, 149, 0.35), transparent)',
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
        Palco SBJr. 26
      </h2>
      
      <p style={{
        fontFamily: '"Noir Pro", sans-serif',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.40)',
        fontSize: '0.85rem',
        padding: '0 1.5rem',
        marginTop: 0,
        marginBottom: '2rem'
      }}>
        Prepare-se para Energia Máxima!
      </p>

      <div style={{
        margin: '0 1.5rem 2rem',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)',
      }} />

      <h2 style={{
        fontFamily: 'Strelka',
        fontWeight: 800,
        color: 'white',
        fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
        padding: '0 1.5rem',
        marginTop: 0,
        marginBottom: '0.4rem'
      }}>
        Categorias
      </h2>
      <p style={{
        fontFamily: '"Noir Pro", sans-serif',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.40)',
        fontSize: '0.82rem',
        padding: '0 1.5rem',
        marginTop: 0,
        marginBottom: '1.25rem'
      }}>
      </p>

      <div style={{
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x proximity',
        WebkitOverflowScrolling: 'touch',
        gap: '1rem',
        padding: '0 1.5rem 1rem 1.5rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <style dangerouslySetInnerHTML={{__html: `#palco div::-webkit-scrollbar { display: none; }`}} />
        {CATEGORIAS.map((cat, i) => (
          <div key={i} style={{
            position: 'relative',
            overflow: 'hidden',
            width: 'calc(75vw - 3rem)',
            maxWidth: '280px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(112,69,149,0.25)',
            borderTop: '2px solid #704595',
            borderRadius: '16px',
            padding: '1.25rem',
            scrollSnapAlign: 'start',
            flexShrink: 0
          }}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
              style={{ 
                position: 'absolute',
                top: '-1rem',
                left: '-1rem',
                width: '90px',
                height: '90px',
                opacity: 0.15,
                pointerEvents: 'none',
                zIndex: 0,
              }}>
              <circle cx="50" cy="50" r="50" fill="#704595"/>
            </svg>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'Strelka',
                fontWeight: 800,
                color: 'white',
                fontSize: '1.1rem',
                marginTop: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                {cat.nome}
              </div>
              <div style={{
                fontFamily: '"Noir Pro", sans-serif',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.50)',
                fontSize: '0.8rem',
                lineHeight: 1.4
              }}>
                {cat.descricao}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '0 1.5rem'
      }}>
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
        As EJs com mais espírito SBJr. 
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
        fontSize: 'clamp(1.2rem, 5vw, 2rem)',
        lineHeight: 1.1 ,
        padding: '0 1.5rem',
        marginTop: '2.5rem',
        marginBottom: '0.5rem'
      }}>
        Conselheiros Destaque
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
        Eles escolheram crescer...
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
          <svg viewBox="0 0 120 80" fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100px', height: '70px', marginBottom: '1.25rem' }}>
            
            {/* Pessoa da esquerda */}
            <circle cx="30" cy="24" r="12" fill="rgba(255,255,255,0.2)"/>
            <path d="M8 72c0-12.15 9.85-22 22-22s22 9.85 22 22" 
              fill="rgba(255,255,255,0.2)"/>

            {/* Pessoa do centro (ligeiramente maior) */}
            <circle cx="60" cy="22" r="14" fill="rgba(255,255,255,0.70)"/>
            <path d="M36 72c0-13.25 10.75-24 24-24s24 10.75 24 24" 
              fill="rgba(255,255,255,0.8)"/>

            {/* Pessoa da direita */}
            <circle cx="90" cy="24" r="12" fill="rgba(255,255,255,0.4)"/>
            <path d="M68 72c0-12.15 9.85-22 22-22s22 9.85 22 22" 
              fill="rgba(255,255,255,0.4)"/>
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
            Conselheiros Destaque 
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

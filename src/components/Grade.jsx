import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const SESSIONS = [
  {
    id: 1,
    tipo: 'Magna',
    pauta: 'Keynote de Abertura: O Futuro do Movimento Empresa Júnior',
    autor: 'Nome do Autor',
    empresa: 'Empresa ou EJ',
    sala: 'Auditório Principal',
    horario: '09:00',
  },
  {
    id: 2,
    tipo: 'Paralela',
    pauta: 'Gestão Ágil em Projetos de Alto Impacto',
    autor: 'Outro Autor',
    empresa: 'Outra EJ',
    sala: 'Sala 2',
    horario: '09:00',
  },
  {
    id: 3,
    tipo: 'Paralela',
    pauta: 'Liderança e Inteligência Emocional',
    autor: 'Autor Três',
    empresa: 'EJ Três',
    sala: 'Sala 3',
    horario: '10:30',
  },
  {
    id: 4,
    tipo: 'Stand',
    pauta: 'Apresentação de Cases e Networking',
    autor: 'Equipe de Relacionamento',
    empresa: 'Patrocinadores',
    sala: 'Hall de Expositores',
    horario: '11:30',
  },
  {
    id: 5,
    tipo: 'Magna',
    pauta: 'Transformação Digital nas EJs: Como se Preparar',
    autor: 'Autor Quatro',
    empresa: 'Empresa Quatro',
    sala: 'Auditório Principal',
    horario: '14:00',
  },
  {
    id: 6,
    tipo: 'Stand',
    pauta: 'Feira de Oportunidades: Conecte-se com o Mercado',
    autor: 'Expositores',
    empresa: 'Diversas Empresas',
    sala: 'Área de Stands',
    horario: '14:00',
  },
  {
    id: 7,
    tipo: 'Paralela',
    pauta: 'Growth Hacking para Novos Negócios',
    autor: 'Especialista em Marketing',
    empresa: 'Agência Júnior',
    sala: 'Sala 1',
    horario: '16:00',
  },
  {
    id: 8,
    tipo: 'Magna',
    pauta: 'Cerimônia de Encerramento e Premiações',
    autor: 'Diretoria Executiva',
    empresa: 'Organização SBJr',
    sala: 'Auditório Principal',
    horario: '17:30',
  }
];

const SessionCard = ({ session, isMultiple, isOpen, onToggle, mediaInicial, totalVotos, deviceId }) => {
  const votoSalvo = localStorage.getItem(`voted_session_${session.id}`);
  const [rating, setRating] = useState(votoSalvo ? parseInt(votoSalvo) : 0);
  const [mediaAtual, setMediaAtual] = useState(mediaInicial);
  const [totalAtual, setTotalAtual] = useState(totalVotos);
  const [jaVotou, setJaVotou] = useState(!!votoSalvo);
  const [salvando, setSalvando] = useState(false);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMediaAtual(mediaInicial);
    setTotalAtual(totalVotos);
  }, [mediaInicial, totalVotos]);

  const handleConfirmRating = async () => {
    if (jaVotou || salvando || rating === 0) return;
    
    setSalvando(true);
    
    const { error } = await supabase
      .from('ratings')
      .insert({ 
        session_id: session.id, 
        rating: rating,
        device_id: deviceId 
      });
    
    if (!error) {
      setJaVotou(true);
      localStorage.setItem(`voted_session_${session.id}`, rating);
      const novoTotal = totalAtual + 1;
      const novaMedia = ((mediaAtual * totalAtual) + rating) / novoTotal;
      setMediaAtual(Math.round(novaMedia * 10) / 10);
      setTotalAtual(novoTotal);
    }
    
    setSalvando(false);
  };

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

  const tipo = session.tipo.toUpperCase();

  const getTagStyle = (t) => {
    switch (t) {
      case 'MAGNA':
        return { background: 'rgba(252, 61, 13, 0.15)', color: '#fc3d0d' };
      case 'STAND':
        return { background: 'rgba(112, 69, 149, 0.15)', color: '#704595' };
      case 'PARALELA':
      default:
        return { background: 'rgba(246, 83, 140, 0.15)', color: '#f6538c' };
    }
  };
  const tagStyle = getTagStyle(tipo);

  return (
    <div 
      ref={cardRef}
      style={{
        boxSizing: 'border-box',
        alignSelf: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '16px',
        padding: '1.25rem',
        width: isMultiple ? 'calc(85vw - 3rem)' : '100%',
        maxWidth: isMultiple ? '320px' : 'none',
        flexShrink: 0,
        scrollSnapAlign: 'start',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {/* Elementos visuais decorativos por tipo */}
      {tipo === 'MAGNA' && (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '100px', pointerEvents: 'none', opacity: 0.15, zIndex: 0 }}>
          <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#fc3d0d"/>
        </svg>
      )}
      {tipo === 'PARALELA' && (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '90px', pointerEvents: 'none', opacity: 0.15, zIndex: 0 }}>
          <circle cx="50" cy="50" r="50" fill="#f6538c"/>
        </svg>
      )}
      {tipo === 'STAND' && (
        <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '90px', pointerEvents: 'none', opacity: 0.15, zIndex: 0 }}>
          <rect width="120" height="80" rx="8" fill="#704595"/>
        </svg>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: tagStyle.background,
          color: tagStyle.color,
          fontSize: '0.7rem',
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 700,
          textTransform: 'uppercase',
          padding: '2px 10px',
          borderRadius: '9999px',
          marginBottom: '0.5rem'
        }}>
          {session.tipo}
        </div>

        <h4 style={{
          fontFamily: 'Strelka',
          fontWeight: 800,
          color: 'white',
          fontSize: '1rem',
          lineHeight: 1.2,
          marginTop: '0.5rem',
          marginBottom: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {session.pauta}
        </h4>

        <p style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.55)',
          fontSize: '0.8rem',
          marginTop: '0.35rem',
          marginBottom: 0
        }}>
          {session.autor} • {session.empresa}
        </p>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: '0.75rem',
          paddingTop: '0.75rem',
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.75rem'
          }}>
            <span>📍 {session.sala}</span>
            <span>🕐 {session.horario}</span>
          </div>

          {mediaAtual > 0 && (
            <p style={{
              fontFamily: '"Noir Pro", sans-serif',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.30)',
              fontSize: '0.72rem',
              marginTop: '0.4rem',
              marginBottom: 0
            }}>
              ★ {mediaAtual} · {totalAtual} avaliações
            </p>
          )}

          <div style={{ textAlign: 'right' }}>
            <button 
              onClick={onToggle}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#54ff00',
                fontFamily: '"Noir Pro", sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                padding: 0,
                marginTop: '0.75rem'
              }}
            >
              {isOpen ? 'Ver menos ↑' : 'Saiba mais ↓'}
            </button>
          </div>
        </div>

        <div style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, opacity 0.35s ease',
        }}>
          <div style={{ paddingTop: '1rem' }}>
            <p style={{
              fontFamily: '"Noir Pro", sans-serif',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.85rem',
              marginTop: '1rem',
              marginBottom: '1rem'
            }}>
              Em breve mais detalhes sobre esta sessão.
            </p>

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <p style={{
                  fontFamily: '"Noir Pro", sans-serif',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.75rem',
                  margin: 0
                }}>
                  {jaVotou ? 'Obrigado pela avaliação!' : 'Avalie esta sessão'}
                </p>
                {totalAtual > 0 && (
                  <p style={{
                    fontFamily: '"Noir Pro", sans-serif',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.30)',
                    fontSize: '0.72rem',
                    margin: 0
                  }}>
                    ★ {mediaAtual} ({totalAtual} votos)
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => {
                      if (!jaVotou && !salvando) setRating(star);
                    }}
                    disabled={jaVotou || salvando}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: jaVotou ? 'default' : 'pointer',
                      fontSize: '1.25rem',
                      color: star <= rating ? '#54ff00' : 'rgba(255,255,255,0.2)',
                      opacity: salvando ? 0.5 : 1,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {star <= rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
              {rating > 0 && !jaVotou && (
                <button
                  onClick={handleConfirmRating}
                  disabled={salvando}
                  style={{
                    background: '#54ff00',
                    color: '#1a0a2e',
                    fontFamily: '"Noir Pro", sans-serif',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '6px 16px',
                    cursor: salvando ? 'default' : 'pointer',
                    marginTop: '0.75rem',
                    opacity: salvando ? 0.7 : 1
                  }}
                >
                  Confirmar avaliação →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Grade = () => {
  const [openCardId, setOpenCardId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [medias, setMedias] = useState({});

  useEffect(() => {
    const fetchMedias = async () => {
      const { data, error } = await supabase
        .from('session_ratings')
        .select('session_id, media, total_votos');
      
      if (data) {
        const map = {};
        data.forEach(row => {
          map[row.session_id] = {
            media: parseFloat(row.media),
            total: row.total_votos
          };
        });
        setMedias(map);
      }
    };
    fetchMedias();
  }, []);
  
  // Agrupar por horário
  const groupedSessions = SESSIONS.reduce((acc, session) => {
    if (!acc[session.horario]) acc[session.horario] = [];
    acc[session.horario].push(session);
    return acc;
  }, {});

  const horarios = Object.keys(groupedSessions).sort();

  const handleToggle = (id) => {
    setOpenCardId(prev => prev === id ? null : id);
  };

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('sbjr_device_id');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('sbjr_device_id', deviceId);
    }
    return deviceId;
  };
  const deviceId = getDeviceId();

  return (
    <section id="grade" style={{ background: '#0d0d0d', padding: '3rem 0 4rem 0' }}>
      <h2 style={{
        fontFamily: 'Strelka',
        fontWeight: 800,
        color: 'white',
        fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
        padding: '0 1.5rem',
        marginBottom: '2rem'
      }}>
        Grade
      </h2>

      <div style={{ position: 'relative' }}>
        {(expanded ? horarios : horarios.slice(0, 3)).map(horario => {
          const sessions = groupedSessions[horario];
          const isMultiple = sessions.length >= 2;

          return (
            <div key={horario} style={{ marginBottom: '2.5rem', overflowX: 'visible', overflowY: 'visible' }}>
              <h3 style={{
                fontFamily: '"Noir Pro", sans-serif',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '0.8rem',
                padding: '0 1.5rem',
                marginBottom: '0.75rem'
              }}>
                {horario}
              </h3>

            <div style={
              isMultiple ? {
                display: 'flex',
                alignItems: 'flex-start',
                overflowX: 'auto',
                overflowY: 'visible',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                gap: '1rem',
                padding: '0 1.5rem 1rem 1.5rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              } : {
                display: 'block',
                padding: '0 1.5rem',
                width: '100%'
              }
            }>
              {/* Escondendo barra de rolagem no WebKit */}
              {isMultiple && (
                <style dangerouslySetInnerHTML={{__html: `
                  #grade div::-webkit-scrollbar { display: none; }
                `}} />
              )}

              {sessions.map(session => (
                <SessionCard 
                  key={session.id} 
                  session={session} 
                  isMultiple={isMultiple} 
                  isOpen={openCardId === session.id}
                  onToggle={() => handleToggle(session.id)}
                  mediaInicial={medias[session.id]?.media || 0}
                  totalVotos={medias[session.id]?.total || 0}
                  deviceId={deviceId}
                />
              ))}
            </div>
          </div>
        );
      })}

        {!expanded && horarios.length > 3 && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, #0d0d0d)',
            pointerEvents: 'none'
          }} />
        )}
      </div>

      {horarios.length > 3 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            onClick={() => setExpanded(!expanded)}
            style={{
              fontFamily: '"Noir Pro", sans-serif',
              fontWeight: 700,
              color: '#54ff00',
              background: 'transparent',
              border: '1px solid rgba(84,255,0,0.3)',
              borderRadius: '9999px',
              padding: '0.6rem 1.5rem',
              cursor: 'pointer'
            }}
          >
            {expanded ? 'Ver menos ↑' : 'Ver programação completa \u2192'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Grade;

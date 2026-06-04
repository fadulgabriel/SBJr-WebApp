import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const SESSIONS = [
  // ── CREDENCIAMENTO ──
  {
    id: 0,
    tipo: 'Direto',
    pauta: 'Credenciamento',
    descricao: 'Retire seu crachá, pegue seu kit e prepare-se para um dia incrível. A equipe de organização estará à disposição para te receber.',
    autor: '',
    empresa: '',
    sala: 'Entrada Principal',
    horario: '08:00',
    horarioFim: '09:30',
  },

  // ── MAGNA 1 ──
  {
    id: 1,
    tipo: 'Magna',
    pauta: 'O mercado de 2026 não te espera',
    descricao: 'Uma visão direta e sem filtros sobre o que o mercado exige das empresas juniores hoje. O que mudou, o que não vai voltar e o que você precisa fazer agora.',
    autor: '',
    empresa: '',
    sala: 'Auditório Principal',
    horario: '09:30',
    horarioFim: '10:30',
  },

  // ── PARALELAS RODADA 1 ──
  {
    id: 2,
    tipo: 'Paralela',
    pauta: 'IA e o Valor da Consultoria: como se posicionar num mercado em transformação',
    descricao: 'O efeito da mudança no mercado causada pela IA sobre a percepção de valor do cliente em relação a uma consultoria. Como reposicionar sua EJ para continuar sendo relevante.',
    autor: '',
    empresa: '',
    sala: 'Sala 1',
    horario: '10:55',
    horarioFim: '12:00',
    atualizado: true,
    avisoAtualizacao: 'Sala alterada'
  },
  {
    id: 3,
    tipo: 'Paralela',
    pauta: 'Imersão no Cliente: do problema real ao serviço irresistível',
    descricao: 'Como imergir na realidade do seu cliente para entender os problemas que ele precisa resolver — e como alinhar o conhecimento técnico da sua EJ com um serviço verdadeiramente atrativo (alinhamento Projetos → Vendas).',
    autor: 'EloGroup',
    empresa: '',
    sala: 'Sala 2',
    horario: '10:55',
    horarioFim: '12:00',
  },
  {
    id: 4,
    tipo: 'Paralela',
    pauta: 'Gestão de Times e Objetivos Estratégicos',
    descricao: 'Como acompanhar e gerir diferentes equipes para alcançar objetivos estratégicos dentro da EJ. Ferramentas, rituais e cultura de resultado.',
    autor: 'Singular',
    empresa: '',
    sala: 'Sala 3',
    horario: '10:55',
    horarioFim: '12:00',
  },
  {
    id: 5,
    tipo: 'Paralela',
    pauta: 'Novos Nichos: mercados que precisam de você e ainda não sabem',
    descricao: 'Como explorar novos nichos que hoje você nem sabe que precisam do seu conhecimento. Metodologia para identificar, validar e entrar em mercados inexplorados.',
    autor: '',
    empresa: '',
    sala: 'Sala 4',
    horario: '10:55',
    horarioFim: '12:00',
  },
  {
    id: 6,
    tipo: 'Paralela',
    pauta: 'Mapeamento e Redesenho de Processos na EJ',
    descricao: 'Como mapear seus processos atuais e como remodelá-los para aproximar a EJ dos seus objetivos estratégicos. Da análise ao redesenho com foco em resultado.',
    autor: '',
    empresa: '',
    sala: 'Sala 5',
    horario: '10:55',
    horarioFim: '12:00',
  },
  {
    id: 7,
    tipo: 'Paralela',
    pauta: 'Pauta a Definir',
    descricao: 'Conteúdo em breve.',
    autor: '',
    empresa: '',
    sala: 'Sala 6',
    horario: '10:55',
    horarioFim: '12:00',
  },

  // ── ALMOÇO ──
  {
    id: 8,
    tipo: 'Direto',
    pauta: 'Almoço com Benchs',
    descricao: 'Momento de troca e networking enquanto você recarrega as energias. Aproveite para conversar com líderes de outras EJs e tirar insights do dia.',
    autor: '',
    empresa: '',
    sala: '',
    horario: '12:30',
    horarioFim: '13:50',
  },

  // ── DINÂMICA ──
  {
    id: 9,
    tipo: 'Direto',
    pauta: 'Dinâmica',
    descricao: 'Momento de integração e movimento. Venha preparado para sair da cadeira.',
    autor: '',
    empresa: '',
    sala: 'Quadra Principal',
    horario: '14:10',
    horarioFim: '14:30',
  },

  // ── PARALELAS RODADA 2 ──
  {
    id: 10,
    tipo: 'Paralela',
    pauta: 'Desligamentos na EJ: quando, por que e como fazer',
    descricao: 'Por que tirar membros e lideranças desalinhados da sua EJ é necessário — e como conduzir esse processo com clareza, justiça e sem destruir a cultura.',
    autor: '',
    empresa: '',
    sala: 'Sala 1',
    horario: '14:55',
    horarioFim: '15:55',
  },
  {
    id: 11,
    tipo: 'Paralela',
    pauta: 'Projetos de Impacto: como vender e como entregar',
    descricao: 'Como vender um projeto de impacto e como garantir um relatório aprovado. Didática prática de quem já fez e sabe o que funciona.',
    autor: '',
    empresa: '',
    sala: 'Sala 2',
    horario: '14:55',
    horarioFim: '15:55',
  },
  {
    id: 12,
    tipo: 'Paralela',
    pauta: 'Diversidade & Inclusão na EJ: cultura e relatório aprovado',
    descricao: 'Como garantir uma organização inclusiva na prática e como estruturar um relatório de D&I aprovado. Do discurso à política real.',
    autor: '',
    empresa: '',
    sala: 'Sala 3',
    horario: '14:55',
    horarioFim: '15:55',
  },
  {
    id: 13,
    tipo: 'Paralela',
    pauta: 'Funil de Vendas Previsível: da prospecção ao fechamento',
    descricao: 'Como tornar seu funil de vendas previsível com processos claros, cadências definidas e métricas que revelam gargalos antes que virem problema.',
    autor: '',
    empresa: '',
    sala: 'Sala 4',
    horario: '14:55',
    horarioFim: '15:55',
  },
  {
    id: 14,
    tipo: 'Paralela',
    pauta: 'Sucesso do Cliente: execução de projetos que fidelizam',
    descricao: 'Como garantir o sucesso do cliente com um bom processo de execução de projetos — da passagem de bastão entre vendas e projetos até a entrega que gera indicação.',
    autor: '',
    empresa: '',
    sala: 'Sala 5',
    horario: '14:55',
    horarioFim: '15:55',
  },
  {
    id: 15,
    tipo: 'Paralela',
    pauta: 'Pauta a Definir',
    descricao: 'Conteúdo em breve.',
    autor: '',
    empresa: '',
    sala: 'Sala 6',
    horario: '14:55',
    horarioFim: '15:55',
  },

  // ── STANDS ──
  {
    id: 16,
    tipo: 'Direto',
    pauta: 'Stands',
    descricao: 'Explore os stands dos parceiros e patrocinadores. Converse com as empresas, conheça soluções e amplie sua rede.',
    autor: '',
    empresa: '',
    sala: 'Área de Stands',
    horario: '16:00',
    horarioFim: '16:50',
  },

  // ── MAGNA 2 ──
  {
    id: 17,
    tipo: 'Magna',
    pauta: 'Cresça ou fique para trás!',
    descricao: 'O encerramento que vai te fazer sair diferente. Uma provocação direta sobre crescimento, urgência e o que separa as EJs que evoluem das que ficam paradas.',
    autor: '',
    empresa: '',
    sala: 'Auditório Principal',
    horario: '16:50',
    horarioFim: '17:20',
  },

  // ── CONSTRUÇÃO ──
  {
    id: 18,
    tipo: 'Direto',
    pauta: 'Construção',
    descricao: 'Momento coletivo de reflexão e construção. Mais detalhes no evento.',
    autor: '',
    empresa: '',
    sala: '',
    horario: '17:20',
    horarioFim: '18:10',
  },

  // ── PALCO ──
  {
    id: 19,
    tipo: 'Direto',
    pauta: 'Palco',
    descricao: 'Cases, premiações e o grande momento do evento. Não saia antes.',
    autor: '',
    empresa: '',
    sala: 'Auditório Principal',
    horario: '18:25',
    horarioFim: '19:15',
  },
];

// SVG decorativo reutilizável para cards Direto (retângulo do stand)
const DecoStand = () => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '90px', pointerEvents: 'none', opacity: 0.12, zIndex: 0 }}>
    <rect width="120" height="80" rx="8" fill="#704595"/>
    <rect x="10" y="10" width="100" height="60" rx="6" fill="none" stroke="#704595" strokeWidth="2"/>
  </svg>
);

const SessionCard = ({ session, isMultiple, isOpen, onToggle, mediaInicial, totalVotos, deviceId, isLast }) => {
  const isDireto = session.tipo === 'Direto';
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
      .insert({ session_id: session.id, rating, device_id: deviceId });
    if (!error) {
      setJaVotou(true);
      localStorage.setItem(`voted_session_${session.id}`, rating);
      const novoTotal = totalAtual + 1;
      const novaMedia = ((mediaAtual * totalAtual) + rating) / novoTotal;
      setMediaAtual(Math.round(novaMedia * 10) / 10);
      setTotalAtual(novoTotal);
    } else {
      alert('Falha de conexão. Tente novamente.');
    }
    setSalvando(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const tipo = session.tipo.toUpperCase();

  const getTagStyle = (t) => {
    switch (t) {
      case 'MAGNA':   return { background: 'rgba(252,61,13,0.15)', color: '#fc3d0d' };
      case 'STAND':   return { background: 'rgba(112,69,149,0.15)', color: '#704595' };
      default:        return { background: 'rgba(246,83,140,0.15)', color: '#f6538c' };
    }
  };
  const tagStyle = getTagStyle(tipo);

  // ── Card Direto (Credenciamento, Almoço, Dinâmica, Stands, Construção, Palco)
  if (isDireto) {
    return (
      <div
        ref={cardRef}
        style={{
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(112,69,149,0.08)',
          border: '1px solid rgba(112,69,149,0.20)',
          borderLeft: '3px solid #704595',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          width: '100%',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <DecoStand />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{
            fontFamily: 'Strelka',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.90)',
            fontSize: '1.1rem',
            lineHeight: 1.2,
            margin: '0 0 0.35rem 0',
          }}>
            {session.pauta}
          </h4>
          <p style={{
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.78rem',
            margin: '0 0 0.6rem 0',
            lineHeight: 1.4,
          }}>
            {session.descricao}
          </p>
          <div style={{
            display: 'flex', gap: '1rem',
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.30)',
            fontSize: '0.72rem',
          }}>
            {session.sala && <span>📍 {session.sala}</span>}
            <span>🕐 {session.horario}{session.horarioFim ? ` – ${session.horarioFim}` : ''}</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Card de Conteúdo (Magna / Paralela)
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
        marginRight: isLast ? '1.5rem' : '0',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        display: 'flex',
        flexDirection: 'column',
        minHeight: tipo === 'MAGNA' ? '160px' : 'auto',
      }}
    >
      {tipo === 'MAGNA' && (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '100px', pointerEvents: 'none', opacity: 0.15, zIndex: 0 }}>
          <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#fc3d0d"/>
        </svg>
      )}
      {tipo === 'PARALELA' && (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '90px', pointerEvents: 'none', opacity: 0.15, zIndex: 0 }}>
          <circle cx="50" cy="50" r="50" fill="#f6538c"/>
        </svg>
      )}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
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
          }}>
            {session.tipo}
          </div>
          {session.atualizado && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              background: 'rgba(84,255,0,0.12)',
              border: '1px solid rgba(84,255,0,0.25)',
              borderRadius: '9999px',
              padding: '2px 8px',
              marginLeft: '0.5rem',
              verticalAlign: 'middle',
            }}>
              <div style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#54ff00',
              }} />
              <span style={{
                fontFamily: '"Noir Pro", sans-serif',
                fontWeight: 700,
                fontSize: '0.62rem',
                color: '#54ff00',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}>
                {session.avisoAtualizacao || 'Atualizado'}
              </span>
            </div>
          )}
        </div>

        {tipo === 'MAGNA' ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h4 style={{
              textAlign: 'center',
              fontSize: 'clamp(1rem, 4.5vw, 1.3rem)',
              fontFamily: 'Strelka',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {session.pauta}
            </h4>
          </div>
        ) : (
          <h4 style={{
            fontFamily: 'Strelka',
            fontWeight: 800,
            color: 'white',
            fontSize: '1rem',
            lineHeight: 1.2,
            marginTop: '0.5rem',
            marginBottom: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {session.pauta}
          </h4>
        )}

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: tipo === 'MAGNA' ? '0.5rem' : '0.75rem',
          paddingTop: tipo === 'MAGNA' ? '0.5rem' : '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            fontSize: tipo === 'MAGNA' ? '0.7rem' : '0.75rem',
          }}>
            {tipo !== 'MAGNA' && (session.autor || session.empresa) && (
              <span>
                👤 {[session.autor, session.empresa].filter(Boolean).join(' · ')}
              </span>
            )}
            {session.sala && (
              <span>📍 {session.sala}</span>
            )}
          </div>

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
              flexShrink: 0,
            }}
          >
            {isOpen ? 'Ver menos ↑' : 'Saiba mais ↓'}
          </button>
        </div>

        <div style={{ maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.35s ease' }}>
          <div style={{ paddingTop: '1rem' }}>
            <p style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              {session.descricao}
            </p>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <p style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', margin: 0 }}>
                  {jaVotou ? 'Obrigado pela avaliação!' : 'Avalie esta sessão'}
                </p>
                {totalAtual > 0 && (
                  <p style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.30)', fontSize: '0.72rem', margin: 0 }}>
                    ★ {mediaAtual} ({totalAtual} votos)
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1,2,3,4,5].map(star => (
                  <button key={star}
                    onClick={() => { if (!jaVotou && !salvando) setRating(star); }}
                    disabled={jaVotou || salvando}
                    style={{ background: 'transparent', border: 'none', padding: 0, cursor: jaVotou ? 'default' : 'pointer', fontSize: '1.25rem', color: star <= rating ? '#54ff00' : 'rgba(255,255,255,0.2)', opacity: salvando ? 0.5 : 1, transition: 'color 0.2s ease' }}>
                    {star <= rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
              {rating > 0 && !jaVotou && (
                <button onClick={handleConfirmRating} disabled={salvando}
                  style={{ background: '#54ff00', color: '#1a0a2e', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, fontSize: '0.8rem', border: 'none', borderRadius: '9999px', padding: '6px 16px', cursor: salvando ? 'default' : 'pointer', marginTop: '0.75rem', opacity: salvando ? 0.7 : 1 }}>
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
  const gradeRef = useRef(null);
  const [medias, setMedias] = useState({});

  useEffect(() => {
    const fetchMedias = async () => {
      const { data } = await supabase.from('session_ratings').select('session_id, media, total_votos');
      if (data) {
        const map = {};
        data.forEach(row => { map[row.session_id] = { media: parseFloat(row.media), total: row.total_votos }; });
        setMedias(map);
      }
    };
    fetchMedias();
  }, []);

  const groupedSessions = SESSIONS.reduce((acc, session) => {
    if (!acc[session.horario]) acc[session.horario] = [];
    acc[session.horario].push(session);
    return acc;
  }, {});

  const horarios = Object.keys(groupedSessions).sort();

  const handleToggle = (id) => setOpenCardId(prev => prev === id ? null : id);

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('sbjr_device_id');
    if (!deviceId) { deviceId = crypto.randomUUID(); localStorage.setItem('sbjr_device_id', deviceId); }
    return deviceId;
  };
  const deviceId = getDeviceId();

  return (
    <section id="grade" ref={gradeRef} style={{ background: '#0d0d0d', padding: '3rem 0 4rem 0', overflow: 'visible' }}>
      <h2 style={{ fontFamily: 'Strelka', fontWeight: 800, color: 'white', fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', padding: '0 1.5rem', marginBottom: '2rem' }}>
        Grade
      </h2>

      <div style={{ position: 'relative', overflow: 'visible' }}>
        {(expanded ? horarios : horarios.slice(0, 5)).map(horario => {
          const sessions = groupedSessions[horario];
          const isMultiple = sessions.length >= 2;

          return (
            <div key={horario} style={{ marginBottom: '2rem', overflowX: 'visible', overflowY: 'visible' }}>
              <h3 style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', padding: '0 1.5rem', marginBottom: '0.75rem' }}>
                {horario}
              </h3>

              <div style={isMultiple ? {
                display: 'flex', alignItems: 'flex-start',
                overflowX: 'auto', overflowY: 'visible',
                scrollSnapType: 'x proximity',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                gap: '1rem',
                padding: '0 1.5rem 1rem',
                scrollbarWidth: 'none', msOverflowStyle: 'none',
              } : {
                display: 'block', padding: '0 1.5rem', width: '100%',
              }}>
                {isMultiple && (
                  <style dangerouslySetInnerHTML={{__html: `#grade div::-webkit-scrollbar { display: none; }`}} />
                )}
                {sessions.map((session, index) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    isMultiple={isMultiple}
                    isOpen={openCardId === session.id}
                    onToggle={() => handleToggle(session.id)}
                    mediaInicial={medias[session.id]?.media || 0}
                    totalVotos={medias[session.id]?.total || 0}
                    deviceId={deviceId}
                    isLast={index === sessions.length - 1}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {!expanded && horarios.length > 5 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #0d0d0d)', pointerEvents: 'none' }} />
        )}
      </div>

      {horarios.length > 5 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            onClick={() => {
              if (expanded) {
                document.getElementById('grade')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                setTimeout(() => setExpanded(false), 300);
              } else {
                setExpanded(true);
              }
            }} 
            style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, color: '#54ff00', background: 'transparent', border: '1px solid rgba(84,255,0,0.3)', borderRadius: '9999px', padding: '0.6rem 1.5rem', cursor: 'pointer' }}
          >
            {expanded ? 'Ver menos ↑' : 'Ver programação completa →'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Grade;
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const SESSIONS = [
  // ── CREDENCIAMENTO ──
  {
    id: 0,
    tipo: 'Direto',
    pauta: 'Credenciamento',
    descricao: 'Retire seu crachá, pegue seu kit e prepare-se para um dia incrível. A equipe de organização estará à disposição para te receber.',
    autor: '', empresa: '',
    sala: 'Entrada Principal',
    horario: '08:00', horarioFim: '',
  },

  // ── MAGNA 1 ──
  {
    id: 1,
    tipo: 'Magna',
    pauta: 'O Mercado não te espera!',
    descricao: 'Uma visão direta e sem filtros sobre o que o mercado exige das empresas juniores hoje. O que mudou, o que não vai voltar e o que você precisa fazer agora.',
    autor: '', empresa: 'Kaizen',
    sala: 'Palco Principal',
    horario: '09:45', horarioFim: '10:30',
  },

    // ── ABERTURA ──
  {
    id: 20,
    tipo: 'Direto',
    pauta: 'Abertura com os MCs',
    descricao: 'Os MCs abrem o evento, apresentam o que vem por aí e passam uma mensagem rápida sobre o dia. O aquecimento antes da largada.',
    autor: '',
    empresa: 'Vinícius Cruz + Helena Vasconcelos',
    sala: 'Palco Principal',
    horario: '09:30',
    horarioFim: '',
  },
 
  // ── PARALELAS MANHÃ ──
  {
    id: 3, codigo: '1.1',
    tipo: 'Paralela',
    pauta: 'IA e o valor da consultoria',
    descricao: 'Reposicionando seu valor numa era em que a IA faz o trabalho técnico de graça.',
    autor: '', empresa: 'EloGroup',
    sala: 'Sala 1',
    horario: '10:50', horarioFim: '', 
    atualizado: false,
    avisoAtualizacao: 'Pauta atualizada',},
  {
    id: 4, codigo: '1.2',
    tipo: 'Paralela',
    pauta: 'Pare de vender o que você sabe fazer',
    descricao: 'Como imergir na realidade do seu cliente para entender os problemas que ele precisa ter resolvidos e alinhar o conhecimento técnico nativo da sua EJ com um serviço verdadeiramente atrativo para o mercado.',
    autor: '', empresa: 'Singular',
    sala: 'Sala 2',
    horario: '10:50', horarioFim: '',
  },
  {
    id: 5, codigo: '1.3',
    tipo: 'Paralela',
    pauta: 'Quanto cobrar sem ter medo',
    descricao: 'Como construir uma gestão financeira que garanta a operação da EJ no curto, médio e longo prazo.',
    autor: '', empresa: 'Stone',
    sala: 'Sala 3',
    horario: '10:50', horarioFim: '12:00',
  },
  {
    id: 6, codigo: '1.4',
    tipo: 'Paralela',
    pauta: 'Onde está o dinheiro que você não está vendo',
    descricao: 'Como achar demanda para o que sua EJ já sabe fazer. Como explorar novos nichos que hoje você nem sabe que precisam do seu conhecimento.',
    autor: '', empresa: 'Gabriel Fiuza',
    sala: 'Sala 4',
    horario: '10:50', horarioFim: '12:00',
  },
  {
    id: 7, codigo: '1.5',
    tipo: 'Paralela',
    pauta: 'Da bagunça à entrega',
    descricao: 'Redesenhe os processos que estão travando sua EJ de crescer. Como mapear seus processos atuais e remodelá-los para aproximar a EJ de seus objetivos.',
    autor: '', empresa: 'Bruno Kawano',
    sala: 'Sala 5',
    horario: '10:50', horarioFim: '12:00',
  },
  {
    id: 8, codigo: '1.6',
    tipo: 'Paralela',
    pauta: 'Quando tudo é urgente',
    descricao: 'Como uma liderança decide o que atacar primeiro (e o que deixar morrer).',
    autor: '', empresa: 'Victoria Puchalski',
    sala: 'Sala 6',
    horario: '10:50', horarioFim: '12:00',
  },

  // ── ALMOÇO ──
  {
    id: 9,
    tipo: 'Direto',
    pauta: 'Almoço',
    descricao: 'Momento de recarregar as energias. Aproveite para conversar com líderes de outras EJs e tirar insights do dia.',
    autor: '', empresa: '',
    sala: 'Área de Alimentação CEUB',
    horario: '12:00', horarioFim: '',
  },

  // ── DINÂMICA ──
  {
    id: 10,
    tipo: 'Direto',
    pauta: 'Dinâmica',
    descricao: 'Momento de integração e movimento. Venha preparado para sair da cadeira.',
    autor: '', empresa: '',
    sala: 'Palco Principal',
    horario: '13:45', horarioFim: '',
  },

  // ── PARALELAS TARDE ──
  {
    id: 11, codigo: '2.1',
    tipo: 'Paralela',
    pauta: 'Como lidar com pessoas desalinhadas',
    descricao: 'O custo da omissão. Por que tirar membros (e lideranças) desalinhados da sua EJ e como fazer.',
    autor: '', empresa: 'Leonardo Ratto',
    sala: 'Sala 1',
    horario: '14:30', horarioFim: '',
  },
  {
    id: 12, codigo: '2.2',
    tipo: 'Paralela',
    pauta: 'Sozinho você fatura, em rede você impacta',
    descricao: 'Como fechar projetos colaborativos com outras EJs e agentes do ecossistema.',
    autor: '', empresa: 'Cacau',
    sala: 'Sala 2',
    horario: '14:30', horarioFim: '',
  },
  {
    id: 13, codigo: '2.3',
    tipo: 'Paralela',
    pauta: 'De onde vêm seus clientes',
    descricao: 'Gerando demanda e autoridade para sua EJ parar de depender de indicação. Foco em consciência sobre relevância e primeiros passos para posicionamento de marca.',
    autor: '', empresa: 'CRIAmov',
    sala: 'Sala 3',
    horario: '14:30', horarioFim: '',
  },
  {
    id: 14, codigo: '2.4',
    tipo: 'Paralela',
    pauta: 'Workshop: Funil de vendas previsível',
    descricao: 'Previsibilidade no lugar da sorte: o funil de vendas que tira sua EJ do zero a zero.',
    autor: '', empresa: 'Singular',
    sala: 'Sala 4',
    horario: '14:30', horarioFim: '15:30',
  },
  {
    id: 15, codigo: '2.5',
    tipo: 'Paralela',
    pauta: 'O cliente que volta e indica',
    descricao: 'Execução e gerenciamento que vira CSAT alto e novo contrato. Como garantir o sucesso do cliente com um bom processo de execução dos projetos.',
    autor: '', empresa: 'Vitor Feijó',
    sala: 'Sala 5',
    horario: '14:30', horarioFim: '15:30',
  },
  {
    id: 16, codigo: '2.6',
    tipo: 'Paralela',
    pauta: 'Como liderar pessoas em cenários críticos',
    descricao: 'Detalhamento em breve.',
    autor: '', empresa: 'Inova Duda + Tilda',
    sala: 'Sala 6',
    horario: '14:30', horarioFim: '',
  },

  // ── STANDS ──
  {
    id: 17,
    tipo: 'Direto',
    pauta: 'Stands',
    descricao: 'Explore os stands dos parceiros. Converse com as empresas, conheça soluções e amplie sua rede.',
    autor: '', empresa: '',
    sala: 'Corredor de Stands',
    horario: '15:20', horarioFim: '',
  },

  // ── MAGNA 2 ──
  {
    id: 18,
    tipo: 'Magna',
    pauta: 'Cresça ou Fique para Trás',
    descricao: 'O encerramento que vai te fazer sair diferente. Uma provocação direta sobre crescimento, urgência e o que separa as EJs que evoluem das que ficam paradas.',
    autor: '', empresa: 'Vinícius Cruz + Helena Vasconcelos',
    sala: 'Palco Principal',
    horario: '16:30', horarioFim: '',
  },

  // ── CONSTRUÇÃO ──
  {
    id: 19,
    tipo: 'Direto',
    pauta: 'Construção',
    descricao: 'Transforme as ideias em planejamento num momento coletivo com sua EJ!',
    autor: '', empresa: '',
    sala: 'Palco Principal',
    horario: '17:10', horarioFim: '',
  },

  // ── PALCO ──
  {
    id: 20,
    tipo: 'Direto',
    pauta: 'Palco',
    descricao: 'Cases, premiações e o grande momento do evento. Não saia antes.',
    autor: '', empresa: '',
    sala: 'Palco Principal',
    horario: '18:10', horarioFim: '',
  },


    // ── ENCERRAMENTO ──

  {
    id: 21,
    tipo: 'Direto',
    pauta: 'Encerramento',
    descricao: 'O Sábado Júnior 2026 chega ao fim. Obrigado por estar aqui — agora vai lá e aplica tudo isso.',
    autor: '',
    empresa: '',
    sala: 'Palco Principal',
    horario: '19:00',
    horarioFim: '',
  },


];

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

  if (isDireto) {
    return (
      <div ref={cardRef} style={{
        boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
        background: 'rgba(112,69,149,0.08)', border: '1px solid rgba(112,69,149,0.20)',
        borderLeft: '3px solid #704595', borderRadius: '16px', padding: '1rem 1.25rem',
        width: '100%', opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
        <DecoStand />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{ fontFamily: 'Strelka', fontWeight: 800, color: 'rgba(255,255,255,0.90)', fontSize: '1.1rem', lineHeight: 1.2, margin: '0 0 0.35rem 0' }}>
            {session.pauta}
          </h4>
          <p style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
            {session.descricao}
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.30)', fontSize: '0.72rem' }}>
            {session.sala && <span>📍 {session.sala}</span>}
            <span>🕐 {session.horario}{session.horarioFim ? ` – ${session.horarioFim}` : ''}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} style={{
      boxSizing: 'border-box', alignSelf: 'flex-start', position: 'relative', overflow: 'hidden',
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: '16px', padding: '1.25rem',
      width: isMultiple ? 'calc(85vw - 3rem)' : '100%',
      maxWidth: isMultiple ? '320px' : 'none',
      flexShrink: 0, scrollSnapAlign: 'start',
      marginRight: isLast ? '1.5rem' : '0',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
      display: 'flex', flexDirection: 'column',
      minHeight: tipo === 'MAGNA' ? '160px' : 'auto',
    }}>
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
          <div style={{ display: 'inline-block', background: tagStyle.background, color: tagStyle.color, fontSize: '0.7rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 10px', borderRadius: '9999px' }}>
            {session.tipo}
          </div>
          {session.atualizado && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(84,255,0,0.12)', border: '1px solid rgba(84,255,0,0.25)', borderRadius: '9999px', padding: '2px 8px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#54ff00' }} />
              <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, fontSize: '0.62rem', color: '#54ff00', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                {session.avisoAtualizacao || 'Atualizado'}
              </span>
            </div>
          )}
        </div>

        {tipo === 'MAGNA' ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h4 style={{ textAlign: 'center', fontSize: 'clamp(0.85rem, 3.8vw, 1.2rem)', fontFamily: 'Strelka', fontWeight: 800, color: 'white', lineHeight: 1.2, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {session.pauta}
            </h4>
          </div>
        ) : (
          <h4 style={{ fontFamily: 'Strelka', fontWeight: 800, color: 'white', fontSize: '1rem', lineHeight: 1.2, marginTop: '0.5rem', marginBottom: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {session.pauta}
          </h4>
        )}

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: '0.75rem',
          paddingTop: '0.75rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.75rem',
          }}>
            {tipo !== 'MAGNA' && (session.autor || session.empresa) && (
              <span>👤 {[session.autor, session.empresa].filter(Boolean).join(' · ')}</span>
            )}
            {tipo === 'MAGNA' && session.empresa && (
              <span>👤 {session.empresa}</span>
            )}
            {session.sala && (
              <span>📍 {session.sala}</span>
            )}
          </div>

          <button onClick={onToggle} style={{
            background: 'transparent',
            border: 'none',
            color: '#54ff00',
            fontFamily: '"Noir Pro", sans-serif',
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
            marginLeft: '0.5rem',
          }}>
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
                  {jaVotou ? 'Obrigado pela avaliação!' : 'Avalie a pauta'}
                </p>
                {totalAtual > 0 && (
                  <p style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.30)', fontSize: '0.72rem', margin: 0 }}>
                    ★ {mediaAtual} ({totalAtual} votos)
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1,2,3,4,5].map(star => (
                  <button key={star} onClick={() => { if (!jaVotou && !salvando) setRating(star); }} disabled={jaVotou || salvando}
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
                scrollSnapType: 'x proximity', scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                gap: '1rem', padding: '0 1.5rem 1rem',
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
            style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, color: '#54ff00', background: 'transparent', border: '1px solid rgba(84,255,0,0.3)', borderRadius: '9999px', padding: '0.6rem 1.5rem', cursor: 'pointer' }}>
            {expanded ? 'Ver menos ↑' : 'Ver programação completa →'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Grade;

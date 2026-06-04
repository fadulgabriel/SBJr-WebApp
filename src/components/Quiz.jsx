import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import logo from '../assets/logo.png';

const QUIZ_CONFIG = {
  perguntas: [
    {
      id: 1,
      texto: "Há quanto tempo você está no MEJ?",
      opcoes: [
        { texto: "Menos de 6 meses", perfil: "trainee", peso: 1 },
        { texto: "6 meses a 1 ano", perfil: "membro", peso: 1 },
        { texto: "1 a 2 anos", perfil: "membro", peso: 1 },
        { texto: "Mais de 2 anos", perfil: "lideranca", peso: 1 },
      ]
    },
    {
      id: 2,
      texto: "Qual é seu papel hoje na sua Empresa Júnior?",
      opcoes: [
        { texto: "Ainda estou no processo seletivo / Sou Trainee", perfil: "trainee", peso: 2 },
        { texto: "Membro de área (Consultor, Assessor, Analista)", perfil: "membro", peso: 2 },
        { texto: "Coordenador, Gerente, Diretor ou Presidente", perfil: "lideranca", peso: 2 },
      ]
    },
    {
      id: 3,
      texto: "Como você se vê no ecossistema ou no mercado daqui a 1 ano?",
      opcoes: [
        { texto: "Quero subir de cargo e liderar mais dentro da EJ", perfil: "lideranca", peso: 1 },
        { texto: "Quero usar a EJ para entrar forte no mercado de trabalho", perfil: "membro", peso: 1 },
        { texto: "Quero empreender ou criar algo próprio", perfil: "lideranca", peso: 1 },
        { texto: "Ainda estou descobrindo meu caminho", perfil: "trainee", peso: 1 },
      ]
    },
    {
      id: 4,
      texto: "O que você sente que mais trava o crescimento da sua EJ atualmente?",
      opcoes: [
        { texto: "Vendas & Mercado: mercado saturado ou falta de maturidade do time para prospectar e vender de forma agressiva.", trilha: "vendas", peso: 2 },
        { texto: "Produto & Inovação: portfólio defasado, que entrega pouco valor real ou exige muito esforço para executar.", trilha: "produto", peso: 2 },
        { texto: "Processos & Finanças: falta de ferramentas e fluxo claro; a EJ vive operando no caos administrativo.", trilha: "processos", peso: 2 },
        { texto: "Gente & Liderança: falta de alinhamento cultural, membros desmotivados e lideranças despreparadas.", trilha: "gente", peso: 2 },
      ]
    },
    {
      id: 5,
      texto: "Se você pudesse resolver apenas UM grande problema na sua EJ hoje, qual seria?",
      opcoes: [
        { texto: "Vendas & Mercado: atrair mais clientes, fechar contratos maiores e dar mais visibilidade à nossa marca.", trilha: "vendas", peso: 3 },
        { texto: "Produto & Inovação: melhorar a qualidade das entregas, criar novos serviços e trazer inovação técnica.", trilha: "produto", peso: 3 },
        { texto: "Processos & Finanças: organizar nossa casa, padronizar processos caóticos e blindar nosso controle financeiro.", trilha: "processos", peso: 3 },
        { texto: "Gente & Liderança: resolver a desmotivação do time, engajar membros distantes e formar novos líderes.", trilha: "gente", peso: 3 },
      ]
    },
  ],

  nomesPerfil: {
    trainee_vendas:    "Caçador de Mercado",
    trainee_produto:   "Construtor de Valor",
    trainee_processos: "Organizador em Ascensão",
    trainee_gente:     "Conector de Times",
    membro_vendas:     "Closer em Ascensão",
    membro_produto:    "Especialista em Entregas",
    membro_processos:  "Executor Estratégico",
    membro_gente:      "Agente de Cultura",
    lideranca_vendas:  "Arquiteto Comercial",
    lideranca_produto: "Visionário de Produto",
    lideranca_processos: "Líder de Alta Performance",
    lideranca_gente:   "Construtor de Lideranças",
  },

  recomendacoes: {
    trainee_vendas: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    trainee_produto: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    trainee_processos: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    trainee_gente: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    membro_vendas: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    membro_produto: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    membro_processos: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    membro_gente: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    lideranca_vendas: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    lideranca_produto: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    lideranca_processos: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
    lideranca_gente: {
      magna_abertura: "O mercado de 2026 não te espera · 09:30",
      paralela_principal: "Imersão no cliente + alinhamento Projetos→Vendas · Sala 2 · 10:55",
      paralela_alternativa: "IA e percepção de valor da consultoria · Sala 1 · 10:55",
      magna_central: "Cresça ou fique para trás! · 16:50",
      paralela2_principal: "Funil de vendas previsível · Sala 4 · 14:55",
      paralela2_alternativa: "Projetos de Impacto · Sala 2 · 14:55",
      stands: ["Stand A", "Stand B", "Stand C", "Stand D", "Stand E"],
    },
  },
};

const Quiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sbjr_quiz_result');
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  const handleSelect = (option) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: option
    }));
  };

  const handleNext = async () => {
    if (currentQuestion < QUIZ_CONFIG.perguntas.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await calculateResult();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleRefazer = () => {
    localStorage.removeItem('sbjr_quiz_result');
    setResult(null);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleGoToGrade = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('grade')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const calculateResult = async () => {
    setLoading(true);
    let scores = { trainee: 0, membro: 0, lideranca: 0, carreira: 0, comercial: 0, gestao: 0, inovacao: 0 };
    
    Object.keys(answers).forEach(qIndex => {
      const option = answers[qIndex];
      if (option.perfil) scores[option.perfil] += option.peso;
      if (option.trilha) scores[option.trilha] += option.peso;
    });

    const perfis = ['trainee', 'membro', 'lideranca', 'carreira'];
    let winnerPerfil = perfis.reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    if (winnerPerfil === 'carreira') {
      const others = ['trainee', 'membro', 'lideranca'];
      winnerPerfil = others.reduce((a, b) => scores[a] > scores[b] ? a : b);
    }

    const trilhas = ['comercial', 'gestao', 'inovacao'];
    const winnerTrilha = trilhas.reduce((a, b) => scores[a] > scores[b] ? a : b);

    const chave = `${winnerPerfil}_${winnerTrilha}`;
    const nomePerfil = QUIZ_CONFIG.nomesPerfil[chave] || "Sábado Júnior";
    const recomendacao = QUIZ_CONFIG.recomendacoes[chave] || QUIZ_CONFIG.recomendacoes.trainee_gestao;

    const finalResult = {
      perfil: winnerPerfil,
      trilha: winnerTrilha,
      nomePerfil,
      recomendacao,
      data: new Date()
    };

    setResult(finalResult);
    localStorage.setItem('sbjr_quiz_result', JSON.stringify(finalResult));

    let deviceId = localStorage.getItem('sbjr_device_id');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('sbjr_device_id', deviceId);
    }

    await supabase.from('quiz_results').insert({
      device_id: deviceId,
      perfil: winnerPerfil,
      trilha: winnerTrilha,
      nome_perfil: nomePerfil,
      respostas: answers
    });
    
    setLoading(false);
  };

  if (result) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: '#0d0d0d',
        zIndex: 100,
        display: 'flex', flexDirection: 'column',
        padding: '2rem 1.5rem',
        overflowY: 'auto'
      }}>
        <div style={{ flex: 1, paddingBottom: '2rem' }}>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', 
            position: 'absolute', top: '1rem', right: '1.5rem', cursor: 'pointer'
          }}>✕</button>
          
          <img src={logo} alt="SBJr. Logo" style={{ width: '80px', marginBottom: '2rem' }} />
          
          <p style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.50)', margin: '0 0 0.25rem 0' }}>Seu perfil é</p>
          <h2 style={{ fontFamily: 'Strelka', fontWeight: 800, color: '#54ff00', fontSize: 'clamp(1.8rem, 7vw, 3rem)', margin: '0 0 2.5rem 0', lineHeight: 1 }}>
            {result.nomePerfil}
          </h2>

          <h3 style={{ fontFamily: 'Strelka', color: 'white', fontSize: '1.25rem', marginBottom: '1rem' }}>Sua trilha no SBJr.</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* 09:30 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>09:30</div>
              <div style={{ background: 'rgba(252,61,13,0.10)', border: '1px solid rgba(252,61,13,0.30)', borderRadius: '14px', padding: '1rem 1.25rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ background: 'rgba(252,61,13,0.15)', color: '#fc3d0d', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>MAGNA</span>
                  <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.magna_abertura.replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                </div>
              </div>
            </div>

            {/* 10:55 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>10:55</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(84,255,0,0.1)', border: '1px solid rgba(84,255,0,0.25)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: '#54ff00', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>RECOMENDADA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela_principal.replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>ALTERNATIVA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela_alternativa.replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 14:55 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>14:55</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(84,255,0,0.1)', border: '1px solid rgba(84,255,0,0.25)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: '#54ff00', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>RECOMENDADA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela2_principal.replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>ALTERNATIVA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela2_alternativa.replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 16:50 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>16:50</div>
              <div style={{ background: 'rgba(252,61,13,0.10)', border: '1px solid rgba(252,61,13,0.30)', borderRadius: '14px', padding: '1rem 1.25rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ background: 'rgba(252,61,13,0.15)', color: '#fc3d0d', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>MAGNA</span>
                  <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.magna_central.replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                </div>
              </div>
            </div>

            {/* Stands */}
            <div>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Stands Sugeridos</div>
              <p style={{
                fontFamily: '"Noir Pro", sans-serif',
                fontWeight: 400,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.8,
                margin: 0,
                whiteSpace: 'pre-line'
              }}>
                {result.recomendacao.stands.join('\n')}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={handleRefazer} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', borderRadius: '9999px', padding: '0.8rem', fontFamily: '"Noir Pro", sans-serif', cursor: 'pointer' }}>
            Refazer quiz
          </button>
          <button onClick={handleGoToGrade} style={{ flex: 2, background: '#54ff00', border: 'none', color: '#1a0a2e', fontWeight: 700, borderRadius: '9999px', padding: '0.8rem', fontFamily: '"Noir Pro", sans-serif', cursor: 'pointer' }}>
            Ver grade completa →
          </button>
        </div>
      </div>
    );
  }

  const question = QUIZ_CONFIG.perguntas[currentQuestion];
  const selectedOption = answers[currentQuestion];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes quizFadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      `}} />
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, #704595 0%, #f6538c 100%)',
        zIndex: 100,
        display: 'flex', flexDirection: 'column',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
        animation: 'quizFadeIn 0.3s ease forwards'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logo} alt="SBJr. Logo" style={{ width: '80px' }} />
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: '0.25rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
          {QUIZ_CONFIG.perguntas.map((_, idx) => (
            <div key={idx} style={{ flex: 1, height: '4px', borderRadius: '2px', background: idx <= currentQuestion ? '#54ff00' : 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>

        <p style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0' }}>
          Pergunta {currentQuestion + 1} de {QUIZ_CONFIG.perguntas.length}
        </p>

        <h2 style={{ fontFamily: 'Strelka', fontWeight: 800, color: 'white', fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', margin: '1rem 0 2rem 0', lineHeight: 1.2 }}>
          {question.texto}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          {question.opcoes.map((op, idx) => {
            const isSelected = selectedOption?.texto === op.texto;
            return (
              <button 
                key={idx} 
                onClick={() => handleSelect(op)}
                style={{
                  background: isSelected ? 'rgba(84,255,0,0.15)' : 'rgba(255,255,255,0.10)',
                  border: isSelected ? '1px solid #54ff00' : '1px solid rgba(255,255,255,0.20)',
                  color: isSelected ? '#54ff00' : 'white',
                  borderRadius: '14px',
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontFamily: '"Noir Pro", sans-serif',
                  fontWeight: isSelected ? 700 : 400,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.4
                }}
              >
                {op.texto}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          {currentQuestion > 0 ? (
            <button onClick={handleBack} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', borderRadius: '9999px', padding: '0.6rem 1.5rem', fontFamily: '"Noir Pro", sans-serif', cursor: 'pointer' }}>
              ← Voltar
            </button>
          ) : <div />}
          
          {selectedOption && (
            <button onClick={handleNext} disabled={loading} style={{ background: '#54ff00', border: 'none', color: '#1a0a2e', fontWeight: 700, borderRadius: '9999px', padding: '0.6rem 1.5rem', fontFamily: '"Noir Pro", sans-serif', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {currentQuestion === QUIZ_CONFIG.perguntas.length - 1 ? (loading ? 'Calculando...' : 'Ver meu perfil →') : 'Próxima →'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;

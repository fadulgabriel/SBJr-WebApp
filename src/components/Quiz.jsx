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
        { texto: "6 meses a 1 ano", perfil: "membro", peso: 2 },
        { texto: "1 a 2 anos", perfil: "lideranca", peso: 1 },
        { texto: "Mais de 2 anos", perfil: "lideranca", peso: 2 },
      ]
    },
    {
      id: 2,
      texto: "Qual é seu papel hoje na sua Empresa Júnior?",
      opcoes: [
        { texto: "Sou Trainee / Ainda estou no processo seletivo ", perfil: "trainee", peso: 3 },
        { texto: "Consultor, Assessor ou Analista", perfil: "membro", peso: 2 },
        { texto: "Coordenador, Gerente ou Supervisor", perfil: "lideranca", peso: 1 },
        { texto: "Diretor ou Presidente", perfil: "lideranca", peso: 3 },
      ]
    },
    {
      id: 3,
      texto: "Como você se vê no mercado daqui a 1 ano?",
      opcoes: [
        { texto: "Quero subir de cargo e liderar mais dentro da EJ", perfil: "lideranca", peso: 0 },
        { texto: "Quero usar a EJ para entrar forte no mercado de trabalho", perfil: "membro", peso: 0 },
        { texto: "Quero empreender ou criar algo próprio", perfil: "lideranca", peso: 0 },
        { texto: "Ainda estou descobrindo meu caminho", perfil: "trainee", peso: 0 },
      ]
    },
    {
      id: 4,
      texto: "O que você sente que mais trava o crescimento da EJ atualmente?",
      opcoes: [
        { texto: "Falta de maturidade do time para prospectar e vender de forma agressiva.", trilha: "vendas", peso: 2 },
        { texto: "Portfólio defasado que entrega pouco valor real ao cliente.", trilha: "produto", peso: 2 },
        { texto: "A EJ funciona no improviso, sem fluxos claros, e cada pessoa faz do seu jeito.", trilha: "processos", peso: 2 },
        { texto: "Falta de alinhamento cultural, membros desmotivados e lideranças despreparadas.", trilha: "gente", peso: 2 },
      ]
    },
    {
      id: 5,
      texto: "Se pudesse resolver apenas UM grande problema na EJ hoje, qual seria?",
      opcoes: [
        { texto: "Atrair mais clientes, fechar contratos maiores e dar mais visibilidade à nossa marca.", trilha: "vendas", peso: 3 },
        { texto: "Melhorar a qualidade das entregas, criar novos serviços e trazer inovação técnica.", trilha: "produto", peso: 3 },
        { texto: "Organizar nossa casa, padronizar processos caóticos.", trilha: "processos", peso: 3 },
        { texto: "Resolver a desmotivação do time, engajar membros distantes e formar novos líderes.", trilha: "gente", peso: 3 },
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
    membro_processos:  "Organizador de Eficiência",
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

const PAUTAS = {
  "1.1": { titulo: "IA e o valor da consultoria", sala: "Sala 1", empresa: "EloGroup" },
  "1.2": { titulo: "Pare de vender o que você sabe fazer", sala: "Sala 2", empresa: "Singular" },
  "1.3": { titulo: "Quanto cobrar sem ter medo", sala: "Sala 3", empresa: "Stone" },
  "1.4": { titulo: "Onde está o dinheiro que você não está vendo", sala: "Sala 4", empresa: "Gabriel Fiuza" },
  "1.5": { titulo: "Da bagunça à entrega", sala: "Sala 5", empresa: "Bruno Kawano" },
  "1.6": { titulo: "Quando tudo é urgente", sala: "Sala 6", empresa: "Victoria Puchalski" },
  "2.1": { titulo: "Como lidar com pessoas desalinhadas", sala: "Sala 1", empresa: "Leonardo Ratto" },
  "2.2": { titulo: "Sozinho você fatura, em rede você impacta", sala: "Sala 2", empresa: "Cacau" },
  "2.3": { titulo: "De onde vêm seus clientes", sala: "Sala 3", empresa: "CRIAmov" },
  "2.4": { titulo: "Workshop: Funil de vendas previsível", sala: "Sala 4", empresa: "Singular" },
  "2.5": { titulo: "O cliente que volta e indica", sala: "Sala 5", empresa: "Vitor Feijó" },
  "2.6": { titulo: "Como liderar pessoas em cenários críticos", sala: "Sala 6", empresa: "Inova Duda + Tilda" },
};

const STANDS_MAP = {
  1: "Otimize seus Processos com IA · BMAI",
  2: "Diagnóstico Comercial da sua EJ · Omotenashi Consultoria",
  3: "Conheça o Peso do Protagonismo Estudantil · SEBRAE",
  4: "Transforme seu Currículo em Oportunidades · Multi Carreira",
  5: "Conheça o Sistema Operacional NEXUS · DataSynq",
  6: "Conheça uma das maiores consultorias do país · EloGroup",
};

const RECOMENDACOES_MAP = {
  trainee_vendas_vendas:        { p1: "1.1", p1alt: "1.2", p2: "2.3", p2alt: "2.2" },
  trainee_vendas_produto:       { p1: "1.1", p1alt: "1.2", p2: "2.2", p2alt: "2.3" },
  trainee_vendas_processos:     { p1: "1.5", p1alt: "1.4", p2: "2.4", p2alt: "2.5" },
  trainee_vendas_gente:         { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  trainee_produto_vendas:       { p1: "1.1", p1alt: "1.2", p2: "2.2", p2alt: "2.3" },
  trainee_produto_produto:      { p1: "1.1", p1alt: "1.2", p2: "2.5", p2alt: "2.2" },
  trainee_produto_processos:    { p1: "1.5", p1alt: "1.4", p2: "2.5", p2alt: "2.2" },
  trainee_produto_gente:        { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  trainee_processos_vendas:     { p1: "1.1", p1alt: "1.3", p2: "2.2", p2alt: "2.4" },
  trainee_processos_produto:    { p1: "1.1", p1alt: "1.5", p2: "2.2", p2alt: "2.5" },
  trainee_processos_processos:  { p1: "1.5", p1alt: "1.3", p2: "2.5", p2alt: "2.4" },
  trainee_processos_gente:      { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  trainee_gente_vendas:         { p1: "1.1", p1alt: "1.3", p2: "2.3", p2alt: "2.6" },
  trainee_gente_produto:        { p1: "1.1", p1alt: "1.5", p2: "2.2", p2alt: "2.5" },
  trainee_gente_processos:      { p1: "1.5", p1alt: "1.6", p2: "2.4", p2alt: "2.1" },
  trainee_gente_gente:          { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  membro_vendas_vendas:         { p1: "1.1", p1alt: "1.2", p2: "2.3", p2alt: "2.2" },
  membro_vendas_produto:        { p1: "1.1", p1alt: "1.2", p2: "2.2", p2alt: "2.3" },
  membro_vendas_processos:      { p1: "1.5", p1alt: "1.4", p2: "2.4", p2alt: "2.5" },
  membro_vendas_gente:          { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  membro_produto_vendas:        { p1: "1.1", p1alt: "1.2", p2: "2.2", p2alt: "2.3" },
  membro_produto_produto:       { p1: "1.1", p1alt: "1.2", p2: "2.5", p2alt: "2.2" },
  membro_produto_processos:     { p1: "1.5", p1alt: "1.4", p2: "2.5", p2alt: "2.2" },
  membro_produto_gente:         { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  membro_processos_vendas:      { p1: "1.1", p1alt: "1.3", p2: "2.2", p2alt: "2.4" },
  membro_processos_produto:     { p1: "1.1", p1alt: "1.5", p2: "2.2", p2alt: "2.5" },
  membro_processos_processos:   { p1: "1.5", p1alt: "1.3", p2: "2.5", p2alt: "2.4" },
  membro_processos_gente:       { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  membro_gente_vendas:          { p1: "1.1", p1alt: "1.3", p2: "2.3", p2alt: "2.6" },
  membro_gente_produto:         { p1: "1.1", p1alt: "1.5", p2: "2.2", p2alt: "2.5" },
  membro_gente_processos:       { p1: "1.5", p1alt: "1.6", p2: "2.4", p2alt: "2.1" },
  membro_gente_gente:           { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  lideranca_vendas_vendas:      { p1: "1.6", p1alt: "1.2", p2: "2.3", p2alt: "2.6" },
  lideranca_vendas_produto:     { p1: "1.2", p1alt: "1.1", p2: "2.6", p2alt: "2.4" },
  lideranca_vendas_processos:   { p1: "1.5", p1alt: "1.3", p2: "2.4", p2alt: "2.6" },
  lideranca_vendas_gente:       { p1: "1.6", p1alt: "1.4", p2: "2.6", p2alt: "2.1" },
  lideranca_produto_vendas:     { p1: "1.6", p1alt: "1.2", p2: "2.6", p2alt: "2.2" },
  lideranca_produto_produto:    { p1: "1.2", p1alt: "1.1", p2: "2.6", p2alt: "2.2" },
  lideranca_produto_processos:  { p1: "1.5", p1alt: "1.3", p2: "2.4", p2alt: "2.6" },
  lideranca_produto_gente:      { p1: "1.6", p1alt: "1.5", p2: "2.6", p2alt: "2.1" },
  lideranca_processos_vendas:   { p1: "1.6", p1alt: "1.3", p2: "2.6", p2alt: "2.4" },
  lideranca_processos_produto:  { p1: "1.2", p1alt: "1.6", p2: "2.6", p2alt: "2.5" },
  lideranca_processos_processos:{ p1: "1.6", p1alt: "1.5", p2: "2.6", p2alt: "2.5" },
  lideranca_processos_gente:    { p1: "1.6", p1alt: "1.5", p2: "2.6", p2alt: "2.1" },
  lideranca_gente_vendas:       { p1: "1.6", p1alt: "1.3", p2: "2.6", p2alt: "2.1" },
  lideranca_gente_produto:      { p1: "1.2", p1alt: "1.6", p2: "2.6", p2alt: "2.5" },
  lideranca_gente_processos:    { p1: "1.5", p1alt: "1.6", p2: "2.6", p2alt: "2.1" },
  lideranca_gente_gente:        { p1: "1.6", p1alt: "1.5", p2: "2.6", p2alt: "2.1" },
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

    let scores = {
      trainee: 0, membro: 0, lideranca: 0,
      vendas: 0, produto: 0, processos: 0, gente: 0
    };

    Object.keys(answers).forEach(qIndex => {
      const option = answers[qIndex];
      if (option.perfil && scores[option.perfil] !== undefined) {
        scores[option.perfil] += option.peso;
      }
      if (option.trilha && scores[option.trilha] !== undefined) {
        scores[option.trilha] += option.peso;
      }
    });

    const perfis = ['trainee', 'membro', 'lideranca'];
    const winnerPerfil = perfis.reduce((a, b) =>
      scores[a] >= scores[b] ? a : b);

    const respostaP4 = answers[3]?.trilha || 'vendas';
    const respostaP5 = answers[4]?.trilha || 'vendas';

    const chaveRec = `${winnerPerfil}_${respostaP4}_${respostaP5}`;
    const chaveNome = `${winnerPerfil}_${respostaP5}`;

    const rec = RECOMENDACOES_MAP[chaveRec]
      || RECOMENDACOES_MAP[`${winnerPerfil}_vendas_vendas`];

    const nomePerfil = QUIZ_CONFIG.nomesPerfil[chaveNome]
      || QUIZ_CONFIG.nomesPerfil[`${winnerPerfil}_vendas`]
      || 'Sábado Júnior';

    const standsPerfilMap = {
      trainee:   [4, 3],
      membro:    [4],
      lideranca: [6, 3],
    };
    const standsTrilhaMap = {
      vendas:    [2, 1],
      produto:   [6, 1],
      processos: [5, 2],
      gente:     [3, 6, 4],
    };

    const standsIds = [
      ...new Set([
        ...(standsPerfilMap[winnerPerfil] || []),
        ...(standsTrilhaMap[respostaP5] || []),
      ])
    ].slice(0, 4);

    const standsTextos = standsIds
      .map(id => STANDS_MAP[id])
      .filter(Boolean);

    const recomendacao = {
      magna_abertura: "O Mercado 2026 Não te Espera! · 09:45",
      paralela_principal: `${PAUTAS[rec.p1]?.titulo}, ${PAUTAS[rec.p1]?.empresa} · ${PAUTAS[rec.p1]?.sala} · 10:50`,
      paralela_alternativa: `${PAUTAS[rec.p1alt]?.titulo}, ${PAUTAS[rec.p1alt]?.empresa} · ${PAUTAS[rec.p1alt]?.sala} · 10:50`,
      magna_central: "Cresça ou Fique para Trás · 16:30",
      paralela2_principal: `${PAUTAS[rec.p2]?.titulo}, ${PAUTAS[rec.p2]?.empresa} · ${PAUTAS[rec.p2]?.sala} · 14:30`,
      paralela2_alternativa: `${PAUTAS[rec.p2alt]?.titulo}, ${PAUTAS[rec.p2alt]?.empresa} · ${PAUTAS[rec.p2alt]?.sala} · 14:30`,
      stands: standsTextos,
    };

    const finalResult = {
      perfil: winnerPerfil,
      trilha: respostaP5,
      nomePerfil,
      recomendacao,
      data: new Date(),
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
      trilha: respostaP5,
      nome_perfil: nomePerfil,
      respostas: answers,
      p1_resp: answers[0]?.texto || '',
      p2_resp: answers[1]?.texto || '',
      p3_resp: answers[2]?.texto || '',
      p4_resp: answers[3]?.texto || '',
      p5_resp: answers[4]?.texto || '',
      paralela1_principal: recomendacao.paralela_principal,
      paralela1_alternativa: recomendacao.paralela_alternativa,
      paralela2_principal: recomendacao.paralela2_principal,
      paralela2_alternativa: recomendacao.paralela2_alternativa,
      stands_sugeridos: standsTextos.join('\n'),
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
            {/* 09:45 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>09:45</div>
              <div style={{ background: 'rgba(112,69,149,0.10)', border: '1px solid rgba(112,69,149,0.30)', borderRadius: '14px', padding: '1rem 1.25rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ background: 'rgba(112,69,149,0.15)', color: '#704595', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>MAGNA</span>
                  <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.magna_abertura.replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                </div>
              </div>
            </div>

            {/* 10:50 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>10:50</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(84,255,0,0.1)', border: '1px solid rgba(84,255,0,0.25)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: '#54ff00', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>RECOMENDADA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela_principal.replace(/\s*·\s*Sala\s*\d+\s*·\s*\d{2}:\d{2}$/, '').replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>ALTERNATIVA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela_alternativa.replace(/\s*·\s*Sala\s*\d+\s*·\s*\d{2}:\d{2}$/, '').replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 14:30 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>14:30</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(84,255,0,0.1)', border: '1px solid rgba(84,255,0,0.25)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: '#54ff00', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>RECOMENDADA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela2_principal.replace(/\s*·\s*Sala\s*\d+\s*·\s*\d{2}:\d{2}$/, '').replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem 1rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                  <div style={{ fontSize: '0.62rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>ALTERNATIVA</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ background: 'rgba(246,83,140,0.15)', color: '#f6538c', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>PARALELA</span>
                    <span style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400 }}>{result.recomendacao.paralela2_alternativa.replace(/\s*·\s*Sala\s*\d+\s*·\s*\d{2}:\d{2}$/, '').replace(/\s*·\s*\d{2}:\d{2}$/, '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 16:30 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>16:30</div>
              <div style={{ background: 'rgba(112,69,149,0.10)', border: '1px solid rgba(112,69,149,0.30)', borderRadius: '14px', padding: '1rem 1.25rem', fontFamily: '"Noir Pro", sans-serif', fontSize: '0.85rem', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ background: 'rgba(112,69,149,0.15)', color: '#704595', fontSize: '0.65rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '9999px', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>MAGNA</span>
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
                {result.recomendacao.stands.map(s => s.split(' · ')[1] || s).join('\n')}
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

# SBJr. 26 Web App 

> Aplicativo mobile-first desenvolvido para o **Sábado Júnior 2026**, o maior evento do movimento empresa júnior do Distrito Federal, organizado pela [Concentro](https://instagram.com/concentrodf).

---

## Sobre o projeto

O SBJr. Web App foi criado para ser acessado pelos participantes **durante o evento**, direto pelo navegador do celular, sem instalação e sem cadastro.

O objetivo é centralizar toda a experiência do evento em um único lugar: programação, stands, cases do palco, rankings e avaliações em tempo real. Além do quiz interativo para uma recomendação da trilha de conteúdo a ser escolhida pelo participante do evento. 

---

## Funcionalidades

### 📅 Grade de Programação
- Sessões organizadas cronologicamente por horário
- Horários com múltiplas opções exibidos em **carrossel horizontal** com scroll snapping nativo
- Cards minimalistas com tipo (Magna / Paralela / Stand), palestrante, sala e horário
- Accordion para expandir detalhes de cada sessão
- **Avaliação de 1 a 5 estrelas** anônima por sessão, salva no Supabase
- Média de avaliações visível para todos os participantes em tempo real
- "Ver programação completa" com efeito de fade nos horários ocultos

### 🏢 Stands
- Cards horizontais com título, empresa e horário de funcionamento
- Accordion com descrição e número de contato (abre discador nativo)

### 🎤 Palco
- **Cases em competição** — 3 grupos com lista de EJs participantes e link direto para cada case
- **EJs Embaixadoras** — pódio Top 3 com nomes em blur até a revelação no evento
- **Conselheiro Destaque** — card misterioso com silhueta revelada no evento
- Prêmios detalhados para cada posição

### 🤝 Parceiros
- Carrossel infinito com dois trilhos em direções opostas
- Pausa no hover

### 🔗 Header inteligente
- Aparece apenas ao rolar para baixo (IntersectionObserver)
- Navegação por âncoras para cada seção

---

## Lógica do Quiz "Descubra sua Trilha"

Aprodundando no funcionamento do quiz, uma ferramenta de personalização da experiência do congressista durante o evento. Em 5 perguntas rápidas, ele identifica o perfil da pessoa e o principal problema da EJ dela, para então recomendar as paralelas e stands mais relevantes.

---

## As 5 Perguntas

### P1 — Há quanto tempo você está no MEJ?
Mede o tempo de experiência no movimento.
- Menos de 6 meses
- 6 meses a 1 ano
- 1 a 2 anos
- Mais de 2 anos

### P2 — Qual é seu papel hoje na sua EJ?
Confirma o nível de atuação atual.
- Ainda estou no processo seletivo / Sou Trainee
- Membro de área (Consultor, Assessor, Analista)
- Coordenador, Gerente, Diretor ou Presidente

### P3 — Como você se vê daqui a 1 ano?
Pergunta de contexto sobre intenção futura.
Não influencia o cálculo do perfil (peso zero).
- Quero subir de cargo e liderar mais na EJ
- Quero usar a EJ para entrar no mercado de trabalho
- Quero empreender ou criar algo próprio
- Ainda estou descobrindo meu caminho

### P4 — O que mais trava o crescimento da sua EJ?
Identifica o gargalo estrutural da EJ. Peso 2.
- Vendas & Mercado
- Produto & Inovação
- Processos Claros
- Gente & Liderança

### P5 — Se pudesse resolver UM grande problema hoje, qual seria?
Pergunta âncora — define a trilha principal. Peso 3.
- Vendas & Mercado
- Produto & Inovação
- Processos Claros
- Gente & Liderança

---

## Como o Perfil é Calculado

O perfil é calculado pelas respostas de **P1 e P2** com os seguintes pesos:

| Pergunta | Peso |
|---|---|
| P1 — Tempo no MEJ | 1 |
| P2 — Papel atual | 2 |
| P3 — Visão de futuro | 0 (não conta) |

O sistema soma os pontos para cada categoria de perfil e o que tiver maior pontuação vence:
- **Trainee** — pouco tempo no MEJ, ainda no processo seletivo ou início
- **Membro** — atua como consultor, assessor ou analista
- **Liderança** — coordenador, gerente, diretor ou presidente

---

## Como a Trilha é Calculada

A trilha é definida pelas respostas de **P4 e P5**:

| Pergunta | Peso |
|---|---|
| P4 — Gargalo estrutural | 2 |
| P5 — Problema principal | 3 |

A trilha com maior pontuação vence:
- **Vendas** — EJ não capta, não fecha, não tem mercado
- **Produto** — portfólio defasado, entrega de pouco valor
- **Processos** — caos operacional, falta de fluxo claro
- **Gente** — membros desmotivados, lideranças despreparadas

---

## Os 12 Perfis Finais

O resultado final cruza **perfil × trilha (P5)**:

| | Vendas | Produto | Processos | Gente |
|---|---|---|---|---|
| **Trainee** | Caçador de Mercado | Construtor de Valor | Organizador em Ascensão | Conector de Times |
| **Membro** | Closer em Ascensão | Especialista em Entregas | Executor Estratégico | Agente de Cultura |
| **Liderança** | Arquiteto Comercial | Visionário de Produto | Líder de Alta Performance | Construtor de Lideranças |

---

## O que o Congressista Recebe

Ao final do quiz, o site mostra:

- **Nome do perfil** — ex: "Arquiteto Comercial"
- **Magna de abertura** — obrigatória para todos (09:45)
- **Paralela recomendada — Rodada 1** (10:50) + alternativa
- **Paralela recomendada — Rodada 2** (14:30) + alternativa
- **Magna de encerramento** — obrigatória para todos (16:30)
- **Stands sugeridos** — baseados no perfil e na trilha

O resultado fica salvo no celular da pessoa — ela pode fechar o site e voltar para ver a recomendação quando quiser.

---

## As 48 Combinações de Recomendação

As paralelas sugeridas variam conforme a combinação de **perfil × P4 × P5** — gerando 48 caminhos possíveis (3 perfis × 4 opções P4 × 4 opções P5).

Isso garante que duas pessoas com o mesmo perfil mas problemas diferentes recebam recomendações distintas.

---

## Dados Coletados

Cada resposta ao quiz salva anonimamente:

| Campo | O que é |
|---|---|
| perfil | trainee / membro / lideranca |
| trilha | vendas / produto / processos / gente |
| nome_perfil | nome criativo calculado |
| p1_resp a p5_resp | texto exato de cada resposta |
| paralela1_principal | pauta recomendada manhã |
| paralela1_alternativa | pauta alternativa manhã |
| paralela2_principal | pauta recomendada tarde |
| paralela2_alternativa | pauta alternativa tarde |
| stands_sugeridos | stands recomendados |
| device_id | ID anônimo do dispositivo |
| created_at | horário do preenchimento (Brasília) |

Nenhum dado pessoal é coletado, apenas respostas e o ID anônimo do celular.

---

## Evento

**Sábado Júnior 2026**
Instagram: [@sabadojr26](https://instagram.com/sabadojr26)

---

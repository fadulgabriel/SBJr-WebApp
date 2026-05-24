# SBJr. Web App 🚀

> Aplicativo mobile-first desenvolvido para o **Sábado Júnior 2026** — o maior evento do movimento empresa júnior do Distrito Federal, organizado pela [Concentro](https://instagram.com/concentrodf).

---

## Sobre o projeto

O SBJr. Web App foi criado para ser acessado pelos participantes **durante o evento**, direto pelo navegador do celular — sem instalação, sem cadastro, sem fricção.

O objetivo é centralizar toda a experiência do evento em um único lugar: programação, stands, cases do palco, rankings e avaliações em tempo real.

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

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite |
| Estilização | CSS inline com design tokens |
| Backend | Supabase (PostgreSQL) |
| Auth | Anônimo via device_id em localStorage |
| Deploy | Vercel |

---

## Design System

O projeto segue a identidade visual oficial do **Sábado Júnior 2026**:

| Token | Valor |
|---|---|
| Cor primária | `#704595` |
| Cor secundária | `#f6538c` |
| Accent | `#54ff00` |
| Destaque | `#fc3d0d` |
| Background | `#0d0d0d` |
| Fonte headings | Strelka 800 |
| Fonte body | Noir Pro 400/700 |

---

## Banco de dados (Supabase)

### Tabela `ratings`
```sql
create table ratings (
  id uuid default gen_random_uuid() primary key,
  session_id integer not null,
  rating integer not null check (rating between 1 and 5),
  device_id text,
  created_at timestamp default now()
);
```

### View `session_ratings`
```sql
create view session_ratings as
select 
  session_id,
  round(avg(rating)::numeric, 1) as media,
  count(*) as total_votos
from ratings
group by session_id;
```

O `device_id` é um UUID gerado anonimamente no primeiro acesso e salvo em `localStorage` — permite análise de correlação entre sessões sem identificar o usuário.

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/fadulgabriel/SBJr-WebApp.git

# Entra na pasta
cd SBJr-WebApp/sbjr-app

# Instala dependências
npm install

# Roda em desenvolvimento
npm run dev
```

Acessa em `http://localhost:5173`

---

## Deploy

O projeto está configurado para deploy automático na **Vercel**. Qualquer push na branch `main` publica automaticamente.

```bash
# Atualizar dados do evento
git add .
git commit -m "atualiza grade"
git push
```

---

## Estrutura do projeto

```
sbjr-app/
├── public/
│   └── favicon.png
├── src/
│   ├── assets/
│   │   ├── logo.png
│   │   ├── esfera.png
│   │   └── elementos/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Header.jsx
│   │   ├── Grade.jsx
│   │   ├── Stands.jsx
│   │   ├── Palco.jsx
│   │   ├── Parceiros.jsx
│   │   └── Footer.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   └── index.css
```

---

## Evento

**Sábado Júnior 2026**
Organização: Concentro — Federação das Empresas Juniores do Distrito Federal
Instagram: [@concentrodf](https://instagram.com/concentrodf) · [@sabadojr26](https://instagram.com/sabadojr26)

---

*Desenvolvido pela Diretoria de Marketing da Concentro DF*
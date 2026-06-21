import React from 'react';
import esfera from '../assets/esfera.png';
import el8 from '../assets/elementos/el8.png';
import el1 from '../assets/elementos/el1.png';

import logoSingular from '../assets/parceiros/singular_logo.png';
import logoOmotenashi from '../assets/parceiros/Omotenashi_logo.png';
import logoBMAI from '../assets/parceiros/bmai.png';
import logoSebrae from '../assets/parceiros/sebrae_logo.png';
import logoFanta from '../assets/parceiros/fanta_logo.png';
import logoDataSynq from '../assets/parceiros/datasynq.png';
import logoGrupoLevelUp from '../assets/parceiros/grupolu.png';
import logoCafeRancheiro from '../assets/parceiros/rancheiro_logo.png';
import logoCriamov from '../assets/parceiros/criamov_logo.png';
import logoEloGroup from '../assets/parceiros/elo_group.png';
import logoMonster from '../assets/parceiros/monster.png';
import logoMultiCarreiras from '../assets/parceiros/multicarreira.png';
import logoRiccoBurger from '../assets/parceiros/ricco_logo.png';
import logoKaizen from '../assets/parceiros/kaizen_logo.png';
import logoStone from '../assets/parceiros/stone.png';
import logoSBJr from '../assets/logo.png';

const PARCEIROS = [
  { id: 1,  nome: 'Singular',         logo: logoSingular },
  { id: 2,  nome: 'Omotenashi',       logo: logoOmotenashi },
  { id: 3,  nome: 'BMAI',             logo: logoBMAI },
  { id: 4,  nome: 'Sebrae',           logo: logoSebrae },
  { id: 5,  nome: 'Fanta',            logo: logoFanta },
  { id: 6,  nome: 'DataSynq',         logo: logoDataSynq },
  { id: 7,  nome: 'Grupo Level Up',   logo: logoGrupoLevelUp },
  { id: 8,  nome: 'Café Rancheiro',   logo: logoCafeRancheiro },
  { id: 9,  nome: 'CRIAmov',          logo: logoCriamov },
  { id: 10, nome: 'EloGroup',         logo: logoEloGroup },
  { id: 11, nome: 'Monster',          logo: logoMonster },
  { id: 12, nome: 'Atuar',            logo: logoSBJr },
  { id: 13, nome: 'Multi Carreiras',  logo: logoMultiCarreiras },
  { id: 14, nome: 'Verbalize',        logo: logoSBJr },
  { id: 16, nome: 'Ricco Burger',     logo: logoRiccoBurger },
  { id: 17, nome: 'Kaizen',           logo: logoKaizen },
  { id: 18, nome: 'IZE',              logo: logoSBJr },
  { id: 19, nome: 'Stone',            logo: logoStone },
];

const ParceiroCard = ({ parceiro }) => {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6rem',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '0.5rem 1rem',
      marginRight: '0.75rem',
      flexShrink: 0,
      whiteSpace: 'nowrap',
    }}>
      <img
        src={parceiro.logo}
        alt={parceiro.nome}
        style={{
          width: '28px',
          height: '28px',
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />
      <span style={{
        fontFamily: '"Noir Pro", sans-serif',
        fontWeight: 700,
        color: 'white',
        fontSize: '0.82rem',
      }}>
        {parceiro.nome}
      </span>
    </div>
  );
};

const Parceiros = () => {
  // Array quadruplicado para evitar cortes em telas ultrawide
  const loopParceiros = [...PARCEIROS, ...PARCEIROS, ...PARCEIROS, ...PARCEIROS];

  return (
    <section id="parceiros" style={{ background: '#0d0d0d', padding: '3rem 0 4rem 0' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes parceirosScrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes parceirosScrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}} />

      <div style={{
        height: '1px',
        margin: '0 1.5rem 3rem',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)'
      }} />

      <div style={{ textAlign: 'center', padding: '0 1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{
          fontFamily: 'Strelka',
          fontWeight: 800,
          color: 'white',
          fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
          marginBottom: '0.4rem',
          marginTop: 0
        }}>
          Parceiros
        </h2>
        <p style={{
          fontFamily: '"Noir Pro", sans-serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.85rem',
          margin: 0
        }}>
          Obrigado a quem torna o SBJr. 26 possível
        </p>
      </div>

      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Trilho 1 (Esquerda) */}
        <div 
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'parceirosScrollLeft 66s linear infinite'
          }}
        >
          {loopParceiros.map((p, idx) => (
            <ParceiroCard key={`t1-${idx}`} parceiro={p} index={idx} />
          ))}
        </div>

        {/* Trilho 2 (Direita) */}
        <div 
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'parceirosScrollRight 76s linear infinite'
          }}
      
        >
          {/* Reversão apenas visual do array para diferenciar a linha inferior */}
          {[...loopParceiros].reverse().map((p, idx) => (
            <ParceiroCard key={`t2-${idx}`} parceiro={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Parceiros;

import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#hero') || 
                 document.querySelector('header') ||
                 document.querySelector('section');
    
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .header-links { display: flex; gap: 1.5rem; font-family: "Noir Pro", sans-serif; font-weight: 400; font-size: 0.85rem; }
        .hamburger-btn { display: none; background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; }
        .mobile-menu { display: none; }
        
        @media (max-width: 768px) {
          .header-links { display: none; }
          .hamburger-btn { display: block; }
          .mobile-menu.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 56px;
            left: 0;
            right: 0;
            background: rgba(112, 69, 149, 0.97);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 2rem 1.5rem 3rem 1.5rem;
            gap: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
        }
      `}} />
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '56px',
          padding: '0 1.5rem',
          background: 'rgba(112, 69, 149, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <img src={logo} alt="SBJr. Logo" style={{ height: '28px' }} />
        
        <div className="header-links">
          <a href="#grade" style={{ color: 'white', textDecoration: 'none' }}>Grade</a>
          <a href="#stands" style={{ color: 'white', textDecoration: 'none' }}>Stands</a>
          <a href="#palco" style={{ color: 'white', textDecoration: 'none' }}>Palco</a>
          <a href="#parceiros" style={{ color: 'white', textDecoration: 'none' }}>Parceiros</a>
        </div>

        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={\`mobile-menu \${menuOpen ? 'open' : ''}\`}>
          <a href="#grade" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700 }}>Grade</a>
          <a href="#stands" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700 }}>Stands</a>
          <a href="#palco" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700 }}>Palco</a>
          <a href="#parceiros" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700 }}>Parceiros</a>
        </div>
      </nav>
    </>
  );
};

export default Header;

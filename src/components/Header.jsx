import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Procura o header da seção Hero (o primeiro <header> do documento)
    const heroElement = document.querySelector('header');
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0, // 0 significa que dispara assim que sair completamente
      }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '56px',
        padding: '0 1.5rem',
        background: 'rgba(112, 69, 149, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <img src={logo} alt="SBJr. Logo" style={{ height: '28px' }} />
      <div style={{ display: 'flex', gap: '1.5rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 400, fontSize: '0.85rem' }}>
        <a href="#grade" style={{ color: 'white', textDecoration: 'none' }}>Grade</a>
        <a href="#stands" style={{ color: 'white', textDecoration: 'none' }}>Stands</a>
        <a href="#palco" style={{ color: 'white', textDecoration: 'none' }}>Palco</a>
        <a href="#parceiros" style={{ color: 'white', textDecoration: 'none' }}>Parceiros</a>
      </div>
    </nav>
  );
};

export default Header;

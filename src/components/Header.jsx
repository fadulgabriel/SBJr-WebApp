import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [visible, setVisible] = useState(false);

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
      <img src={logo} alt="SBJr. Logo" style={{ width: '80px' }} />
      
      <div style={{ display: 'flex', gap: '0.75rem', fontFamily: '"Noir Pro", sans-serif', fontWeight: 700, fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
        <a href="#grade" style={{ color: 'white', textDecoration: 'none' }}>Grade</a>
        <a href="#stands" style={{ color: 'white', textDecoration: 'none' }}>Stands</a>
        <a href="#palco" style={{ color: 'white', textDecoration: 'none' }}>Palco</a>
        <a href="#parceiros" style={{ color: 'white', textDecoration: 'none' }}>Parceiros</a>
      </div>
    </nav>
  );
};

export default Header;

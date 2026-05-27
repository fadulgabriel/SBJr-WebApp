import React, { useState } from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import Grade from './components/Grade'
import Stands from './components/Stands'
import Palco from './components/Palco'
import Parceiros from './components/Parceiros'
import Footer from './components/Footer'
import Quiz from './components/Quiz'

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      <main>
        <Hero onOpen={() => setShowQuiz(true)} />
      <Header />
      <Grade />
      <div style={{
        width: '100%',
        padding: '0 1.5rem',
        background: '#0d0d0d',
      }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(112, 69, 149, 0.35), transparent)',
          margin: '0 auto',
        }} />
      </div>
      <Stands />
      <div style={{
        width: '100%',
        padding: '0 1.5rem',
        background: '#0d0d0d',
      }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(112, 69, 149, 0.35), transparent)',
        }} />
      </div>
      <Palco />
      <div style={{
        width: '100%',
        padding: '0 1.5rem',
        background: '#0d0d0d',
      }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(112, 69, 149, 0.35), transparent)',
        }} />
      </div>
      <Parceiros />
      <Footer />
      </main>
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
    </>
  )
}

export default App

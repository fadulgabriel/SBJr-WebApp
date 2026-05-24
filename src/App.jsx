import Hero from './components/Hero'
import Header from './components/Header'
import Grade from './components/Grade'
import Stands from './components/Stands'
import Palco from './components/Palco'
import Parceiros from './components/Parceiros'
import Footer from './components/Footer'

function App() {
  return (
    <main>
      <Hero />
      <Header />
      <Grade />
      <div style={{
        width: '100%',
        padding: '0 1.5rem',
        background: '#0d0d0d',
      }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)',
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
          background: 'linear-gradient(to right, transparent, rgba(252, 61, 13, 0.35), transparent)',
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
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
        }} />
      </div>
      <Parceiros />
      <Footer />
    </main>
  )
}

export default App

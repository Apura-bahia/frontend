import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {

  return (
    <>
      <Header />

      <main style={{ minHeight: '65vh' }}>
        <Outlet />
      </main>

      <Footer />
      <ScrollRestoration />
    </>
  )
}

export default App;
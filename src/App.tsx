import { Outlet, useNavigation } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import styles from './App.module.css'; // Vamos criar este CSS para o spinner

function App() {  
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      
      {/* Indicador de carregamento global */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>A carregar notícias...</p>
        </div>
      )}

      <Outlet />      
      <Footer />
    </>
  );
}

export default App;
import './App.css';
import Layout from './components/layout';
import Proyectos from './pages/proyectos';
import Contacto from './pages/contacto';
import SobreMi from './pages/Sobremi';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* Todo en una sola página - Scroll vertical */}
        <section id="inicio">
          <SobreMi />
        </section>
        
        <section id="proyectos">
          <Proyectos />
        </section>
        
        <section id="contacto">
          <Contacto />
        </section>
      </Layout>
    </div>
  );
}

export default App;
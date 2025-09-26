import { Navbar, Nav, Container } from 'react-bootstrap';
import 'devicon/devicon.min.css';

const Layout = ({ children }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Navbar fijo */}
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="shadow py-2 py-lg-3 fs-6 fs-lg-4">
        <Container >
          <Navbar.Brand href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>
            <i class="devicon-devicon-line fs-1 me-4 align-middle" ></i>
            David Camelo Serna
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#inicio" className='hover-lift text-light' onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>
                Inicio
              </Nav.Link>
              <Nav.Link href="#proyectos" className='hover-lift text-light' onClick={(e) => { e.preventDefault(); scrollToSection('proyectos'); }}>
                Proyectos
              </Nav.Link>
              <Nav.Link href="#contacto" className='hover-lift text-light' onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}>
                Contacto
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido principal */}
      <div style={{ paddingTop: '70px' }}> {/* Espacio para navbar fijo */}
        {children}
      </div>
    </>
  );
};

export default Layout;
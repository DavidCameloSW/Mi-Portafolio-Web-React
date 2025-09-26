import perfil from '../assets/perfil.jpg';
import 'devicon/devicon.min.css';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaGitAlt, FaBootstrap } from "react-icons/fa";
import { SiMysql, SiDotnet } from "react-icons/si";


function SobreMi() {
    return (
        <section className="container-fluid py-4 bg-dark min-vh-100">
            <div className="row align-items-center justify-content-center p-4">
                <div className="col-md-4 col-lg-5 text-light ms-lg-0 me-lg-5">
                    <h1>
                        Desarrollador Web <span className="text-info rounded fw-bold">React & JavaScript</span>
                    </h1>
                    <br />
                    <p className="lead">
                        Soy un desarrollador web con una profunda curiosidad por la tecnología y el impacto que puede tener en la vida de las personas. Mi enfoque está en construir soluciones eficientes y escalables, combinando creatividad con buenas prácticas de desarrollo.
                    </p>

                    <p className="lead">
                        Mi especialización se centra en React y el ecosistema de JavaScript, pero mi curiosidad me impulsa a estar en constante aprendizaje de nuevas tecnologías y lenguajes.
                    </p>

                    <p className="lead">
                        Disfruto trabajar en equipo, compartir conocimientos y enfrentar desafíos que me impulsen a mejorar cada día.
                    </p>

                    <strong>Stack Tecnologico:</strong><br /><br />

                    <div id="customCarousel" className="carousel slide w-75 mx-auto mb-4" data-bs-ride="carousel">
                        {/* Slides */}
                        <div className="carousel-inner" >
                            <div className="carousel-item active">
                                <div className="d-flex align-items-center justify-content-center bg-dark text-white" style={{ height: "200px" }}>
                                    <FaReact size={100} className="mx-3 text-info" />
                                    <FaNodeJs size={100} className="mx-3 text-success" />
                                    <FaJsSquare size={100} className="mx-3 text-warning" />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="d-flex align-items-center justify-content-center bg-dark text-white" style={{ height: "200px" }}>
                                    <FaHtml5 size={100} className="mx-3 text-danger" />
                                    <FaCss3Alt size={100} className="mx-3 text-primary" />
                                    <FaGitAlt size={100} className="mx-3 text-danger" />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="d-flex align-items-center justify-content-center bg-dark text-white" style={{ height: "200px" }}>
                                    <FaBootstrap size={100} className="mx-3" style={{ color: "#7952B3" }}/>
                                    <SiMysql size={100} className="mx-3" style={{ color: "#00618A" }} />
                                    <SiDotnet size={100} className="mx-3" style={{ color: "#512BD4"}} />
                                </div>
                            </div>
                        </div>
                        <p className="lead"> Y muchas mas.</p>

                        {/* Botón para devolver iconos */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#customCarousel"
                            data-bs-slide="prev"
                        >
                            <FaArrowLeft size={30} color="black" />
                        </button>

                        {/* Botón para pasar iconos */}
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#customCarousel"
                            data-bs-slide="next"
                        >
                            <FaArrowRight size={30} color="black" />
                        </button>
                    </div>

                    <p className="lead">
                        Soy un apasionado por crear soluciones digitales que resuelvan problemas reales mediante código eficiente y experiencias de usuario excepcionales. Mi expertise se centra en el desarrollo de aplicaciones web modernas utilizando tecnologías como React, Node.js y bases de datos relacionales.
                    </p>
                </div>

                <div className="col-sm-auto d-flex ">
                    <div className="profile-img-box">
                        <img
                            src={perfil}
                            alt="Perfil"
                            className="img-fluid rounded-circle shadow-lg"
                            style={{ maxWidth: '450px', objectFit: 'auto' }} />
                    </div>
                </div>
            </div>
        </section>
        
    );
}

export default SobreMi;
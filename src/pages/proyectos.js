import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Proyectos() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Tu username de GitHub
    const GITHUB_USERNAME = "DavidCameloSW";

    useEffect(() => {
        fetchGitHubRepos();
    }, []);

    // consumo del API de GITHUB, obteniendo los repositorios públicos

    const fetchGitHubRepos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
            
            if (!response.ok) {
                throw new Error('Error al cargar los repositorios');
            }
            
            const data = await response.json();
            
            // Filtrar repos que no sean forks y tengan descripción
            const filteredRepos = data.filter(repo => 
                !repo.fork && 
                repo.description && 
                repo.name !== GITHUB_USERNAME // Excluir repo del perfil
            );
            
            setRepos(filteredRepos);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching repositories:', err);
        } finally {
            setLoading(false);
        }
    };
    // Formatear la fecha a un formato legible
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    // Función para obtener el color según el lenguaje
    const getLanguageColor = (language) => {
        const colors = {
            HTML: '#e34c26',
            CSS: '#1572b6',
            'C#': '#5e2091ff',
            PHP: '#5c70b3ff',
        };
        return colors[language]
    };
    // Manejo de estados de carga y error
    if (loading) {
        return (
            <section className="container-fluid py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-3">Cargando proyectos...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container-fluid py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <div className="alert alert-danger">
                                <i className="bi bi-exclamation-triangle fs-1 mb-3"></i>
                                <h4>Error al cargar proyectos</h4>
                                <p>{error}</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={fetchGitHubRepos}
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    // Renderizado de los proyectos
    return (
        <section className="container-fluid py-5 bg-dark">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h1 className="display-4 fw-bold text-light mb-3">
                            Mis Proyectos
                        </h1>
                        <p className="lead text-light">
                            Aquí puedes ver algunos de mis proyectos más recientes en GitHub
                        </p>
                    </div>
                </div>

                <div className="row g-4">
                    {repos.map((repo) => (
                        <div key={repo.id} className="col-lg-4 col-md-6 col-sm-12">
                            <div className="card h-100 shadow-sm border-0 hover-lift">
                                <div className="card-body d-flex flex-column">
                                    {/* Header del repositorio */}
                                    <div className="d-flex align-items-start mb-3">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title fw-bold text-dark mb-1">
                                                <i className="bi bi-folder-fill me-2 text-primary"></i>
                                                {repo.name}
                                            </h5>
                                            <small className="text-muted">
                                                Actualizado el {formatDate(repo.updated_at)}
                                            </small>
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <p className="card-text text-muted flex-grow-1 mb-3">
                                        {repo.description}
                                    </p>

                                    {/* Lenguaje principal */}
                                    {repo.language && (
                                        <div className="mb-3">
                                            <span className="badge rounded-pill" 
                                                style={{ 
                                                    backgroundColor: getLanguageColor(repo.language),
                                                    color: 'white'
                                                }}>
                                                {repo.language}
                                            </span>
                                        </div>
                                    )}
                                    <div className="d-grid gap-2">
                                        <div className="btn-group">
                                            <a 
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-dark"
                                            >
                                                <i className="bi bi-code-slash me-1"></i>
                                                Ver Código
                                            </a>
                                            {repo.homepage && (
                                                <a 
                                                    href={repo.homepage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary"
                                                >
                                                    <i className="bi bi-globe me-1"></i>
                                                    Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr/>
                    <div className="d-flex justify-content-center mb-4 ">
                            <a 
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-light btn-lg hover-lift"
                            >
                                <i className="bi bi-github me-2"></i>
                                Ver todos en GitHub
                            </a>
                        </div>
                </div>

                {repos.length === 0 && (
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="alert alert-info">
                                <i className="bi bi-info-circle fs-1 mb-3"></i>
                                <h4>No se encontraron repositorios</h4>
                                <p>No hay repositorios públicos disponibles para mostrar.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .hover-lift {
                    transition: transform 0.2s ease-in-out;
                }
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                }
                .card {
                    border-radius: 15px;
                }
            `}</style>
        </section>
    );
}

export default Proyectos;
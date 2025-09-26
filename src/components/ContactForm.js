import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { contactAPI } from '../services/api';
import CVDCSDEV from '../assets/CVDCSDEV.pdf';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData.subject.trim()) newErrors.subject = 'El asunto es obligatorio';

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactAPI.submitContact(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setValidated(false);
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSubmitStatus('error');

      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="bg-gradient-primary min-vh-100 py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0 ">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Contáctame</h2>
                <p className="text-muted">
                  ¿Tienes un proyecto en mente? ¡Hablemos! Estoy siempre abierto a discutir nuevas oportunidades.
                </p>
              </div>

              {submitStatus === 'success' && (
                <Alert variant="success" className="mb-4">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  ¡Mensaje enviado con éxito! Te responderé a la brevedad.
                </Alert>
              )}

              {(submitStatus === 'error' || errors.general) && (
                <Alert variant="danger" className="mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {errors.general || 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre completo *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.name}
                        required
                        placeholder="Tu nombre"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}
                        required
                        placeholder="tu.email@ejemplo.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Asunto *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    isInvalid={!!errors.subject}
                    required
                    placeholder="Asunto del mensaje"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Mensaje *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    isInvalid={!!errors.message}
                    required
                    placeholder="Describe tu consulta o proyecto..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Mínimo 10 caracteres
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill me-2"></i>
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted small">
                  También puedes contactarme directamente en Gmail al correo:{' '}
                  <a href="mailto:tu.email@ejemplo.com" className="text-decoration-none">
                    camelodavid9828@gmail.com
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-center my-4">
                              <i className="bi bi-github fs-1 mx-4 ext-light hover-lift"
                                  onClick={() => window.open("https://github.com/DavidCameloSW", "_blank")}
                                  style={{ cursor: "pointer" }}></i>
      
                              <i className="bi bi-linkedin fs-1 mx-4 text-light hover-lift"
                                  onClick={() => window.open("https://www.linkedin.com/in/david-camelo-serna/", "_blank")}
                                  style={{ cursor: "pointer" }}></i>
      
                              <i className="bi bi-whatsapp fs-1 mx-4 text-light hover-lift"
                                  onClick={() => window.open("https://wa.me/573186294904", "_blank")}
                                  style={{ cursor: "pointer" }}></i>
                          </div>
      <div className="col-12 text-center mt-4">
        <a
          href={CVDCSDEV}
          download="CV_David_CS.pdf"
          style={{ width: '280px', lineHeight: '2' }}
          className="btn btn-primary btn-lg text-white fw-bold hover-lift ">
          <i className="bi bi-download me-2"></i>
          Descargar CV
        </a>
      </div>
    </Container>
  );
};

export default ContactForm;
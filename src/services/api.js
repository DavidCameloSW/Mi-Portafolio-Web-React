import emailjs from '@emailjs/browser';

// REEMPLAZA ESTOS VALORES CON LOS TUYOS:
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dcs',  // ← Tu Service ID
  TEMPLATE_ID: 'template_zpl0wju',  // ← Template ID que tienes
  PUBLIC_KEY: 'E4KN071IEi7thno3l'  // ← Tu Public Key
};

export const contactAPI = {
  submitContact: (contactData) => 
    emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        from_name: contactData.nombre,
        from_email: contactData.email, 
        subject: contactData.asunto,
        message: contactData.mensaje
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    )
};

// Elimina todo lo de axios que tenías antes
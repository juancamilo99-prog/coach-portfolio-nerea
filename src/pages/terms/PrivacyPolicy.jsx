import LegalPages from "../../components/LegalPages";

const EMAIL = 'nereguisadosanchez@gmail.com';

const sections = [
  {
    title: 'Responsable',
    content: `Nerea Guisado Sánchez. Contacto: ${EMAIL}`
  },
  {
    title: 'Datos de la cuenta de TikTok',
    content: 'con autorización expresa de la titular, esta web obtiene de su cuenta de TikTok su nombre visible y foto de perfil; datos públicos de sus vídeos y credenciales técnicas de acceso, que se guardan en el servidor y nunca se muestran ni se comparten'
  },
  {
    title: 'Finalidad del contenido de TikTok',
    content: 'Mostrar el contenido de TikTok de la titular en su web personal, con su consentimiento. Los datos se guardan en una base de datos alojada en Supabase. Los vídeos se reproducen con el reproductor oficial de TikTok, que se rige por su propia política de privacidad.'
  },
  {
    title: 'Revocar el acceso a TikTok',
    content: `La titular puede retirar el permiso cuando quiera desde la configuración de su cuenta de TikTok o escribiendo a ${EMAIL}.`
  },
  {
    title: 'Conservación de los datos de TikTok',
    content: 'Mientras la conexión con TikTok esté activa. Si se revoca el acceso, los datos y tokens se eliminan.'
  },
  {
    title:'Datos de los visitantes',
    content:'Navegar por la web no requiere registro. Solo tratamos datos personales de los visitantes si se suscriben voluntariamente a la newsletter, como se explica a continuación.' 
  },
  {
    title: 'Newsletter: qué datos recogemos',
    content: 'Si te suscribes, guardamos tu dirección de email, el estado de tu suscripción (pendiente, confirmada o dada de baja), las fechas de alta, confirmación y baja, y un código técnico único que se usa en los enlaces de confirmación y baja.'
  },
  {
    title: 'Newsletter: para qué los usamos',
    content: 'Únicamente para enviarte la newsletter, con novedades, consejos y contenido relacionado con la web. No los vendemos ni los cedemos a terceros con fines comerciales.'
  },
  {
    title: 'Newsletter: base legal',
    content: 'Tu consentimiento, que das al marcar la casilla del formulario y confirmas al pulsar el enlace del correo que te enviamos.'
  },
  {
    title: 'Newsletter: proveedores',
    content: 'Para prestar este servicio usamos dos proveedores, que actúan como encargados del tratamiento: Supabase, donde se almacenan los datos de los suscriptores, y Resend, que entrega los correos. Estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, con las garantías previstas en la normativa de protección de datos.'
  },
  {
    title: 'Newsletter: cuánto tiempo guardamos tus datos',
    content: 'Mientras sigas suscrito/a. Si te das de baja, conservamos únicamente tu email, el estado de tu suscripción y las fechas de alta, confirmación y baja durante un año, para poder acreditar que respetamos tu decisión. Después, los eliminamos.'
  },
  {
    title: 'Newsletter: darte de baja',
    content: `Puedes darte de baja en cualquier momento con el enlace que aparece al final de cada correo o escribiéndonos a ${EMAIL}. Retirar tu consentimiento no afecta a los envíos realizados antes.`
  },
  {
    title: 'Tus derechos',
    content: `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición y portabilidad escribiendo a ${EMAIL}, reclamar ante la Agencia Española de Protección de Datos (aepd.es) y retirar tu consentimiento para la newsletter en cualquier momento.`
  }
]


export function PrivacyPolicy() {
  return (
    <LegalPages
    title="Política de privacidad"
    lastUpdate="29 de octubre de 2026"
    sections={sections} />
  );
}

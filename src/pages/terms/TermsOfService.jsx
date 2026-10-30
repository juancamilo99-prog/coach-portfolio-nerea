import LegalPages from "../../components/LegalPages";

const EMAIL = 'nereguisadosanchez@gmail.com';
const sections = [
    {
        title: 'Titular de la Web',
        content: `Nerea Guisado Sánchez - ${EMAIL}`
    },
    {
        title: 'Uso de la web',
        content: `Esta web es un portafolio personal con fines informativos, su uso es gratuito y no requiere registro`
    },
    {
        title: 'Contenido de terceros',
        content: `Parte del contenido procede de TikTok y se muestra mediante sus herramientas oficiales. 
            Su uso también se rige por los términos de servicio de TikTok. Esta web no está afiliada a TikTok ni patrocinada por TikTok.`
    },
    {
        title: 'Propiedad intelectual',
        content: `Los textos, imágenes y vídeos son de Nerea Guisado Sanchez o de sus respectivos titulares. No se permite reproducirlos sin permiso.`
    },
    {
        title: 'Marcas',
        content: `Las marcas mencionadas pertenecen a sus respectivos titulares.`
    },
    {
        title: 'Responsabilidad',
        content: `No nos hacemos responsables de interrupciones del servicio ni del contenido de webs externas enlazadas.`
    },
    {
        title: 'Cambios',
        content: `Estos términos pueden actualizarse. La fecha de arriba indica la última versión.`
    },
    {
        title: 'Ley aplicable',
        content: `Legislación española.`
    }
];


export function TermsOfService () {

  return (
    <LegalPages title="Terminos y condiciones"
    lastUpdate="29 de octubre de 2026" 
    sections={sections}/>
  )
}
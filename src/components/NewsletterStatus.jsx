import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useToast } from "./context/ToastContext";

const MESSAGES = {
        confirmada: { message: 'Gracias por confirmar tu suscripción!', type: 'success'},
        baja: { message: 'Tu baja ha sido confirmada, te extrañaremos!', type: 'success'},
        invalido: { message: 'Este enlace no es válido o ha caducado. Suscribete de nuevo desde el formulario.' , type: 'error'},
        error: { message: 'Algo ha salido mal. Inténtalo de nuevo más tarde.!', type: 'error'}
    };

export const NewsletterStatus = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { showToast } = useToast();

    useEffect(() => {

        //1. leer el valor de 'newsletter' de la URL
        const valorNewsletter = searchParams.get('newsletter');
        //2. busca su mensaje en MESSAGES
        const toastData = MESSAGES[valorNewsletter];
        //3. si existe, mostrar el toas
        if(toastData){
            showToast(toastData.message, toastData.type);
            searchParams.delete('newsletter');
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchParams]);

  return null;
}
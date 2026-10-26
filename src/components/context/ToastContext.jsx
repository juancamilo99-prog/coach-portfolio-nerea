import { createContext, useContext, useEffect, useState } from 'react'

export const ToastContext = createContext(null);

export const useToast = () => {
        const contextResultado = useContext(ToastContext);
        if(!contextResultado){
            throw new Error('useToast debe usarse dentro de un Provider.')
        }
        return contextResultado;
    }

export const ToastContextProvider = ({ children }) => {

    const [toast, setToast] = useState(null);

    const showToast = (message, type) => {
        console.log('showToast:',message,type);
        setToast({
            message, type
        })
    }

    useEffect(() => {
        if(!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        },4000)

        return() => {
            clearTimeout(timer)
        }
    }, [toast])

    return (
            <ToastContext.Provider value={{
                showToast
            }}>
                {children}
                {toast && (
                    <div className={`fixed bottom-5 right-5 z-50 rounded-2xl px-5 py-3 shadow-lg ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{toast.message}</div>
                )}
            </ToastContext.Provider>
        )
}

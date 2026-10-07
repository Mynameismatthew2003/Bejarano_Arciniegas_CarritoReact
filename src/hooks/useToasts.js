import { useCallback, useState } from "react";

let contador = 0;

/** Manejo de toasts. Un toast con la misma "clave" reemplaza al anterior (no se apilan repetidos). */
export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const cerrar = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const mostrar = useCallback((toast) => {
    const clave = toast.clave ?? toast.mensaje;
    const nuevo = { duracion: toast.accion ? 8000 : 4000, ...toast, clave, id: ++contador };
    setToasts((prev) => [...prev.filter((t) => t.clave !== clave), nuevo].slice(-4));
  }, []);

  return { toasts, mostrar, cerrar };
}

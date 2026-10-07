import { useEffect } from "react";

const ICONOS = { advertencia: "⚠", info: "ℹ" };

export default function Toast({ toast, onCerrar }) {
  const { id, tipo = "info", mensaje, accion, duracion } = toast;

  // Desaparece solo tras unos segundos.
  useEffect(() => {
    const temporizador = setTimeout(() => onCerrar(id), duracion);
    return () => clearTimeout(temporizador);
  }, [id, duracion, onCerrar]);

  return (
    <div className={`toast toast--${tipo}`} role={tipo === "advertencia" ? "alert" : "status"}>
      <span className="toast__icono" aria-hidden="true">{ICONOS[tipo]}</span>
      <div className="toast__contenido">
        <p>{mensaje}</p>
        {accion && (
          <div className="toast__acciones">
            <button
              type="button"
              className="boton boton--peligro boton--chico"
              onClick={() => {
                accion.onClick();
                onCerrar(id);
              }}
            >
              {accion.etiqueta}
            </button>
            <button type="button" className="boton boton--suave boton--chico" onClick={() => onCerrar(id)}>
              Conservar
            </button>
          </div>
        )}
      </div>
      <button type="button" className="toast__cerrar" aria-label="Cerrar notificación" onClick={() => onCerrar(id)}>
        ×
      </button>
    </div>
  );
}

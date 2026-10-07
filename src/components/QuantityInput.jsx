import { useEffect, useState } from "react";
import { debeBloquearTecla, esSoloDigitos, interpretarCantidad } from "../utils/cantidad";

/**
 * Campo de cantidad único para catálogo y carrito.
 * Solo enteros positivos: bloquea teclas (onKeyDown), pegado inválido (onPaste),
 * valores corregidos (onChange) y rueda del mouse (onWheel).
 *
 * Props: value, max, onChange(cantidad), onMinimo(), onMaximo()
 */
export default function QuantityInput({ id, label, value, max, onChange, onMinimo, onMaximo, disabled = false }) {
  const [borrador, setBorrador] = useState(String(value));

  // Mantiene el campo sincronizado con el valor real (por ejemplo tras pulsar + o -).
  useEffect(() => setBorrador(String(value)), [value]);

  const manejarCambio = (evento) => {
    const resultado = interpretarCantidad(evento.target.value, max);

    if (resultado.estado === "vacio") return setBorrador(""); // permite borrar para reescribir
    if (resultado.estado === "minimo") {
      setBorrador(String(value)); // conserva el valor anterior
      return onMinimo();
    }
    setBorrador(String(resultado.cantidad));
    if (resultado.estado === "maximo") onMaximo();
    onChange(resultado.cantidad);
  };

  const manejarPegado = (evento) => {
    const texto = evento.clipboardData.getData("text");
    if (!esSoloDigitos(texto)) evento.preventDefault();
  };

  return (
    <input
      id={id}
      className="campo-cantidad"
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="off"
      aria-label={label}
      value={borrador}
      disabled={disabled}
      onKeyDown={(e) => debeBloquearTecla(e) && e.preventDefault()}
      onPaste={manejarPegado}
      onDrop={(e) => e.preventDefault()}
      onWheel={(e) => e.currentTarget.blur()}
      onChange={manejarCambio}
      onBlur={() => borrador === "" && setBorrador(String(value))}
    />
  );
}

import { useEffect, useRef } from "react";
import { formatearCOP } from "../utils/formato";
import CartItem from "./CartItem";

export default function Cart({ abierto, onCerrar, lineas, totalUnidades, totalCompra, acciones }) {
  const botonCerrar = useRef(null);

  // Escape cierra, se bloquea el scroll del fondo y el foco pasa al panel.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";
    botonCerrar.current?.focus();
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierto, onCerrar]);

  return (
    <>
      <div className={`fondo-carrito ${abierto ? "abierto" : ""}`} onClick={onCerrar} aria-hidden="true" />
      <aside className={`carrito ${abierto ? "abierto" : ""}`} role="dialog" aria-modal="true" aria-labelledby="titulo-carrito" aria-hidden={!abierto}>
        <div className="carrito__cabecera">
          <h2 id="titulo-carrito">Tu carrito</h2>
          <button ref={botonCerrar} type="button" className="boton boton--suave" aria-label="Cerrar carrito" onClick={onCerrar}>
            Cerrar ✕
          </button>
        </div>

        {lineas.length === 0 ? (
          <div className="carrito__vacio">
            <p><strong>Tu carrito está vacío</strong></p>
            <p>Agrega productos desde el catálogo.</p>
            <button type="button" className="boton boton--primario" onClick={onCerrar}>Ver catálogo</button>
          </div>
        ) : (
          <ul className="carrito__lista">
            {lineas.map((linea) => (
              <CartItem key={linea.id} linea={linea} acciones={acciones} />
            ))}
          </ul>
        )}

        <div className="carrito__pie">
          <p className="resumen"><span>Total de unidades</span><strong>{totalUnidades}</strong></p>
          <p className="resumen resumen--total"><span>Total de la compra</span><strong>{formatearCOP(totalCompra)}</strong></p>
        </div>
      </aside>
    </>
  );
}

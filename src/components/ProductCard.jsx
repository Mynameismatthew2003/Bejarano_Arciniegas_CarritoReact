import { useState } from "react";
import { VISUALES } from "../data/products";
import { formatearCOP } from "../utils/formato";
import QuantityInput from "./QuantityInput";

export default function ProductCard({ producto, enCarrito, onAgregar, onMaximo, onMinimo }) {
  const [cantidad, setCantidad] = useState(1);
  const agotado = enCarrito >= producto.stock;
  const visual = VISUALES[producto.id] ?? { emoji: "🛍️", color: "#E8E8E0" };
  const idCampo = `cantidad-producto-${producto.id}`;

  return (
    <article className="producto">
      <div className="producto__etiqueta" style={{ background: visual.color }} aria-hidden="true">
        {visual.emoji}
      </div>
      <div className="producto__cuerpo">
        <h3 className="producto__nombre">{producto.nombre}</h3>
        <p className="producto__precio">{formatearCOP(producto.precio)}</p>
        <p className="producto__stock">Stock disponible: {producto.stock}</p>
        {enCarrito > 0 && <p className="producto__en-carrito">En tu carrito: {enCarrito}</p>}
        {agotado && <p className="producto__agotado">Ya tienes todo el stock en tu carrito</p>}

        <label className="etiqueta-campo" htmlFor={idCampo}>Cantidad</label>
        <QuantityInput
          id={idCampo}
          label={`Cantidad de ${producto.nombre}`}
          value={cantidad}
          max={producto.stock}
          disabled={agotado}
          onChange={setCantidad}
          onMinimo={onMinimo}
          onMaximo={onMaximo}
        />
        <button type="button" className="boton boton--primario" disabled={agotado} onClick={() => onAgregar(producto, cantidad)}>
          Agregar
        </button>
      </div>
    </article>
  );
}

import { calcularSubtotal } from "../utils/cantidad";
import { formatearCOP } from "../utils/formato";
import QuantityInput from "./QuantityInput";

export default function CartItem({ linea, acciones }) {
  const { incrementar, decrementar, fijarCantidad, eliminar, pedirEliminar, avisarMaximo } = acciones;

  return (
    <li className="linea">
      <div className="linea__cabecera">
        <div>
          <h3 className="linea__nombre">{linea.nombre}</h3>
          <p className="linea__unitario">{formatearCOP(linea.precio)} c/u</p>
        </div>
        <button
          type="button"
          className="boton boton--icono"
          aria-label={`Eliminar ${linea.nombre} del carrito`}
          title="Eliminar"
          onClick={() => eliminar(linea.id)}
        >
          🗑 <span>Quitar</span>
        </button>
      </div>

      <div className="linea__pie">
        <div className="cantidad" role="group" aria-label={`Cantidad de ${linea.nombre}`}>
          <button type="button" className="cantidad__boton" aria-label={`Disminuir cantidad de ${linea.nombre}`} onClick={() => decrementar(linea)}>
            −
          </button>
          <QuantityInput
            id={`cantidad-carrito-${linea.id}`}
            label={`Cantidad de ${linea.nombre} en el carrito`}
            value={linea.cantidad}
            max={linea.stock}
            onChange={(n) => fijarCantidad(linea.id, n)}
            onMinimo={() => pedirEliminar(linea)}
            onMaximo={avisarMaximo}
          />
          <button type="button" className="cantidad__boton" aria-label={`Aumentar cantidad de ${linea.nombre}`} onClick={() => incrementar(linea)}>
            +
          </button>
        </div>
        <p className="linea__subtotal">
          <span className="linea__subtotal-etiqueta">Subtotal</span>
          {formatearCOP(calcularSubtotal(linea.precio, linea.cantidad))}
        </p>
      </div>
    </li>
  );
}

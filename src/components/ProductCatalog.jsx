import { PRODUCTOS } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductCatalog({ cantidadEnCarrito, onAgregar, onMaximo, onMinimo }) {
  return (
    <section id="catalogo" aria-labelledby="titulo-catalogo">
      <h2 id="titulo-catalogo" className="titulo-seccion">Productos de la región</h2>
      <p className="subtitulo-seccion">Del Valle del Cauca y el Huila a tu mesa.</p>
      <div className="catalogo">
        {PRODUCTOS.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            enCarrito={cantidadEnCarrito(producto.id)}
            onAgregar={onAgregar}
            onMaximo={onMaximo}
            onMinimo={onMinimo}
          />
        ))}
      </div>
    </section>
  );
}

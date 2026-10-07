import { useCallback, useState } from "react";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ProductCatalog from "./components/ProductCatalog";
import ToastContainer from "./components/ToastContainer";
import { useCarrito } from "./hooks/useCarrito";
import { useToasts } from "./hooks/useToasts";

export default function App() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const { toasts, mostrar, cerrar } = useToasts();
  const carrito = useCarrito({ mostrar, cerrar });
  const cerrarCarrito = useCallback(() => setCarritoAbierto(false), []);

  return (
    <>
      <Navbar totalUnidades={carrito.totalUnidades} onAbrirCarrito={() => setCarritoAbierto(true)} />
      <main className="contenido">
        <ProductCatalog
          cantidadEnCarrito={carrito.cantidadEnCarrito}
          onAgregar={carrito.agregar}
          onMaximo={carrito.avisarMaximo}
          onMinimo={carrito.avisarMinimoCatalogo}
        />
      </main>
      <Cart
        abierto={carritoAbierto}
        onCerrar={cerrarCarrito}
        lineas={carrito.lineas}
        totalUnidades={carrito.totalUnidades}
        totalCompra={carrito.totalCompra}
        acciones={carrito}
      />
      <ToastContainer toasts={toasts} onCerrar={cerrar} />
    </>
  );
}

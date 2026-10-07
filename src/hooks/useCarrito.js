import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCTOS } from "../data/products";
import { MENSAJE_STOCK_MAXIMO, calcularTotales, sumarConLimite } from "../utils/cantidad";

const CLAVE_STORAGE = "tienda-palmira-carrito";

// Lee el carrito guardado y lo valida (productos existentes, enteros >= 1, sin superar stock).
function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "[]");
    if (!Array.isArray(guardado)) return [];
    const vistos = new Set();
    return guardado.flatMap(({ id, cantidad }) => {
      const producto = PRODUCTOS.find((p) => p.id === id);
      if (!producto || vistos.has(id) || !Number.isInteger(cantidad) || cantidad < 1) return [];
      vistos.add(id);
      return [{ id, cantidad: Math.min(cantidad, producto.stock) }];
    });
  } catch {
    return [];
  }
}

/** Estado del carrito: [{ id, cantidad }] (una sola línea por producto). */
export function useCarrito({ mostrar, cerrar }) {
  const [items, setItems] = useState(cargarCarrito);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
      /* si no hay almacenamiento, el carrito sigue funcionando en memoria */
    }
  }, [items]);

  const lineas = useMemo(
    () => items.map(({ id, cantidad }) => ({ ...PRODUCTOS.find((p) => p.id === id), cantidad })),
    [items]
  );
  const { unidades, total } = useMemo(() => calcularTotales(lineas), [lineas]);

  const cantidadEnCarrito = (id) => items.find((i) => i.id === id)?.cantidad ?? 0;

  // ----- Avisos (toasts) -----
  const avisarMaximo = () =>
    mostrar({ tipo: "advertencia", clave: "stock-maximo", mensaje: MENSAJE_STOCK_MAXIMO });

  const avisarMinimoCatalogo = () =>
    mostrar({ tipo: "advertencia", clave: "minimo-catalogo", mensaje: "La cantidad mínima es 1." });

  // ----- Acciones -----
  const eliminar = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);

  const pedirEliminar = (linea) =>
    mostrar({
      tipo: "advertencia",
      clave: `minimo-${linea.id}`,
      mensaje: `1 es la cantidad mínima. ¿Deseas eliminar "${linea.nombre}" del carrito?`,
      accion: { etiqueta: "Sí, eliminar", onClick: () => eliminar(linea.id) },
    });

  const agregar = (producto, cantidad) => {
    const actual = cantidadEnCarrito(producto.id);
    const { cantidad: nueva, superoStock } = sumarConLimite(actual, cantidad, producto.stock);
    setItems((prev) =>
      prev.some((i) => i.id === producto.id)
        ? prev.map((i) => (i.id === producto.id ? { ...i, cantidad: nueva } : i))
        : [...prev, { id: producto.id, cantidad: nueva }]
    );
    if (superoStock) avisarMaximo();
  };

  const fijarCantidad = (id, cantidad) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));

  const incrementar = (linea) => {
    if (linea.cantidad >= linea.stock) return avisarMaximo();
    fijarCantidad(linea.id, linea.cantidad + 1);
  };

  const decrementar = (linea) => {
    if (linea.cantidad <= 1) return pedirEliminar(linea);
    fijarCantidad(linea.id, linea.cantidad - 1);
  };

  return {
    lineas,
    totalUnidades: unidades,
    totalCompra: total,
    cantidadEnCarrito,
    agregar,
    eliminar,
    fijarCantidad,
    incrementar,
    decrementar,
    pedirEliminar,
    avisarMaximo,
    avisarMinimoCatalogo,
  };
}

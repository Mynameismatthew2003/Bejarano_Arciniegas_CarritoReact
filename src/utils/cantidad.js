// Toda la lógica de validación de cantidades vive aquí.
// Catálogo y carrito la comparten a través de <QuantityInput />.

export const MENSAJE_STOCK_MAXIMO = "Este es el máximo de producto disponible en stock";

/** true si el texto está compuesto únicamente por dígitos (para el pegado). */
export const esSoloDigitos = (texto) => /^\d+$/.test(texto);

/**
 * Decide si una tecla debe bloquearse en keydown.
 * Se bloquea cualquier carácter imprimible que no sea un dígito
 * (e, E, +, -, ., ",", letras, espacio, *, etc.).
 * Se dejan pasar teclas de control (Backspace, flechas, Tab...) y atajos Ctrl/Cmd.
 */
export function debeBloquearTecla(evento) {
  if (evento.ctrlKey || evento.metaKey) return false;
  return evento.key.length === 1 && !/^\d$/.test(evento.key);
}

/**
 * Interpreta lo que hay en el campo y dice qué hacer:
 *  - "vacio":  el usuario borró el contenido (se permite mientras escribe)
 *  - "minimo": valor 0 -> no se acepta
 *  - "maximo": supera el stock -> se corrige al stock
 *  - "ok":     cantidad válida
 */
export function interpretarCantidad(texto, stock) {
  const digitos = String(texto).replace(/\D/g, "");
  if (digitos === "") return { estado: "vacio" };
  const numero = parseInt(digitos, 10);
  if (numero < 1) return { estado: "minimo", cantidad: 1 };
  if (numero > stock) return { estado: "maximo", cantidad: stock };
  return { estado: "ok", cantidad: numero };
}

/** Suma cantidades sin superar el stock. */
export function sumarConLimite(actual, extra, stock) {
  const suma = actual + extra;
  return { cantidad: Math.min(suma, stock), superoStock: suma > stock };
}

export const calcularSubtotal = (precio, cantidad) => precio * cantidad;

export function calcularTotales(lineas) {
  return lineas.reduce(
    (acc, l) => ({
      unidades: acc.unidades + l.cantidad,
      total: acc.total + calcularSubtotal(l.precio, l.cantidad),
    }),
    { unidades: 0, total: 0 }
  );
}

// Formato de moneda COP: 98400 -> "$98.400" (sin depender del navegador).
export function formatearCOP(valor) {
  return "$" + String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

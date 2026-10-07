export default function Navbar({ totalUnidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <a className="navbar__marca" href="#catalogo">TIENDA PALMIRA</a>
      <button
        type="button"
        className="navbar__carrito"
        onClick={onAbrirCarrito}
        aria-label={`Abrir carrito, ${totalUnidades} ${totalUnidades === 1 ? "unidad" : "unidades"}`}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
          <path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" />
        </svg>
        {totalUnidades > 0 && (
          <span key={totalUnidades} className="navbar__contador" aria-hidden="true">{totalUnidades}</span>
        )}
      </button>
    </header>
  );
}

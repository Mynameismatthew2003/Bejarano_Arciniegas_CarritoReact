# TIENDA PALMIRA – Carrito de compras con validaciones de stock

Reto práctico de React – SENA CBI Palmira.

- **Nombre del aprendiz:** [TU NOMBRE]
- **Ficha:** [TU FICHA]
- **Repositorio:** [PEGAR URL DE GITHUB]
- **Despliegue (opcional):** [PEGAR URL DE DESPLIEGUE]

## Tecnología
React 18 · JavaScript · CSS · Vite. Sin backend, sin base de datos y sin API: el catálogo es un array en `src/data/products.js`.

## Descripción
Carrito de compras que valida todo en el frontend y avisa con toasts cada vez que el usuario intenta algo no permitido (superar el stock, cantidad 0, caracteres inválidos).

## Características
- Navbar fija con carrito a la derecha y contador de **unidades totales** (se oculta en 0).
- Catálogo con nombre, precio COP, stock, campo de cantidad (inicia en 1) y botón **Agregar** (se deshabilita sin stock disponible).
- Un producto repetido **no duplica líneas**: suma la cantidad (sin superar el stock).
- Campo de cantidad único (`QuantityInput`) para catálogo y carrito: solo enteros positivos; bloquea `e E + - . ,`, letras, espacios, 0 y pegado inválido; la rueda del mouse no cambia el valor.
- Stock máximo en las tres vías (escribir, botón `+`, agregar de nuevo) con el toast *"Este es el máximo de producto disponible en stock"*.
- Mínimo 1: con `−` o escribiendo `0` aparece un toast con opción de eliminar; además hay un botón para quitar directo.
- Subtotales, total de la compra y total de unidades en COP.
- Toasts que se cierran solos o manualmente, con `aria-live`.
- Extra: carrito persistente en `localStorage`, panel con transición, diseño responsive y foco visible.

## Instalación y ejecución
```bash
npm install
npm run dev
```
Abre la URL que muestra la terminal (normalmente http://localhost:5173).

## Estructura
```
src/
├── components/  Navbar, ProductCatalog, ProductCard, Cart, CartItem, QuantityInput, Toast, ToastContainer
├── data/        products.js (catálogo)
├── hooks/       useCarrito.js, useToasts.js
├── utils/       cantidad.js (validaciones y totales), formato.js (COP)
├── styles/      index.css
├── App.jsx
└── main.jsx
```

## Casos de prueba
| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Teclear `e E + - . ,` en un campo | No escribe nada |
| 2 | Pegar `-5`, `3e2`, `abc` | No se pega |
| 3 | Escribir `0` en la tarjeta | Conserva el valor y toast de mínimo 1 |
| 4 | Escribir `0` en el carrito | No cambia y toast de mínimo con "Sí, eliminar" |
| 5 | Escribir `999` en Café (stock 8) | Se corrige a 8 y toast de máximo |
| 6 | Panela: agregar 2 y luego 2 | Queda en 3, una línea, toast de máximo |
| 7 | `+` con cantidad = stock | No sube, toast de máximo |
| 8 | `−` con cantidad 1 | Toast de mínimo; al confirmar se elimina y se recalcula |
| 9 | Agregar dos veces el mismo producto | Una sola línea con cantidades sumadas |
| 10 | Café ×2, Panela ×3, Arepa ×1 | $57.000, $29.400, $12.000; total $98.400 |
| 11 | Chocolate ×1 | Botón Agregar deshabilitado |
| 12 | Agregar productos | Contador del carrito = suma de unidades |

## Evidencias
Capturas en la carpeta [`evidencias/`](./evidencias) (ver `evidencias/README.md` para los nombres):

![Navbar](./evidencias/01-navbar-carrito.png)
![Agregar](./evidencias/02-agregar-producto.png)
![Validación](./evidencias/03-validacion-cantidad.png)
![Stock máximo](./evidencias/04-toast-stock-maximo.png)
![Mínimo y eliminar](./evidencias/05-toast-minimo-eliminar.png)
![Subtotales y total](./evidencias/06-subtotales-total.png)
![Eliminación y recálculo](./evidencias/07-eliminacion-recalculo.png)

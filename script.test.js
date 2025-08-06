/**
 * @jest-environment jsdom
 */
const {
  agregarACarrito,
  carrito,
  productos,
  getTotal,
  resetTotal
} = require('./script');

describe('Tienda Tech - Tests de carrito', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="lista-carrito"></ul>
      <span id="total"></span>
    `;
    carrito.length = 0;
    resetTotal();
  });

  test('agrega un producto al carrito', () => {
    agregarACarrito(productos[0]);
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe("Laptop Gamer");
  });

  test('actualiza el DOM con productos del carrito', () => {
    // 👇 Esto ya actualiza el DOM internamente
    agregarACarrito(productos[1]);

    const lista = document.getElementById("lista-carrito");
    expect(lista).not.toBeNull(); // asegurar que existe
    expect(lista.children.length).toBe(1);
    expect(lista.textContent).toContain("Mouse Inalámbrico");

    const totalTexto = document.getElementById("total").textContent;
    expect(totalTexto).toBe("29.50");
  });
});
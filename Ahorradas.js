//Menu Bar
const btnBalance = document.getElementById("btn-balance");
const btnCategorias = document.getElementById("btn-categorias");
const btnReportes = document.getElementById("btn-reportes");
const menuHamburguesa = document.getElementById("menu-hamburguesa");
const menuNav = document.getElementById("menu-nav");
//Cards principales 
const cardsPrincipales = document.getElementById("cards-principales");
const cardsReportes = document.getElementById("card-reportes");
const sinOperaciones = document.getElementById("sin-operaciones");
const sinReporte = document.getElementById("reportes-sin-operaciones");
//Balance
const balanceGanancias = document.getElementById("balance-ganancias");
const balanceGastos = document.getElementById("balance-gastos");
const balanceTotal = document.getElementById("balance-total");
//Operaciones
const btnCancelarEdicion = document.querySelector("#btn-cancelar-edicion-op");
const btnNuevaOperacion = document.querySelector("#boton-nueva-operacion");
const listaOperaciones = document.querySelector("#listado-operaciones");
const fechaInput = document.querySelector("#editar-fecha-input");
const inputDescripcion = document.querySelector("#descripcion-input");
const tipoInput = document.querySelector("#editar-tipo-operacion");
const montoInput = document.querySelector("#monto-input");
const CardNuevaOperacion = document.querySelector("#card-nueva-operacion");
const operacionesCargadas = document.querySelector("#operaciones-cargadas");

//Categorias
const categorias = [
  "todos",
  "comida",
  "servicios",
  "salidas",
  "educacion",
  "transporte",
  "trabajo",
];

const cardCategorias = document.getElementById("card-categorias");
const listaCategorias = document.querySelector(".lista-categorias");
const inputCategorias = document.getElementById("input-categorias");
const formAgregarCategorias = document.querySelector("#form-agregar-categorias");
const cardAgregarCategorias = document.querySelector("#agregar-nuevas-categorias");
const cardEditarCategorias = document.querySelector("#editar-categoria");
const inputEditarCategorias = document.querySelector("#editar-categoria-input");
const selectCategorias = document.querySelector("#select-de-categorias");
const cancelarEditarCategorias = document.querySelector( "#cancelar-categoria-boton");
const selectCategoriaCarga = document.querySelector("#select-categorias-carga");
//Filtros
const cardFiltros = document.getElementById("card-filtros");
const btnFiltros = document.getElementById("btn-filtros");
const filtroTipo = document.querySelector("#select-ordenar-tipo");
const filtroCategorias = document.querySelector("#select-de-categorias");
const filtroFechas = document.querySelector("#date");
const filtroOrden = document.querySelector("#select-ordenar-por");
//Resumen
const catMayorGanancia = document.getElementById("cat-mayor-ganancia");
const montoMayorGanancia = document.getElementById("monto-mayor-ganancia");
const catMayorGasto = document.getElementById("cat-mayor-gasto");
const montoMayorGasto = document.getElementById("monto-mayor-gasto");
const listaTotales = document.getElementById("lista-balance-categoria");
const categoriaMayorBalance = document.querySelector("#categoria-mayor-balance");
const montoCatMayorBalance = document.querySelector("#monto-categoria-mayor-balance");
const mayorGananciaHTML = document.querySelector("#mes-mayor-ganancia");
const montoMesMayorGanancia = document.querySelector("#monto-mes-mayor-ganancia");
const mesMayorGastoHTML = document.querySelector("#mes-mayor-gasto");
const montoMesMayorGasto = document.querySelector("#monto-mes-mayor-gasto");

// Funciones menu
menuHamburguesa.onclick = () => {
  menuHamburguesa.classList.toggle("is-active");
  menuNav.classList.toggle("is-active");
  btnBalance.classList.toggle("button");
  btnCategorias.classList.toggle("button");
  btnReportes.classList.toggle("button");
};

btnBalance.onclick = () => {
  cardCategorias.classList.add("is-hidden");
  cardsReportes.classList.add("is-hidden");
  cardsPrincipales.classList.remove("is-hidden");
  sinReporte.classList.add("is-hidden");
};

btnCategorias.onclick = () => {
  cardsPrincipales.classList.add("is-hidden");
  cardsReportes.classList.add("is-hidden");
  cardCategorias.classList.remove("is-hidden");
  sinReporte.classList.add("is-hidden");
};

btnReportes.onclick = () => {
  cardsPrincipales.classList.add("is-hidden");
  cardCategorias.classList.add("is-hidden");

  const operacionesReportes = obtenerOperaciones(); // Obtener operaciones desde localStorage

  if (operacionesReportes.length > 0) {
    // Si hay reportes (operaciones), mostramos los reportes y ocultamos "sinReporte"
    cardsReportes.classList.remove("is-hidden");
    sinReporte.classList.add("is-hidden");
  } else {
    // Si no hay reportes (operaciones), ocultamos los reportes y mostramos "sinReporte"
    cardsReportes.classList.add("is-hidden");
    sinReporte.classList.remove("is-hidden");
  }
};


btnFiltros.onclick = () => {
  if (btnFiltros.innerHTML === "Mostrar filtros") {
    btnFiltros.innerHTML = "Ocultar filtros";
    cardFiltros.classList.remove("is-hidden");
  } else {
    btnFiltros.innerHTML = "Mostrar filtros";
    cardFiltros.classList.add("is-hidden");
  }
};


//Local storage
const guardarEnLocalStorage = (clave, objeto) => {
  const objetoConvertidoAJSON = JSON.stringify(objeto);
  return localStorage.setItem(clave, objetoConvertidoAJSON);
};

const obtenerCategorias = () => {
  const categoriasEnLocalStorage = localStorage.getItem("categorias");
  if (categoriasEnLocalStorage === null) {
    return categorias;
  } else {
    return JSON.parse(categoriasEnLocalStorage);
  }
};
const obtenerOperaciones = () => {
  const operacionesEnLocalStorage = localStorage.getItem("operaciones");
  if (operacionesEnLocalStorage === null) {
    return operaciones;
  } else {
    return JSON.parse(operacionesEnLocalStorage);
  }
};






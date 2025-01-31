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


//Operaciones
const operaciones = [];

const operacionesParaHTML = obtenerOperaciones();

btnNuevaOperacion.onclick = () => {
  mostrarFormOperaciones();
};
const agregarOperacionesAHTML = (arr) => {
  const operacionesAHTML = arr.reduce((acc, elemento, index) => {
    return (
      acc +
      `
        <div class="columns  is-multiline is-mobile is-vcentered">
            <div class="mr-5 column is-2-tablet is-6-mobile ml-4">
                <p class="has-text-weight-semibold">
                    ${elemento.descripcion}
                </p>
            </div>
            <div class="column  is-3-tablet is-6-mobile has-text-right-mobile ">
                <span class ="tag is-warning is-light ml-6" >
                    ${elemento.categoria}
                </span>
            </div>
            <div class="mr-3 ml-6 column is-1-tablet has-text-grey is-hidden-mobile has-text-right-tablet has-text-centered">   
                ${new Date(elemento.fecha).toLocaleDateString("es-AR", {
                  timeZone: "UTC",
                })}
            </div>
            <div class=" ml-6 column is-1-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile ${
              elemento.tipo === "ganancia"
                ? "has-text-success"
                : "has-text-danger"
            }">
                ${elemento.tipo === "ganancia" ? "+" : "-"}$${elemento.monto}
            </div>
            <div class="column  is-3-tablet is-6-mobile has-text-right ">
                <button onclick='mostrarFormOperaciones(${JSON.stringify( elemento)},${index})' id=editar-operacion-${index} class="button is-success is-outlined is-small m-2">Editar</button>
                  <button onclick='eliminarOperacion(${index})' id=eliminar-operacion-${index} class="button is-danger is-outlined is-small m-2">Eliminar</button>
                  </div> 
                 </div>
         
      
        `
    );
  }, "");

  listaOperaciones.innerHTML = operacionesAHTML;

  if (operacionesAHTML.length > 0) {
    operacionesCargadas.classList.remove("is-hidden");
    listaOperaciones.classList.remove("is-hidden");
    sinOperaciones.classList.add("is-hidden");
  } else {
    operacionesCargadas.classList.add("is-hidden");
    listaOperaciones.classList.add("is-hidden");
    sinOperaciones.classList.remove("is-hidden");
  }
};


//Categorias 

const agregarCatASelects = () => {
  const categorias = obtenerCategorias();

  const categoriasString = categorias.reduce((acc, categoria) => {
    return acc + `<option value=${categoria}>${categoria}</option>`;
  }, "");

  selectCategorias.innerHTML = categoriasString;

  const categoriasSinTodos = categorias.filter(
    (categoria) => categoria !== "todos"
  );

  const categoriasSelectOperaciones = categoriasSinTodos.reduce(
    (acc, categoria) => {
      return acc + `<option value=${categoria}>${categoria}</option>`;
    },
    ""
  );

  selectCategoriaCarga.innerHTML = categoriasSelectOperaciones;
};


const agregarCategoriasAHTML = () => {
  const categorias = obtenerCategorias();

  const categoriasSinTodos = categorias.filter(
    (categoria) => categoria !== "todos"
  );

  const categoriasAHTML = categoriasSinTodos.reduce((acc, categoria, index) => {
    return (
      acc +
      `

        <div class="columns ">

            <div class="column is-9">
                <p class="tag is-warning is-light "> ${categoria} </p>
            </div>
            <div class="column is-1 has-text-right ">
                <button class="button is-success is-outlined is-small " onclick="editarCategoria('${categoria}')" id="editar-categorias-${index}" class="button is-ghost is-size-7 m-0">Editar</button>
            </div>

            <div class="column is-2 ">
                <button class="button is-danger is-outlined is-small" onclick="eliminarCategoria('${categoria}')" id="eliminar-categorias-${index}" class="button is-ghost  is-size-7">Eliminar</button>
            </div>

        </div>

       `
    );
  }, "");

  listaCategorias.innerHTML = categoriasAHTML;
};

formAgregarCategorias.onsubmit = (e) => {
  e.preventDefault();

  const categorias = obtenerCategorias();
  let nuevaCategoria = inputCategorias.value.trim(); // Para evitar espacios en blanco al inicio y final

  if (categorias.indexOf(nuevaCategoria) === -1) {
    categorias.push(nuevaCategoria);
    inputCategorias.value = "";
    guardarEnLocalStorage("categorias", categorias);
    agregarCatASelects();
    agregarCategoriasAHTML();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Esa categoría ya existe. Por favor ingresa otro nombre.',
      confirmButtonText: 'Entendido'
    });
  }
};


agregarCatASelects();
agregarCategoriasAHTML();

const editarCategoria = (categoria) => {
  cardEditarCategorias.classList.remove("is-hidden");
  cardAgregarCategorias.classList.add("is-hidden");
  listaCategorias.classList.add("is-hidden");
  inputEditarCategorias.value = categoria;

  cardEditarCategorias.onsubmit = (e) => {
    e.preventDefault();
    const categorias = obtenerCategorias();

    if (
      categorias.indexOf(inputEditarCategorias.value) === -1 ||
      categoria === inputEditarCategorias.value
    ) {
      const indice = categorias.indexOf(categoria);

      categorias[indice] = inputEditarCategorias.value;

      guardarEnLocalStorage("categorias", categorias);

      agregarCategoriasAHTML();

      agregarCatASelects();

      cardEditarCategorias.classList.add("is-hidden");
      cardAgregarCategorias.classList.remove("is-hidden");
      listaCategorias.classList.remove("is-hidden");
    } else if ((inputEditarCategorias.value = categoria)) {
      alert("Esa categoria ya existe. Por favor ingresa otro nombre.");
    }
  };
};

const eliminarCategoria = (categoria) => {
  Swal.fire({
    title: '¿Está seguro?',
    text: `Si borra la categoría "${categoria}", también se borrarán las operaciones relacionadas.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Eliminar la categoría y las operaciones relacionadas
      const categorias = obtenerCategorias();
      const categoriasFiltradas = categorias.filter((elemento) => elemento !== categoria);
      guardarEnLocalStorage("categorias", categoriasFiltradas);
      agregarCategoriasAHTML();
      agregarCatASelects();

      const operaciones = obtenerOperaciones();
      const operacionesFiltradas = operaciones.filter((operacion) => operacion.categoria !== categoria);
      guardarEnLocalStorage("operaciones", operacionesFiltradas);
      agregarOperacionesAHTML(operacionesFiltradas);

      Swal.fire('¡Eliminada!', 'La categoría y sus operaciones relacionadas han sido eliminadas.', 'success');
    }
  });
};



cancelarEditarCategorias.onclick = () => {
  cardEditarCategorias.classList.add("is-hidden");
  cardAgregarCategorias.classList.remove("is-hidden");
  listaCategorias.classList.remove("is-hidden");
};


// Filtros

let operacionesAFiltrar = obtenerOperaciones();

const aplicarFiltros = () => {
  const tipoFiltro = filtroTipo.value;

  const filtradoPorTipo = operacionesAFiltrar.filter((operacion) => {
    if (tipoFiltro === "todos") {
      return operacion;
    }
    return operacion.tipo === tipoFiltro;
  });

  const categoriaFiltro = filtroCategorias.value;

  const filtradoPorCategoria = filtradoPorTipo.filter((operacion) => {
    if (categoriaFiltro === "todos") {
      return operacion;
    }
    return operacion.categoria === categoriaFiltro;
  });

  const fechaFiltro = filtroFechas.value;
  const filtradoPorFechas = filtradoPorCategoria.filter((operacion) => {
    if (fechaFiltro === null) {
      return operacion;
    }
    return operacion.fecha >= fechaFiltro;
  });

  const ordenFiltro = filtroOrden.value;
  let copiaFiltradoPorFechas = [...filtradoPorFechas];

  const filtradoFinal = copiaFiltradoPorFechas.sort((a, b) => {
    let nameA = a.descripcion.toUpperCase();
    let nameB = b.descripcion.toUpperCase();

    if (ordenFiltro === "mas-reciente") {
      return new Date(b.fecha) - new Date(a.fecha);
    } else if (ordenFiltro === "menos-reciente") {
      return new Date(a.fecha) - new Date(b.fecha);
    } else if (ordenFiltro === "mayor-monto") {
      return b.monto - a.monto;
    } else if (ordenFiltro === "menor-monto") {
      return a.monto - b.monto;
    } else if (ordenFiltro === "a-z" && nameA < nameB) {
      return -1;
    } else if (ordenFiltro === "z-a" && nameA > nameB) {
      return -1;
    }
  });

  return filtradoFinal;
};

filtroFechas.onchange = () => {
  const arrayFiltrado = aplicarFiltros();

  agregarOperacionesAHTML(arrayFiltrado);
  balance(arrayFiltrado);
};

filtroTipo.onchange = () => {
  const arrayFiltrado = aplicarFiltros();

  agregarOperacionesAHTML(arrayFiltrado);
  balance(arrayFiltrado);
};

filtroCategorias.onchange = () => {
  const arrayFiltrado = aplicarFiltros();

  agregarOperacionesAHTML(arrayFiltrado);
  balance(arrayFiltrado);
};

filtroOrden.onchange = () => {
  const arrayFiltrado = aplicarFiltros();

  agregarOperacionesAHTML(arrayFiltrado);
};

// Nueva Operacion

Date.prototype.toDateInputValue = function () {
  const local = new Date(this);
  return local.toJSON().slice(0, 10);
};

fechaInput.value = new Date().toDateInputValue();
filtroFechas.value = new Date().toDateInputValue();

const mostrarFormOperaciones = (operacion, indice) => {
  operacionesCargadas.classList.add("is-hidden");
  cardsPrincipales.classList.add("is-hidden");
  CardNuevaOperacion.classList.remove("is-hidden");

  if (operacion) {
    inputDescripcion.value = operacion.descripcion;
    montoInput.value = operacion.monto;
    tipoInput.value = operacion.tipo;
    selectCategoriaCarga.value = operacion.categoria;
    fechaInput.value = operacion.fecha;
  }

  CardNuevaOperacion.onsubmit = (e) => {
    const nuevaOperacion = {
      descripcion: inputDescripcion.value,
      monto: Number(montoInput.value),
      tipo: tipoInput.value,
      categoria: selectCategoriaCarga.value,
      fecha: fechaInput.value,
    };

    const operaciones = obtenerOperaciones();

    if (indice > -1) {
      operaciones[indice] = nuevaOperacion;
    } else {
      operaciones.push(nuevaOperacion);
    }

    CardNuevaOperacion.reset();

    guardarEnLocalStorage("operaciones", operaciones);

    CardNuevaOperacion.classList.add("is-hidden");
    cardsPrincipales.classList.remove("is-hidden");

    agregarOperacionesAHTML(operaciones);
  };
};
agregarOperacionesAHTML(operacionesParaHTML);

btnNuevaOperacion.onclick = () => {
  mostrarFormOperaciones();
};

const eliminarOperacion = (index) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás recuperar esta operación!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {


   // Si el usuario confirma, eliminamos la operación
      operacionesParaHTML.splice(index, 1);

      guardarEnLocalStorage("operaciones", operacionesParaHTML);

      agregarOperacionesAHTML(operacionesParaHTML);

      CardNuevaOperacion.classList.add("is-hidden");

      cardsPrincipales.classList.remove("is-hidden");

      balance(operacionesParaHTML);

      Swal.fire(
        'Eliminada!',
        'La operación ha sido eliminada.',
        'success'
      );
    }
  });
};


btnCancelarEdicion.onclick = () => {
  CardNuevaOperacion.classList.add("is-hidden");
  cardsPrincipales.classList.remove("is-hidden");
  agregarOperacionesAHTML(operacionesParaHTML);
};

agregarCatASelects();
// Balance

let operacionesBalance = obtenerOperaciones();

const balance = (arr) => {
  const gastos = arr.filter((elemento) => {
    return elemento.tipo === "gasto";
  });

  const ganancias = arr.filter((elemento) => {
    return elemento.tipo === "ganancia";
  });

  const sumaGastos = gastos.reduce((acc, elemento) => {
    return acc + elemento.monto;
  }, 0);

  const sumaGanancias = ganancias.reduce((acc, elemento) => {
    return acc + elemento.monto;
  }, 0);

  const total = sumaGanancias - sumaGastos;

  balanceGanancias.innerHTML = `+$${sumaGanancias}`;
  balanceGastos.innerHTML = `-$${sumaGastos}`;

  if (total < 0) {
    balanceTotal.innerHTML = `${total}`;

    balanceTotal.classList.remove("has-text-success");

    balanceTotal.classList.add("has-text-danger");
  }
  if (total >= 0) {
    balanceTotal.innerHTML = `+${total}`;

    balanceTotal.classList.remove("has-text-danger");

    balanceTotal.classList.add("has-text-success");
  }
};
balance(operacionesBalance);

//Reportes
const operacionesReportes = obtenerOperaciones();
const categoriasReportes = obtenerCategorias();

const operacionesGanancias = operacionesReportes.filter((operacion) => {
  return operacion.tipo === "ganancia";
});

const mayorGanancia = operacionesGanancias.reduce(function (acc, operacion) {
  return acc.monto > operacion.monto ? acc : operacion;
});

montoMayorGanancia.innerHTML = `+$${mayorGanancia.monto}`;
catMayorGanancia.innerHTML = mayorGanancia.categoria;

const operacionesGastos = operacionesReportes.filter((operacion) => {
  return operacion.tipo === "gasto";
});

const mayorGasto = operacionesGastos.reduce(function (acc, operacion) {
  return acc.monto > operacion.monto ? acc : operacion;
});

montoMayorGasto.innerHTML = `-$${mayorGasto.monto}`;
catMayorGasto.innerHTML = mayorGasto.categoria;

let operacionPorCategoria = [];

const separarPorCategoria = () => {
  categoriasReportes.map((categoria) => {
    operacionPorCategoria.push([]);
  });

  operacionesReportes.map((operacion) => {
    const indiceCategoria = categoriasReportes.indexOf(operacion.categoria);
    operacionPorCategoria[indiceCategoria].push(operacion);
  });
};
separarPorCategoria();

const categoriasConOperaciones = operacionPorCategoria.filter((operacion) => {
  return operacion.length >= 1;
});

const operacionesBalanceParaHTML = categoriasConOperaciones.map(
  (arrayPorCategoria) => {
    let gananciaBalance = 0;
    let gastosBalance = 0;
    let totalBalance = 0;
    let categoria = "";

    for (const operacion of arrayPorCategoria) {
      categoria = operacion.categoria;

      if (operacion.tipo == "ganancia") {
        gananciaBalance += operacion.monto;
      } else {
        gastosBalance += operacion.monto;
      }

      totalBalance = gananciaBalance - gastosBalance;
    }

    return {
      nombre: categoria,
      gananciaBalance,
      gastosBalance,
      totalBalance,
    };
  }
);

const operacionesBalanceAHTML = operacionesBalanceParaHTML.reduce(
  (acc, operacion) => {
    return (
      acc +
      `
    <div class="columns">
        <div class="column has-text-weight-semibold">${operacion.nombre}</div>
        <div class="column has-text-success has-text-right">$+${
          operacion.gananciaBalance
        }</div>
        <div class="column has-text-danger has-text-right ">$-${
          operacion.gastosBalance
        }</div>
        <div class="column has-text-right">${
          operacion.totalBalance > 0 ? "+" : ""
        }$${operacion.totalBalance}</div>
    </div>
    `
    );
  },
  ""
);

listaTotales.innerHTML = operacionesBalanceAHTML;
  
//Categoria mayor balance

const catMayorBalance = [...operacionesBalanceParaHTML];

catMayorBalance.sort((a, b) => {
  return b.totalBalance - a.totalBalance;
});

categoriaMayorBalance.innerText = catMayorBalance[0].nombre;
montoCatMayorBalance.innerText = `$${catMayorBalance[0].totalBalance}`;

// Meses con mayor ganancia y gastos

let mayor_ganancia = 0;
let mes_mayor_ganancia = "";
let mayor_gasto = 0;
let mes_mayor_gasto = "";




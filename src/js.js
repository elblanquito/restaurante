const existeEnCarrito = carrito.value.some(item => {
    return item.nombre === data.value[i].nombre;
  });

  if (existeEnCarrito) {
    console.log(`El artículo ${data.value[i].nombre} ya existe en el carrito.`)
    let posicion = data.value.findIndex(item => item.nombre === carrito.value[i].nombre)
    console.log(`La posición de "${data.value[i].nombre}" en el array es ${posicion}.`)
    

  } else {
    // Agrega el artículo al carrito si no existe.
    
    console.log(`"${data.value[i].nombre}" no se encontró en el array.`)
    carrito.value.push({ ...data.value[i] })
    console.log(`Se ha agregado el artículo ${data.value[i].nombre} al carrito.`)
  }
  console.log ('exite?:'+existeEnCarrito)
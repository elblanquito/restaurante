<template>
  <div class="container">
    <img src="./assets/fondo.png" class="fondo">

    <div class="menu">
      <div>
        
        <p class="titulo">
          Productos disponibles
        </p>
        
      </div>
      <button @click="abrir()" class="carritocont">
        <img src="./assets/carrito.png" class="carrito">
        <div class="carritonoti" :class="{'noti':noti}"  v-if="carrito.length != 0">
          {{ carrito.reduce((total, item) => total + item.cantidad, 0) }}
        </div>
      </button>

    </div>

    <div v-show="lista" :class="{'listacontout':listaout}" class="listacont balancear ">
        <p v-if="carrito.length === 0" class="lista">No hay productos seleccionados</p>
      <div class="lista" v-for="(p,i) in carrito" :key="i">
        <p class=" listap listanombre">{{ p.nombre }}</p>
        <img :src="p.imagen" class="listaimg">
        <p class=" listap listaprecio"><b>Precio:</b> ${{ p.precio }}</p>
        <p class=" listap listacantidad">
          <b>Cantidad:</b>
          {{ p.cantidad }}
        </p>
        <p class=" listap listatotal"><b>Total:</b> ${{ p.precio * p.cantidad }}</p>
        <button class="listap listabutton" @click="quitar(i)">❌</button>
      </div>

      
      <div v-if="carrito.length > 1" class="lista listapagar">
        Total de unidades:
        {{ carrito.reduce((total, item) => total + item.cantidad, 0) }}
        <br>
        Pagar:
       ${{ (carrito.reduce((total, item) => total + (item.cantidad * item.precio), 0)) }}
      </div>
      
    </div>

    
    <div class="productocont">
      <div class="producto" v-for="(p,i) in data" :key="i">
        <img :src="p.imagen" class="productoimg">
        <p class=" productop productonombre">{{ p.nombre }}</p>
        <p class=" productop productoprecio"><b>Precio:</b> ${{ p.precio }}</p>
        <p class=" productop productocantidad">
          <b>Cantidad:</b>
          <input  class="productocantidadinput" type="number" min="1" v-model="p.cantidad">
        </p>
        <p class=" productop productototal"><b>Total:</b> ${{ p.precio * p.cantidad }}</p>
        <button class="productop productobutton" @click="agregar(i)">agregar</button>
      </div>
    </div>


    
    

  </div>
</template>

<script setup>
import { ref } from "vue";


let lista = ref(false);
let listaout = ref(true);
let noti = ref(false)

function abrir(){
  listaout.value = !listaout.value
  if (!lista.value){
    lista.value = !lista.value
  } else{
    setTimeout(function() {
    lista.value = !lista.value
  }, 100);
  }
  
}


function agregar(i) {

  notificacion()

  let posicion = carrito.value.findIndex(item => item.nombre === data.value[i].nombre)

  if (posicion !==-1) {

    console.log(`La posición de "${carrito.value[posicion].nombre}" en el array es ${posicion}.`)
    carrito.value[posicion].cantidad += data.value[i].cantidad

  } else {
    // Agrega el artículo al carrito si no existe.
    carrito.value.push({ ...data.value[i] })
    console.log(`Se ha agregado el artículo ${data.value[i].nombre} al carrito.`)
  }

}


function quitar(i){
  carrito.value.splice(i,1)
  notificacion()
}



function notificacion(){
  setTimeout(function() {
    noti.value = !noti.value
    setTimeout(function() {
        noti.value = false
      }, 100);
    }, 5);

  
}





let data = ref([
  {
    nombre: "Empanada",
    imagen: "../src/assets/empanada.png",
    precio: 5,
    cantidad: 1,
  },
  {
    nombre: "Hamburguesa",
    imagen: "../src/assets/hamburguesa.png",
    precio: 7,
    cantidad: 1,
  },
  {
    nombre: "Papa",
    imagen: "../src/assets/papa.png",
    precio: 5,
    cantidad: 1,
  },
  {
    nombre: "Pizza",
    imagen: "../src/assets/pizza.png",
    precio: 6,
    cantidad: 1,
  },
  {
    nombre: "Taco",
    imagen: "../src/assets/taco.png",
    precio: 6,
    cantidad: 1,
  },
]);


let carrito = ref([]);


//let stickyElement = document.querySelector('.listacont');
//let distanceFromTop = stickyElement.getBoundingClientRect().top;

/*   if (distanceFromTop <= 20) { // Cambia a 'fixed' después de desplazarse 20px desde arriba
    stickyElement.style.position = 'fixed';
    stickyElement.style.top = '20px';
  } else {
    stickyElement.style.position = 'relative'; // Vuelve a 'relative' mientras se desplaza hacia arriba
    stickyElement.style.top = 'auto';
  }

//listacont */

</script>



<style scoped>
*{
  margin: 0;
  font-family: cursive;
}

.fondo{
  position: fixed;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  top: 0px;
}



.menu {
  position: fixed;
  top: 0px;
  width: 100vw;
  font-size: 30px;
  text-align: center;
  background-color: #C38154;
  border-bottom: solid 10px #F9E0BB;
  border-top: solid 10px #F9E0BB;
  padding: 10px;
  font-weight: bold;
}

.carritocont {
  position: absolute;
  top: 10px;
  right: 55px;
  height: 57px;
}

.carrito {
  height: 50px;
}

.carritonoti{
  position: absolute;
  top: 40px;
  left: -10px;
  background-color: #cc1616;
  width: 25px;
  border-radius: 20px;
  color: #ffffff;
  font-size: medium;
  transition: transform 0.2s ease;
}

.noti{
  transform: scale(1.2) rotate(20deg);
}

.titulo {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 50px;
  margin-top: -5px;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  margin-right: 55px;
}

.productocont{
  background-color: #FFC26F85;
  border: 1px solid black;
  box-shadow: 
    inset 5px 5px 10px rgba(0, 0, 0, 0.5),
    inset -5px -5px 10px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content: center;
  width: 70vw;
  padding: 20px;
  margin: 20px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;

}

.producto{
  width: 300px;
  background-color: #FFC26F;
  border: solid #884A39 4px;
  box-shadow: 
     5px 5px 10px rgba(0, 0, 0, 0.5),
     -5px -5px 10px rgba(0, 0, 0, 0.5);
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.producto:hover{
  box-shadow: 0px 0px 10px rgb(255, 255, 0);
  border: solid rgb(255, 255, 0) 4px;
}

.productoimg{
  width: 100%;
}

.productop{
  font-size: large;
  margin: 10px;
}

.productonombre{
  text-align: center;
  font-size: 30px;
  margin-top: 0px;
}


.productocantidadinput{
  width: 34px;
  font-size: 17px;
  background-color: #f9e0bb;
  border: solid #884A39 2px;
}

.productobutton{
  user-select: none;
  background-color: #C38154;
  border: solid 3px #F9E0BB;
  color: #F9E0BB;
  box-shadow: 
     2px 2px 1px rgba(0, 0, 0, 0.5),
     -2px -2px 1px rgba(0, 0, 0, 0.5);
  margin: 25px;
  height: 40px;
  text-align: center;
  padding-bottom: 6px;
  transition: transform 0.5s ease-out ;
}

.productobutton:hover{
  background-color: #C38154;
  color: white;
  border: solid 3px white;
  transform: rotate(5deg);
}

@keyframes balanceo{
  0%{
    transform: rotate(5deg) translate(100px,-30px) ;
  }
  25%{
    transform: rotate(-15deg);
  }
  50%{
    transform: rotate(10deg);
  }
  75%{
    transform: rotate(-5deg);
  }
  100%{
    transform: rotate(0deg);
  }
}

@keyframes desplegar{
  0%{
    transform: scale(0.5) translate(300px,-90%);
    opacity: 0 ;
  }
  100%{
    opacity: 1 ;
  }
}

@keyframes temblar{
  0%{
    transform: rotate(0deg) ;
  }
  25%{
    transform: rotate(-5deg);
  }
  75%{
    transform: rotate(5deg);
  }
  100%{
    transform: rotate(0deg);
  }
}


.balanceo{
  animation: balanceo 1s linear;
}


.productobutton:active {
  background-color: rgba(251, 255, 0, 0.24);
  transform: scale(1.2) rotate(-5deg);
}


.listacont{
  font-size: 30px;
  text-align: center;

  font-weight: bold;

  position:absolute;
  right: 100px;
  top: 50px;

  z-index: 2;
  width: 400px;
  background-color: #C38154;
  border: solid 2px black;
  box-shadow: 5px 5px 10px black;
  overflow: hidden;
  animation: desplegar 0.2s ease-out ;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.listacontout{
  transform: scale(0.5) translate(300px,-90%);
  opacity: 0 ;
}

@media screen and (max-width: 527px) {
  .listacont{

    top: 90px;
    right:auto;
    margin-left: auto;
    width: 90vw;
  }
}

.lista{
  background-color: #f9e0bb;
  border: solid 2px black;
  margin: 50px;
  animation: balanceo 0.8s linear;
  transition: transform 1s ease;
}


.listap{
  font-size: 25px;
}

.listanombre{
  font-weight: normal;
  font-size: 40px;
}

.listaimg{
  width: 200px;
  margin: 10px;
}


.listabutton{
  margin: 10px;
  background-color: #FFC26F;
  border: solid 3px #884A39;
}

.listabutton:hover{
  animation: temblar 0.5s infinite linear;
  border: solid 3px #cc1616;
  box-shadow: 0px 0px 10px #ff000088;
}

.listapagar{
  text-align: left;
  padding: 20px;
  border: none;
  width: 100%;
  margin-left: 0;
  animation: none;
}





</style>

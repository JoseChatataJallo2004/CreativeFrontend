import { Component } from '@angular/core';
import { ClienteService } from 'src/app/Services/cliente.service';
import { VentasService } from 'src/app/Services/ventas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {


  //Obtener DNI
  nombre: string='';
  apellido: string='';
  correo: string='';
  celular: string='';
  dni: string='';

  //Agregar a la tabla productos
  producto: string = '';
  precio: number=0;
  cantidad: number=0;
  productos: any[] = [];


  //Guardar a la bd con api
  productosdata=[];
  ventadata=[];

  constructor(private clienteService: ClienteService,private ventaService:VentasService) { }

  buscarCliente(): void {

    if(!this.dni){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "DNI no puede ser vacio",
        showConfirmButton: false,
        timer: 1800
      });
      //alert('DNI no puede ser vacio');
      return;
    }
    this.clienteService.buscarClientePorDNI(this.dni)
      .subscribe(data => {
        if (data.length > 0) {
          this.nombre = data[0].nombre;
          this.apellido = data[0].apellido;
          this.correo = data[0].correo;
          this.celular = data[0].celular;
        } else {
          alert('No se encontró ningún cliente con el DNI proporcionado');
          // Limpia los campos si no se encontró ningún cliente
          this.nombre = '';
          this.apellido = '';
          this.correo = '';
          this.celular = '';
        }
      });
  }


  agregarProducto() {

// Verificar si se ha encontrado un cliente válido
    
  if (!this.nombre || !this.apellido || !this.correo || !this.celular) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes Ingresar un cliente asociado a nuestra empresa ",
      showConfirmButton: false,
      timer: 1800
    });
    //alert('Debes buscar y seleccionar un cliente antes de agregar productos.');
    return;
  }
    


    if(!this.producto){
     // alert('Debes ingresar un producto');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar un producto",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    else  if (this.precio==0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar un precio",
        showConfirmButton: false,
        timer: 1500
      });
      //alert('Debes ingresar un precio')
      return
    }
    else if (this.cantidad==0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar una cantidad",
        showConfirmButton: false,
        timer: 1500
      });
     // alert('Debes ingresar una cantidad')
      return;
    }

    // Calcular el total
    const total = this.precio * this.cantidad;

    // Agregar el producto a la matriz de productos
    this.productos.push({ producto: this.producto, precio: this.precio, cantidad: this.cantidad, total: total });

    // Limpiar los campos después de agregar el producto
    this.producto = '';
    this.precio = 0;
    this.cantidad = 0;
  }



  pagar(): void {
    // Comprueba si hay productos en la lista
    if (this.productos.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes agregar al menos un producto antes de pagar.",
        showConfirmButton: false,
        timer: 1800
      });
      //alert('Debes agregar al menos un producto antes de pagar.');
      return;
    }

    // Construye el objeto de venta para enviar al servidor
    const ventaData = {
      numerodocumento: this.dni,
      total: this.calcularTotal(),
      lstDetalleventa: this.productos
    };

    // Llama al servicio para guardar la venta
    this.ventaService.guardarVenta(ventaData)
      .subscribe(
        response => {
          console.log('Venta guardada con éxito:', response);
          // mostramos un swall tmb como limpiar la lista de productos
          Swal.fire({
            icon: 'success',
            title: '¡Venta guardada con éxito!',
            text: 'La venta se ha registrado correctamente.',
          });
          
          //

          this.productos = [];
        },
        error => {
          console.error('Error al guardar la venta:', error);
          alert('Ocurrió un error al intentar guardar la venta. Por favor, inténtalo de nuevo.');
        }
      );
  }

  // Método para calcular el total de la venta para la tabla venta
  calcularTotal(): number {
    let total = 0;
    for (const producto of this.productos) {
      total += producto.total;
    }
    return total;
  }


}

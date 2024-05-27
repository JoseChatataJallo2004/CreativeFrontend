import { Component } from '@angular/core';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent {

  nombre: string='';
  apellido: string='';
  correo: string='';
  celular: string='';
  dni: string='';
  constructor(private clienteService: ClienteService) { }

  buscarCliente(): void {

    if(!this.dni){
      alert('DNI no puede ser vacio');
      return;
    }
    this.clienteService.buscarClientePorDNI(this.dni)
      .subscribe(data => {
        this.nombre = data[0].nombre;
        this.apellido = data[0].apellido;
        this.correo = data[0].correo;
        this.celular = data[0].celular;
      });

      this.apellido='';
      this.celular='';
      this.correo='';
      this.nombre='';
  }

}

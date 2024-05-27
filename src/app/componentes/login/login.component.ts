import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  correo: string='';
  clave: string='';

  constructor(private http: HttpClient, private router:Router) {}

  login() {

    if(!this.correo||!this.clave){
      Swal.fire({
        icon: 'error',
        title: '¡Oops...!',
        text: 'Por favor, rellene  los campos.',
        showConfirmButton: false,
        timer: 1800
      });
      //alert('Por favor, rellene  los campos');
      return;
    }


    const body = { correo: this.correo, clave: this.clave };

    this.http.post<any>('http://localhost:5120/api/Administrador/login', body)
      .subscribe(
        response => {
          console.log(response); // Aquí puedes manejar la respuesta como desees
         // alert('Inicio de sesión exitoso');
         this.router.navigate(['/menu'])
        },
        error => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Correo o contraseña no válidos.',
            showConfirmButton: false,
            timer: 1800
          });
         // alert('Correo o contraseña no válidos');
          this.correo='';
          this.clave='';
        }
      );
  }
}



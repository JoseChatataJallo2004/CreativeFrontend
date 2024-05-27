import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { LoginComponent } from './componentes/login/login.component';

//esta libreria para las apis
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './componentes/menu/menu.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { ConsultarClienteComponent } from './componentes/consultar-cliente/consultar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    NoEncontradoComponent,
    LoginComponent,
    MenuComponent,
    VentasComponent,
    ConsultarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

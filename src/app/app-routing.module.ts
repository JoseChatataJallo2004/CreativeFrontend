import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { VentasComponent } from './componentes/ventas/ventas.component';

const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path:'ventas',component:VentasComponent},

  {path:'**',component:NoEncontradoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AsistenciaComponent} from './components/asistencia/asistencia.component';
import {AsignarComponent} from './components/asignar/asignar.component';
import {AdminsisComponent} from './components/adminsis/adminsis.component';
import {ControlsdayComponent} from './components/controlsday/controlsday.component';
import {ListaComponent} from './components/lista/lista.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'asistencia', component: AsistenciaComponent},
  {path: 'asignar', component: AsignarComponent},
  {path: 'adminsisinf', component: AdminsisComponent},
  {path: 'controldia', component: ControlsdayComponent},
  {path: 'lista', component: ListaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

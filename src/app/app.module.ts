import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { AsignarComponent } from './components/asignar/asignar.component';
import {environment} from '../environments/environment.prod';
import { AdminsisComponent } from './components/adminsis/adminsis.component';
import { ControlsdayComponent } from './components/controlsday/controlsday.component';
import {FormsModule} from '@angular/forms';
import { ListaComponent } from './components/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AsistenciaComponent,
    AsignarComponent,
    AdminsisComponent,
    ControlsdayComponent,
    ListaComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

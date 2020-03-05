import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asistencia2';
  constructor(
    public auth:AngularFireAuth,
    public loginService:LoginService
  ) {
  }
  login(){
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout(){
    this.auth.signOut();
  }
}

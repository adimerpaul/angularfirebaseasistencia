import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
admin=false;
  constructor(
    public auth:AngularFireAuth,
    public loginService:LoginService,
    private router:Router
  ) {
    this.auth.onAuthStateChanged( user=>{
      if (user){
        console.log(user)
        this.loginService.nombre=user.displayName;
        this.loginService.img=user.photoURL;
        this.loginService.estado=true;
        this.loginService.uid=user.uid;
        if (user.uid=='YkA4r7z6VLc6QmEoV3XqWsBCnQQ2'){
          this.admin=true
        }else{
          this.admin=false
        }
      }else{
        this.loginService.nombre='ASISTENCIA';
        this.loginService.img='assets/img/user.png';
        this.loginService.estado=false;
        this.loginService.uid='';
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit(): void {
  }
  login(){
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout(){
    this.auth.signOut();
  }

}

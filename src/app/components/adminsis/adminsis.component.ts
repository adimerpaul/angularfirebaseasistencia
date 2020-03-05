import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-adminsis',
  templateUrl: './adminsis.component.html',
  styleUrls: ['./adminsis.component.css']
})
export class AdminsisComponent implements OnInit {

  constructor(
    public auth:AngularFireAuth,
    public loginService:LoginService,
    private router:Router,
    public adminService:AdminService
  ) {
    this.auth.onAuthStateChanged( user=>{
      if (user){
        // console.log(user)
        this.loginService.nombre=user.displayName;
        this.loginService.img=user.photoURL;
        this.loginService.estado=true;
        this.loginService.uid=user.uid;
        if (user.uid!='YkA4r7z6VLc6QmEoV3XqWsBCnQQ2'){
          this.loginService.nombre='ASISTENCIA';
          this.loginService.img='assets/img/user.png';
          this.loginService.estado=false;
          this.loginService.uid='';
          this.router.navigate(['login']);
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
  students=[];
  ngOnInit(): void {
    this.adminService.getStudents3().subscribe(e=>{
      this.students=[];
      e.forEach(e=>{
        this.students.push(e.data())
        // console.log();
      });
    });
  }


  modificar(dato: string) {
    this.adminService.getStudents2().subscribe(e=>{
      e.forEach(e=>{
        // console.log(e.id);
        let dat=e.data();
        // console.log(dat.materia,dato)

        if (dato==''){
          dat.estado='INACTIVO'
          this.adminService.modificar(e.id,dat);

        }else if (dat.materia==dato){

          dat.estado='ACTIVO'
          this.adminService.modificar(e.id,dat);
        }else{
          dat.estado='INACTIVO'
          this.adminService.modificar(e.id,dat);
        }
      })
      this.adminService.getStudents3().subscribe(e=>{
        this.students=[];
        e.forEach(e=>{
          this.students.push(e.data())
          // console.log();
        });
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {StudentsService} from '../../services/students.service';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {
  studets=[];
  asignado=false;
  nombreasignado="";
  constructor(
    public auth:AngularFireAuth,
    public loginService:LoginService,
    private router:Router,
    public studentsService:StudentsService
  ) {
    this.auth.onAuthStateChanged( user=>{
      if (user){
        // console.log(user)
        this.loginService.nombre=user.displayName;
        // console.log(this.loginService.nombre);
        this.loginService.img=user.photoURL;
        this.loginService.estado=true;
        this.loginService.uid=user.uid;
        this.studentsService.getStudents().subscribe(e=>{
          this.studets=[];
          e.forEach(e=>{
            this.studets.push(e.payload.doc.data());
            // console.log(e);
          });
          // console.log(e);
        });
        this.studentsService.verificarStudents(this.loginService.uid).subscribe(e=>{
          // console.log(e);
          if (e.length==0){
            this.asignado=false;
            // this.nombreasignado=dato.nombre;
          }else{
            this.asignado=true;
            // console.log(e[0].payload.doc.data());
            var da =e[0].payload.doc.data();
            // @ts-ignore
            this.nombreasignado = da.nombre;
          }
        });

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

  asignar(dato) {
    // console.log(dato);
    if (confirm('Una vez seleccionado no podra cambiar de nombre!!!')){
      this.studentsService.insertAsignar({
       materia:dato.materia,nombre: dato.nombre,uid:this.loginService.uid
      });
    }
  }
}

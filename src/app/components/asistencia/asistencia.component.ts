import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {StudentsService} from '../../services/students.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

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
        this.loginService.img=user.photoURL;
        this.loginService.estado=true;
        this.loginService.uid=user.uid;
      }else{
        this.loginService.nombre='ASISTENCIA';
        this.loginService.img='assets/img/user.png';
        this.loginService.estado=false;
        this.loginService.uid='';
        this.router.navigate(['login']);
      }
    });
  }
days=[];
  ngOnInit(): void {
    this.studentsService.gatDay().subscribe(e=>{
      this.days=[];
      e.forEach(e=>{
        this.days.push(e.payload.doc.data());
      })
      // console.log(e);
    });
  }

  asietncia(day: any) {
    var dia=new Date(day.dia.seconds*1000);
    this.studentsService.verificarStudents2(this.loginService.uid).subscribe(e=>{
      // console.log(e.docs.length);
      if (e.docs.length==0){
        alert('No estas asigando a alguno estudiante');
      }else {
        var datosestudiante=e.docs[0].data();
            this.studentsService.verificarAsistencia(datosestudiante.nombre,dia).subscribe(e=>{
              // console.log(e.docs.length);
              if (e.docs.length==1){
                alert('Usted ya firmo asistencia!!!, no puede firmar 2 veces')
              }else{
                alert('Correcto!!');
                this.studentsService.insertAsistencia({estudiante:datosestudiante.nombre, fecha:dia,materia:day.materia,estado:'ACTIVO'});
              }
            });
      }

    });
  }
}

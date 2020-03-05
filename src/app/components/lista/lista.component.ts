import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

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
  dia=new Date();
  diat=this.dia.getFullYear()+'-'+((this.dia.getMonth()+1).toString().length==1?'0'+(this.dia.getMonth()+1).toString():this.dia.getMonth().toString())+'-'+(this.dia.getDate().toString().length==1?'0'+this.dia.getDate().toString():this.dia.getDate().toString());

  ngOnInit(): void {
    // console.log(this.dia.getFullYear()+' '+this.dia.getMonth()+' '+this.dia.getDay()));
    // console.log(this.dia.getDate());
  }
estudents=[];

  modificar(materia: string) {
    alert('enviado');
    // console.log(this.diat);
    var initial = this.diat.split('-');
    let newDate=new Date(initial[1]+'/'+initial[2]+'/'+initial[0]);
    //
    this.adminService.consultarStudents(materia,newDate).subscribe(e=>{
      this.estudents=[];
      e.forEach(e=>{
        // console.log(e.payload.doc.data());
        let datoe=e.payload.doc.data();
        // @ts-ignore
        let estudat={estudiante:datoe.estudiante,materia:datoe.materia,fecha:datoe.fecha,estado:datoe.estado,id:e.payload.doc.id};
        // console.log(estudat);
        this.estudents.push(estudat);
      })
    });
  }

  cambiarsistencia(dato: any, estado: string) {
    let dat={estado:estado,estudiante:dato.estudiante,fecha:dato.fecha,materia:dato.materia}
    // console.log(dat);
    let id=dato.id;
    this.adminService.cambiarasistencia(id,dat);
  }
}

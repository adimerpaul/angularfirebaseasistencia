import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import * as moment from 'moment';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-controlsday',
  templateUrl: './controlsday.component.html',
  styleUrls: ['./controlsday.component.css']
})
export class ControlsdayComponent implements OnInit {
  startDate: moment.Moment = moment(Date.now());
  dias=[];
  materias=[
    {materia: 'SIS 2420A',nombre:'ACT'},
    {materia: 'INF 3911A',nombre:'WEB'},
    {materia: 'INF 3920A',nombre:'GEO'}
  ];
  dia={dia:Date.now(),materia:'SIS 2420A',estado:'ACTIVO'}
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

  ngOnInit(): void {
    this.adminService.getdays().subscribe(e=>{
      this.dias=[];
      e.forEach(e=>{
        let dat=e.payload.doc.data();
        let id=e.payload.doc.id;
        // @ts-ignore
        this.dias.push({dia:dat.dia,estado:dat.estado,materia:dat.materia,id:id})
      })
    })
  }

  guardar(form: NgForm) {
    if (confirm('Seguro de insertar?')){
      var initial = form.value.fecha.split('-');
      let newDate=new Date(initial[1]+'/'+initial[2]+'/'+initial[0]);
      // let newDate;
      let diainsert={dia: newDate,materia:form.value.materia,estado:'ACTIVO'}
      this.adminService.insertDay(diainsert);
    }
  }

  deleteday(id: any) {
    if (confirm('Seguro de eliminar?')){
      this.adminService.deleteDay(id);
    }
  }

  activar(day: any, tipo: string) {
    let diainsert={dia:new Date(day.dia.seconds*1000),materia:day.materia,estado:tipo}
    let id=day.id;
    this.adminService.updateDay(diainsert,id);
  }
}

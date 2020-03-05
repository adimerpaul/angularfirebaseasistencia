import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    public firestore:AngularFirestore
  ) { }
  getStudents(){
    return this.firestore.collection('students',ref => ref.where('estado', '==', 'ACTIVO').orderBy('numero')).snapshotChanges();
  }
  verificarStudents(uid){
    return this.firestore.collection('asignacion',ref => ref.where('uid','==',uid)).snapshotChanges();
  }
  verificarStudents2(uid){
    return this.firestore.collection('asignacion',ref => ref.where('uid','==',uid)).get();
  }

  verificarAsistencia(nombre: any, dia: Date){
    return this.firestore.collection('asistencia',ref => ref.where('estudiante','==',nombre).where('fecha','==',dia)).get();
  }
  insertAsignar(data){
    return this.firestore.collection('asignacion').add(data);
  }
  gatDay(){
    return this.firestore.collection('dia',ref => ref.where('estado','==','ACTIVO')).snapshotChanges();
  }
  insertAsistencia(data){
    return this.firestore.collection('asistencia').add(data);
  }
  insert(data){
    return this.firestore.collection('students').add(data);
  }
}

import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public firestore:AngularFirestore
  ) { }
  modificar(id,data){
    return this.firestore.collection('students').doc(id).set(data);
  }
  getStudents(){
    return this.firestore.collection('students',ref => ref.where('estado','==','ACTIVO').orderBy('numero')).snapshotChanges();
  }
  getStudents2(){
    return this.firestore.collection('students',ref => ref.orderBy('numero')).get();
  }
  getStudents3(){
    return this.firestore.collection('students',ref => ref.where('estado','==','ACTIVO').orderBy('numero')).get();
  }
  getdays(){
    return this.firestore.collection('dia',ref => ref.orderBy('dia')).snapshotChanges();
  }
  insertDay(data){
    return this.firestore.collection('dia').add(data);
  }

  deleteDay(id: any) {
    return this.firestore.collection('dia').doc(id).delete();
  }

  updateDay(diainsert:any, id: any) {
    return this.firestore.collection('dia').doc(id).set(diainsert);
  }
  consultarStudents(materia,fecha){
    return this.firestore.collection('asistencia',ref => ref.where('materia','==',materia).where('fecha','==',fecha)).snapshotChanges();
  }

  cambiarasistencia(id, dato) {
    // let id=dato.id;
    return this.firestore.collection('asistencia').doc(id).set(dato);
  }
}

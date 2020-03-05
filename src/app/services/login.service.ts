import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public nombre='ASISTENCIA';
  public img='assets/img/user.png';
  public estado=false;
  public uid='';
  constructor() { }
}

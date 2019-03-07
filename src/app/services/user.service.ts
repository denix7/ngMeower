import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //metodo para registrar usuario
  register(user: User): Observable<any>{//devuelve un observable
   let params = JSON.stringify(user);//convierte objeto a string
   let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'register', params, {headers})
   }

   //Metodo para loguear un usuario y obtener tokken
   signup(user, gettoken=null): Observable<any>{
     if(gettoken != null){
       user.gettoken = gettoken;
     }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.post(this.url+'login', params, {headers})
   }

   //Obtener datos de usuario del localStroage
   getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));//cnvierte el identity del localStorage y lo convierte a Json
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
   }

   //Obtener el token del localStorage
   getToken(){
     let token = localStorage.getItem('token');
     if(token != "undefined"){
      this.token = token;
     }else{
       this.token = null;
     }

     return this.token;
   }
}

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
  public stats;

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
    let params = JSON.stringify(user);  //parseamos user y convertimos a cadena
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.post(this.url+'login', params, {headers})
   }

   //Obtener datos de usuario del localStroage
   getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));//agarra el identity del localStorage y lo convierte a Json
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
   }

   //Obtener el token actual del localStorage
   getToken(){
     let token = localStorage.getItem('token'); //Recupera del localStorage el atributo item
     if(token != "undefined"){  //Si hay un token en localStorage lo almacena en la variable global token
      this.token = token;
     }else{
       this.token = null;
     }

     return this.token;
   }

   //Sacar datos del api (counters son los seguidores y seguiendos que tiene un user)
   getCounters(userId = null):Observable<any>{//El API permite enviar un id por url o devolver counts por defecto del que esta autenthicado
     let headers = new HttpHeaders().set('Content-Type', 'application/json')  //El API pide autorization obligatorio (token del usuario)
                                    .set('Authorization', this.getToken()); //Se envia el token que esta almacenado en localStorage y se recupera de ahi

     if(userId != null){
        return this._http.get(this.url+'counters/'+userId, {headers})
     }
     else{
        return this._http.get(this.url+'counters', {headers})
     }
   }

   //Para no sacar localStorage cada vez haremos, una funcion
   getStats(){
     let stats = JSON.parse(localStorage.getItem('stats'));

     if(stats != "undefined")
      this.stats = stats;
     else
      this.stats = null;

      return this.stats;
   }

   //Actualizar Datos de Usuario
   updateUser(user:User): Observable<any>{
    let params = JSON.stringify(user);//convierte objeto a string
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());

    return this._http.put(this.url+'update/'+user._id, params, {headers})
  }
}

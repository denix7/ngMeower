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
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //metodo para registrar usuario
  register(user: User): Observable<any>{//devuelve un observable
   let params = JSON.stringify(user);
   let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.post(this.url+'register', params, {headers})
   }
}

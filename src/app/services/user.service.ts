import { Injectable } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  constructor(public _http: HttpClientModule) {
    this.url = GLOBAL.url;
   }

   register(){
     console.log(this.url);
   }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from '../../models/user';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  public title:string;
  public user: User;
  public identity;
  public token;
  public status;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _userService: UserService
            ) {

    this.title = 'Actualizar Datos';
    this.status = '';
    this.user = this._userService.getIdentity();  //Este metodo devuelve al usuario almacenado en localStorage
    //console.log(this.user);
    this.token = this._userService.getToken();  //Este metodo obtiene el token almacenado en localStorage
    //console.log(this.token);
    this.identity = this.user;  //identity va a almacenar el usuario que se recupera del localStorage mediante el servicio
   }

  ngOnInit() {

  }
  ngDoCheck(){
    this.identity = this.user;  //Actualiza el valor si es que se hizo un cambio
  }

  onSubmit(misDatosForm){

    // console.log(this.identity)
    this._userService.updateUser(this.user) //le mando el usuario con los nuevos datos
        .subscribe(res =>{
          this.status = 'success';
          console.log(res)
          localStorage.setItem('identity', JSON.stringify(this.user));  //actualizar el localStorage con this.user, NO con lo que hay en res
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage)

          if(errorMessage != null)
            this.status = 'error';
        }
      )
      }

}

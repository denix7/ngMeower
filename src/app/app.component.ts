import { Component, DoCheck } from '@angular/core';
import { UserService } from "../app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Design Social';
  public identity;
  public url: string;

  constructor(private _userService: UserService,
              private _router: Router,
              private _activatedRouter: ActivatedRoute){

                this.url = GLOBAL.url;

  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  //cada vez que se actualiza este dato se actualiza dinamicamente toda la pagina, para que nos muestre la barra si un usuario esta identificado
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  //elimianr todo lo que hay en localStorage y redireccionar
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']); //rediregir a la pagina principal
  }
}

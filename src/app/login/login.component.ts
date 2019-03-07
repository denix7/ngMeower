import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string = "Login";
  public user:User;
  public status: string = "";
  public identity;
  public token;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              public _userService: UserService
              ) {

                //instancia vacia de user que se rellena desde el form
                this.user = new User("", "", "", "", "", "", "ROLE_USER", "")
                
               }

  ngOnInit() {
  }

  //Loguear usuario y conseguir datos. Se esta haciendo 2 peticiones ajax (obtener el usuario identificado y obtener su token)
  onSubmit(){
    this._userService.signup(this.user) //le paso el objeto que ya va rrellenado
        .subscribe(res => {
          this.identity = res.user;
          //console.log(this.identity);
          if(!this.identity || !this.identity._id){
            this.status = 'error';
          }else{
            this.status = 'success';
            //Persistir datos del usuario en localstorage
            localStorage.setItem('identity', JSON.stringify(this.identity));
            //Conseguir el token
            //Este metodo devuelve el token porque se envia un parametro string true
            this.getToken();
          
          }
          this.status = 'success';
        },
        error => {
          console.log(error);
          this.status = 'error';
      })
    
  }
  getToken(){ //Este metodo devuelve el token porque se envia un parametro string true
    this._userService.signup(this.user, 'true')
    .subscribe(res => {
      console.log(res);
      this.token = res.token; //se obtiene el token porque res retorna una propiedad token 
      
      if(this.token.length<=0){
        this.status = 'error';
      }else{
        this.status = 'success';
        //Persistir token del usuario en localStorage
        localStorage.setItem('token', this.token);//se mantiene la sesion
        //Conseguir estadisticas y contadores de usuarios
      }
      this.status = 'success';
    },
    error => {
      console.log(error);
      this.status = 'error';
  })
  }

}

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
  public counts;

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
            localStorage.setItem('identity', JSON.stringify(this.identity));  //LocalStorage solo almacena strings por eso parceamos
            //Conseguir el token
            //Este metodo devuelve el token porque se envia un parametro string true
            this.getToken();
            this._router.navigate(['home']);
            
            //Iniciado sesion y conseguir los counts del user logueado,redirigir a home
            //sthis.getCount();
          }
          this.status = 'success';
        },
        error => {
          console.log(error);
          this.status = 'error';
        })
        
  }

  getToken(){ //Este metodo devuelve el token porque se envia un parametro string true (el API asi lo solicita)
    this._userService.signup(this.user, 'true')
    .subscribe(res => {
      //console.log(res);
      this.token = res.token; //se obtiene el token porque res retorna una propiedad token 
      
      if(this.token.lenght<=0){//si token no es valido
        this.status = 'error';
      }else{
        //Persistir token del usuario en localStorage
        localStorage.setItem('token', this.token);//Al ser el token una cadena no es necesario parsear, se manda directo
        this.getCounters();   //debe ejecutarse despues de que el token se guardo en localstorage
        //Conseguir estadisticas y contadores de usuarios
      }
      this.status = 'success';
    },
    error => {
      console.log(error);
      this.status = 'error';
    })
  }
  
  //Obtener counts (follows y followins) de un usuario que esta almacenado en localStorage
  getCounters(){
    this._userService.getCounters() //estamos obteniendo los counters del usuario actual que se encuentra en localStorage
        .subscribe( res =>{   //los counts que recibimos del servicio podemos almacenarlos en local para ahorrar peticiones 
      console.log(res);
      localStorage.setItem('counts', JSON.stringify(res)); //convertimos el JSON a string porque es el formato que recibe el loalstorage
     
    })
  }
      
}
    
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {

  public title: string;
  public url:string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public status: string;
  public total;
  public pages;
  public users: User[];

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService)
              {
                this.title = 'Amigos'
                this.url = GLOBAL.url;
                this.identity = this._userService.getIdentity();
                this.token = this._userService.getToken();
               }

  ngOnInit() {
    console.log("Cargado")
    this.actualPage();  //al llamar al metodo en el onInit lo estamos ejecutando para que cargue apenas se abra el componente.html
  }

  //Metodo para determinar la pagina actual enviada por la url
  actualPage(){
    this._route.params.subscribe(params => {  //me subscribo pero no al servicio, sino al route para sacar valores de la URL actual 
      let page = +params['page']; //obtenemos el valor numero de la pagina de la url y el signo + lo vuelve entero
      this.page = page;

      if(!page){
        page = 1;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;

        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }
      this.getUsers(page);
    })
  }

  //devolver listado de usuarios
  getUsers(page){
    this._userService.getUsers(page)
        .subscribe(res => {
          if(!res.users){
            this.status = 'error'
          }
          else{
            this.status = 'success'
            console.log(res.users)
            this.total = res.total;
            this.users = res.users;
            this.pages = res.pages;

            if(page>res.pages){ //Si la pagina que se manda por url es mayor al total, entonces redirigir a la pagina 1
              this._router.navigate(['/amigos', 1]);
            }
          }
        },error => {
          var errorMessage = <any> error;
          console.log(errorMessage);

          if(errorMessage!=null)
            this.status = 'error';
        })
  }

}

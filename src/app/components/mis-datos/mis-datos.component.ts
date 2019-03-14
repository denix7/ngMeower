import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from '../../models/user';
import { Observable, observable } from 'rxjs';
import { UploadService } from "../../services/upload.service";
import { GLOBAL } from '../../services/global';

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
  public url:string;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _userService: UserService,
              private _uploadService: UploadService
            ) {

    this.title = 'Actualizar Datos';
    this.status = '';
    this.user = this._userService.getIdentity();  //Este metodo devuelve al usuario almacenado en localStorage
    //console.log(this.user);
    this.token = this._userService.getToken();  //Este metodo obtiene el token almacenado en localStorage
    //console.log(this.token);
    this.identity = this.user;  //identity va a almacenar el usuario que se recupera del localStorage mediante el servicio

    this.url = GLOBAL.url;
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
          if(!res.user){
            this.status = 'error';
          }else{
            this.status = 'success';
            //console.log(res)
            localStorage.setItem('identity', JSON.stringify(this.user));  //actualizar el localStorage con this.user, NO con lo que hay en res
            this.identity = this.user;
            console.log(this.identity)
            //Subida de imagen de usuario
            this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image') //ALMACENA LA IMAGEN PERO EL RESULT DE LA PROMESA NO RETORNA UNA IMAGEN 
                                .then((result: any) => { //captura la respuesta de lo que llegue
                                  console.log(result);
                                  this.user.image = result.user.image;
                                  localStorage.setItem('indentity', JSON.stringify(this.user))  //vovlemos a actualizar el usuario del local storage
                                  console.log(this.identity)
                                })
          }
        },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage)
  
            if(errorMessage != null)
              this.status = 'error';
          }
      )
  }

  //Subir imagen de usuario
  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;  //guardo el resultado de los ficheros que se seleccion en el input
    console.log(this.filesToUpload);  //son todos los ficheros que se van a subir
  }

}

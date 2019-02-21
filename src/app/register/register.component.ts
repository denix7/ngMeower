import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from "../services/user.service";

//http
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public title:string;
  public user:User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public _userService: UserService
  ) {

    this.title = 'Registrate';
    this.user = new User("", "", "", "", "", "", "ROLE_USER", "")
   }

  ngOnInit() {
  }

  onSubmit(registerForm){
    // console.log("form post");
    // console.log(registerForm)
    // console.log(this.user)
    this._userService.register(this.user)
        .subscribe(res =>{
          if(res.user && res.user._id){
            this.status = "success";
            registerForm.reset();//deja limpio el formulario cuando es correcto
          }else{
            this.status = "error";
          }
        },error => {
          console.log(error);
        })
  }

}

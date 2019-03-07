import { Component, DoCheck } from '@angular/core';
import { UserService } from "../app/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Design Social';
  public identity;

  constructor(private _userService: UserService){

  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  //cada vez que se actualiza este dato se actualiza dinamicamente toda la pagina 
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }
}

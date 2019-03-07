import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


//forms
import { FormsModule } from "@angular/forms";

//http
import { HttpClientModule } from "@angular/common/http";

//routes
import { routing, appRoutingProviders } from "./app.routing";
import { HomeComponent } from './components/home/home.component';
import { AmigosComponent } from './components/amigos/amigos.component';
import { MiPeriflComponent } from './components/mi-perifl/mi-perifl.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AmigosComponent,
    MiPeriflComponent,
    MisDatosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

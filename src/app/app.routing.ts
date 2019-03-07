import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';

//Components
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from './components/home/home.component';
import { AmigosComponent } from './components/amigos/amigos.component';
import { MiPeriflComponent } from './components/mi-perifl/mi-perifl.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';

const appRoutes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'inicio', component: HomeComponent
    },
    {
        path: 'amigos', component: AmigosComponent
    },
    {
        path: 'mi-perfil', component: MiPeriflComponent
    },
    {
        path: 'mis-datos', component: MisDatosComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'inicio'
    }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


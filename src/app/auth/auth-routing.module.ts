import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginGuard} from "../services/login_guard.service";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


const authRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: AuthComponent, canActivate: [LoginGuard]}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        LoginGuard
    ]
})
export class AuthRoutingModule { }

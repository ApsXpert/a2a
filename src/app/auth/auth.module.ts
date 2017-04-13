import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthService} from "./auth.service";
import {RecaptchaNoFormsModule} from "ng2-recaptcha/recaptcha/recaptcha-noforms.module";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        RecaptchaNoFormsModule.forRoot()
    ],
    declarations: [
        AuthComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {}

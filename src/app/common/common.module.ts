import { NgModule }       from '@angular/core';
import {HttpService} from "../services/HttpService";
import {AuthGuard} from "../services/auth_gaurd.service";
import {AppDataService} from "../services/app_data.service";
import {TokenSerivce} from "../services/token.service";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {FooterLinksComponent} from "../footer/footerlinks.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CenteralHttpService} from "../services/centeral-http.service";
import {PreviousRouteRecorder} from "../services/deactive.service";


@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        FooterComponent,
        HeaderComponent,
        FooterLinksComponent

    ],
    exports:[
        FooterComponent,
        HeaderComponent
    ],
    providers: [
        HttpService, AuthGuard, AppDataService, PreviousRouteRecorder,
         TokenSerivce, CenteralHttpService
    ]
})
export class AppCommonModule {}

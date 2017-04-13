import { Component } from '@angular/core';
import '../../public/css/font-awesome.min.css';
import '../../public/css/custom.css';
import '../../public/css/loader.css';
import { AppDataService } from './services/app_data.service';
import {HttpService} from "./services/HttpService";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    /**
     * isLoggedIn variable of AppDataService is used in html of this component
     * @param _appDataService
     */
    constructor(private _appDataService: AppDataService, private httpService: HttpService) {}

    

}

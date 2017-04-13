/**
 * This is resolver class for dashboard state. This resolver will get the data
 * from backend server required to render dashboard page.
 */

import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {URL} from '../constants/constant.urls';
import {HttpService} from "../services/HttpService";
import {AppDataService} from "../services/app_data.service";

@Injectable()
export class DashboardDataResolver implements Resolve<any> {

    constructor(private _httpService: HttpService, private _appDataService: AppDataService) {
    }

    /**
     * This method is called automatically to resolve the data
     * @returns {any}
     */
    public resolve() {
        this._appDataService.loadingFlag = true;
        return this._httpService
            .multipleHttpGet([URL.DASHBOARD_SIDEMENU, URL.DASHBOARD_STATS])
    }

}

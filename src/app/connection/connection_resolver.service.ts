/**
 * Created by Javed on 1/5/2017.
 */
import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot } from '@angular/router';
import { URL } from '../constants/constant.urls';
import {HttpService} from "../services/HttpService";
import internal = require("events");


@Injectable()
export class ConnectionDataResolver implements Resolve<any> {


    constructor(private _httpService:HttpService) {

    }

    public resolve(route:ActivatedRouteSnapshot) {
        /*return this._httpService
         .multipleHttpGet([URL.DASHBOARD_SIDEMENU, URL.DASHBOARD_STATS, URL.ACTIVE_TABS]);*/
//        let id = +this.route.params['id'];
        return "Connection Data";
        // console.log(route.params['id']);
    }
}

/**
 * This class restrict user to go to login page without logout.
 * So when user enter '/login' then this class check if user has already
 * logged in and there is valid authentication token then it redirect the
 * user to dashboard.
 */

import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { AppResponse } from '../models/app_response';
import {APP} from "../constants/app.constants";


@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {}

    /**
     * This is the default method which further call validateToken() to activate login or not.
     * @returns {boolean}
     */
    public canActivate() {
        return this.validateToken();
     }

    /**
     * This method checks if authentication is available and session timeout not expired then redirect to
     * dashboard rather than login
     * @returns {boolean}
     */
    private validateToken(): boolean {

        if (APP.DATA.EMPTY === localStorage.getItem(APP.STORAGE.USER_INFO) || null == localStorage.getItem(APP.STORAGE.USER_INFO)) {
            return true;
         }

        let data: AppResponse = JSON.parse(localStorage.getItem(APP.STORAGE.USER_INFO));
        let expiryTime = data.token.expiryTime;
        let cTime = new Date().valueOf() / 1000;
        if (cTime >= expiryTime || null == data.token.token || APP.DATA.EMPTY === data.token.token) {
            return true;
         } else {
            this.router.navigate([APP.NAVIGATION.DASHBOARD]);
            return false;
         }

     }
 }
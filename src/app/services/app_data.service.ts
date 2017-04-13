/**
 * This is data service class which hold global data of the
 * application.
 */

import {Injectable} from '@angular/core';
import {AuthGuard} from "./auth_gaurd.service";
import {TokenSerivce} from "./token.service";
import {APP} from "../constants/app.constants";
@Injectable()
export class AppDataService {

    public isLoggedIn: boolean = false;
    public loginFlag: boolean = false;
    public isCaptchaVerified: boolean = false;
    public isLogout: boolean = false;
    public dashboardSideMenuYears: any;
    public graphBackButton: boolean = false;
    public currentComponent: string = APP.COMPONENT.VERTICAL;
    public loadingFlag: boolean = false;
    public logoutMessage: string = APP.DATA.EMPTY;
    constructor() {
        if (true === TokenSerivce.checkSessionTimeOut()) {
            this.isLoggedIn = true;
        }
    }

    /**
     * Setter for isLoggedIn
     * @param isLoggedIn
     */
    public setIsLoggedIn(isLoggedIn: boolean) {
        this.isLoggedIn = isLoggedIn;
    }

    /**
     * Getter for isLoggedIn
     * @returns {boolean}
     */
    public getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }



}

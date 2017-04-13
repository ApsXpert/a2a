/**
 * This service class perform logout functionality when user click logout button
 */

import {Injectable, OnDestroy} from '@angular/core';
import {LogoutEmitterService} from './logout_emmiter.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppDataService} from './app_data.service';
import {APP} from "../constants/app.constants";
@Injectable()

export class LogoutService implements OnDestroy {
    private subscription: Subscription;

    /**
     * In constructor this service class register itself to Observable which
     * will notify this service whenever user click logout button and when logout event received
     * doLogout() method of this service will be called to logout the user.
     * @param router
     * @param _appDataService
     * @param logoutService
     */
    constructor(private router: Router, private _appDataService: AppDataService,
                private logoutService: LogoutEmitterService) {
        this.subscription = this.logoutService.notifyObservable$
            .subscribe((logged: boolean) => {
                if (true === logged) {
                    this.doLogout(APP.MESSAGES.LOGOUT_SUCCESS);
                }

            });
    }

    /**
     * this method will be called automatically on destroy of this service to
     * release the memory hold by Observable
     */
    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /**
     * This method logout the user by clearing the localStorage and changing
     * state of some flags and then redirect the user to login page.
     */
    public doLogout(logoutMessage: string) {
        this._appDataService.isCaptchaVerified = false;
        localStorage.clear();
        localStorage.setItem(APP.STORAGE.VERTICAL_DATA, APP.DATA.EMPTY);
        this._appDataService.setIsLoggedIn(false);
        this._appDataService.loginFlag = false;
        this._appDataService.isLogout = true;
        this._appDataService.logoutMessage = logoutMessage;
        this.router.navigate([APP.NAVIGATION.LOGIN]);
    }

    public static handleError(){

        console.log("handling error");
    }
}

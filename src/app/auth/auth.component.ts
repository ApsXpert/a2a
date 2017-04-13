/**
 * This is authentication component class which authenticate user
 */
import {AppResponse} from '../models/app_response';
import {AppDataService} from '../services/app_data.service';
import {AuthService} from './auth.service';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {APP} from "../constants/app.constants";

@Component({
    selector: 'fds-login',
    templateUrl: './login.component.html',
})
export class AuthComponent {

    public user: User = new User();
    public errorFlag: boolean = false;
    public errorMessage: string = '';
    private isCaptchaVerified: boolean = false;

    constructor(private authService: AuthService, private router: Router,
                private _appDataService: AppDataService) {
        this._appDataService.loadingFlag = false;
    }

    /**
     * this method received the response of google captcha verification
     * @param captchaResponse
     */
    public resolved(captchaResponse: string) {
        this._appDataService.isCaptchaVerified = true;
    }

    /**
     * this is login method which get user location detail and
     * then call processLogin() to login the user
     */
    public doLogin() {
        if (!this.user.email && !this.user.pwd) {
            this.errorMessage = APP.MESSAGES.REQUIRED;
            this.errorFlag = true;
            return;
        }

        // if (this._appDataService.isCaptchaVerified == false) {
        //     this.errorMessage = 'Please verified captcha';
        //     this.errorFlag = true;
        //     return;
        // }
        this._appDataService.loadingFlag = true;
        this.authService.getUserLocationDetails()
            .subscribe(
                (data: any) => {
                    this.user = this.authService.populateUser(data, this.user);
                    this.processLogin(this.user);
                },
                (err: any) => {
                    this._appDataService.loadingFlag = false;
                    console.log(err);
                },
            );
    }

    /**
     * this method send data to HttpService to login the user
     * @param user
     */
    private processLogin(user: User) {
        this.authService.doLogin(user)
            .subscribe(
                (data: AppResponse) => {
                    if (data.success === true) {
                        this.errorMessage = '';
                        this.errorFlag = false;
                        this.isCaptchaVerified = false;
                        localStorage.setItem(APP.STORAGE.USER_INFO, JSON.stringify(data));
                        this._appDataService.loginFlag = true;
                        this.router.navigate([APP.NAVIGATION.DASHBOARD]);
                    } else {
                        this.errorMessage = data.errorMessage;
                        this.errorFlag = true;
                        this._appDataService.logoutMessage = data.errorMessage;
                        this._appDataService.loadingFlag = false;
                        return;
                    }

                },
                (err: any) => {
                    this._appDataService.loadingFlag = false;
                    console.log(err);
                },
            );
    }

}

/**
 * This class perform authentication check before visiting to secured states/routes
 */
import {Injectable}     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import {LogoutService} from "./logout.service";
import {TokenSerivce} from "./token.service";
import {APP} from "../constants/app.constants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private logoutService: LogoutService) {}

    /**
     * This method will be called automatically by Router to check if user can activate
     * this state or not and this method further call the validateToken() to perform the actual
     * validation
     * @returns {boolean}
     */
    public  canActivate() {
        return this.validateToken();
    }

    /**
     * This method check if user have valid token. In success user will be redirected to
     * visited page otherwise to login page
     * @returns {boolean}
     */
    private validateToken(): boolean {

        let isValid = TokenSerivce.checkSessionTimeOut();
        if (false === isValid) {
            this.logoutService.doLogout(APP.MESSAGES.SESSION_EXPIRED);
            return isValid;
        }
        return isValid;
    }


}

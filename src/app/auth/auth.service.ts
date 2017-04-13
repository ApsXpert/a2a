/**
 * This service class help AuthComponent to do authentication
 */
import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {URL} from '../constants/constant.urls';
import {CenteralHttpService} from "../services/centeral-http.service";
@Injectable()
export class AuthService {

    constructor(private centeralHttpService: CenteralHttpService) {
    }

    /**
     * This method get the login url for login rest service and send it to the
     * HttpService class to make the login request.
     * @param user
     * @returns {Observable<R>}
     */
    public doLogin(user: User) {
        return this.centeralHttpService.post(URL.LOGIN, user);
    }

    /**
     * This method call a service which return user location detail
     * @returns {Observable<R>}
     */
    public getUserLocationDetails() {
        return this.centeralHttpService.get('https://ipinfo.io');
    }

    /**
     * This method populate the object which will be send to server for user authentication
     * @param data
     * @param user
     * @returns {User}
     */
    public populateUser(data: any, user: User): User {

        user.city = data.city;
        user.countryName = data.country;
        user.ip = data.ip;
        user.region = data.region;
        user.countryCode = data.country;
        user.dmaCode = '';
        user.areaCode = '';

        let position = data.loc.split(',');

        if (position instanceof Array) {
            if (position.length === 2) {
                user.longitude = position[0];
                user.latitude = position[1];
            }
        }

        return user;

    }

}

